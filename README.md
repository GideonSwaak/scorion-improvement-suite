# Scorion Improvement Suite
Hogeschool Utrecht Scorion improvement suite

## Building
In order to build the project, you will need the following:
- NodeJS
- NPM

### Installing dependencies
```bash
npm install
```

### Building the project
```bash
npm run build
```
Or use the following command to build and watch for changes
```bash
npm run watch
```
Or use the following command to build and serve the project on port 12000
```bash
npm run serve
```

## Locally using the built script
In order to use the built script, you will need the following:
- A userscript manager like [ViolentMonkey](https://violentmonkey.github.io/), to load your own copy of the script
- An extention that can block certain URL's from being loaded like [uBlock Origin](https://github.com/gorhill/uBlock), so that you can block the default scripts being requested in Scorion

### List of URL's to block
```
*/content/2914/11c7-afc2-747d-0957-41fb-9f7f-fc14-625f.txt # custom-textarea js
*/content/2914/34f4-83a3-bb70-d0b5-4a16-a54f-0248-00d4.css # custom-textarea css

*/content/2914/ea67-e11f-6f79-fa1c-4c0b-9c9b-665e-5a38.txt # vaardigheid-toelichting js
*/content/2914/c9e9-bf95-3b85-09ce-4b05-ba31-2869-6257.css # vaardigheid-toelichting css

*/content/2914/b081-fa81-09c8-b256-4e86-ad19-39f4-1b7d.txt # script/css loader js
https://cdn.rawgit.com/showdownjs/showdown/2.1.0/dist/showdown.min.js
```

### An example userscript to inject your local copy
You can use the command 'npm run serve' to spin up a local server on port 12000, which will serve the built script, and instruct webpack to watch for changes.
```js
// ==UserScript==
// @name        Scorion - Local script
// @namespace   Scorion Improvement Suite
// @match       https://hu01.parantion.nl/template/formviewer/index.php
// @match       https://hu01.viewform.nl/template/formpostviewer/index.php
// @grant       none
// @version     1.0
// @author      -
// @description 5-4-2023 14:26:16
// ==/UserScript==
(() => {
    const scorionScriptURL = "http://localhost:12000/bundle.js";
    const head = document.querySelector("head");
    script.type = "text/javascript";
    script.src = scorionScriptURL;
    head.appendChild(script);
});
```