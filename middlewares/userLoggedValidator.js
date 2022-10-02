const User = require('../models/User');

function guestValidator(req, res, next) {
	// res.locals.isLogged = false;

	const emailInCookie = req.cookies.userEmail;
	console.log(emailInCookie);
	// buscamos en nuestra db
	const userFromCookie = User.findByField('email', emailInCookie);

	req.session.userLogged = userFromCookie;

	// if (userFromCookie) {
	// 	delete userFromCookie.password;
	// 	req.session.userLogged = userFromCookie;
	// 	res.locals.isLogged = true;
	// 	res.locals.userLogged = req.session.userLogged;
	// }
	next();
}

module.exports = guestValidator;
