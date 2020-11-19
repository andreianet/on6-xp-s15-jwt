const controller = require('../controllers/userController');
const auth = require('../controllers/authController')


module.exports = app => { 
    app
        .route('/login')
        .post(controller.login)
}