/* eslint-env node */
require("@rushstack/eslint-patch/modern-module-resolution");

module.exports = {
    root: true,
    extends: ["plugin:vue/vue3-essential", "eslint:recommended", "@vue/eslint-config-prettier"],
    parserOptions: {
        ecmaVersion: "latest",
    },
    rules: {
        "no-unused-vars": "off",
        "no-useless-escape": "off",
        "vue/no-mutating-props": "off",
        "vue/prefer-import-from-vue": "off",
    },
};
