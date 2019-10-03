const controller = require("../controllers/main.controller");

module.exports = function(app) {
  app.get("/", controller.main);
  app.get("/login", controller.loginForm);
  app.post("/login", controller.login);
  app.get("/logout", controller.logOut);
  app.get("/register", controller.registerForm);
  app.post('/register', controller.createUser);

  app.post('/newpost/:id', controller.createPost);

  app.get('/friends', controller.getFriends);
  app.get('/user/:id', controller.getUser);
  
  app.post('/like/:user/:id', controller.likePost);
  app.post('/like/del/:user/:id', controller.deleteLike);

};
