exports.add = (cart, item) => {
	for (var i = cart.length - 1; i >= 0; i--) {
		if (cart[i].ProId === item.ProId) {
			cart[i].Quantity += item.Quantity;
			return;
		}
	}
	cart.push(item);
}

exports.decrease = (cart, item) => {
	for (var i = cart.length - 1; i >= 0; i--) {
		if (cart[i].ProId === item.ProId) {
			if (cart[i].Quantity > 1) {
				cart[i].Quantity -= 1;
			}
			return;
		}
	}
}

exports.remove = (cart, proId) => {
	for (var i = cart.length - 1; i >= 0; i--) {
		if (proId === cart[i].ProId) {
			cart.splice(i, 1);
			return;
		}
	}
}

exports.removeAll = (cart) => {
	for (var i = cart.length - 1; i >= 0; i--) {
		cart.splice(i, 1);
	}
}