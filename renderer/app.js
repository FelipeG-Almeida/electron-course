const { ipcRenderer } = require('electron');
const items = require('./items');

const showModal = document.getElementById('show-modal'),
	closeModal = document.getElementById('close-modal'),
	modal = document.getElementById('modal'),
	addItem = document.getElementById('add-item'),
	itemUrl = document.getElementById('url');

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
	items.addItem(newItem);
	toogleModalButtons();
	modal.style.display = 'none';
	itemUrl.value = '';
});

itemUrl.addEventListener('keyup', (e) => {
	if (e.key === 'Enter') addItem.click();
});
