import vue from "@vitejs/plugin-vue";
import { resolve } from "path";
import { defineConfig } from "vite";
import { createHtmlPlugin } from "vite-plugin-html";
import { viteSingleFile } from "vite-plugin-singlefile";

export default defineConfig({
	build: {
		emptyOutDir: true,
		outDir: resolve(__dirname, "..", "html"),
		rollupOptions: {
			input: {
				index: resolve(__dirname, "index.html"),
			},
		},
		target: "esnext",
	},
	plugins: [
		createHtmlPlugin({ minify: true }),
		viteSingleFile({ removeViteModuleLoader: true }),
		vue(),
	],
	resolve: {
		alias: {
			"@": resolve(__dirname),
		},
	},
	server: {
		cors: true,
	},
});
