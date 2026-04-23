(function() {
	function clickDaButton(root = document.documentElement) {
		const buttons = root.querySelectorAll("yt-player-error-message-renderer #buttons yt-button-renderer#button button:not([aria-label='Retry'])");
		if (!buttons.length) return;
		for (const button of buttons) button.click();
		if (document.documentElement.dataset.loggingEnabled === "true")
			console.log(`${document.documentElement.dataset.extensionName}: found and clicked ${buttons.length} button(s).`);
	}

	document.addEventListener('yt-navigate-finish', () => {
		if (!location.href.includes("watch") || location.href.includes("&rco=1")) return;

		setTimeout(() => {
			clickDaButton(document.documentElement);
		}, 300);
	});
})();