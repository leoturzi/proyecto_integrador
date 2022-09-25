const usersController = {
	login: (req, res) => {
		res.render('users/login', { title: 'Login' });
	},
	register: (req, res) => {
		res.render('users/register', { title: 'Register' });
	},
	processRegister: (req, res) => {
		res.send(req.file);
	},
	userProfile: (req, res) => {
		res.render('users/userProfile', { title: 'Profile' });
	},
};
module.exports = usersController;
