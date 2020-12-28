var express = require('express');
var moment = require('moment');

var cartRepo = require('../repos/cartRepo');
var productRepo = require('../repos/productRepo');
var orderRepo = require('../repos/orderRepo');
var restrictNotLogged = require('../middle-wares/restrictNotLogged');
var restrictEmptyCart = require('../middle-wares/restrictEmptyCart');

var router = express.Router();

router.get('/', restrictNotLogged, (req, res) => {
	if (req.session.cart.length === 0) {
        var vm = {
            isEmpty: true
        };
        res.render('cart/index', vm);
    } else {
        var arr_p = [];
        for (var i = 0; i < req.session.cart.length; i++) {
            var cartItem = req.session.cart[i];
            var p = productRepo.single(cartItem.ProId);
            arr_p.push(p);
        }

        var items = [];
        var sumAmount = 0;
        Promise.all(arr_p).then(result => {
            for (var i = result.length - 1; i >= 0; i--) {
                var pro = result[i][0];
                var item = {
                    Product: pro,
                    Quantity: req.session.cart[i].Quantity,
                    Amount: pro.Price * req.session.cart[i].Quantity
                };
                items.push(item);
                sumAmount += item.Amount;
            }

            var vm = {
                isEmpty: false,
                items: items,
                sumAmount: sumAmount
            };

            res.render('cart/index', vm);
        });
    }
});

router.post('/increase', (req, res) => {
    var item = {
        ProId: req.body.proId,
        Quantity: 1
    };
    cartRepo.add(req.session.cart, item);
    res.redirect(req.headers.referer);
});

router.post('/decrease', (req, res) => {
	var item = {
		ProId: req.body.proId,
	};
	cartRepo.decrease(req.session.cart, item);
	res.redirect(req.headers.referer);
});

router.post('/remove', (req, res) => {
	cartRepo.remove(req.session.cart, req.body.proId);
	res.redirect(req.headers.referer);
});

router.post('/', restrictEmptyCart, (req, res) => {
    var products = [];
    for (var i = 0; i < req.session.cart.length; i++) {
        var p = productRepo.single(req.session.cart[i].ProId);
        products.push(p);
    }
    Promise.all(products).then(products => {
        var arr_err = [];
        var items = [];
        var sumAmount = 0;
        for (var i = 0; i < req.session.cart.length; i++) {
            var pro = products[i][0];
            if (products[i][0].Active === 0) {
                var err = pro.ProName + " tạm ngừng kinh doanh, vui lòng quay lại sau!";
                arr_err.push(err);
            } else if (req.session.cart[i].Quantity > products[i][0].Quantity) {
                var err = pro.ProName + " còn " + products[i][0].Quantity + " sản phẩm, vui lòng quay lại sau!";
                arr_err.push(err);
            }
            var item = {
                Product: pro,
                Quantity: req.session.cart[i].Quantity,
                Amount: pro.Price * req.session.cart[i].Quantity
            };
            items.push(item);
            sumAmount += item.Amount;
        }
        Promise.all([arr_err, items, sumAmount]).then(([errors, items, sumAmount]) => {
            if (errors.length > 0) {
                var vm = {
                    isEmpty: false,
                    isError: true,
                    errorMessage: errors[0],
                    items: items,
                    sumAmount: sumAmount
                };
                res.render('cart/index', vm);
            } else {
                var order = {
                    orderDate: moment(new Date()).format('YYYY-MM-DDTHH:mm:ss'),
                    userId: req.session.user.f_ID,
                    total: sumAmount,
                    state: 0
                };
                orderRepo.add(order).then(value => {
                    orderRepo.getLastestOrderIDByUserID(req.session.user.f_ID).then(rows => {
                        if (rows.length > 0) {
                            var orderId = rows[0].OrderID;
                            for (var i = req.session.cart.length - 1; i >= 0; i--) {
                                var cartItem = req.session.cart[i];
                                var products = productRepo.single(req.session.cart[i].ProId);
                                Promise.all([orderId, cartItem, products]).then(([orderId, cartItem, products]) => {
                                    if (products.length > 0 && products[0].Quantity >= cartItem.Quantity) {
                                        var pro = {
                                            proId: products[0].ProID,
                                            sold: products[0].Sold + cartItem.Quantity,
                                            quantity: products[0].Quantity - cartItem.Quantity
                                        };
                                        productRepo.updateQuantity(pro);

                                        var orderDetail = {
                                            orderId: orderId,
                                            proId: cartItem.ProId,
                                            quantity: cartItem.Quantity,
                                            price: products[0].Price,
                                            amount: cartItem.Quantity * products[0].Price
                                        };
                                        orderRepo.addDetail(orderDetail);
                                    }
                                });
                            }
                            cartRepo.removeAll(req.session.cart);
                            var vm = {
                                isEmpty: true,
                                isOrderSuccess: true
                            };
                            res.render('cart/index', vm);
                        } else {
                            res.render('error/processingError');
                        }
                    });
                });
            }
        });
    });
});

module.exports = router;
