module.exports = (req, res, next) => {
	if (req.session.cart.length > 0) {
		next();
	} else {
		res.redirect('/cart');
	}
}