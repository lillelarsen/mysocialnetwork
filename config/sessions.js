const session = require("express-session");

module.exports = function(app) {
  app.use(
    session({
      resave: true,
      saveUninitialized: false,
      secret: SESSION_SECRET
    })
  );
};
