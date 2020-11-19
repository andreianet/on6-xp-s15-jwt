const controller = require('../controllers/accountController');
const authController = require('../controllers/authController');



module.exports = app => {
    /*app.route('/accounts').get( passport.authenticate('bearer',{session: false}), //confere se é autenticado
        controller.get
    );*/
    app.route('/accounts').get(authController.bearer, controller.get);
    app.route('/accounts/create').post(controller.add);
    app.route('/accounts/remove/:id').delete(controller.remove);
    app.route('/accounts/edit/:id').patch(controller.edit);
};