module.exports = (req, res, next) => {
	if (req.session.isLogged === true) {
		if (req.session.user.f_Permission === 1) {
			next();
		} else {
			res.redirect('/home');
		}
	} else {
		res.redirect(`/account/login?retUrl=${req.originalUrl}`);
	}
}