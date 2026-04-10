(function() {
	function addToQueue(videoId) {
		const videoEl = Array.from(document.querySelectorAll('yt-lockup-view-model, ytd-video-preview'))
			.find(el => {
				const link = el.querySelector('a.ytLockupViewModelContentImage, a#media-container-link');
				return link && new URL(link.href, location.origin).searchParams.get('v') === videoId;
			});
		if (!videoEl) return;

		const moreBtn = videoEl.querySelector('button[aria-label="More actions"]');
		if (!moreBtn) return;

		moreBtn.click();

		const start = performance.now();
		const timeout = 1000;

		(function waitForButton() {
			const sheets = document.querySelectorAll('tp-yt-iron-dropdown');
			for (const sheet of sheets) {
				if (sheet.offsetWidth === 0 || sheet.offsetHeight === 0) continue;

				const addBtn = Array.from(sheet.querySelectorAll('button.ytListItemViewModelButtonOrAnchor'))
					.find(el => /add to queue/i.test(el.textContent));
				if (addBtn) {
					addBtn.click();
					if (document.documentElement.dataset.loggingEnabled === 'true') {
						const extName = document.documentElement.dataset.extensionName || 'Extension';
						console.log(`${extName}: added to queue:`, videoId);
					}
					sheet.style.display = 'none';
					return;
				}
			}
			if (performance.now() - start < timeout) {
				requestAnimationFrame(waitForButton);
			}
		})();
	}

	document.addEventListener('contextmenu', e => {
		const link = e.target.closest('a.ytLockupViewModelContentImage, a#media-container-link');
		if (!link) return;
		e.preventDefault();
		e.stopPropagation();
		const videoId = new URL(link.href, location.origin).searchParams.get('v');
		if (videoId) addToQueue(videoId);
	});
})();