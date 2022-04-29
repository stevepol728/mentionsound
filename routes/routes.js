const auth = require('../middleware/auth');

module.exports = function(app) {
  
    const authController = require("../controllers/authController");
  
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
    
    app.post('/auth/updateprofile',
      awaitHandlerFactory(authController.profileUpdate)
    );

    app.delete('/auth/deleteAccount', auth(),
      awaitHandlerFactory(authController.deleteAccount)
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
  