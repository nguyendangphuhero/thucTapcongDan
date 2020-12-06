var db = require('../fn/db');

exports.get = username => {
	var sql = `select * from users where f_Username='${username}'`;
	return db.load(sql);
}

exports.single = id => {
	var sql = `select * from users where f_ID = ${id}`;
	return db.load(sql);
}

exports.update = (id, name, email, dob) => {
	var sql = `update users set f_Name = '${name}', f_Email = '${email}', f_DOB = '${dob}' where f_ID = ${id}`;
	return db.save(sql);
}

exports.changepassword = (id, password) => {
	var sql = `update users set f_Password= '${password}' where f_ID = ${id}`;
	return db.save(sql);	
}

exports.add = user => {
	var sql = `insert into users (f_Username, f_Password, f_Name, f_Email, f_DOB, f_Permission) values 
	('${user.username}', '${user.password}', '${user.name}', '${user.email}', '${user.dob}', ${user.permission})`;
	return db.save(sql);
}

exports.login = user => {
	var sql = `select * from users where f_Username='${user.username}' and f_Password='${user.password}'`;
	return db.load(sql);
}