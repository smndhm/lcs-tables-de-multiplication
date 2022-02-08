module.exports = {
  pluginOptions: {
    i18n: {
      locale: "en",
      fallbackLocale: "en",
      localeDir: "locales",
      enableLegacy: false,
      runtimeOnly: false,
      compositionOnly: false,
      fullInstall: true,
    },
  },
  pwa: {
    name: "Multiplications",
    themeColor: "#000000",
    msTileColor: "#000000",
    workboxOptions: {
      skipWaiting: true,
      clientsClaim: true,
    },
  },
};
