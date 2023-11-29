const showModal = document.getElementById('show-modal'),
	closeModal = document.getElementById('close-modal'),
	modal = document.getElementById('modal'),
	addItem = document.getElementById('add-item'),
	itemUrl = document.getElementById('url');

// Show modal
showModal.addEventListener('click', () => {
	modal.style.display = 'flex';
});

// Close modal
closeModal.addEventListener('click', () => {
	modal.style.display = 'none';
});

// Handle add item
addItem.addEventListener('click', () => {
	if (itemUrl.value) {
		console.log(itemUrl.value);
	}
});
