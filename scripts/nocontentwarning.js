(function() {
	function clickDaButton(root = document.documentElement) {
		const buttons = root.querySelectorAll("yt-playability-error-supported-renderers#error-screen yt-touch-feedback-shape");
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