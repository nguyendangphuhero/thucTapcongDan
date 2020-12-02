var express = require('express');
var productRepo = require('../repos/productRepo'),
	categoryRepo = require('../repos/categoryRepo'),
	manufacturerRepo = require('../repos/manufacturerRepo'),
	orderRepo = require('../repos/orderRepo');
var moment = require('moment');
var restrictAdminNotLogged = require('../middle-wares/restrictAdminNotLogged');

var router = express.Router();

router.get('/', restrictAdminNotLogged, (req, res) => {
	res.redirect('/admin/product/index');
});

router.get('/product', restrictAdminNotLogged, (req, res) => {
	res.redirect('/admin/product/index');
});

router.get('/product/index', restrictAdminNotLogged, (req, res) => {

	var p_arr = [];

	productRepo.loadAll().then(rows => {
		for (var i = 0; i < rows.length; i++) {

			p_arr.push({
				ProID: rows[i].ProID,
				ProName: rows[i].ProName,
				Price: rows[i].Price,
				Sold: rows[i].Sold,
				Quantity: rows[i].Quantity,
				ReceiveDate: moment(rows[i].ReceiveDate).format('YYYY-MM-DD'),
				View: rows[i].View,
				Origin: rows[i].Origin
			});
		}
		var vm = {
			products: p_arr,
			layout: 'admin'
		}

		res.render('admin/product', vm);
	});
});

router.get('/product/add', restrictAdminNotLogged, (req, res) => {

	var p1 = categoryRepo.loadAll();
	var p2 = manufacturerRepo.loadAll();
	Promise.all([p1, p2]).then(([catRows, manRows]) => {
		var vm = {
			categories: catRows,
			manufacturers: manRows,
			layout: 'admin'
		};

		res.render('admin/product/add', vm);
	});
});

router.post('/product/add', (req, res) => {

	var product = {
		ProName: req.body.ProName,
		TinyDes: req.body.TinyDes,
		FullDes: req.body.FullDes,
		Price: req.body.Price,
		Quantity: req.body.Quantity,
		ReceiveDate: req.body.ReceiveDate,
		CatID: req.body.CatID,
		ManID: req.body.ManID,
		Origin: req.body.Origin,
	};

	productRepo.add(product).then(value => {
		res.redirect('/admin/product/index');
	});
});

router.get('/product/edit', restrictAdminNotLogged, (req, res) => {

	var ProID = req.query.id;
	var p1 = productRepo.single(ProID);
	var p2 = categoryRepo.loadAll();
	var p3 = manufacturerRepo.loadAll();

	Promise.all([p1, p2, p3]).then(([proRows, catRows, manRows]) => {
		var p = {
			ProID: proRows[0].ProID,
			ProName: proRows[0].ProName,
			TinyDes: proRows[0].TinyDes,
			FullDes: proRows[0].FullDes,
			Price: proRows[0].Price,
			Quantity: proRows[0].Quantity,
			ReceiveDate: moment(proRows[0].ReceiveDate).format('YYYY-MM-DD'),
			CatID: proRows[0].CatID,
			ManID: proRows[0].ManID,
			Origin: proRows[0].Origin,
		};

		var cats = [];
		for (var i = 0; i < catRows.length; i++) {
			if (catRows[i].CatID === p.CatID) {
				cats.push({
					CatID: catRows[i].CatID,
					CatName: catRows[i].CatName
				});
			}
		}

		for (var i = 0; i < catRows.length; i++) {
			if (catRows[i].CatID != p.CatID) {
				cats.push({
					CatID: catRows[i].CatID,
					CatName: catRows[i].CatName
				});
			}
		}

		var mans = [];
		for (var i = 0; i < manRows.length; i++) {
			if (manRows[i].ManID === p.ManID) {
				mans.push({
					ManID: manRows[i].ManID,
					ManName: manRows[i].ManName
				});			
			}
		}

		for (var i = 0; i < manRows.length; i++) {
			if (manRows[i].ManID != p.ManID) {
				mans.push({
					ManID: manRows[i].ManID,
					ManName: manRows[i].ManName,
				});			
			}
		}

		var vm = {
			product: p,
			categories: cats,
			manufacturers: mans,
			layout: 'admin'
		};

		res.render('admin/product/edit', vm);
	});
});

