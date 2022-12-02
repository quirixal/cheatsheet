const fs = require("fs");
const path = require("path");
const lemmatizer = require("node-lemmatizer");
const natural = require("natural");

// const paths = [
//     // "./README.md",
//     "./src/docs/git/basics.md",
//     "./src/docs/git/branching.md",
//     "./src/docs/git/useful_scripts.md",
//     "./src/docs/technology/vue.js.md",
// ];

// paths.forEach((path) => {
//     indexingMDFile(path);
// });

function indexingMDFile(path) {
    let content = fs.readFileSync(path).toString();
    content = lowerCasingContent(content);
    content = tokenize(content);
    content = pos(content);
    content = lemmatize(content);
    content = removeStopWords(content);
    content = tf(content, 1);
    content = idf(content);

    return getBestKeywords(content, 8);
}

function lowerCasingContent(content) {
    return content.toLowerCase();
}

function tokenize(content) {
    content = content.split(/\W+/g);

    // Remove numbers and everything starting with numbers
    content.forEach((token) => {
        if (token.match(/^[0-9].*$/)) content.splice(content.indexOf(token), 1);
    });
    return content;
}

function pos(content) {
    const language = "EN";
    const defaultCategory = "N";
    const defaultCategoryCapitalized = "NNP";
    var lexicon = new natural.Lexicon(language, defaultCategory, defaultCategoryCapitalized);
    var ruleSet = new natural.RuleSet("EN");
    var tagger = new natural.BrillPOSTagger(lexicon, ruleSet);
    return tagger.tag(content);
}

function lemmatize(content) {
    let result = [];
    content.taggedWords.forEach((word) => {
        if (["N", "NN", "NNS", "NNP", "NNPS"].includes(word.tag)) {
            const lem = lemmatizer.lemmas(word.token, "noun");
            if (!lem || lem.length <= 0 || !lem[0][1]) {
                return;
            }
            result.push(lem[0][0]);
        } else if (["JJ", "JJR", "JJS"].includes(word.tag)) {
            const lem = lemmatizer.lemmas(word.token, "adj");
            if (!lem || lem.length <= 0 || !lem[0][1]) {
                return;
            }
            result.push(lem[0][0]);
        } else if (["RB", "RBR", "RBS"].includes(word.tag)) {
            const lem = lemmatizer.lemmas(word.token, "adv");
            if (!lem || lem.length <= 0 || !lem[0][1]) {
                return;
            }
            result.push(lem[0][0]);
        } else if (["VB", "VBD", "VBG", "VBN", "VBP", "VBZ"].includes(word.tag)) {
            const lem = lemmatizer.lemmas(word.token, "verb");
            if (!lem || lem.length <= 0 || !lem[0][1]) {
                return;
            }
            result.push(lem[0][0]);
        } else return;
    });
    return result;
}

function removeStopWords(content) {
    const loadedStopWordString = fs.readFileSync("./src/assets/json/en_stop_words.json").toString();
    const stopWords = JSON.parse(loadedStopWordString);

    stopWords.forEach((stopWord) => {
        content = content.filter((x) => x != stopWord);
    });
    return content;
}

function tf(content, minCounter) {
    let results = [];

    content.forEach((token) => {
        const searchForTokenResult = results.filter((x) => x.token === token);
        const searchForTokenResultLength = searchForTokenResult.length;
        const hasToken = searchForTokenResultLength === 1;

        if (hasToken) {
            let tokenObj = searchForTokenResult[0];
            const tokenObjPosition = results.indexOf(tokenObj);
            tokenObj.wordCounter += 1;
            results[tokenObjPosition] = tokenObj;
        } else {
            results.push({ token: token, wordCounter: 1 });
        }
    });

    if (results.length >= 2) {
        results = results.filter((x) => x.wordCounter >= minCounter);
        results = results.sort((a, b) => {
            if (a.wordCounter > b.wordCounter) {
                return -1;
            } else if (a.wordCounter < b.wordCounter) {
                return 1;
            }
            return 0;
        });
    }

    results.forEach((tfObj) => {
        tfObj.tf = tfObj.wordCounter / content.length;
        tfObj.documentCounter = 0;
        tfObj.idf = 0;
    });

    return results;
}

function idf(content) {
    const baseDirectoryPath = "./src/docs";
    const baseDirectoryContent = fs.readdirSync(baseDirectoryPath);
    const subdirectories = [];

    baseDirectoryContent.forEach((element) => {
        if (fs.lstatSync(`${baseDirectoryPath}/${element}`).isDirectory()) {
            subdirectories.push(element);
        }
    });

    subdirectories.forEach((directory) => {
        const fullPath = `${baseDirectoryPath}/${directory}`;
        const files = fs.readdirSync(fullPath);
        for (const file of files) {
            if (path.extname(file) === ".md") {
                const doc = fs.readFileSync(`${fullPath}/${file}`).toString();
                content.forEach((tokenObj) => {
                    tokenObj.documentCounter += doc.includes(tokenObj.token) ? 1 : 0;
                });
                content.forEach((tokenObj) => {
                    tokenObj.idf = 1 / tokenObj.documentCounter;
                    tokenObj.tfIdf = tokenObj.tf * tokenObj.idf;
                });
            }
        }
    });

    return content;
}

function getBestKeywords(content, max = 5) {
    let result = [];
    content.sort((a, b) => {
        if (a.tfIdf > b.tfIdf) {
            return -1;
        } else if (a.tfIdf < b.tfIdf) {
            return 1;
        }
        return 0;
    });

    for (let index = 0; index < max; index++) {
        const element = content[index];
        if (element) result.push(element);
    }

    result = result.map((x) => x.token);
    console.log(result);
    return result;
}
