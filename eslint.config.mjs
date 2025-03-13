import eslint from "@eslint/js";
import eslintConfigPrettier from "eslint-config-prettier";
import pluginVue from "eslint-plugin-vue";
import tseslint from "typescript-eslint";

export default tseslint.config(
	{
		ignores: [".commitlint*", ".husky/*", "eslint.config.mjs", "html/*"],
	},
	eslint.configs.recommended,
	...tseslint.configs.recommended,
	...pluginVue.configs["flat/recommended"],
	{
		plugins: {
			"typescript-eslint": tseslint.plugin,
		},
		languageOptions: {
			globals: {
				console: true,
				document: true,
				localStorage: true,
			},
			parserOptions: {
				parser: tseslint.parser,
				project: "./tsconfig.json",
				extraFileExtensions: [".vue"],
				sourceType: "module",
			},
		},
		rules: {
			"vue/multi-word-component-names": "off",
		},
	},
	eslintConfigPrettier,
);
