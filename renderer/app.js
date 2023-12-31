const { ipcRenderer } = require('electron');
const items = require('./items');

const showModal = document.getElementById('show-modal'),
	closeModal = document.getElementById('close-modal'),
	modal = document.getElementById('modal'),
	addItem = document.getElementById('add-item'),
	itemUrl = document.getElementById('url'),
	search = document.getElementById('search');

ipcRenderer.on('menu-show-modal', () => {
	showModal.click();
});

ipcRenderer.on('menu-open-item', () => {
	items.open();
});

ipcRenderer.on('menu-delete-item', () => {
	let selectedItem = items.getSelectedItem();
	items.delete(selectedItem.index);
});

ipcRenderer.on('menu-open-item-native', () => {
	items.openNative();
});

ipcRenderer.on('menu-focus-search', () => {
	search.focus();
});

search.addEventListener('keyup', () => {
	Array.from(document.getElementsByClassName('read-item')).forEach((item) => {
		const hasMatch = item.innerText
			.toLowerCase()
			.includes(search.value.toLowerCase());
		item.style.display = hasMatch ? 'flex' : 'none';
	});
});

document.addEventListener('keydown', (e) => {
	if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
		items.changeSelection(e.key);
	}
});

function toogleModalButtons() {
	if (addItem.disabled === true) {
		addItem.disabled = false;
		addItem.style.opacity = 1;
		addItem.innerText = 'Add Item';
		closeModal.style.display = 'inline';
	} else {
		addItem.disabled = true;
		addItem.style.opacity = 0.5;
		addItem.innerText = 'Adding...';
		closeModal.style.display = 'none';
	}
}

// Show modal
showModal.addEventListener('click', () => {
	modal.style.display = 'flex';
	itemUrl.focus();
});

// Close modal
closeModal.addEventListener('click', () => {
	modal.style.display = 'none';
});

// Handle add item
addItem.addEventListener('click', () => {
	if (itemUrl.value) {
		ipcRenderer.send('new-item', itemUrl.value);
		toogleModalButtons();
	}
});

ipcRenderer.on('new-item-sucess', (e, newItem) => {
	items.addItem(newItem, true);
	toogleModalButtons();
	modal.style.display = 'none';
	itemUrl.value = '';
});

itemUrl.addEventListener('keyup', (e) => {
	if (e.key === 'Enter') addItem.click();
});
