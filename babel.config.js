module.exports = {
  plugins: [
    [
      "@babel/plugin-transform-runtime",
      {
        regenerator: true,
      },
    ],
    [
      "formatjs",
      {
        idInterpolationPattern: "[sha512:contenthash:base64:6]",
        ast: true,
      },
    ],
    [
      "babel-plugin-transform-imports",
      {
        "@mui/material": {
          transform: (importName) => `@mui/material/${importName}`,
          preventFullImport: true,
        },
      },
    ],
  ],
  presets: [
    "@babel/preset-env",
    "@babel/preset-react",
  ],
};
