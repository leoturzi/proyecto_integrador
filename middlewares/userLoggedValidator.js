const User = require('../utils/User');

function userLoggedValidator(req, res, next) {
	res.locals.isLogged = false;
	if (req.session.userLogged) {
		res.locals.isLogged = true;
		next();
	} else if (req.cookies.userEmail) {
		const emailInCookie = req.cookies.userEmail;

		// buscamos en nuestra db
		const userFromCookie = User.findByField('email', emailInCookie);
		res.locals.isLogged = true;
		req.session.userLogged = userFromCookie;

		next();
	} else {
		next();
	}
}

module.exports = userLoggedValidator;
