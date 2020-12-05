var express = require('express');
var SHA256 = require('crypto-js/sha256');
var moment = require('moment');

var accountRepo = require('../repos/accountRepo');
var orderRepo = require('../repos/orderRepo');
var productRepo = require('../repos/productRepo');
var restrictLogged = require('../middle-wares/restrictLogged');
var restrictNotLogged = require('../middle-wares/restrictNotLogged');

var router = express.Router();

router.get('/register', restrictLogged, (req, res) => {
	res.render('account/register');
});

router.post('/register', (req, res) => {
	accountRepo.get(req.body.username).then(rows => {
		if (rows.length > 0) {
			var error = "Tên đăng nhập đã được sử dụng!";
			var vm = {
				username: req.body.username,
				password: req.body.password,
				retype: req.body.retype,
				name: req.body.name,
				email: req.body.email,
				dob: req.body.dob,
				usernameErrorMessage: error
			};
			res.render('account/register', vm);
		} else {
			var arr_errorMessage = [];
			var arr_isError = [];
			if (req.body.username.length < 4 || req.body.username.length > 32) {
				var error = "Tên đăng nhập gồm 4-32 kí tự!";
				arr_errorMessage.push(error);
				arr_isError.push(true);
			} else if (!req.body.username.match(/^[A-Za-z0-9_]{4,32}$/)) {
				var error = "Tên đăng nhập chỉ bao gồm chữ, số và dấu _";
				arr_errorMessage.push(error);
				arr_isError.push(true);
			} else {
				var error = "";
				arr_errorMessage.push(error);
			}
			if (req.body.password.length < 4 || req.body.password.length > 32) {
				var error = "Mật khẩu gồm 4-32 kí tự!";
				arr_errorMessage.push(error);
				arr_isError.push(true);
			} else {
				var error = "";
				arr_errorMessage.push(error);
			}
			if (req.body.retype.length === 0) {
				var error = "Chưa nhập lại mật khẩu!";
				arr_errorMessage.push(error);
				arr_isError.push(true);
			} else if (req.body.password.indexOf(req.body.retype)===-1 || req.body.retype.indexOf(req.body.password)===-1) {
				var error = "Nhập lại mật khẩu không trùng khớp!";
				arr_errorMessage.push(error);
				arr_isError.push(true);
			} else {
				var error = "";
				arr_errorMessage.push(error);
			}
			if (req.body.name.length === 0) {
				var error = "Chưa nhập họ tên!";
				arr_errorMessage.push(error);
				arr_isError.push(true);
			} else if (req.body.name.length > 50) {
				var error = "Họ tên tối đa 50 kí tự!";
				arr_errorMessage.push(error);
				arr_isError.push(true);
			} else {
				var error = "";
				arr_errorMessage.push(error);
			}
			if (req.body.email.length === 0) {
				var error = "Chưa nhập email!";
				arr_errorMessage.push(error);
				arr_isError.push(true);
			} else if (req.body.email.length > 50) {
				var error = "Email tối đa 50 kí tự!";
				arr_errorMessage.push(error);
				arr_isError.push(true);
			} else {
				var error = "";
				arr_errorMessage.push(error);
			}
			if (req.body.dob.length === 0) {
				var error = "Chưa nhập ngày sinh!";
				arr_errorMessage.push(error);
				arr_isError.push(true);
			} else if (!moment(req.body.dob, 'D/M/YYYY').isValid()
				||  new Date(moment(req.body.dob, 'D/M/YYYY').format('YYYY-MM-DD')).getTime()>new Date().getTime()) {
				var error = "Ngày sinh không hợp lệ!";
				arr_errorMessage.push(error);
				arr_isError.push(true);
			} else {
				var error = "";
				arr_errorMessage.push(error);
			}
			Promise.all([arr_errorMessage, arr_isError]).then(([errorMessages, isErrors]) => {
				if (isErrors.length === 0) {
					var user = {
						username: req.body.username,
						password: SHA256(req.body.password).toString(),
						name: req.body.name,
						email: req.body.email,
						dob: moment(req.body.dob, 'D/M/YYYY').format('YYYY-MM-DD'),
						permission: 0
					};
					accountRepo.add(user).then(value => {
						var vm = {
							isSuccess: true
						};
						res.render('account/register', vm);
					}).catch(err => {
						var vm = {
							isFail: true
						};
						res.render('account/register', vm);
					});
				} else {
					var vm = {
						username: req.body.username,
						password: req.body.password,
						retype: req.body.retype,
						name: req.body.name,
						email: req.body.email,
						dob: req.body.dob,
						usernameErrorMessage: errorMessages[0],
						passwordErrorMessage: errorMessages[1],
						retypeErrorMessage: errorMessages[2],
						nameErrorMessage: errorMessages[3],
						emailErrorMessage: errorMessages[4],
						dobErrorMessage: errorMessages[5]
					};
					res.render('account/register', vm);
				}
			}).catch(err => {
				var vm = {
					isFail: true
				};
				res.render('account/register', vm);
			});
		}
	}).catch(err => {
		var vm = {
			isFail: true
		};
		res.render('account/register', vm);
	});
});

