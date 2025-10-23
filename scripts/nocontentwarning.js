(function() {
	const scriptName = document.currentScript?.dataset.name;

	function clickDaButton(root = document.documentElement) {
		const buttons = root.querySelectorAll("yt-playability-error-supported-renderers#error-screen yt-touch-feedback-shape");
		if (!buttons.length) return;
		for (const button of buttons) button.click();
		console.log(`${document.documentElement.dataset.extensionName}: [${scriptName}] found and clicked ${buttons.length} button(s).`);
	}

	document.addEventListener('yt-navigate-finish', () => {
		if (!location.href.includes("watch") || location.href.includes("&rco=1")) return;

		setTimeout(() => {
			clickDaButton(document.documentElement);
		}, 300);
	});
})();