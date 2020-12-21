var db = require('../fn/db.js');

exports.loadAll = () => {
	var sql = 'select * from manufacturers';
	return db.load(sql);
}

exports.single = (ManID) => {
	var sql = `select * from manufacturers where ManID = ${ManID}`;
	return db.load(sql);
}

exports.update = (man) => {
	var sql = `update manufacturers set ManName = '${man.ManName}' where ManID = ${man.ManID}`;
	return db.save(sql);
}

exports.add = (ManName) => {
	var sql = `insert into manufacturers(ManName) values('${ManName}')`;
	return db.save(sql);
}

exports.delete = (ManID) => {
	var sql = `delete from manufacturers where ManID = ${ManID}`;
	return db.save(sql);
}