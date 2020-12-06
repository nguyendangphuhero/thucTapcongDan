var db = require('../fn/db');
var config = require('../config/config');

exports.search = content => {
	var sql = `select * from products where Active=1 and ProName like '%${content}%' order by ReceiveDate DESC`;
	return db.load(sql);
}

exports.searchAdventage = (name, catIdsString, manIdsString, price) => {
	var sql = `select * from products where Active=1 and ProName like '%${name}%' and CatID in (${catIdsString})
	and ManID in (${manIdsString}) and Price between ${price.down} and ${price.up} order by ReceiveDate DESC`;
	return db.load(sql);
}

exports.countBySearchContent = content =>  {
	var sql = `select count(*) as total from products where Active=1 and ProName like '%${content}%'`;
	return db.load(sql);
}

exports.single = proId => {
	var sql = `select * from products where ProID='${proId}'`;
	return db.load(sql);
}

exports.singleDetail = proId => {
	var sql = `select p.*, c.CatName, m.ManName	from products p, categories c, manufacturers m 
	where p.ProID=${proId} and p.CatID=c.CatID and p.ManID=m.ManID`;
	return db.load(sql);
}

exports.loadAll = () => {
    var sql = 'select * from products where Active=1';
    return db.load(sql);
}

exports.loadAllByCat = (catId, offset) => {
    var sql = `select ProID, ProName, Price from products where Active=1 and CatID = ${catId} limit ${config.PRODUCTS_PER_PAGE} offset ${offset}`;
    return db.load(sql);
}

exports.countByCat = catId => {
	var sql = `select count(*) as total from products where Active=1 and CatID=${catId}`;
    return db.load(sql);
}

exports.loadRelativeByCat = (proId, catId, price) => {
    var sql = `select ProID, ProName, Price from products where Active=1 and ProID<>${proId} 
    and CatID=${catId} order by ABS(Price-${price}) ASC LIMIT ${config.RELATIVE_PRODUCTS}`;
    return db.load(sql);
}

exports.loadAllByMan = (manId, offset) => {
    var sql = `select ProID, ProName, Price from products where Active=1 and ManID=${manId} limit ${config.PRODUCTS_PER_PAGE} offset ${offset}`;
    return db.load(sql);
}

exports.countByMan = manId => {
	var sql = `select count(*) as total from products where Active=1 and ManID=${manId}`;
    return db.load(sql);
}

exports.loadRelativeByMan = (proId, manId, price) => {
    var sql = `select ProID, ProName, Price from products where Active=1 and ProID<>${proId} and ManID=${manId} order by ABS(Price-${price}) ASC LIMIT ${config.RELATIVE_PRODUCTS}`;
    return db.load(sql);
}

exports.loadLastestProducts = () => {
	var sql = `select * from products where Active=1 order by ReceiveDate DESC LIMIT ${config.TOP_PRODUCTS}`;
	return db.load(sql);
}

exports.loadMostBuyProducts = () => {
	var sql = `select * from products where Active=1 order by Sold DESC LIMIT ${config.TOP_PRODUCTS}`;
	return db.load(sql);
}

exports.loadMostViewProducts = () => {
	var sql = `select * from products where Active=1 order by View DESC LIMIT ${config.TOP_PRODUCTS}`;
	return db.load(sql);
}

exports.add = pro => {
	var sql = `insert into products(ProName, TinyDes, FullDes, Price, Quantity, Sold, ReceiveDate, View, CatID, ManID, Origin, Active) 
	values('${pro.ProName}', '${pro.TinyDes}', '${pro.FullDes}', ${pro.Price}, ${pro.Quantity}, 0, '${pro.ReceiveDate}', 0, ${pro.CatID}, ${pro.ManID}, '${pro.Origin}', 1)`;
	return db.save(sql);
}

exports.update = pro => {
	var sql = `update products set ProName='${pro.ProName}',TinyDes='${pro.TinyDes}',FullDes='${pro.FullDes}',
	Price=${pro.Price},Quantity=${pro.Quantity},ReceiveDate='${pro.ReceiveDate}',CatID=${pro.CatID},
	ManID=${pro.ManID},Origin='${pro.Origin}' where ProID=${pro.ProID}`;
	return db.save(sql);
}

exports.updateView = proId => {
	var sql = `update products set View=View+1 where ProID=${proId}`;
	return db.save(sql);
}

exports.updateQuantity = pro => {
	var sql = `update products set Sold=${pro.sold}, Quantity=${pro.quantity} where ProID=${pro.proId}`;
	return db.save(sql);
}

exports.delete = proId => {
	var sql = `update products set Active=0 where ProId=${proId}`;
	return db.save(sql);
}