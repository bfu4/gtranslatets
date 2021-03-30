# simple-translate
*Translate stuff simply and fast using your google api credentials.. faster than it already is*

[![Build Status](https://travis-ci.com/bfu4/gtranslatets.svg?token=bypWRsVUoMjidD3wJrUy&branch=master)](https://travis-ci.com/bfu4/gtranslatets)

This is almost pointless. I used it to cheat my way through languages I guess.
As always, when cheating language classes, you shouldn't 100% trust google translate (blah blah disclaimer stuff)..

## Usage
Using this programmatically looks something like this:

```typescript
const translator = new Translate({ projectId: "your project id", apiKey: "your api key" });

translator.translate("hello", "fr").then((res) => {
    console.log(res);
    // { "original": "hello", "translation" : "bonjour" }
})
```
