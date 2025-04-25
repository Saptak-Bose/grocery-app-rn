module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      [
        "module-resolver",
        {
          root: ["./src"],
          extensions: [
            ".ios.ts",
            ".android.ts",
            ".ts",
            ".ios.tsx",
            ".android.tsx",
            ".tsx",
            ".js",
            ".jsx",
            ".json",
          ],
          alias: {
            "@assets": "./src/assets",
            "@features": "./src/features",
            "@navigation": "./src/navigation",
            "@components": "./src/components",
            "@styles": "./src/styles",
            "@service": "./src/service",
            "@state": "./src/state",
            "@utils": "./src/utils",
          },
        },
      ],
      "react-native-reanimated/plugin",
    ],
  };
};
