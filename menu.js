const { Menu, shell } = require('electron');

module.exports = (appWin) => {
	let template = [
		{
			label: 'Items',
			submenu: [
				{
					label: 'Add New',
					click: () => {
						appWin.send();
					},
				},
			],
		},
		{
			role: 'editMenu',
		},
		{
			role: 'windowMenu',
		},
		{
			role: 'help',
			submenu: [
				{
					label: 'Learn more',
					click: () => {
						shell.openExternal(
							'https://github.com/FelipeG-Almeida/electron-course'
						);
					},
				},
			],
		},
	];

	if (process.platform === 'darwin') template.unshift({ role: 'appMenu' });

	let menu = Menu.buildFromTemplate(template);
	Menu.setApplicationMenu(menu);
};
