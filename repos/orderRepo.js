var db = require('../fn/db');

exports.loadAll = () => {
	var sql = 'select * from orders';
    return db.load(sql);
}

exports.single = (id) => {
	var sql = `select * from orders where OrderID = ${id}`;
	return db.load(sql);
}

exports.update = (id, stt) => {
	var sql = `update orders set State = ${stt} where OrderID = ${id}`;
	return db.save(sql);
}

exports.loadAllByUserID = userId => {
	var sql = `select * from orders where UserID=${userId} order by OrderDate desc`;
	return db.load(sql);
}

exports.loadAllDetailByOrderID = orderId => {
	var sql = `select od.ProID, p.ProName, od.Quantity, od.Price, od.Amount 
	from orderdetails od, products p where OrderID=${orderId} and p.ProID=od.ProID`;
	return db.load(sql);
}

exports.add = order => {
	var sql = `insert into orders(OrderDate, UserID, Total, State) 
	values ('${order.orderDate}', ${order.userId}, ${order.total}, ${order.state})`;
	return db.save(sql);
}

exports.getLastestOrderIDByUserID = userId => {
	var sql = `select OrderID from orders where UserID=${userId} order by OrderID desc limit 1`;
	return db.load(sql);
}

exports.getSumAmountByOrderID = orderId => {
	var sql = `select OrderID, SUM(Amount) as Total from orderdetails where OrderID=${orderId}`;
	return db.load(sql);
}

exports.addDetail = orderDetail => {
	var sql = `insert into orderdetails(OrderID, ProID, Quantity, Price, Amount) 
	values(${orderDetail.orderId}, ${orderDetail.proId}, ${orderDetail.quantity}, ${orderDetail.price}, ${orderDetail.amount})`;
	return db.save(sql);
}

exports.getDetailByOrderID = orderId => {
	var sql = `select * from orderdetails where OrderID=${orderId}`;
	return db.save(sql);
}

exports.updateTotal = order  => {
	var sql = `update orders set Total=${order.total} where OrderID=${order.orderId}`;
	return db.save(sql);
}

exports.remove = orderId => {
	var sql = `delete from orders where OrderID=${orderId}`;
	return db.save(sql);
}

exports.removeDetails = orderId => {
	var sql = `delete from orderdetails where OrderID=${orderId}`;
	return db.save(sql);
}