module.exports = {
  "root": "true",
  "extends": "airbnb",
  "plugins": [],
  "rules": {
    "func-names": "off",

    // doesn't work in node v4 :(
    "strict": "off",
    "prefer-rest-params": "off",
    "react/require-extension": "off",
    "import/no-extraneous-dependencies": "off",
    "consistent-return": "off",
    "no-console": "off",
    "object-shorthand": "off"
  },
  "env": {
    "node": true
  }
};
