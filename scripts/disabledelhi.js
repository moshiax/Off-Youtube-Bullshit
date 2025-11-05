(function() {
	let attempts = 0;

	const interval = setInterval(() => {
		const watchConfig = window.yt?.config_?.WEB_PLAYER_CONTEXT_CONFIGS?.WEB_PLAYER_CONTEXT_CONFIG_ID_KEVLAR_WATCH;

		if (watchConfig?.serializedExperimentFlags) {
			watchConfig.serializedExperimentFlags = watchConfig.serializedExperimentFlags
				.replace(/&delhi_modern_web_player=true/g, '')
				.replace(/&delhi_modern_web_player_icons=true/g, '');
			if (document.documentElement.dataset.loggingEnabled === 'true') {
				console.log(`${document.documentElement.dataset.extensionName}: disabled delhi_modern_web_player flags.`);
			}
			clearInterval(interval);
		} else if (++attempts >= 50) {
			clearInterval(interval);
		}
	}, 100);
})();