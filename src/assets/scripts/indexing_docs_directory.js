const fs = require("fs");
const path = require("path");

const baseDirectoryPath = "./src/docs";
const baseDirectoryContent = fs.readdirSync(baseDirectoryPath);
const subdirectories = [];
const indexedDocs = [];

baseDirectoryContent.forEach((element) => {
    if (fs.lstatSync(`${baseDirectoryPath}/${element}`).isDirectory()) {
        subdirectories.push(element);
    }
});

subdirectories.forEach((directory) => {
    const fullPath = `${baseDirectoryPath}/${directory}`;
    const files = fs.readdirSync(fullPath);
    let tempArrayFileLinks = [];
    for (const file of files) {
        if (path.extname(file) === ".md") {
            let indexedFile = indexingFile(`${fullPath}/${file}`);
            indexedFile.label = formatTitle(file);
            tempArrayFileLinks.push(indexedFile);
        }
    }
    indexedDocs.push({ title: formatTitle(directory), links: tempArrayFileLinks });
});

function indexingFile(filePath) {
    const fileContents = fs.readFileSync(filePath).toString();
    const fileLines = fileContents.split(/r?\n/);
    let keys = ["title", "description", "keywords"];
    let result = {};

    for (let i = 0; i < keys.length; i++) {
        let element = fileLines[i].match(/(?<=\().+(?=\))/);
        element = element ? element[0] : null;
        result[keys[i]] = element;
    }

    result.keywords = result.keywords.split(", ");
    result.path = filePath.replace("./", "");

    return result;
}

fs.writeFileSync("./src/assets/json/indexed_docs_directory.json", JSON.stringify(indexedDocs));

function formatTitle(title) {
    title = title[0].toUpperCase() + title.substring(1);

    if (title.endsWith(".md")) {
        return title.substring(0, title.length - 3);
    }
    return title;
}
