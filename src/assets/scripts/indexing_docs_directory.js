// Import everything needed
const fs = require("fs");
const path = require("path");
const lemmatizer = require("node-lemmatizer");
const natural = require("natural");

const icons = {
  basics: "mdi-pizza",
  python: "mdi-pizza",
  technology: "mdi-pizza",
  tools: "mdi-tools",
  "version-control": "mdi-git"
};

// This is the "result" array
const indexedDocs = [];

// Read base directory "./src/docs"
const docsBasePath = "./src/docs";
let docsDirectoryContent = fs.readdirSync(docsBasePath);
console.log(`Read base directory => ${docsBasePath}`);
console.log(`======================================`);

// Find all subdirectories in "./src/docs"
let subdirectoryPaths = findSubdirectories(docsDirectoryContent);
console.log(`Found subdirectories: ${subdirectoryPaths}`);
subdirectoryPaths = subdirectoryPaths.map((subdirectory) => {
  return `${docsBasePath}/${subdirectory}`;
});
console.log(`======================================`);

// Read subdirectories
subdirectoryPaths.forEach((subdirectory) => {
  const subdirectoryDocuments = fs.readdirSync(subdirectory);
  console.log(`Current subdirectory => ${subdirectory}`);
  console.log(`Found documents: ${subdirectoryDocuments}`);

  let indexedSubdirectoryDocuments = [];

  // Read all documents inside the subdirectory
  for (const document of subdirectoryDocuments) {
    // Only markdown files
    let filePath = `${subdirectory}/${document}`;
    if (fs.lstatSync(filePath).isFile() && path.extname(document) === ".md") {
      const indexedFile = indexingDocument(filePath);
      indexedSubdirectoryDocuments.push(indexedFile);
      console.log(`Successfully indexed => ${subdirectory}/${document}`);
    }
  }
  indexedDocs.push({
    title: formatTitle(subdirectory.replace("./src/docs/", "")),
    icon: icons[subdirectory.replace("./src/docs/", "")]
      ? icons[subdirectory.replace("./src/docs/", "")]
      : "mdi-pizza",
    links: indexedSubdirectoryDocuments
  });
  console.log(`======================================`);
});

// Write into file
fs.writeFileSync("./src/assets/json/indexed_docs_directory.json", JSON.stringify(indexedDocs));

///////////////
// Functions //
///////////////

function findSubdirectories(docsDir) {
  const result = [];
  docsDir.forEach((x) => {
    if (fs.lstatSync(`${docsBasePath}/${x}`).isDirectory()) result.push(x);
  });
  return result;
}

function formatTitle(title) {
  title = title[0].toUpperCase() + title.substring(1);
  title = title.replace("_", " ");

  return title;
}

function indexingDocument(documentPath) {
  // Indexing document (Load title, description and keywords)
  const documentContent = fs.readFileSync(documentPath).toString();
  const [title, description, keywords] = getDocumentSpecs(documentContent);
  // Remove markdown-comments
  const documentContentWithoutCommentLines = removeCommentLines(documentContent);
  // Generate more keywords from document content
  const generatedKeywords = generateKeywordsFromDocument(documentContentWithoutCommentLines, 6);
  let mergedKeywords = new Set([...keywords, ...generatedKeywords]);

  return {
    title,
    description,
    keywords: [...mergedKeywords],
    path: documentPath.replace("./", "")
  };
}

function getDocumentSpecs(documentContent) {
  // Load document specs from document itself, like title, description and the preserved keywords.
  const documentLines = documentContent.split(/r?\n/);
  const title = loadDocumentTitle(documentLines);
  const description = loadDocumentDescription(documentLines);
  const keywords = loadDocumentPreservedKeywords(documentLines);

  return [title, description, keywords];
}

