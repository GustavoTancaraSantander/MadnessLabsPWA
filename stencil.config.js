exports.config = {
  "bundles": [
    {
      "components": [
        "my-app",
        "app-home",
        "app-apps",
        "app-card",
        "madness-footer"
      ]
    },
    {
      "components": [
        "app-profile"
      ]
    },
    {
      "components": [
        "lazy-img"
      ]
    }
  ],
  "collections": [
    {
      "name": "@stencil/router"
    },
    {
      "name": "@ionic/core"
    }
  ],
  "serviceWorker": {
    "swSrc": "src/sw.js"
  },
  "globalStyle": "src/global/app.css"
};

exports.devServer = {
  root: 'www',
  watchGlob: '**/**'
};
