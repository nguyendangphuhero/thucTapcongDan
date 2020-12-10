var express = require('express');

var config = require('../config/config');
var productRepo = require('../repos/productRepo');
var cartRepo = require('../repos/cartRepo');
var categoryRepo = require('../repos/categoryRepo');
var manufacturerRepo = require('../repos/manufacturerRepo');

var router = express.Router();

router.get('/byCat/:catId', (req, res) => {
    var catId = req.params.catId;

    var page = req.query.page;
    if (!page) {
        page = 1;
    }

    var offset = (page - 1) * config.TOP_PRODUCTS;

    var p1 = productRepo.loadAllByCat(catId, offset);
    var p2 = productRepo.countByCat(catId);
    Promise.all([p1, p2]).then(([pRows, countRows]) => {
        var total = countRows[0].total;
        var nPages = total / config.TOP_PRODUCTS;
        if (total % config.TOP_PRODUCTS > 0) {
            nPages++;
        }

        var numbers = [];
        for (i = 1; i <= nPages; i++) {
            numbers.push({
                value: i,
                isCurPage: i === +page
            });
        }

        var vm = {
            products: pRows,
            noProducts: pRows.length === 0,
            page_numbers: numbers
        };
        res.render('product/category', vm);
    });
});

router.post('/', (req, res) => {
    productRepo.single(req.body.proId).then(rows => {
        if (rows.length > 0) {
            if (rows[0].Active === 1 && rows[0].Quantity > 0) {
                var item = {
                    ProId: req.body.proId,
                    Quantity: 1
                };
                cartRepo.add(req.session.cart, item);
                res.redirect('cart');
            }
        }
    }).catch(err => {
        res.render('error/processingError');
    });       
});

router.get('/byMan/:manId', (req, res) => {
    var manId = req.params.manId;

    var page = req.query.page;
    if (!page) {
        page = 1;
    }

    var offset = (page - 1) * config.TOP_PRODUCTS;

    var p1 = productRepo.loadAllByMan(manId, offset);
    var p2 = productRepo.countByMan(manId);
    Promise.all([p1, p2]).then(([pRows, countRows]) => {
        var total = countRows[0].total;
        var nPages = total / config.TOP_PRODUCTS;
        if (total % config.TOP_PRODUCTS > 0) {
            nPages++;
        }

        var numbers = [];
        for (i = 1; i <= nPages; i++) {
            numbers.push({
                value: i,
                isCurPage: i === +page
            });
        }

        var vm = {
            products: pRows,
            noProducts: pRows.length === 0,
            page_numbers: numbers
        };
        res.render('product/category', vm);
    });
});

router.get('/detail/:proId', (req, res) => {
    var proId = req.params.proId;
    productRepo.singleDetail(proId).then(rows => {
        if (rows.length > 0 && rows[0].Active === 1) {
            var p1 = productRepo.loadRelativeByCat(rows[0].ProID, rows[0].CatID, rows[0].Price);
            var p2 = productRepo.loadRelativeByMan(rows[0].ProID, rows[0].ManID, rows[0].Price);
            Promise.all([p1, p2]).then(([p1Rows, p2Rows]) => {
                var vm = {
                    product: rows[0],
                    relativeByCat: p1Rows,
                    relativeByMan: p2Rows
                };
                productRepo.updateView(rows[0].ProID);
                res.render('product/detail', vm);
            }).catch(err => {
                res.render('error/processingError');
            });
        } else {
            var vm = {
                noProduct: true,
                message: "Sản phẩm này không tồn tại hoặc đã bị xoá!"
            }
            res.render('product/detail', vm);
        }
    }).catch(err => {
        res.render('error/processingError');
    });
});
router.post('/detail', (req, res) => {
    productRepo.singleDetail(req.body.proId).then(rows => {
        if (rows.length > 0 && rows[0].Active === 1) {
            var p1 = productRepo.loadRelativeByCat(rows[0].ProID, rows[0].CatID, rows[0].Price);
            var p2 = productRepo.loadRelativeByMan(rows[0].ProID, rows[0].ManID, rows[0].Price);
            Promise.all([p1,p2]).then(([p1Rows, p2Rows]) => {
                if (rows[0].Quantity === 0) {
                    var vm = {
                        isAlert: true,
                        alertMessage: "Sản phẩm tạm hết hàng!",
                        product: rows[0],
                        relativeByCat: p1Rows,
                        relativeByMan: p2Rows
                    };
                    res.render('product/detail', vm);
                } else {
                    var item = {
                        ProId: req.body.proId,
                        Quantity: 1
                    };
                    cartRepo.add(req.session.cart, item);
                    var vm = {
                        isAlert: true,
                        alertMessage: "Đã thêm sản phẩm vào giỏ hàng!",
                        product: rows[0],
                        relativeByCat: p1Rows,
                        relativeByMan: p2Rows
                    };
                    res.render('product/detail', vm);
                }
            }).catch(err => {
                res.render('error/processingError');
            });;
        } else {
            var vm = {
                noProduct: true,
                message: "Sản phẩm này không tồn tại hoặc đã bị xoá!"
            }
            res.render('product/detail', vm);
        }
    }).catch(err => {
        res.render('error/processingError');
    });
});

router.get('/search', (req, res) => {
    var content = req.query.content;

    productRepo.search(content).then(rows => {
        var vm = {
            products: rows,
            noProducts: rows.length === 0,
        };
        res.render('product/category', vm);
    });
});   

router.get('/search-advantage', (req, res) => {
    var name, catIds, manIds, price;
    if (req.query.manId === undefined) {
        manIds = res.locals.layoutVM.manufacturers;
    } else {
        manIds = req.query.manId;
    }
    if (req.query.catId === undefined) {
        catIds = res.locals.layoutVM.categories;
    } else {
        catIds = req.query.catId;
    }
    var catIdsString = "";
    var manIdsString = "";
    for (var i = 0; i < manIds.length; i++) {
        if (i !== manIds.length - 1) {
            manIdsString += manIds[i] + ",";
        } else {
            manIdsString += manIds[i];
        }
    }
    for (var i = 0; i < catIds.length; i++) {
        if (i !== catIds.length - 1) {
            catIdsString += catIds[i] + ",";
        } else {
            catIdsString += catIds[i];
        }
    }
    
    if (req.query.price === undefined) {
        price = {
            down: 0,
            up: 999999999
        };
    } else if (req.query.price === 2) {
        price = {
            down: 0,
            up: 999999
        };
    } else if (req.query.price === 2) {
        price = {
            down: 1000000,
            up: 4999999
        };
    } else if (req.query.price === 3) {
        price = {
            down: 5000000,
            up: 9999999
        };
    } else if (req.query.price === 4) {
        price = {
            down: 10000000,
            up: 14999999
        };
    } else {
        price = {
            down: 15000000,
            up: 999999999
        };
    }
    productRepo.searchAdventage(req.query.name, catIdsString, manIdsString, price).then(rows => {
        var vm = {
            products: rows,
            noProducts: rows.length === 0,
        };
        res.render('product/category', vm);
    });
});

module.exports = router;