// @ts-ignore of shame
import { api_key, FRENCH_LIST_ONE, FRENCH_LIST_TWO, project_id, FRENCH_LIST_THREE } from '../__data__/data';
import { Translator, Translation } from "../src";
import * as fs from "fs";
import * as Path from "path";

const translator : Translator = new Translator({ projectId: project_id, apiKey: api_key})

test("Test Simple Translation", async () => {
    let res = await translator.translate("Ils fument des mal cigarettes", "en");
    expect(res.translation).toBe("They smoke bad cigarettes");
})

test("Translate List one", async () => {
    let translations : Translation[] = [];
    for (const word of FRENCH_LIST_ONE) {
        translations.push(await translator.translate(word, "en"));
    }
    expect(translations.length).toBe(FRENCH_LIST_ONE.length);
})

test("Translate list two", async  () => {
    let translations : Translation[] = [];
    for (const word of FRENCH_LIST_TWO) {
        translations.push(await translator.translate(word, "en"));
    }
    console.log(JSON.stringify(translations, null, 4));
    expect(translations.length).toBe(FRENCH_LIST_TWO.length);
})

test("Translate list three", async () => {
    let translations : Translation[] = [];
    for (const word of FRENCH_LIST_THREE) {
        translations.push(await translator.translate(word, "fr"));
    }
    expect(translations.length).toBe(FRENCH_LIST_THREE.length);
})

test("Translate a file", async () => {
    let res = await translator.translateFile(fs.readFileSync(Path.resolve("__data__/file.txt")), "nl");
    expect(res.length).toBe(3);
})
