document.addEventListener('pause', function(e) {
	const dialog = document.body.querySelector('yt-confirm-dialog-renderer');
	if (dialog?.parentElement.__data.opened) {
		e.target.play();
		dialog.querySelector('button').click();
	}
}, true);
