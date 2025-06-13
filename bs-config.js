module.exports = {
  server: {
    baseDir: "./",
    middleware: [
      function (req, res, next) {
        try {
          const url = req.url;
          if (!url.includes('.') && url !== '/') {
            req.url = `${url}.html`;
          }
          return next();
        } catch (err) {
          return next(err);
        }
      }
    ]
  }
};