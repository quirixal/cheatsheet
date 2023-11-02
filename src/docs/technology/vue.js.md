[description]: <> (Web-framework)
[preservedKeywords]: <> (web, vue.js, html, css, js, sass, useful scripts, scripts, script collection)

# Vue.js

## What is Vue.js?

Vue (pronounced like **view**) is a JavaScript framework for building user interfaces. It builds on top of standard HTML, CSS, and JavaScript and provides a declarative and component-based programming model that helps you efficiently develop user interfaces, be they simple or complex.

## Useful snippets

### Load variables.scss / variables.sass

```js
// vite.config.js
import ...

// https://vitejs.dev/config/
export default defineConfig({
    // ...
    css: {
        preprocessorOptions: {
            scss: {
                additionalData: '@import "./path/to/variables.scss";',
            },
        },
    },
});
```

## Used resources

- [Vue website](https://vuejs.org/guide/introduction.html#what-is-vue) (November 29th, 2022)
