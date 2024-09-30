import eslint from "@eslint/js" // ESLint core functionality
import typescriptEslint from "@typescript-eslint/eslint-plugin" // TypeScript-specific ESLint rules
import typescriptEslintParser from "@typescript-eslint/parser" // TypeScript parser
import eslintConfigPrettier from "eslint-config-prettier" // Disables ESLint rules that conflict with Prettier
import eslintPluginImport from "eslint-plugin-import" // Linting rules for import/export statements
import eslintPluginPrettier from "eslint-plugin-prettier" // Runs Prettier as an ESLint rule
import globals from "globals" // Defines global variables for ESLint

// Export the ESLint configuration
const config = [
    // Use ESLint's recommended configuration
    eslint.configs.recommended,

    // Exclude specific directories and files from linting
    {
        ignores: [".cache/**/*", "node_modules/**/*", "public/**/*"],
    },

    // Main ESLint configuration
    {
        // Specify file types to which this configuration applies
        files: ["**/*.{cjs,cts,js,jsx,mjs,mts,ts,tsx}"],

        // Language options configuration
        languageOptions: {
            ecmaVersion: 2022, // ECMAScript version to use
            sourceType: "module", // Use module system
            parser: typescriptEslintParser, // Use TypeScript parser
            parserOptions: {
                ecmaFeatures: {
                    jsx: true, // Enable JSX syntax support
                },
                project: "./tsconfig.json", // Path to TypeScript configuration file
            },
            // Global variable settings
            globals: {
                ...globals.browser, // Global variables for browser environment
                ...globals.node, // Global variables for Node.js environment
                ...globals.es2022, // Global variables for ES2022
                JSX: "readonly", // Add JSX as a global variable (read-only)
                React: "readable", // Add React as a global variable (read-only)
                Queries: "readonly", // Add Gatsby's Queries as a global variable
            },
        },

        // Plugin configuration
        plugins: {
            "@typescript-eslint": typescriptEslint, // TypeScript linting
            "import": eslintPluginImport, // import/export statement linting
            "prettier": eslintPluginPrettier, // Prettier integration
        },

        // ESLint rule configuration
        rules: {
            // TypeScript-related rules
            ...typescriptEslint.configs["recommended"].rules, // Apply recommended TypeScript rules
            "@typescript-eslint/explicit-module-boundary-types": "off", // Disable explicit module boundary types check
            "@typescript-eslint/no-explicit-any": "warn", // Warn when using 'any' type
            "@typescript-eslint/no-unused-vars": [
                "warn",
                { argsIgnorePattern: "^_" }, // Warn on unused variables, ignore those starting with '_'
            ],

            // Prettier-related rules
            ...eslintConfigPrettier.rules, // Disable ESLint rules that conflict with Prettier
            "prettier/prettier": ["error", { endOfLine: "auto" }], // Treat Prettier rules as errors, auto-detect line endings

            // Basic ESLint rules
            "no-console": ["warn", { allow: ["warn", "error"] }], // Warn on console use, allow warn and error

            // Import-related rules
            "import/order": [
                "error",
                {
                    "alphabetize": {
                        order: "asc", // Sort in ascending order
                        caseInsensitive: true, // Case-insensitive sorting
                    },
                    "newlines-between": "always", // Add empty lines between groups
                    "groups": [
                        "builtin", // Node.js built-in modules
                        "external", // npm packages
                        "internal", // Internal project modules
                        "parent", // Modules from parent directory
                        "sibling", // Modules from the same directory
                        "index", // Index file of the current directory
                    ],
                },
            ],
        },

        // Additional settings
        settings: {
            react: {
                version: "detect", // Auto-detect React version
            },
        },
    },
]

export default config