function loadDocumentTitle(documentLines) {
  // Load just the title from a document. Title is first found line with '# '
  for (let i = 0; i < documentLines.length; i++) {
    const line = documentLines[i];
    const lineIsTitle = !!line.match(/^# {1}/);

    if (lineIsTitle) {
      return line.replace(/^# {1}/, "");
    }
  }
}

function loadDocumentDescription(documentLines) {
  // Load just the description from a document. Description is line with '[description]: <> '
  const line = documentLines[0];
  const lineIsDescription = line.includes("[description]: <> ");

  if (lineIsDescription) {
    const extractedDescription = line.match(/(?<=\().+(?=\))/);
    return extractedDescription ? extractedDescription[0] : null;
  }
}

function loadDocumentPreservedKeywords(documentLines) {
  // Load just the preservedKeywords from a document. PreservedKeywords is line with '[preservedKeywords]: <> '
  const line = documentLines[1];
  const lineIsPreservedKeywords = line.includes("[preservedKeywords]: <> ");

  if (lineIsPreservedKeywords) {
    const extractedPreservedKeywords = line.match(/(?<=\().+(?=\))/);
    return extractedPreservedKeywords ? extractedPreservedKeywords[0].split(", ") : null;
  }
}

function removeCommentLines(documentContent) {
  const documentLines = documentContent.split(/r?\n/);
  let documentLinesWithoutComments = documentLines.slice(2);

  // Remove empty lines
  documentLinesWithoutComments = documentLinesWithoutComments.filter((line) => {
    return line !== "";
  });

  return documentLinesWithoutComments.join(" ");
}

///////////////////////////////////////////
// Generate keywords from Markdown file. //
///////////////////////////////////////////

function generateKeywordsFromDocument(documentContent, maxKeywords = null) {
  // Generate keywords from document content
  // 1. Lowercase whole document
  documentContent = documentContent.toLowerCase();
  // 2. Tokenize content, remove all non word signs and numbers
  let tokens = tokenizeDocumentContent(documentContent);
  // 3. Get the POS for each word
  // What word is it? Nouns, Verbs etc.
  tokens = partOfSpeech(tokens);
  // 4. Change each word into it's base form
  let lemmatizedTokens = lemmatizeTokens(tokens);
  // 5. Remove all english stop words, like: i, you, on, in, etc.
  let lemmatizedTokensWithoutStopWords = removeStopWords(lemmatizedTokens);
  // 6. Calculate the term frequency inside its own file
  let termFrequencyTokens = calculateTermFrequency(lemmatizedTokensWithoutStopWords);
  // 7. Calculate the term frequency inside all files
  termFrequencyTokens = calculateDocumentFrequency(termFrequencyTokens);
  // 8. Return only the best matching keywords
  return getBestKeywords(termFrequencyTokens, maxKeywords);
}

function tokenizeDocumentContent(document) {
  // Split the text and isolates each word
  let tokenizedDocument = document.split(/[ ,\\[\]:().#?*+`\\/{}";\n<>=!]/g);

  let result = [];
  // Remove numbers and everything starts, ends or is a numbers.
  tokenizedDocument.map((token) => {
    token = token.replace(/^[']/, "").replace(/[']$/, "");

    const startsWithNumber = token.match(/^[0-9].*/);
    const endsWithNumber = token.match(/.*[0-9]$/);
    if (startsWithNumber || endsWithNumber) {
      return;
    }
    result.push(token);
  });

  return result;
}

function partOfSpeech(tokens) {
  // Defining the part of speech for each word.
  const language = "EN";
  const defaultCategory = "N"; // N => noun

  var lexicon = new natural.Lexicon(language, defaultCategory);
  var ruleSet = new natural.RuleSet(language);
  var tagger = new natural.BrillPOSTagger(lexicon, ruleSet);

  return tagger.tag(tokens);
}

function lemmatizeTokens(content) {
  // Lemmatize tokens, all words will be set to their base => dogs > dog
  let result = [];
  content.taggedWords.forEach((word) => {
    if (["N", "NN", "NNS", "NNP", "NNPS"].includes(word.tag)) {
      // Nouns
      const lem = lemmatizer.lemmas(word.token, "noun");
      if (!lem || lem.length <= 0 || !lem[0][1]) {
        return;
      }
      result.push(lem[0][0]);
    } else if (["JJ", "JJR", "JJS"].includes(word.tag)) {
      // Adjectives
      const lem = lemmatizer.lemmas(word.token, "adj");
      if (!lem || lem.length <= 0 || !lem[0][1]) {
        return;
      }
      result.push(lem[0][0]);
    } else if (["RB", "RBR", "RBS"].includes(word.tag)) {
      // Adverbs
      const lem = lemmatizer.lemmas(word.token, "adv");
      if (!lem || lem.length <= 0 || !lem[0][1]) {
        return;
      }
      result.push(lem[0][0]);
    } else if (["VB", "VBD", "VBG", "VBN", "VBP", "VBZ"].includes(word.tag)) {
      // Verbs
      const lem = lemmatizer.lemmas(word.token, "verb");
      if (!lem || lem.length <= 0 || !lem[0][1]) {
        return;
      }
      result.push(lem[0][0]);
    } else if (["FW"].includes(word.tag)) {
      // Foreign Words
      result.push(word.token);
    } else return;
  });
  return result;
}

function removeStopWords(tokens) {
  // Remove stop words like i, and, an, you etc.
  const loadedStopWordString = fs.readFileSync("./src/assets/json/en_stop_words.json").toString();
  const stopWords = JSON.parse(loadedStopWordString);

  stopWords.forEach((stopWord) => {
    tokens = tokens.filter((x) => x != stopWord);
  });
  return tokens;
}

function calculateTermFrequency(content) {
  let results = [];

  // Count the token inside the document
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

  // Sort by wordCount
  if (results.length >= 2) {
    results = results.sort((a, b) => {
      if (a.wordCounter > b.wordCounter) {
        return -1;
      } else if (a.wordCounter < b.wordCounter) {
        return 1;
      }
      return 0;
    });
  }

  // Set tf and documentCounter
  results.forEach((tfObj) => {
    tfObj.termFrequency = tfObj.wordCounter / content.length;
    tfObj.documentCounter = 0;
  });

  return results;
}

function calculateDocumentFrequency(tokens) {
  // Read subdirectories
  subdirectoryPaths.forEach((subdirectory) => {
    const subdirectoryDocuments = fs.readdirSync(subdirectory);

    // Read all documents in subdirectory
    for (const document of subdirectoryDocuments) {
      // Only markdown files
      let filePath = `${subdirectory}/${document}`;
      if (fs.lstatSync(filePath).isFile() && path.extname(document) === ".md") {
        const doc = fs.readFileSync(filePath).toString();
        // Count documents with tokens
        tokens.forEach((tokenObj) => {
          tokenObj.documentCounter += doc.includes(tokenObj.token) ? 1 : 0;
        });
        // Calculate inverse document frequency (df) and term frequency inverse document frequency (tf-idf)
        tokens.forEach((tokenObj) => {
          tokenObj.documentCounter = tokenObj.documentCounter || 1;

          tokenObj.inverseDocumentFrequency = 1 / tokenObj.documentCounter;
          tokenObj.termFrequencyInverseDocumentFrequency =
            tokenObj.termFrequency * tokenObj.inverseDocumentFrequency;
        });
      }
    }
  });

  return tokens;
}

function getBestKeywords(tokens, maxKeywords = null) {
  let result = [];
  // Sort by tf-idf
  tokens.sort((a, b) => {
    if (a.termFrequencyInverseDocumentFrequency > b.termFrequencyInverseDocumentFrequency) {
      return -1;
    } else if (a.termFrequencyInverseDocumentFrequency < b.termFrequencyInverseDocumentFrequency) {
      return 1;
    }
    return 0;
  });

  // Either all or set max keywords from document
  if (!maxKeywords) maxKeywords = tokens.length;
  for (let index = 0; index < maxKeywords; index++) {
    const element = tokens[index];
    if (element) result.push(element);
  }

  // Only word from token
  result = result.map((x) => x.token);
  return result;
}