router.get('/login', restrictLogged, (req, res) => {
	res.render('account/login');
});

router.post('/login', (req, res) => {
	var user = {
		username: req.body.username,
		password: SHA256(req.body.password).toString()
	}

	accountRepo.login(user).then(rows => {
		if (rows.length > 0) {
			req.session.isLogged = true;
			req.session.user = rows[0];
			req.session.cart = [];

			var url = '/';
			if (req.query.retUrl) {
				url = req.query.retUrl;
			}
			
			var permission = rows[0].f_Permission;
			if (permission === 0) {
				res.redirect(url);
			} else {
				req.session.isAdminLogged = true;
				res.redirect('/admin');
			}
		} else {
			var vm = {
				isFail: true,
				errorMessage: 'Tài khoản hoặc mật khẩu không đúng!'
			};
			res.render('account/login', vm);
		}
	}).catch(err => {
		var vm = {
			isFail: true,
			errorMessage: 'Lỗi đăng nhập!'
		};
		res.render('account/login', vm);
	});
});

router.get('/order', restrictNotLogged, (req, res) => {
	orderRepo.loadAllByUserID(req.session.user.f_ID).then(rows => {
		if (rows.length === 0) {
			var vm = {
				isEmpty: true
			};
			res.render('account/order', vm);
		} else {
			var arr_d = [];
			for (var i = 0; i < rows.length; i++) {
				var details = orderRepo.loadAllDetailByOrderID(rows[i].OrderID);
				arr_d.push(details);
			}
			var ordersDetails = Promise.all(arr_d).then(arr_d => {
				return arr_d;
			});
			Promise.all([rows, ordersDetails]).then(([orders,ordersDetails]) => {
				var arr_orders = [];
				for (var i = 0; i < orders.length; i++) {
					var state;
					if (orders[i].State === 0) {
						state = "Chưa giao hàng";
					} else if (orders[i].Status === 1) {
						state = "Đang giao hàng";
					} else {
						state = "Đã giao hàng";
					}
					var order = {
						OrderID: orders[i].OrderID,
						OrderDate: moment(orders[i].OrderDate).format('DD/MM/YYYY'),
						Total: orders[i].Total,
						State: state,
						OrderDetails: ordersDetails[i]
					};
					arr_orders.push(order);
				}
				Promise.all(arr_orders).then(orders => {
					var vm = {
						orders: orders
					};
					res.render('account/order', vm);
				});		
			});
		}
	});
});

router.get('/profile', restrictNotLogged, (req, res) => {
	var id = req.session.user.f_ID;
	accountRepo.single(id).then(rows => {
		var p = {
			name: rows[0].f_Name,
			email: rows[0].f_Email,
			dob: moment(rows[0].f_DOB).format("YYYY-MM-DD")
		}

		var vm = {
			profile: p
		}
		res.render('account/profile', vm);
	});
});

router.post('/profile', (req, res) => {
	var id = req.session.user.f_ID;
	var name = req.body.name;
	var email = req.body.email;
	var dob = req.body.dob;

	accountRepo.update(id, name, email, dob).then(value => {
		res.redirect('/account/order');
	});

});

router.get('/changepassword', restrictNotLogged, (req, res) => {
	res.render('account/changepassword');
});

router.post('/changepassword', (req, res) => {
	var cur_password = req.body.cur_password;
	var new_password = req.body.new_password;
	var confirm_password = req.body.confirm_password;
	if (SHA256(cur_password).toString() != req.session.user.f_Password) {
		var vm = {
			isAlert: true,
			message: 'Mật khẩu hiện tại không đúng.'
		};
		res.render('account/changepassword', vm);
	} else if (new_password.length < 4) {
		var vm = {
			isAlert: true,
			message: 'Mật khẩu quá ngắn.'
		};
		res.render('account/changepassword', vm);
	} else if (new_password != confirm_password) {
		var vm = {
			isAlert: true,
			message: 'Nhập lại mật khẩu không đúng.'
		};
		res.render('account/changepassword', vm);
	} else {
		accountRepo.changepassword(req.session.user.f_ID, SHA256(new_password).toString()).then(value => {
			var vm = {
				isAlert: true,
				message: 'Đổi mật khẩu thành công.'
			};
			res.render('account/changepassword', vm);
		});
	}
});

router.post('/logout', (req, res) => {
	req.session.isLogged = false;
	req.session.isAdminLogged = false;
	req.session.user = null;
	res.redirect(req.headers.referer);
});

module.exports = router;