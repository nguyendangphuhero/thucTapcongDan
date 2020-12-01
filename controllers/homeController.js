var express = require('express');
var productRepo = require('../repos/productRepo');
var cartRepo = require('../repos/cartRepo');

var router = express.Router();

router.get('/', (req, res) => {
	var p1 = productRepo.loadLastestProducts();
	var p2 = productRepo.loadMostBuyProducts();
	var p3 = productRepo.loadMostViewProducts();
	Promise.all([p1, p2, p3]).then(([p1Rows, p2Rows, p3Rows]) => {
		if (p1Rows.length === 0) {
			var vm = {
				noProduct: true
			};
			res.render('home/index', vm);
		} else {
			var vm = {
				lastestProducts: p1Rows,
				mostBuyProducts: p2Rows,
				mostViewProducts: p3Rows
			};
			res.render('home/index', vm);
		}
	}).catch(err => {
		res.render('error/processingError');
	});
});

router.post('/', (req, res) => {
	var p1 = productRepo.loadLastestProducts();
	var p2 = productRepo.loadMostBuyProducts();
	var p3 = productRepo.loadMostViewProducts();
	var p4 = productRepo.single(req.body.proId);
	Promise.all([p1, p2, p3, p4]).then(([p1Rows, p2Rows, p3Rows, p4Rows]) => {
		if (p4Rows.length > 0) {
			if (p4Rows[0].Quantity === 0) {
				var vm = {
					isAlert: true,
					alertMessage: "Sản phẩm tạm hết hàng!",
					lastestProducts: p1Rows,
					mostBuyProducts: p2Rows,
					mostViewProducts: p3Rows
				};
				res.render('home/index', vm);
			} else {
				var item = {
					ProId: req.body.proId,
					Quantity: 1
				};
				cartRepo.add(req.session.cart, item);
				var vm = {
					isAlert: true,
					alertMessage: "Đã thêm sản phẩm vào giỏ hàng!",
					lastestProducts: p1Rows,
					mostBuyProducts: p2Rows,
					mostViewProducts: p3Rows
				};
				res.render('home/index', vm);
			}
		} else {
			var vm = {
				isAlert: true,
				alertMessage: "Không tìm thấy sản phẩm!",
				lastestProducts: p1Rows,
				mostBuyProducts: p2Rows,
				mostViewProducts: p3Rows
			};
			res.render('home/index', vm);
		}
	}).catch(err => {
		res.render('error/processingError');
	});       
});

module.exports = router;