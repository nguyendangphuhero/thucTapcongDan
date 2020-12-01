module.exports = (req, res, next) => {
	if (req.session.isLogged === false) {
		next();
	} else {
		res.redirect('/home');
	}
}