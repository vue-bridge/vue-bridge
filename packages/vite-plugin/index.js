"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const plugin_vue_1 = require("@vitejs/plugin-vue");
const vite_plugin_vue2_1 = require("vite-plugin-vue2");
const vue_demi_1 = require("vue-demi");
function viteVueCompatPlugin(_options) {
    const { vue2PluginOptions = {}, vue3PluginOptions = {}, ...options } = _options;
    const vueCompatPlugin = createVueCompatPlugin(options);
    const _version = process.env.BUILD_TARGET_VUE === '2' ? 2 : null;
    const version = (_version !== null && _version !== void 0 ? _version : vue_demi_1.isVue2) ? 2 : 3;
    const vuePlugin = version === 2 ? vite_plugin_vue2_1.createVuePlugin(vue2PluginOptions) : plugin_vue_1.default(vue3PluginOptions);
    return [vueCompatPlugin, vuePlugin];
}
exports.default = viteVueCompatPlugin;
function createVueCompatPlugin(options) {
    const compatPlugin = {
        name: 'vue3-compat',
        // @ts-expect-error
        config(config) {
            var _a, _b;
            const mode = process.env.BUILD_TARGET_VUE || options.mainMode;
            const baseFileName = (_b = (((_a = config.build) === null || _a === void 0 ? void 0 : _a.lib) && config.build.lib.fileName)) !== null && _b !== void 0 ? _b : 'index';
            const fileName = mode === options.mainMode
                ? baseFileName
                : `vue${options.mainMode}/${baseFileName}`;
            return {
                build: {
                    lib: {
                        fileName,
                    },
                    rollupOptions: {
                        external: ['@vue-bridge/runtime'],
                    },
                },
                resolve: {
                    alias: {
                        vue: mode === 2 ? 'vue2' : 'vue',
                    },
                },
            }; // as UserConfig
        },
    };
    return compatPlugin;
}
