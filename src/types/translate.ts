import { Translate } from "@google-cloud/translate/build/src/v2";
import GAPICredential from "./gAPICredential";
import Translation from "./translation";
import * as fs from "fs";

/**
 * Simple translator class for making life easy!
 */
export default class Translator {

    private readonly credential : GAPICredential;
    private readonly translateInst : Translate;

    /**
     * Create a new translator instance with the specified credential
     *
     * @param credential google credential {@link GAPICredential }
     */
    constructor(credential: GAPICredential) {
        this.credential = credential;
        this.translateInst = new Translate({ projectId: credential.projectId, key: credential.apiKey });
    }

    /**
     * Translate a string into the desired language
     *
     * @param contents contents to translate
     * @param lang should be a two character language iso code
     */
    async translate(contents: string, lang: string) : Promise<Translation> {
        let res = await this.translateInst.translate(contents, lang);
        return { original: contents, translation: res[0] }
    }

    async translateFile(file: Buffer, lang: string) : Promise<Translation[]> {
        let results : Translation[] = [];
        let lines : string[] = [];
        file.toString().split(/\r?\n/).forEach(line => {
           if (!(line === "{" || line === "[") && line.length != 0) lines.push(line);
        })

        for (const line of lines) {
            results.push(await this.translate(line, lang));
        }

        return results;
    }
}