router.post('/product/edit', (req, res) => {
	var product = {
		ProID: req.body.ProID,
		ProName: req.body.ProName,
		TinyDes: req.body.TinyDes,
		FullDes: req.body.FullDes,
		Price: req.body.Price,
		Quantity: req.body.Quantity,
		ReceiveDate: req.body.ReceiveDate,
		CatID: req.body.CatID,
		ManID: req.body.ManID,
		Origin: req.body.Origin,
	};

	productRepo.update(product).then(value => {
		res.redirect('/admin/product/index');
	});
});

router.get('/product/delete', restrictAdminNotLogged, (req, res) => {
	productRepo.single(req.query.id).then(value => {
		var vm = {
			id: req.query.id,
			name: value[0].ProName,
			layout: 'admin'
		};
		res.render('admin/product/delete', vm);
	});
});

router.post('/product/delete', (req, res) => {
	var ProID = req.body.ProID;
	productRepo.delete(ProID).then(value => {
		res.redirect('/admin/product/index');
	});
});

router.get('/category', restrictAdminNotLogged, (req, res) => {
	res.redirect('/admin/category/index');
});

router.get('/category/index', restrictAdminNotLogged, (req, res) => {
	categoryRepo.loadAll().then(rows => {
		var vm = {
			categories: rows,
			layout: 'admin'
		}

		res.render('admin/category/index', vm);
	});
});

router.get('/category/add', restrictAdminNotLogged, (req, res) => {

	var vm = {
		layout: 'admin'
	};

	res.render('admin/category/add', vm);
});

router.post('/category/add', (req, res) => {
	categoryRepo.add(req.body.CatName).then(value => {
		res.redirect('/admin/category/index');
	});
});

router.get('/category/edit', restrictAdminNotLogged, (req, res) => {

	var CatID = req.query.id;

	var p1 = categoryRepo.single(CatID);
	var p2 = productRepo.countByCat(CatID);
	Promise.all([p1, p2]).then(([catRows, proRows]) => {
		var cat = {
			CatID: catRows[0].CatID,
			CatName: catRows[0].CatName,
			ProCount: proRows[0].total
		};

		var vm = {
			category: cat,
			layout: 'admin'
		};

		res.render('admin/category/edit', vm);
	});
});

router.post('/category/edit', (req, res) => {
	var cat = {
		CatID: req.body.CatID,
		CatName: req.body.CatName
	}
	categoryRepo.update(cat).then(value => {
		res.redirect('/admin/category/index');
	});
});

router.get('/category/delete', restrictAdminNotLogged, (req, res) => {
	var CatID = req.query.id;

	var p1 = categoryRepo.single(CatID);
	var p2 = productRepo.countByCat(CatID);
	Promise.all([p1, p2]).then(([catRows, proRows]) => {
		var cat = {
			CatID: catRows[0].CatID,
			CatName: catRows[0].CatName,
			ProCount: proRows[0].total
		};

		var vm = {
			category: cat,
			canDelete: proRows[0].total==0,
			layout: 'admin'
		};

		res.render('admin/category/delete', vm);
	});
});

router.post('/category/delete', (req, res) => {
	categoryRepo.delete(req.body.CatID).then(value => {
		res.redirect('/admin/category/index');
	});
});

router.get('/manufacturer', restrictAdminNotLogged, (req, res) => {
	res.redirect('/admin/manufacturer/index');
});

router.get('/manufacturer/index', restrictAdminNotLogged, (req, res) => {
	manufacturerRepo.loadAll().then(rows => {
		var vm = {
			manufacturers: rows,
			layout: 'admin'
		}
		res.render('admin/manufacturer/index', vm);
	});
});

router.get('/manufacturer/add', restrictAdminNotLogged, (req, res) => {
	var vm = {
		layout: 'admin'
	};

	res.render('admin/manufacturer/add', vm);
});

router.post('/manufacturer/add', (req, res) => {
	manufacturerRepo.add(req.body.ManName).then(value => {
		res.redirect('/admin/manufacturer/index');
	});
});

