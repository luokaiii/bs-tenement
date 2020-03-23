const proxy = require("http-proxy-middleware");

module.exports = function(app) {
  app.use(
    proxy("/api", {
      target: process.env.HOST || "http://localhost:8080",
      secure: false,
      autoRewrite: true,
      ws: true,
      logLevel: "debug",
      pathRewrite: {
        "^/api": ""
      }
    })
  );
};
