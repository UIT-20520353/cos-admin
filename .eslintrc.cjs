const path = require("path");

module.exports = {
  env: { browser: true, es2020: true, node: true },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react-hooks/recommended",
    "plugin:react/recommended",
    "plugin:import/recommended",
    "plugin:import/typescript",
    "plugin:jsx-a11y/recommended",
    // Disable các rule mà eslint xung đột với prettier.
    // Để cái này ở dưới để nó override các rule phía trên!.
    "eslint-config-prettier",
    "prettier"
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: { ecmaVersion: "latest", sourceType: "module" },
  plugins: ["react-refresh", "prettier"],
  rules: {
    "import/export": 0,
    "react-refresh/only-export-components": "warn",
    "react/react-in-jsx-scope": "off",
    "react/jsx-no-target-blank": "warn",
    "prettier/prettier": [
      "warn",
      {
        arrowParens: "always",
        semi: true,
        trailingComma: "none",
        tabWidth: 2,
        endOfLine: "auto",
        useTabs: false,
        singleQuote: false,
        printWidth: 120,
        jsxSingleQuote: false
      }
    ]
  },
  settings: {
    react: {
      // Nói eslint-plugin-react tự động biết version của React.
      version: "detect"
    },
    // Nói ESLint cách xử lý các import
    "import/resolver": {
      node: {
        paths: [path.resolve(__dirname, "")],
        extensions: [".js", ".jsx", ".ts", ".tsx"]
      },
      typescript: {
        project: path.resolve(__dirname, "./tsconfig.json")
      }
    }
  }
};
