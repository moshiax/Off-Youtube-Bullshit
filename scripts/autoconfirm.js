document.addEventListener('pause', function(e) {
	const dialog = document.body.querySelector('yt-confirm-dialog-renderer');
	if (dialog?.parentElement.__data.opened) {
		e.target.play();
		dialog.querySelector('button').click();

		if (document.documentElement.getAttribute('data-logging-enabled') === 'true') {
			console.log(`${document.documentElement.getAttribute('data-extension-name')}: Autoconfirm.js triggered`);
		}
	}
}, true);