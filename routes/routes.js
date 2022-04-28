module.exports = function(app) {
  
    const authController = require("../controllers/authController");
    // const userController = require("../controllers/userController");
    // const articleController = require("../controllers/articleController");
    // const ticketController = require("../controllers/ticketController");
  
    const {
      validateRegister,
      validateLogin
    } = require("../validators/userValidators");
  
    // const auth = require('../middleware/auth');
  
    const awaitHandlerFactory = require("../middleware/awaitHandlerFactory");
  
    //auth routes
    app.post('/auth/register', 
        validateRegister,
        awaitHandlerFactory(authController.createUserWithEmail)
    );
  
    app.post('/auth/login',
      validateLogin,
      awaitHandlerFactory(authController.userLoginWithEmail)
    );
  
    // // article routes
    // app.get('/article', auth(), articleController.listAll);
    // app.get('/article/:id', auth(),articleController.getObjectById);
  
    // // user routes
    // app.get('/user', auth(), userController.listAll);
    // app.get('/user/:id', auth(),userController.getObjectById);
  
    // // ticket routes
    // app.get('/ticket', auth(), ticketController.listAll);
    // app.get('/ticket/:id', auth(), ticketController.getObjectById);
};
  