const loginController = {
    show : (req, res) => {
        res.render('users/login',{title:'Login'});
    }
};
module.exports = loginController;