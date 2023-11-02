import { AssertionError } from "assert";
import { markdown } from "../../plugins";
import ClipboardJs from "clipboard";

export default class MarkdownRenderer {
  rawMarkdownFile: string;
  attributeConfig: object[];

  constructor(rawMarkdownFile: string) {
    this.rawMarkdownFile = rawMarkdownFile;
    this.attributeConfig = [
      {
        elementTags: ["h1"],
        class: ["site-title", "mb-6"],
        id: "site-title"
      },
      {
        elementTags: ["h2"],
        class: ["headline"]
      },
      {
        elementTags: ["h3"],
        class: ["sub-headline"]
      },
      {
        elementTags: ["p"],
        class: ["paragraph", "mb-2"]
      },
      {
        elementTags: ["code"],
        class: ["inline-code", "text-orange-accent-2"]
      },
      {
        elementTags: ["ul", "ol"],
        class: ["list", "mb-2"]
      },
      {
        elementTags: ["li"],
        class: ["list-item", "ml-10"]
      },
      {
        elementTags: ["blockquote"],
        class: ["blockquote", "bg-blue-grey-lighten-3", "mb-4", "pa-5", "rounded-sm"]
      },
      {
        elementTags: ["pre"],
        class: ["code-block", "pa-2", "rounded-sm", "w-100"]
      },
      {
        elementTags: ["a"],
        class: ["link"]
      }
    ];
  }

  render(): string {
    let preRenderedMarkdownFile: string = markdown.render(this.rawMarkdownFile);
    preRenderedMarkdownFile = this._addCopyElements(preRenderedMarkdownFile);

    let markdownHTMLDocument: Document = new DOMParser().parseFromString(
      preRenderedMarkdownFile,
      "text/html"
    );
    markdownHTMLDocument = this._setAttributesToElements(markdownHTMLDocument);
    markdownHTMLDocument = this._addFragments(markdownHTMLDocument);

    this._addClipboardJS();
    this._setDocumentTitle(markdownHTMLDocument);

    return markdownHTMLDocument.body.innerHTML;
  }

  _addCopyElements(content: string): string {
    return content
      .replaceAll(/<pre>/g, (value: string) => {
        return `<div class="code-block-wrapper"><div class="clipboard-wrapper"><div class="flex-filler"></div><span class="clipboard material-symbols-outlined text-white">content_copy</span></div>${value}`;
      })
      .replaceAll(/<\/pre>/g, (value: string) => {
        return `${value}</div>`;
      });
  }

  _flatTagsFromConfig(): string[] {
    return this.attributeConfig
      .map((elementConfig: any) => elementConfig.elementTags.toString())
      .toString()
      .split(",");
  }

  _getConfigFromTag(tag: string): object {
    return this.attributeConfig
      .map((e: any) => {
        if (e.elementTags.includes(tag)) return e;
      })
      .filter((e) => e)[0];
  }

  _setDocumentTitle(doc: Document) {
    const siteTitle = doc?.querySelector("h1")?.innerText;
    document.title =
      siteTitle === "Cheat sheet" ? `${siteTitle} | Home` : `Cheat sheet | ${siteTitle}`;
  }

  _setAttributesToElements(markdownHTMLDocument: Document): Document {
    const tagsFromConfig: string[] = this._flatTagsFromConfig();

    const HTMLElements: object[] = [];
    tagsFromConfig.forEach((tag: string) => {
      HTMLElements.push({ tag: tag, elements: markdownHTMLDocument.querySelectorAll(tag) });
    });

    HTMLElements.forEach((elementsObject: any) => {
      const elementConfig: any = this._getConfigFromTag(elementsObject.tag);

      if (elementsObject.elements) {
        elementsObject.elements.forEach((element: Element) => {
          // Add id
          if (elementConfig.id) element.id = elementConfig.id;
          // Add classes
          if (elementConfig.class)
            elementConfig.class.forEach((cls: string) => {
              element.classList.add(cls);
            });
        });
      }
    });
    return markdownHTMLDocument;
  }

  _addFragments(markdownHTMLDocument: Document): Document {
    const headlineLists = [
      markdownHTMLDocument.querySelectorAll("h2"),
      markdownHTMLDocument.querySelectorAll("h3")
    ];
    headlineLists.forEach((headlineList) => {
      headlineList.forEach((element) => {
        element.id = element.innerText.toLowerCase().replaceAll(" ", "-");
        const copiedElement = element.cloneNode(true);

        const link = document.createElement("a");
        link.href = `#${element.id}`;
        link.classList.add("fragment-link");
        link.append(copiedElement);

        const filler = document.createElement("div");
        filler.classList.add("flex-filler");
        link.append(filler);

        const fragment = document.createElement("span");
        fragment.classList.add("material-symbols-outlined");
        fragment.innerText = "link";
        link.appendChild(fragment);

        markdownHTMLDocument.body.replaceChild(link, element);
      });
    });
    return markdownHTMLDocument;
  }

  _addClipboardJS() {
    const clipboard = new ClipboardJs(".clipboard", {
      text: (preIconElement: Element) => {
        return (
          preIconElement?.parentElement?.nextElementSibling?.querySelector("code")?.innerText || ""
        );
      }
    });
    clipboard.on("success", (e: any) => {
      console.log("copy success", e);
      e.trigger.innerText = "check";
      setTimeout(() => {
        e.trigger.innerText = "content_copy";
      }, 1000);
    });
    clipboard.on("error", (e) => {
      console.log("copy error", e);
    });
  }
}
