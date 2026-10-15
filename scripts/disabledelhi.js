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
			window.yt.config_.EXPERIMENT_FLAGS.disable_theater_mode = false;
			window.yt.config_.EXPERIMENT_FLAGS.web_watch_eligible_to_switch_to_grid = false;
			window.yt.config_.EXPERIMENT_FLAGS.web_watch_enable_single_column_grid_view = false;
			window.yt.config_.EXPERIMENT_FLAGS.web_fixed_panel_watch_next_grid_swap = false;
			window.yt.config_.EXPERIMENT_FLAGS.web_watch_fixed_default_panels = false;
			window.yt.config_.EXPERIMENT_FLAGS.web_engagement_panel_show_description = false;
			window.yt.config_.EXPERIMENT_FLAGS.web_watch_move_summary_to_sd = false;
			window.yt.config_.EXPERIMENT_FLAGS.web_watch_hero_list = false;
			window.yt.config_.EXPERIMENT_FLAGS.web_watch_split_scroll = false;
			window.yt.config_.EXPERIMENT_FLAGS.web_side_rail_dismissible_panels = false;
			window.yt.config_.EXPERIMENT_FLAGS.kevlar_watch_hide_comments_while_panel_open = false;
			clearInterval(interval);
		} else if (++attempts >= 50) {
			clearInterval(interval);
		}
	}, 100);
})();