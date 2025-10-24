(function() {
	const scriptName = document.currentScript?.dataset.name;

	function disableDelhiFlags() {
		const config = window?.yt?.config_?.WEB_PLAYER_CONTEXT_CONFIGS?.WEB_PLAYER_CONTEXT_CONFIG_ID_KEVLAR_WATCH;
		if (!config || typeof config.serializedExperimentFlags !== "string") return;

		const before = config.serializedExperimentFlags;
		config.serializedExperimentFlags = before
			.replace(/&?delhi_modern_web_player=true/g, "")
			.replace(/&?delhi_modern_web_player_icons=true/g, "");

		if (before !== config.serializedExperimentFlags && document.documentElement.dataset.loggingEnabled === "true") {
			console.log(`${document.documentElement.dataset.extensionName}: [${scriptName}] disabled delhi_modern_web_player flags.`);
		}
	}

	document.addEventListener("yt-navigate-finish", () => {
		setTimeout(disableDelhiFlags, 200);
	});

	disableDelhiFlags();
})();