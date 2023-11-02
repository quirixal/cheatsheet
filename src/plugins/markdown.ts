import MarkdownIt from "markdown-it";
import hljs from "highlight.js";
import "highlight.js/scss/default.scss";

const markdown = new MarkdownIt({
  html: true,
  highlight: function (str: string, lang: string) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return hljs.highlight(str, { language: lang }).value;
      } catch (__) {
        //
      }
    }

    return "";
  }
});

export default markdown;