router.get('/manufacturer/edit', restrictAdminNotLogged, (req, res) => {

	var ManID = req.query.id;

	var p1 = manufacturerRepo.single(ManID);
	var p2 = productRepo.countByMan(ManID);
	Promise.all([p1, p2]).then(([manRows, proRows]) => {
		var man = {
			ManID: manRows[0].ManID,
			ManName: manRows[0].ManName,
			ProCount: proRows[0].total
		};

		var vm = {
			manufacturer: man,
			layout: 'admin'
		};

		res.render('admin/manufacturer/edit', vm);
	});
});

router.post('/manufacturer/edit', (req, res) => {
	var man = {
		ManID: req.body.ManID,
		ManName: req.body.ManName
	}
	manufacturerRepo.update(man).then(value => {
		res.redirect('/admin/manufacturer/index');
	});
});

router.get('/manufacturer/delete', restrictAdminNotLogged, (req, res) => {
	var ManID = req.query.id;

	var p1 = manufacturerRepo.single(ManID);
	var p2 = productRepo.countByMan(ManID);
	Promise.all([p1, p2]).then(([manRows, proRows]) => {
		var man = {
			ManID: manRows[0].ManID,
			ManName: manRows[0].ManName,
			ProCount: proRows[0].total
		};

		var vm = {
			manufacturer: man,
			canDelete: proRows[0].total==0,
			layout: 'admin'
		};

		res.render('admin/manufacturer/delete', vm);
	});
});

router.post('/manufacturer/delete', (req, res) => {
	manufacturerRepo.delete(req.body.ManID).then(value => {
		res.redirect('/admin/manufacturer/index');
	});
});

router.get('/order', restrictAdminNotLogged, (req, res) => {
	res.redirect('/admin/order/index');
});

router.get('/order/index', restrictAdminNotLogged, (req, res) => {

	var o_arr = [];

	orderRepo.loadAll().then(rows => {

		for (var i = 0; i < rows.length; i++) {
			var stt = '';
			var cls = '';
			if (rows[i].State === 0) {
				stt = 'Chưa giao';
				cls = 'danger';
			} else if (rows[i].State === 1) {
				stt = 'Đang giao';
				cls = 'warning';
			} else if (rows[i].State === 2) {
				stt= 'Đã giao';
				cls = 'success';
			}

			o_arr.push({
				OrderID: rows[i].OrderID,
				OrderDate: moment(rows[i].OrderDate).format('DD/MM/YYYY HH:mm:ss'),
				UserID: rows[i].UserID,
				Total: rows[i].Total,
				State: stt,
				Class: cls
			});
		}

		var vm = {
			orders: o_arr,
			layout: 'admin'
		}

		res.render('admin/order/index', vm);
	});
});

router.get('/order/edit', restrictAdminNotLogged, (req, res) => {

	orderRepo.single(req.query.id).then(rows => {

		var o = {
			OrderID: rows[0].OrderID,
			OrderDate: moment(rows[0].OrderDate).format("DD/MM/YYYY HH:mm:ss"),
			UserID: rows[0].UserID,
			Total: rows[0].Total,
			State: rows[0].State
		}

		var stt = [];

		if (rows[0].State === 0) {
			stt.push({
				stt: 0,
				sttString: 'Chưa giao'
			});
			stt.push({
				stt: 1,
				sttString: 'Đang giao'
			});
			stt.push({
				stt: 2,
				sttString: 'Đã giao'
			});
		} else if (rows[0].State === 1) {
			stt.push({
				stt: 1,
				sttString: 'Đang giao'
			});
			stt.push({
				stt: 2,
				sttString: 'Đã giao'
			});
			stt.push({
				stt: 0,
				sttString: 'Chưa giao'
			});
		} else if (rows[0].State === 2) {
			stt.push({
				stt: 2,
				sttString: 'Đã giao'
			});
			stt.push({
				stt: 0,
				sttString: 'Chưa giao'
			});
			stt.push({
				stt: 1,
				sttString: 'Đang giao'
			});
		}

		var vm = {
			order: o,
			states: stt,
			layout: 'admin'
		};

		res.render('admin/order/edit', vm);
	});
});

router.post('/order/edit', (req, res) => {
	var OrderID = req.body.OrderID;
	var State = req.body.State;

	orderRepo.update(OrderID, State).then(value => {
		res.redirect('/admin/order/index');
	});

});

module.exports = router;