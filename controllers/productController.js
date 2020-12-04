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

