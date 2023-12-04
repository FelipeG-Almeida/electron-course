let items = document.getElementById('items');

exports.storage = JSON.parse(localStorage.getItem('readit-items')) || [];

exports.save = () => {
	localStorage.setItem('readit-items', JSON.stringify(this.storage));
};

exports.addItem = (item) => {
	let itemNode = document.createElement('li');
	itemNode.setAttribute('class', 'read-item');

	itemNode.innerHTML = `<img src="${item.screenshot}" /><h2>${item.title}</h2>`;
	items.appendChild(itemNode);
	this.storage.push(item);
	this.save();
};

this.storage.forEach(item => {
    this.addItem
});