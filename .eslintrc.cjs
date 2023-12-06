module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:vue/vue3-essential",
    "prettier",
  ],
  overrides: [
    {
      env: {
        node: true,
      },
      files: [".eslintrc.{js,cjs}"],
      parserOptions: {
        sourceType: "script",
      },
    },
  ],
  parserOptions: {
    ecmaVersion: "latest",
    parser: "@typescript-eslint/parser",
    sourceType: "module",
  },
  plugins: ["@typescript-eslint", "vue"],
  // Eslint 代码规范，0代表忽略，1代表警告，2代表报错
  rules: {
    // 在 vue 文件的 script 代码中只能使用单引号
    "vue/singleline-html-element-content-newline": "off",
    // 允许使用 any 类型
    "@typescript-eslint/no-explicit-any": "off",
  },
};
