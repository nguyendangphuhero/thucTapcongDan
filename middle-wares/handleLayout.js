var categoryRepo = require('../repos/categoryRepo');
var manufacturerRepo = require('../repos/manufacturerRepo');

module.exports = (req, res, next) => {
  if (req.session.isLogged === undefined) {
    req.session.isLogged = false;
  }
  if (req.session.isAdminLogged === undefined) {
    req.session.isAdminLogged = false;
  }
  var q = 0;
  if (req.session.isLogged === true) {
    for (var i = req.session.cart.length - 1; i >= 0; i--) {
      q += req.session.cart[i].Quantity;
    }
  }
  var c = categoryRepo.loadAll();
  var m = manufacturerRepo.loadAll();
  
  
  Promise.all([c, m, q]).then(([catRows, manRows, cartQuantity]) => {
    res.locals.layoutVM = {
      categories: catRows,
      manufacturers: manRows,
      cartQuantity: cartQuantity,
      isLogged: req.session.isLogged,
      isAdminLogged: req.session.isAdminLogged,
      user: req.session.user
    };
    next();
  });
};