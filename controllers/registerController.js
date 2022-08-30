const registerController = {
    show : (req, res) => {
        res.render('users/register', {title:'Register'});
    }
};
module.exports = registerController;