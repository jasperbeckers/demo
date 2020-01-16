module.exports = function(api) {
  api.cache(true);
  return {
    presets: [["env", {
      "modules": "commonjs",
      "targets": {
        "browsers": ["> 1%", "last 2 versions", "not ie <= 8"]
      }
    }], 'babel-preset-expo'],
	sourceType: 'unambiguous',
  };
};
