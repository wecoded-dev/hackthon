module.exports = {
  server: {
    baseDir: "./",
    middleware: [
      function (req, next) {
        const url = req.url;
        if (!url.includes('.') && url !== '/') {
          req.url = `${url}.html`;
        }
        next();
      }
    ]
  }
};
