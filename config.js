const config = {
	logging: {
		label: "Logging",
		description: "Logging things extension doing in console",
		default: false
	},

	nosleeptimer: {
		label: "No 'Sleep timer'",
		description: "Removes sleep timer from YouTube video settings",
		style: `
			.ytp-menuitem:has(svg path[d="M16.67,4.31C19.3,5.92,21,8.83,21,12c0,4.96-4.04,9-9,9c-2.61,0-5.04-1.12-6.72-3.02C5.52,17.99,5.76,18,6,18 c6.07,0,11-4.93,11-11C17,6.08,16.89,5.18,16.67,4.31 M14.89,2.43C15.59,3.8,16,5.35,16,7c0,5.52-4.48,10-10,10 c-1,0-1.97-0.15-2.89-0.43C4.77,19.79,8.13,22,12,22c5.52,0,10-4.48,10-10C22,7.48,19,3.67,14.89,2.43L14.89,2.43z M12,6H6v1h4.5 L6,10.99v0.05V12h6v-1H7.5L12,7.01V6.98V6L12,6z"]) {
				display: none !important;
			}
		`,
		default: true
	}, // TODO: Make this multirule to hide various .ytp-menuitem entries  

	noStops: {
		label: "No random video stops",
		description: "Removes YouTube function that randomly stops video and 'Still watching?' popup",
		style: `tp-yt-paper-toast#toast { display: none !important; }`,
		script: 'scripts/autoconfirm.js',
		default: true
	},

	nourltracking: {
		label: "No URL tracking",
		description: "Converts youtu.be copied links with ?si= parameter to standard youtube.com/watch?v= format (removes tracking, adds previews)",
		script: 'scripts/nourltracking.js',
		default: true
	},

	nocontentwarning: {
		label: "No content warning",
		description: "Automatically clicks on 'viewer discretion is advised' banners",
		script: 'scripts/nocontentwarning.js',
		default: true
	},

	returnyoutubedislike: {
		label: "Return Youtube Dislike",
		description: 'Integration with (<a href="https://github.com/Anarios/return-youtube-dislike" target="_blank" rel="noopener noreferrer">Return Youtube Dislike</a>) userscript (only GET)',
		script: 'scripts/returnyoutubedislike.js',
		default: true
	},

	returnNextButton: {
		label: "Return 'Next' button",
		description: "Returns next button in video player",
		style: `
			.ytp-next-button {
				display: block !important;
			}
		`,
		default: true
	},
	
	youtubered: {
		label: "Return Youtube Red",
		description: "Colors progress bars and interface elements with YouTube's red color",
		style: `
			.ytp-play-progress,
			#progress,
			.ytd-thumbnail-overlay-resume-playback-renderer#progress,
			.YtThumbnailOverlayProgressBarHostWatchedProgressBarSegmentModern,
			.YtChapteredProgressBarChapteredPlayerBarChapterRefresh,
			.YtChapteredProgressBarChapteredPlayerBarFillRefresh,
			.YtProgressBarLineProgressBarPlayedRefresh,
			#progress.yt-page-navigation-progress,
			.ytThumbnailOverlayProgressBarHostWatchedProgressBarSegment {
				background: var(--yt-spec-static-brand-red) !important;
			}

			.yt-icon-shape > div > svg > g:first-of-type > path:first-of-type {
				fill: var(--yt-spec-static-brand-red) !important;
			}

			.yt-spec-icon-badge-shape--type-notification-refresh .yt-spec-icon-badge-shape__badge {
				background-color: red !important;
			}
		`,
		default: true
	},

	fixHeader: {
		label: "Fix Youtube headers",
		description: "Removes blur and background from YouTube's header",
		style: `
			ytd-masthead {
				background: var(--yt-spec-base-background) !important;
			}

			#frosted-glass.with-chipbar.ytd-app,
			#frosted-glass.loading-with-chipbar {
				background: var(--yt-spec-base-background) !important;
				backdrop-filter: none !important;
			}

			.yt-spec-icon-badge-shape--type-notification-refresh
			.yt-spec-icon-badge-shape__badge {
				background-color: red !important;
				color: white !important;
			}
		`,
		default: true
	},

	hideSuggestedSections: {
		label: "Hide Suggested sections",
		description: "Removes suggested sections from descriptions and other places",
		style: `
			ytd-browse[page-subtype="home"] ytd-rich-grid-group, /* Group of 3 Shorts in Home grid */
			ytd-browse[page-subtype="home"] ytd-rich-item-renderer[is-slim-media][rendered-from-rich-grid], /* Individual Short in Home grid */
			#structured-description ytd-reel-shelf-renderer, /* Under video */
			#related ytd-reel-shelf-renderer, /* Related shelf */
			#related ytd-compact-video-renderer:has(a[href^="/shorts"]), /* Related shorts item */
			ytd-rich-section-renderer:has(> #content > ytd-rich-shelf-renderer[is-shorts]), /* Grid Shelf */
			ytd-browse[page-subtype="home"] ytd-rich-section-renderer:not(:has(> #content > ytd-rich-shelf-renderer[is-shorts])), /* Shelves in Home */
			ytd-browse[page-subtype="home"] ytd-rich-item-renderer:has(> #content > ytd-feed-nudge-renderer), /* Looking for something different? tile in Home */
			ytd-search #contents.ytd-item-section-renderer > ytd-shelf-renderer, /* Suggested content shelves in Search */
			ytd-search #contents.ytd-item-section-renderer > ytd-horizontal-card-list-renderer, /* People also search for in Search */
			ytd-browse[page-subtype="playlist"] ytd-item-section-renderer[is-playlist-video-container], /* Recommended videos in a Playlist */
			ytd-browse[page-subtype="playlist"] ytd-item-section-renderer[is-playlist-video-container] + ytd-item-section-renderer /* Recommended playlists in a Playlist */
			{
				display: none !important;
			}
		`,
		default: true
	},

	hideYoutubeSurveys: {
		label: "Hide YouTube Surveys",
		description: "Removes pop-up surveys and dialogs (How do you like this video?)",
		style: `
			#tp-yt-paper-dialog.style-scope.ytd-popup-container,
			ytd-single-option-survey-renderer,
			ytd-inline-survey-renderer,
			.ytLockupAttachmentsViewModelHost,
			ytd-checkbox-survey-renderer {
				display: none !important;
			}
		`,
		default: true
	},

	hideHorizontalScrollbar: {
		label: "Hide Horizontal Scrollbar",
		description: "Removes horizontal scrollbar on the page",
		style: `* { scrollbar-width: none !important; }`,
		default: true
	},

	fixMainGrid: {
		label: "Fix Main Page Grid",
		description: "Sets 5 items per row on YouTube's main page",
		style: `
			ytd-browse:is([page-subtype="home"], [page-subtype="subscriptions"]) ytd-rich-grid-renderer {
				--ytd-rich-grid-items-per-row: 5 !important;
				--ytd-rich-grid-posts-per-row: 5 !important;
				--ytd-rich-grid-row-margin: 16px !important;
				--ytd-rich-grid-item-margin: 16px !important;
			}

			ytd-browse:is([page-subtype="home"], [page-subtype="subscriptions"], [page-subtype="channels"]) ytd-rich-item-renderer[rendered-from-rich-grid][is-in-first-column] {
				margin-left: calc(var(--ytd-rich-grid-item-margin, 16px) / 2) !important;
			}

			ytd-browse:is([page-subtype="home"], [page-subtype="subscriptions"], [page-subtype="channels"]) #contents.ytd-rich-grid-renderer {
				padding-left: calc(var(--ytd-rich-grid-gutter-margin, 16px) * 2) !important;
			}

			ytd-browse:is([page-subtype="home"], [page-subtype="subscriptions"]) #contents.ytd-rich-grid-renderer > :not(ytd-rich-item-renderer) {
				margin-left: calc(var(--ytd-rich-grid-gutter-margin, 16px) * -1) !important;
			}
		`,
		default: true
	},

	hidePropaganda: {
		label: "Hide propaganda",
		description: 'Removes propaganda (<a href="https://support.google.com/youtube/answer/9004474" target="_blank" rel="noopener noreferrer">support.google.com</a>) and elements that thinking instead of you',
		style: `#clarify-box, .ytp-paid-content-overlay { display: none !important; }`,
		default: true
	},

	hideYoutubeSelfPromotions: {
		label: "Hide YouTube Self Promotions",
		description: "Hides self promotions from YouTube such as YouTube Music and YouTube Premium",
		style: `#statement-banner-content.style-scope.ytd-statement-banner-renderer { display: none !important; }`,
		default: true
	},

	clearVideoDescription: {
		label: "Clear Video Description",
		description: "Removes people mentioned, AI generated mark, event tickets, ai generated content and transcripts from video description",
		style: `
			yt-video-attributes-section-view-model,
			how-this-was-made-section-view-model,
			.YtwHowThisWasMadeSectionViewModelHost,
			#ticket-shelf,
			ytd-merch-shelf-renderer,
			#offer-module,
			ytd-video-description-transcript-section-renderer,
			a[href="/channel/UC-9-kyTW8ZkZNDHQJ6FgpwQ"].yt-spec-button-shape-next,
			#expandable-metadata,
			#video-summary,
			ytd-video-description-infocards-section-renderer a#header,
			ytd-metadata-row-container-renderer,
			#teaser-carousel
			{
				display: none !important;
			}
		`,
		default: true
	},

	hideUselessThings: {
		label: "Hide useless things",
		description: "Hides useless elements as copyright notifications etc.",
		style: `
			#footer:has(#guide-links-primary),
			#text-container.style-scope.yt-notification-action-renderer {
				display: none !important;
			}
		`,
		default: true
	},

	hideChatFullscreen: {
		label: "Hide fullscreen chat",
		description: "Hides youtube stream chat (that now opens automatically and lags for a minute) in fullscreen.",
		style: `
			#panels-full-bleed-container {
				display: none !important;
			}
		`,
		default: true
	},

	nosponsored: {
		label: "No 'Sponsored'",
		description: "Removes YouTube videos with 'Only for sponsors', promos, etc",
		style: `
			html:not([cpfyt-channel-tab="membership"]) ytd-app ytd-item-section-renderer[page-subtype="channels"] ytd-grid-video-renderer:has(.badge-style-type-members-only),
			html:not([cpfyt-channel-tab="membership"]) ytd-app ytd-item-section-renderer[page-subtype="channels"] ytd-grid-video-renderer:has(.yt-badge-shape--membership),
			ytd-rich-item-renderer:has(.badge-style-type-members-only),
			ytd-rich-item-renderer:has(.yt-badge-shape--commerce > .yt-badge-shape__icon),
			ytd-rich-item-renderer:has(.yt-badge-shape--membership),
			ytd-video-renderer:has(.badge-style-type-members-only),
			ytd-video-renderer:has(.yt-badge-shape--membership),
			ytd-compact-video-renderer:has(.badge-style-type-members-only),
			#related yt-lockup-view-model:has(.yt-badge-shape--commerce > .yt-badge-shape__icon),
			#related yt-lockup-view-model:has(.yt-badge-shape--membership) {
				display: none !important;
			}
		`,
		default: true
	},

	noFoodForGaza: {
		label: "Hide 'donations' containers",
		description: "Hides offers to donate on something",
		style: `#donation-shelf { display: none !important; }`,
		default: true
	},

	youtubeAmoledBlack: {
		label: "Youtube AMOLED Black",
		description: "AMOLED Black Youtube theme",
		style: `
			#background.ytd-masthead,
			ytd-masthead[frosted-glass=with-chipbar] #background.ytd-masthead {
				background: black !important;
			}

			.yt-spec-icon-badge-shape--type-notification-refresh .yt-spec-icon-badge-shape__badge {
				color: white !important;
			}

			html,
			ytd-app,
			div.video.style-scope.ytd-miniplayer,
			div#items.playlist-items.style-scope.ytd-playlist-panel-renderer,
			div#background.style-scope.ytd-masthead,
			div#skip-navigation.style-scope.ytd-masthead,
			div#contentContainer.style-scope.tp-yt-app-drawer,
			div#guide-content.style-scope.ytd-app,
			yt-contextual-sheet-layout.yt-contextual-sheet-layout-wiz,
			ytd-miniplayer-info-bar,
			ytd-mini-guide-renderer.style-scope.ytd-app,
			.ytContextualSheetLayoutContentContainer {
				background: black !important;
			}

			:root,
			html[dark],
			[dark] {
				--yt-spec-base-background: black !important;
				--yt-spec-raised-background: black !important;
				--yt-spec-menu-background: black !important;
				--yt-spec-text-primary-inverse: black !important;
			}

			#voice-search-button.ytd-masthead {
				background-color: black !important;
			}

			div#container.style-scope.ytd-searchbox {
				background-color: black !important;
			}

			button#search-icon-legacy.style-scope.ytd-searchbox {
				background-color: black !important;
			}

			ytd-multi-page-menu-renderer,
			ytd-simple-menu-header-renderer {
				background-color: black !important;
			}

			.ytp-panel-menu {
				background: rgba(0, 0, 0, 0.3) !important; 
			}

			.ytp-popup {
				background: rgb(0 0 0 / 90%) !important;
			}

			div#description.item.style-scope.ytd-watch-metadata {
				background: rgba(120, 120, 120, 0.1) !important;
				background-color: black !important;
			}

			.yt-spec-button-shape-next--mono.yt-spec-button-shape-next--tonal {
				background: rgba(30, 30, 30, 0.45) !important;
				transition: background 0.3s ease;
			}

			.yt-spec-button-shape-next--mono.yt-spec-button-shape-next--tonal:hover {
				background: rgba(30, 30, 30, 0.8) !important; 
			}

			.yt-spec-button-shape-next--call-to-action.yt-spec-button-shape-next--filled {
				background: black !important; 
				color: #3ea6ff !important; 
				border: 1px solid rgba(255, 255, 255, 0.2); 
				transition: background 0.3s ease, color 0.3s ease; 
			}

			.yt-spec-button-shape-next--call-to-action.yt-spec-button-shape-next--filled:hover {
				background: rgba(0, 79, 124, 0.6) !important; 
				color: rgba(90, 183, 255, 0.9) !important;
			}

			.YtSearchboxComponentInputBox.YtSearchboxComponentInputBoxDark {
				background-color: black !important;
			}

			.yt-spec-button-shape-next--mono.yt-spec-button-shape-next--tonal {
				background: black !important;
			}

			.yt-chip-cloud-chip-renderer { /* search panel */
				background: black !important; 
				background-color: black !important;
			}

			.YtSuggestionComponentRemoveLink { /* search result deletion text-button */
				color: hsla(0, 100%, 69%, 1) !important; 
			}

			yt-chip-cloud-chip-renderer[chip-style] {
				background-color: black !important;
			}

			.ytSearchboxComponentSearchButtonDark, /* search container */
			.ytSearchboxComponentInputBox {
				background-color: transparent !important; 
			}

			.ytSearchboxComponentSuggestionsContainer.ytSearchboxComponentSuggestionsContainerDark {  /* search results list */
				background-color: black !important; 
			}
			
			.ytVideoMetadataCarouselViewModelHost {
				background: black !important;
			}
			
			.yt-spec-dialog-layout {
				background-color: black !important;
			}
		`,
		default: false
	},

	restoreOldUI: {
		label: "Restore 2025 UI",
		description: "Restores old Youtube UI before 2025 update (partly)",
		script: 'scripts/disabledelhi.js',
		style: `
			/* 	https://www.reddit.com/r/youtube/comments/1ni5tre/make_new_youtube_ui_look_like_an_old_ui/ */
			/* 	https://github.com/code-charity/youtube/issues/3257										   */
			:root {
				--toolbar-height: 52px;
				--element-margin: 2px;
				--element-height: calc(var(--toolbar-height) - var(--element-margin));
				--bg-color: #0000;
			}

			/* SIZE */
			.ytp-delhi-modern .ytp-tooltip {
				margin-top: 12px !important;
			}

			.ytp-delhi-modern .ytp-chrome-bottom,
			.ytp-delhi-modern .ytp-chrome-controls,
			.ytp-delhi-modern.ytp-big-mode:not(.ytp-xsmall-width-mode) .ytp-chrome-bottom,
			.ytp-delhi-modern.ytp-big-mode:not(.ytp-xsmall-width-mode) .ytp-right-controls .ytp-right-controls-right,
			.ytp-delhi-modern.ytp-big-mode:not(.ytp-xsmall-width-mode) .ytp-right-controls .ytp-right-controls-left {
				height: var(--toolbar-height) !important;
				line-height: var(--toolbar-height) !important;
			}

			.ytp-delhi-modern.ytp-big-mode:not(.ytp-xsmall-width-mode) .ytp-progress-bar-container,
			.ytp-delhi-modern:not(.ytp-player-minimized) .ytp-progress-bar-container {
				bottom: var(--toolbar-height) !important;
			}

			/* Overlays container */
			.ytp-delhi-modern.ytp-big-mode.ytp-fullscreen-grid-peeking .ytp-overlays-container,
			.ytp-delhi-modern.ytp-fullscreen-grid-peeking .ytp-overlays-container {
				bottom: calc(var(--toolbar-height) + 20px) !important;
			}

			.ytp-delhi-modern .ytp-chrome-controls .ytp-right-controls,
			.ytp-delhi-modern .ytp-prev-button:not(.ytp-miniplayer-button-container>*),
			.ytp-delhi-modern .ytp-chrome-controls .ytp-next-button:not(.ytp-miniplayer-button-container>*).ytp-playlist-ui {
				margin: var(--element-margin) 0 !important;
				padding: 0 !important;
			}

			.ytp-delhi-modern .ytp-chrome-controls .ytp-play-button {
				margin: var(--element-margin) 0 !important;
			}

			/* Volume */
			.ytp-delhi-modern.ytp-delhi-horizontal-volume-controls .ytp-volume-area {
				margin: var(--element-margin) 0 !important;
			}

			.ytp-delhi-modern .ytp-time-display:not(.ytp-miniplayer-ui *),
			.ytp-delhi-modern .ytp-chapter-container {
				padding: var(--element-margin) 0 !important;
			}

			/* Play button */
			.ytp-delhi-modern .ytp-chrome-controls .ytp-play-button {
				--size: var(--element-height);
				height: var(--size) !important;
				width: var(--size) !important;	
			}

			/* Play icon */
			.ytp-delhi-modern-icons .ytp-chrome-controls .ytp-play-button svg {
				padding: 11px !important;
				--size: 28px;
				height: var(--size) !important;
				width: var(--size) !important;
			}

			/* gradient */
			.ytp-chrome-bottom:after {
				content: '';
				position: absolute;
				left: -100px;
				bottom: -2px;
				width: calc(100% + 200px);
				background: linear-gradient(0deg, #000a, #0000);
				height: calc(var(--toolbar-height) + 10px);
				z-index: -1;
			}

			/* fullscreen fixes */
			.ytp-delhi-modern.ytp-delhi-horizontal-volume-controls.ytp-big-mode:not(.ytp-xsmall-width-mode) .ytp-volume-area,
			.ytp-big-mode .ytp-volume-slider,
			.ytp-delhi-modern .ytp-chrome-controls .ytp-mute-button,
			.ytp-delhi-modern.ytp-big-mode:not(.ytp-xsmall-width-mode) .ytp-time-display,
			.ytp-delhi-modern.ytp-big-mode:not(.ytp-xsmall-width-mode) .ytp-chrome-controls .ytp-next-button:not(.ytp-miniplayer-button-container>*),
			.ytp-big-mode.ytp-delhi-modern .ytp-chrome-controls .ytp-prev-button:not(ytp-miniplayer-button-container>*),
			.ytp-delhi-modern.ytp-big-mode:not(.ytp-xsmall-width-mode) .ytp-time-wrapper,
			.ytp-delhi-modern.ytp-big-mode:not(.ytp-xsmall-width-mode) .ytp-chapter-title.ytp-button {
				height: var(--element-height) !important;
				min-height: var(--element-height) !important;
				line-height: var(--element-height) !important;
				margin-top: 0px !important;
				margin-bottom: 0px !important;
			}

			.ytp-big-mode.ytp-delhi-modern-icons .ytp-chrome-controls .ytp-button svg,
			.ytp-delhi-modern.ytp-big-mode:not(.ytp-xsmall-width-mode) .ytp-chrome-controls .ytp-next-button:not(.ytp-miniplayer-button-container>*) svg,
			.ytp-big-mode.ytp-delhi-modern .ytp-chrome-controls .ytp-prev-button:not(ytp-miniplayer-button-container>*) svg {
				padding-top: 14px;
			}

			.ytp-big-mode.ytp-delhi-modern.ytp-delhi-horizontal-volume-controls .ytp-volume-area .ytp-volume-icon svg {
				padding-top: 10px;
			}

			/* fullscreen button corner click */
			.ytp-delhi-modern {
				.ytp-fullscreen-button {
					overflow: visible;
				}
				.ytp-fullscreen-button::after {
					top: 0;
					left: 0;
					width: 84px;
					height: 76px;
				}
			}

			.ytp-delhi-modern:is(.ytp-grid-scrolling, .ytp-fullscreen-grid-active) .ytp-chrome-bottom {
				pointer-events: auto !important;
			}
		  
			/* COLORS */
			.ytp-delhi-modern .ytp-time-wrapper:not(.ytp-miniplayer-ui *),
			.ytp-delhi-modern.ytp-delhi-horizontal-volume-controls .ytp-volume-area,
			.ytp-delhi-modern .ytp-chrome-controls .ytp-play-button,
			.ytp-delhi-modern .ytp-chrome-controls .ytp-right-controls,
			.ytp-delhi-modern .ytp-chrome-controls>*>*,
			.ytp-delhi-modern .ytp-chapter-title.ytp-button {
				background: var(--bg-color) !important;
			}

			/* Video endscreen fix */
			.ytp-fullscreen-grid-active.html5-video-player.ended-mode .ytp-modern-videowall-still:nth-child(n+4) {
				display: block;
			}

			.ytp-fullscreen-grid-active.html5-video-player.ended-mode .ytp-modern-videowall-still:nth-child(n+11),
			.ytp-fullscreen-grid-expand-button {
				display: none;
			}

			.ytp-fullscreen-grid-active.ytp-grid-scrollable .ytp-fullscreen-grid {
				top: 10%;
			}

			.ytp-fullscreen-grid-stills-container {
				grid-template-columns: repeat(5, 1fr);
			},

			/* Disable color on hover */
			html {
				--cpfyt-title-color: #0f0f0f;
				--cpfyt-metadata-color: #606060;
			}
			html[dark] {
				--cpfyt-title-color: #f1f1f1;
				--cpfyt-metadata-color: #aaa;
			}
			ytd-browse[page-subtype="home"] {
				.yt-spec-touch-feedback-shape__hover-effect {
					display: none !important;
				}
				.yt-lockup-metadata-view-model__title {
					color: var(--cpfyt-title-color) !important;
				}
				.yt-lockup-metadata-view-model__metadata {
					color: var(--cpfyt-metadata-color) !important;
				}
			}

			ytd-browse[page-subtype="home"] ytd-rich-item-renderer[rich-grid-hover-highlight] {
				background: none !important;
				box-shadow: none !important;
			}

			ytd-watch-metadata {
				--yt-saturated-base-background: unset !important;
				--yt-saturated-raised-background: unset !important;
				--yt-saturated-additive-background: unset !important;
				--yt-saturated-text-primary: unset !important;
				--yt-saturated-text-secondary: unset !important;
				--yt-saturated-outline: unset !important;
				--yt-saturated-key-light: unset !important;
				--yt-saturated-collection-stack: unset !important;
				--yt-saturated-inverted-background: unset !important;
				--yt-saturated-text-primary-inverse: unset !important;
				--yt-saturated-text-disabled: unset !important;
				--yt-saturated-drop-shadow: unset !important;
				--yt-saturated-card-outline: unset !important;
				--yt-saturated-overlay-background: unset !important;
				--yt-saturated-overlay-text-primary: unset !important;
			}
			#description.ytd-watch-metadata:hover #snippet-text.ytd-text-inline-expander .yt-core-attributed-string--link-inherit-color[style] {
				color: inherit !important;
			}
			#info.ytd-watch-info-text a,
			#description.ytd-watch-metadata #snippet-text.ytd-text-inline-expander a {
				color: var(--yt-spec-call-to-action);
			}

			/* Return old theater mode (+fullscreen scroll)*/
			ytd-app {
				overflow: auto !important;
			}
			ytd-app[scrolling] {
				position: absolute !important;
				top: 0 !important;
				left: 0 !important;
				right: calc((var(--ytd-app-fullerscreen-scrollbar-width) + 1px)*-1) !important;
				bottom: 0 !important;
				overflow-x: auto !important;
			}
			ytd-watch-flexy[full-bleed-player] #single-column-container.ytd-watch-flexy,
			ytd-watch-flexy[full-bleed-player] #columns.ytd-watch-flexy,
			ytd-watch-flexy[fullscreen] #single-column-container.ytd-watch-flexy,
			ytd-watch-flexy[fullscreen] #columns.ytd-watch-flexy {
				display: flex !important;
			}
			.ytp-fullscreen-grid-peeking.ytp-full-bleed-player.ytp-delhi-modern:not(.ytp-autohide) .ytp-chrome-bottom {
				bottom: 0 !important;
				opacity: 1 !important;
			}

			#movie_player:not(.ytp-grid-ended-state) .ytp-fullscreen-grid,
			.ytp-fullscreen-grid,
			.ytp-fullscreen-grid-main-content,
			.ytp-fullscreen-grid-stills-container,
			.ytp-modern-videowall-still,
			.ytp-fullscreen-grid-expand-button,
			.ytp-fullscreen-grid-hover-overlay {
				display: none !important;
				opacity: 0 !important;
				visibility: hidden !important;
				pointer-events: none !important;
				height: 0 !important;
				max-height: 0 !important;
				overflow: hidden !important;
			}
			.ytp-overlays-container {
				display: none !important;
			}
			ytd-watch-flexy[full-bleed-player][i-max-theater-mode][theater]:not([fullscreen]) #full-bleed-container.ytd-watch-flexy {
				height: 56.25vw;
				max-height: 81.5vh;
			}

			.html5-video-player.ytp-grid-scrollable,
			.html5-video-player {
				--ytp-grid-scroll-percentage: 0 !important;
				--ytp-grid-peek-height: 0px !important;
			}

			.ytp-fullerscreen-edu-panel,
			.ytp-cards-teaser,
			.ytp-cards-teaser-box,
			div[class*="fullerscreen"] {
				display: none !important;
				opacity: 0 !important;
				visibility: hidden !important;
			}
			/* Disable player shadows */
			.ytp-gradient-top,
			.ytp-gradient-bottom {
				display: none !important;
			}
			.ytp-chrome-top .ytp-title,
			.ytp-chrome-bottom .ytp-chrome-controls button,
			.ytp-chrome-bottom .ytp-progress-bar-container {
				text-shadow: none !important;
			}
			.ytp-chrome-top button svg,
			.ytp-chrome-bottom button svg {
				filter: none !important;
				-webkit-filter: none !important;
			}
			.ytp-time-display {
				text-shadow: none !important;
			}

			/* Restore old sidebar order */
			#sections.ytd-guide-renderer {
				display: flex !important;
				flex-direction: column !important;
			}

			#sections.ytd-guide-renderer > :nth-child(1) {
				order: -3 !important;
			}

			/* Move Subscriptions down */
			#sections.ytd-guide-renderer > ytd-guide-section-renderer:nth-child(2):has(a[href="/feed/subscriptions"]) {
				order: -1 !important;
			}

			/* Move You up */
			#sections.ytd-guide-renderer > ytd-guide-section-renderer:nth-child(3):has(a[href="/feed/you"]) {
				order: -2 !important;
			}

			/* Restore old player icons */
			[d*="M11.29 2.92C14.85 1.33 18.87 1.06 22.61 2.15L22.96 2.26C26.56 3.40 29.67 5.74 31.75 8.89L31.95 9.19C33.90 12.28 34.77 15.93 34.42 19.56L34.38 19.93C34.04 22.79 32.96 25.51 31.25 27.83C29.53 30.14 27.23 31.97 24.59 33.12C21.95 34.27 19.05 34.71 16.18 34.40C13.32 34.08 10.59 33.02 8.26 31.32L7.97 31.10C4.87 28.73 2.71 25.33 1.88 21.52L3.34 21.20L4.81 20.88C5.49 24.00 7.25 26.77 9.79 28.72L10.27 29.07C12.19 30.40 14.41 31.22 16.74 31.44C19.06 31.65 21.40 31.27 23.53 30.31C25.66 29.35 27.50 27.86 28.88 25.98C30.26 24.10 31.13 21.89 31.40 19.58L31.46 18.98C31.68 16.00 30.90 13.03 29.25 10.54C27.60 8.05 25.17 6.18 22.34 5.22L21.77 5.04C19.02 4.23 16.08 4.33 13.38 5.31C10.68 6.29 8.37 8.11 6.77 10.5H10.5L10.65 10.50C11.03 10.54 11.38 10.73 11.63 11.02C11.88 11.31 12.01 11.69 11.99 12.07C11.97 12.46 11.81 12.82 11.53 13.08C11.25 13.35 10.88 13.49 10.5 13.5H1.5V4.5L1.50 4.34C1.54 3.97 1.71 3.63 1.99 3.38C2.27 3.13 2.62 3.00 3 3.00C3.37 3.00 3.72 3.13 4.00 3.38C4.28 3.63 4.45 3.97 4.49 4.34L4.5 4.5V8.51C6.21 6.07 8.56 4.13 11.29 2.92ZM24 18L15 12.75V23.25L24 18ZM3.02 19.73C2.63 19.82 2.29 20.05 2.08 20.39C1.86 20.72 1.79 21.13 1.88 21.52L4.81 20.88C4.77 20.69 4.69 20.50 4.57 20.34C4.46 20.18 4.32 20.04 4.15 19.94C3.99 19.83 3.80 19.76 3.61 19.72C3.41 19.69 3.21 19.69 3.02 19.73Z"] {
			d: path("M 18,11 V 7 l -5,5 5,5 v -4 c 3.3,0 6,2.7 6,6 0,3.3 -2.7,6 -6,6 -3.3,0 -6,-2.7 -6,-6 h -2 c 0,4.4 3.6,8 8,8 4.4,0 8,-3.6 8,-8 0,-4.4 -3.6,-8 -8,-8 z")
			}
			.ytp-delhi-modern [d*="M 12,24 20.5,18 12,12 V 24 z M 22,12 v 12 h 2 V 12 h -2 z"] {
			d: path("m 12,12 h 2 v 12 h -2 z m 3.5,6 8.5,6 V 12 z")
			}
			[d*="M4 4C3.73 4 3.48 4.10 3.29 4.29C3.10 4.48 3 4.73 3 5V19C3 19.26 3.10 19.51 3.29 19.70C3.48 19.89 3.73 20 4 20C4.26 20 4.51 19.89 4.70 19.70C4.89 19.51 5 19.26 5 19V5C5 4.73 4.89 4.48 4.70 4.29C4.51 4.10 4.26 4 4 4ZM18.95 4.23L6 12.00L18.95 19.77C19.15 19.89 19.39 19.96 19.63 19.96C19.87 19.97 20.10 19.91 20.31 19.79C20.52 19.67 20.69 19.50 20.81 19.29C20.93 19.09 21.00 18.85 21 18.61V5.38C20.99 5.14 20.93 4.91 20.81 4.70C20.69 4.50 20.52 4.33 20.31 4.21C20.10 4.09 19.87 4.03 19.63 4.03C19.39 4.04 19.15 4.10 18.95 4.23Z"] {
			d: path("m 12,12 h 2 v 12 h -2 z m 3.5,6 8.5,6 V 12 z");
			transform: scale(1.36) translate(-9px, -9px)
			}
			[d*="M20 20C20.26 20 20.51 19.89 20.70 19.70C20.89 19.51 21 19.26 21 19V5C21 4.73 20.89 4.48 20.70 4.29C20.51 4.10 20.26 4 20 4C19.73 4 19.48 4.10 19.29 4.29C19.10 4.48 19 4.73 19 5V19C19 19.26 19.10 19.51 19.29 19.70C19.48 19.89 19.73 20 20 20ZM5.04 19.77L18 12L5.04 4.22C4.84 4.10 4.60 4.03 4.36 4.03C4.12 4.03 3.89 4.09 3.68 4.21C3.47 4.32 3.30 4.49 3.18 4.70C3.06 4.91 2.99 5.14 3 5.38V18.61C2.99 18.85 3.06 19.08 3.18 19.29C3.30 19.50 3.47 19.67 3.68 19.79C3.89 19.90 4.12 19.96 4.36 19.96C4.60 19.96 4.84 19.89 5.04 19.77Z"] {
			d: path("M 12,24 20.5,18 12,12 V 24 z M 22,12 v 12 h 2 V 12 h -2 z");
			transform: scale(1.36) translate(-9px, -9px)
			}
			[d*="M 11.60 2.08 L 11.48 2.14 L 3.91 6.68 C 3.02 7.21 2.28 7.97 1.77 8.87 C 1.26 9.77 1.00 10.79 1 11.83 V 12.16 L 1.01 12.56 C 1.07 13.52 1.37 14.46 1.87 15.29 C 2.38 16.12 3.08 16.81 3.91 17.31 L 11.48 21.85 C 11.63 21.94 11.80 21.99 11.98 21.99 C 12.16 22.00 12.33 21.95 12.49 21.87 C 12.64 21.78 12.77 21.65 12.86 21.50 C 12.95 21.35 13 21.17 13 21 V 3 C 12.99 2.83 12.95 2.67 12.87 2.52 C 12.80 2.37 12.68 2.25 12.54 2.16 C 12.41 2.07 12.25 2.01 12.08 2.00 C 11.92 1.98 11.75 2.01 11.60 2.08 Z"] {
			d: path("M8,21 L12,21 L17,26 L17,10 L12,15 L8,15 L8,21 Z")
			}
			[d*="M 11.60 2.08 L 11.48 2.14 L 3.91 6.68 C 3.02 7.21 2.28 7.97 1.77 8.87 C 1.26 9.77 1.00 10.79 1 11.83 V 12.16 L 1.01 12.56 C 1.07 13.52 1.37 14.46 1.87 15.29 C 2.38 16.12 3.08 16.81 3.91 17.31 L 11.48 21.85 C 11.63 21.94 11.80 21.99 11.98 21.99 C 12.16 22.00 12.33 21.95 12.49 21.87 C 12.64 21.78 12.77 21.65 12.86 21.50 C 12.95 21.35 13 21.17 13 21 V 3 C 12.99 2.83 12.95 2.67 12.87 2.52 C 12.80 2.37 12.68 2.25 12.54 2.16 C 12.41 2.07 12.25 2.01 12.08 2.00 C 11.92 1.98 11.75 2.01 11.60 2.08 Z"] {
			d: path("M8,21 L12,21 L17,26 L17,10 L12,15 L8,15 L8,21 Z");
			transform: translate(-6px, -6px)
			}
			[d*="M 15.53 7.05 C 15.35 7.22 15.25 7.45 15.24 7.70 C 15.23 7.95 15.31 8.19 15.46 8.38 L 15.53 8.46 L 15.70 8.64 C 16.09 9.06 16.39 9.55 16.61 10.08 L 16.70 10.31 C 16.90 10.85 17 11.42 17 12 L 16.99 12.24 C 16.96 12.73 16.87 13.22 16.70 13.68 L 16.61 13.91 C 16.36 14.51 15.99 15.07 15.53 15.53 C 15.35 15.72 15.25 15.97 15.26 16.23 C 15.26 16.49 15.37 16.74 15.55 16.92 C 15.73 17.11 15.98 17.21 16.24 17.22 C 16.50 17.22 16.76 17.12 16.95 16.95 C 17.6 16.29 18.11 15.52 18.46 14.67 L 18.59 14.35 C 18.82 13.71 18.95 13.03 18.99 12.34 L 19 12 C 18.99 11.19 18.86 10.39 18.59 9.64 L 18.46 9.32 C 18.15 8.57 17.72 7.89 17.18 7.3 L 16.95 7.05 L 16.87 6.98 C 16.68 6.82 16.43 6.74 16.19 6.75 C 15.94 6.77 15.71 6.87 15.53 7.05"] {
			d: path("M19,14 L19,22 C20.48,21.32 21.5,19.77 21.5,18 C21.5,16.26 20.48,14.74 19,14 Z");
			transform: translate(-6px, -6px)
			}
			[d*="M18.36 4.22C18.18 4.39 18.08 4.62 18.07 4.87C18.05 5.12 18.13 5.36 18.29 5.56L18.36 5.63L18.66 5.95C19.36 6.72 19.91 7.60 20.31 8.55L20.47 8.96C20.82 9.94 21 10.96 21 11.99L20.98 12.44C20.94 13.32 20.77 14.19 20.47 15.03L20.31 15.44C19.86 16.53 19.19 17.52 18.36 18.36C18.17 18.55 18.07 18.80 18.07 19.07C18.07 19.33 18.17 19.59 18.36 19.77C18.55 19.96 18.80 20.07 19.07 20.07C19.33 20.07 19.59 19.96 19.77 19.77C20.79 18.75 21.61 17.54 22.16 16.20L22.35 15.70C22.72 14.68 22.93 13.62 22.98 12.54L23 12C22.99 10.73 22.78 9.48 22.35 8.29L22.16 7.79C21.67 6.62 20.99 5.54 20.15 4.61L19.77 4.22L19.70 4.15C19.51 3.99 19.26 3.91 19.02 3.93C18.77 3.94 18.53 4.04 18.36 4.22 Z"] {
			d: path("M19,11.29 C21.89,12.15 24,14.83 24,18 C24,21.17 21.89,23.85 19,24.71 L19,26.77 C23.01,25.86 26,22.28 26,18 C26,13.72 23.01,10.14 19,9.23 L19,11.29 Z");
			transform: translate(-6px, -6px)
			}
			[d*="M11.60 2.08L11.48 2.14L3.91 6.68C3.02 7.21 2.28 7.97 1.77 8.87C1.26 9.77 1.00 10.79 1 11.83V12.16L1.01 12.56C1.07 13.52 1.37 14.46 1.87 15.29C2.38 16.12 3.08 16.81 3.91 17.31L11.48 21.85C11.63 21.94 11.80 21.99 11.98 21.99C12.16 22.00 12.33 21.95 12.49 21.87C12.64 21.78 12.77 21.65 12.86 21.50C12.95 21.35 13 21.17 13 21V3C12.99 2.83 12.95 2.67 12.87 2.52C12.80 2.37 12.68 2.25 12.54 2.16C12.41 2.07 12.25 2.01 12.08 2.00C11.92 1.98 11.75 2.01 11.60 2.08ZM4.94 8.4V8.40L11 4.76V19.23L4.94 15.6C4.38 15.26 3.92 14.80 3.58 14.25C3.24 13.70 3.05 13.07 3.00 12.43L3 12.17V11.83C2.99 11.14 3.17 10.46 3.51 9.86C3.85 9.25 4.34 8.75 4.94 8.4ZM21.29 8.29L19 10.58L16.70 8.29L16.63 8.22C16.43 8.07 16.19 7.99 15.95 8.00C15.70 8.01 15.47 8.12 15.29 8.29C15.12 8.47 15.01 8.70 15.00 8.95C14.99 9.19 15.07 9.43 15.22 9.63L15.29 9.70L17.58 12L15.29 14.29C15.19 14.38 15.12 14.49 15.06 14.61C15.01 14.73 14.98 14.87 14.98 15.00C14.98 15.13 15.01 15.26 15.06 15.39C15.11 15.51 15.18 15.62 15.28 15.71C15.37 15.81 15.48 15.88 15.60 15.93C15.73 15.98 15.86 16.01 15.99 16.01C16.12 16.01 16.26 15.98 16.38 15.93C16.50 15.87 16.61 15.80 16.70 15.70L19 13.41L21.29 15.70L21.36 15.77C21.56 15.93 21.80 16.01 22.05 15.99C22.29 15.98 22.53 15.88 22.70 15.70C22.88 15.53 22.98 15.29 22.99 15.05C23.00 14.80 22.93 14.56 22.77 14.36L22.70 14.29L20.41 12L22.70 9.70C22.80 9.61 22.87 9.50 22.93 9.38C22.98 9.26 23.01 9.12 23.01 8.99C23.01 8.86 22.98 8.73 22.93 8.60C22.88 8.48 22.81 8.37 22.71 8.28C22.62 8.18 22.51 8.11 22.39 8.06C22.26 8.01 22.13 7.98 22.00 7.98C21.87 7.98 21.73 8.01 21.61 8.06C21.49 8.12 21.38 8.19 21.29 8.29Z"] {
			d: path("m 21.48,17.98 c 0,-1.77 -1.02,-3.29 -2.5,-4.03 v 2.21 l 2.45,2.45 c .03,-0.2 .05,-0.41 .05,-0.63 z m 2.5,0 c 0,.94 -0.2,1.82 -0.54,2.64 l 1.51,1.51 c .66,-1.24 1.03,-2.65 1.03,-4.15 0,-4.28 -2.99,-7.86 -7,-8.76 v 2.05 c 2.89,.86 5,3.54 5,6.71 z M 9.25,8.98 l -1.27,1.26 4.72,4.73 H 7.98 v 6 H 11.98 l 5,5 v -6.73 l 4.25,4.25 c -0.67,.52 -1.42,.93 -2.25,1.18 v 2.06 c 1.38,-0.31 2.63,-0.95 3.69,-1.81 l 2.04,2.05 1.27,-1.27 -9,-9 -7.72,-7.72 z m 7.72,.99 -2.09,2.08 2.09,2.09 V 9.98 z");
			transform: translate(-6px, -6px)
			}
			[d*="M21.20 3.01L21 3H3L2.79 3.01C2.30 3.06 1.84 3.29 1.51 3.65C1.18 4.02 .99 4.50 1 5V19L1.01 19.20C1.05 19.66 1.26 20.08 1.58 20.41C1.91 20.73 2.33 20.94 2.79 20.99L3 21H21L21.20 20.98C21.66 20.94 22.08 20.73 22.41 20.41C22.73 20.08 22.94 19.66 22.99 19.20L23 19V5C23.00 4.50 22.81 4.02 22.48 3.65C22.15 3.29 21.69 3.06 21.20 3.01ZM3 19V5H21V19H3ZM6.97 8.34C6.42 8.64 5.96 9.09 5.64 9.63L5.50 9.87C5.16 10.53 4.99 11.26 5 12L5.00 12.27C5.04 12.92 5.21 13.55 5.50 14.12L5.64 14.36C5.96 14.90 6.42 15.35 6.97 15.65L7.21 15.77C7.79 16.01 8.43 16.06 9.03 15.91L9.29 15.83C9.88 15.61 10.39 15.23 10.77 14.73C10.93 14.53 11.00 14.27 10.97 14.02C10.94 13.77 10.82 13.53 10.63 13.37C10.44 13.20 10.19 13.11 9.93 13.12C9.68 13.13 9.44 13.24 9.26 13.43L9.19 13.50C9.05 13.70 8.85 13.85 8.62 13.94L8.54 13.97C8.35 14.02 8.16 14.00 7.99 13.92L7.91 13.88C7.67 13.75 7.48 13.56 7.35 13.32L7.28 13.20C7.11 12.88 7.02 12.52 7.00 12.16L7 12C6.99 11.58 7.09 11.16 7.28 10.79L7.35 10.67C7.48 10.43 7.67 10.24 7.91 10.11C8.10 10.00 8.32 9.97 8.54 10.02L8.62 10.05C8.81 10.12 8.98 10.24 9.11 10.39L9.19 10.49L9.26 10.57C9.43 10.74 9.66 10.85 9.91 10.87C10.15 10.89 10.40 10.81 10.59 10.66C10.79 10.51 10.92 10.29 10.96 10.05C11.01 9.80 10.96 9.55 10.83 9.34L10.77 9.26L10.60 9.05C10.24 8.65 9.79 8.35 9.29 8.16L9.03 8.08C8.34 7.91 7.60 8.00 6.97 8.34ZM14.97 8.34C14.42 8.64 13.96 9.09 13.64 9.63L13.50 9.87C13.16 10.53 12.99 11.26 13 12L13.00 12.27C13.04 12.92 13.21 13.55 13.50 14.12L13.64 14.36C13.96 14.90 14.42 15.35 14.97 15.65L15.21 15.77C15.79 16.01 16.43 16.06 17.03 15.91L17.29 15.83C17.88 15.61 18.39 15.23 18.77 14.73C18.93 14.53 19.00 14.27 18.97 14.02C18.94 13.77 18.82 13.53 18.63 13.37C18.44 13.20 18.19 13.11 17.93 13.12C17.68 13.13 17.44 13.24 17.26 13.43L17.19 13.50C17.05 13.70 16.85 13.85 16.62 13.94L16.54 13.97C16.35 14.02 16.16 14.00 15.99 13.92L15.91 13.88C15.67 13.75 15.48 13.56 15.35 13.32L15.28 13.20C15.11 12.88 15.02 12.52 15.00 12.16L15 12C14.99 11.58 15.09 11.16 15.28 10.79L15.35 10.67C15.48 10.43 15.67 10.24 15.91 10.11C16.10 10.00 16.32 9.97 16.54 10.02L16.62 10.05C16.81 10.12 16.98 10.24 17.11 10.39L17.19 10.49L17.26 10.57C17.43 10.74 17.66 10.85 17.91 10.87C18.15 10.89 18.40 10.81 18.59 10.66C18.79 10.51 18.92 10.29 18.96 10.05C19.01 9.80 18.96 9.55 18.83 9.34L18.77 9.26L18.60 9.05C18.24 8.65 17.79 8.35 17.29 8.16L17.03 8.08C16.34 7.91 15.60 8.00 14.97 8.34Z"],
			[d*="M21 3H3C2.46 3 1.96 3.21 1.58 3.58C1.21 3.96 1 4.46 1 5V19C1 19.53 1.21 20.03 1.58 20.41C1.96 20.78 2.46 21 3 21H21C21.53 21 22.03 20.78 22.41 20.41C22.78 20.03 23 19.53 23 19V5C23 4.46 22.78 3.96 22.41 3.58C22.03 3.21 21.53 3 21 3ZM9.03 8.08L9.29 8.16C9.79 8.35 10.24 8.65 10.60 9.05L10.77 9.26L10.83 9.34C10.96 9.55 11.01 9.80 10.96 10.05C10.92 10.29 10.79 10.51 10.59 10.66C10.40 10.81 10.15 10.89 9.91 10.87C9.66 10.85 9.43 10.74 9.26 10.57L9.19 10.49L9.11 10.39C8.98 10.24 8.81 10.12 8.62 10.05L8.54 10.02C8.32 9.97 8.10 10.00 7.91 10.11C7.67 10.24 7.48 10.43 7.35 10.67L7.28 10.79C7.09 11.16 6.99 11.58 7 12L7.00 12.16C7.02 12.52 7.11 12.88 7.28 13.20L7.35 13.32C7.48 13.56 7.67 13.75 7.91 13.88L7.99 13.92C8.16 14.00 8.35 14.02 8.54 13.97L8.62 13.94C8.85 13.85 9.05 13.70 9.19 13.50L9.26 13.43C9.44 13.24 9.68 13.13 9.93 13.12C10.19 13.11 10.44 13.20 10.63 13.37C10.82 13.53 10.94 13.77 10.97 14.02C11.00 14.27 10.93 14.53 10.77 14.73C10.39 15.23 9.88 15.61 9.29 15.83L9.03 15.91C8.43 16.06 7.79 16.01 7.21 15.77L6.97 15.65C6.42 15.35 5.95 14.90 5.64 14.36L5.50 14.12C5.21 13.55 5.04 12.92 5.00 12.27L5 12C4.99 11.26 5.17 10.53 5.50 9.87L5.64 9.63C5.96 9.09 6.42 8.64 6.97 8.34C7.60 8.00 8.34 7.91 9.03 8.08ZM17.03 8.08L17.29 8.16C17.79 8.35 18.24 8.65 18.60 9.05L18.77 9.26L18.83 9.34C18.96 9.55 19.01 9.80 18.96 10.05C18.92 10.29 18.79 10.51 18.59 10.66C18.40 10.81 18.15 10.89 17.91 10.87C17.66 10.85 17.43 10.74 17.26 10.57L17.19 10.49L17.11 10.39C16.98 10.24 16.81 10.12 16.62 10.05L16.54 10.02C16.32 9.97 16.10 10.00 15.91 10.11C15.67 10.24 15.48 10.43 15.35 10.67L15.28 10.79C15.09 11.16 14.99 11.58 15 12L15.00 12.16C15.02 12.52 15.11 12.88 15.28 13.20L15.35 13.32C15.48 13.56 15.67 13.75 15.91 13.88L15.99 13.92C16.16 14.00 16.35 14.02 16.54 13.97L16.62 13.94C16.85 13.85 17.05 13.70 17.19 13.50L17.26 13.43C17.44 13.24 17.68 13.13 17.93 13.12C18.19 13.11 18.44 13.20 18.63 13.37C18.82 13.53 18.94 13.77 18.97 14.02C19.00 14.27 18.93 14.53 18.77 14.73C18.39 15.23 17.88 15.61 17.29 15.83L17.03 15.91C16.43 16.06 15.79 16.01 15.21 15.77L14.97 15.65C14.42 15.35 13.95 14.90 13.64 14.36L13.50 14.12C13.21 13.55 13.04 12.92 13.00 12.27L13 12C12.99 11.26 13.17 10.53 13.50 9.87L13.64 9.63C13.96 9.09 14.42 8.64 14.97 8.34C15.60 8.00 16.34 7.91 17.03 8.08Z"] {
			d: path("M11,11 C9.89,11 9,11.9 9,13 L9,23 C9,24.1 9.89,25 11,25 L25,25 C26.1,25 27,24.1 27,23 L27,13 C27,11.9 26.1,11 25,11 L11,11 Z M17,17 L15.5,17 L15.5,16.5 L13.5,16.5 L13.5,19.5 L15.5,19.5 L15.5,19 L17,19 L17,20 C17,20.55 16.55,21 16,21 L13,21 C12.45,21 12,20.55 12,20 L12,16 C12,15.45 12.45,15 13,15 L16,15 C16.55,15 17,15.45 17,16 L17,17 L17,17 Z M24,17 L22.5,17 L22.5,16.5 L20.5,16.5 L20.5,19.5 L22.5,19.5 L22.5,19 L24,19 L24,20 C24,20.55 23.55,21 23,21 L20,21 C19.45,21 19,20.55 19,20 L19,16 C19,15.45 19.45,15 20,15 L23,15 C23.55,15 24,15.45 24,16 L24,17 L24,17 Z");
			transform: scale(1.2) translate(-8px, -8px)
			}
			[d*="M21.20 3.01L21 3H3L2.79 3.01C2.30 3.06 1.84 3.29 1.51 3.65C1.18 4.02 .99 4.50 1 5V19L1.01 19.20C1.05 19.66 1.26 20.08 1.58 20.41C1.91 20.73 2.33 20.94 2.79 20.99L3 21H21L21.20 20.98C21.66 20.94 22.08 20.73 22.41 20.41C22.73 20.08 22.94 19.66 22.99 19.20L23 19V5C23.00 4.50 22.81 4.02 22.48 3.65C22.15 3.29 21.69 3.06 21.20 3.01ZM3 19V5H21V19H3ZM8 11H6C5.73 11 5.48 11.10 5.29 11.29C5.10 11.48 5 11.73 5 12C5 12.26 5.10 12.51 5.29 12.70C5.48 12.89 5.73 13 6 13H8C8.26 13 8.51 12.89 8.70 12.70C8.89 12.51 9 12.26 9 12C9 11.73 8.89 11.48 8.70 11.29C8.51 11.10 8.26 11 8 11ZM18 11H12C11.73 11 11.48 11.10 11.29 11.29C11.10 11.48 11 11.73 11 12C11 12.26 11.10 12.51 11.29 12.70C11.48 12.89 11.73 13 12 13H18C18.26 13 18.51 12.89 18.70 12.70C18.89 12.51 19 12.26 19 12C19 11.73 18.89 11.48 18.70 11.29C18.51 11.10 18.26 11 18 11ZM18 15H16C15.73 15 15.48 15.10 15.29 15.29C15.10 15.48 15 15.73 15 16C15 16.26 15.10 16.51 15.29 16.70C15.48 16.89 15.73 17 16 17H18C18.26 17 18.51 16.89 18.70 16.70C18.89 16.51 19 16.26 19 16C19 15.73 18.89 15.48 18.70 15.29C18.51 15.10 18.26 15 18 15ZM12 15H6C5.73 15 5.48 15.10 5.29 15.29C5.10 15.48 5 15.73 5 16C5 16.26 5.10 16.51 5.29 16.70C5.48 16.89 5.73 17 6 17H12C12.26 17 12.51 16.89 12.70 16.70C12.89 16.51 13 16.26 13 16C13 15.73 12.89 15.48 12.70 15.29C12.51 15.10 12.26 15 12 15Z"] {
			d: path("M11,11 C9.9,11 9,11.9 9,13 L9,23 C9,24.1 9.9,25 11,25 L25,25 C26.1,25 27,24.1 27,23 L27,13 C27,11.9 26.1,11 25,11 L11,11 Z M11,17 L14,17 L14,19 L11,19 L11,17 L11,17 Z M20,23 L11,23 L11,21 L20,21 L20,23 L20,23 Z M25,23 L22,23 L22,21 L25,21 L25,23 L25,23 Z M25,19 L16,19 L16,17 L25,17 L25,19 L25,19 Z");
			transform: scale(1.2) translate(-8px, -8px)
			}
			[d*="M12.84 1H11.15C10.72 .99 10.30 1.14 9.95 1.40C9.60 1.66 9.35 2.02 9.23 2.44L9.19 2.61C9.11 3.00 8.96 3.38 8.73 3.71C8.51 4.04 8.22 4.33 7.89 4.55L7.75 4.64C7.37 4.85 6.96 4.98 6.53 5.02C6.11 5.06 5.68 5.01 5.27 4.87C4.86 4.73 4.42 4.73 4.00 4.86C3.59 5.00 3.23 5.26 2.99 5.62L2.89 5.77L2.05 7.23C1.82 7.63 1.73 8.10 1.81 8.55C1.88 9.01 2.12 9.43 2.47 9.73L2.58 9.84C3.15 10.39 3.50 11.15 3.50 12L3.49 12.16C3.47 12.56 3.37 12.95 3.19 13.31C3.01 13.67 2.77 13.99 2.47 14.26C2.12 14.56 1.88 14.98 1.81 15.43C1.73 15.89 1.82 16.36 2.05 16.76L2.89 18.22L2.99 18.37C3.24 18.73 3.59 18.99 4.01 19.13C4.42 19.26 4.86 19.26 5.27 19.12L5.42 19.07C5.81 18.96 6.21 18.93 6.61 18.98C7.01 19.03 7.40 19.15 7.75 19.36L7.89 19.44C8.22 19.66 8.51 19.95 8.73 20.28C8.96 20.61 9.11 20.99 9.19 21.38C9.28 21.84 9.52 22.24 9.88 22.54C10.24 22.83 10.69 23.00 11.15 23H12.84C13.30 23.00 13.75 22.83 14.11 22.54C14.47 22.24 14.71 21.84 14.80 21.38C14.89 20.96 15.06 20.56 15.31 20.21C15.55 19.86 15.88 19.57 16.25 19.36L16.39 19.28C16.75 19.10 17.14 18.99 17.54 18.96C17.94 18.94 18.34 18.99 18.72 19.12L18.89 19.17C19.31 19.27 19.75 19.24 20.15 19.07C20.55 18.90 20.88 18.60 21.10 18.23L21.95 16.76C22.18 16.36 22.26 15.89 22.19 15.43C22.11 14.98 21.88 14.56 21.53 14.26C21.23 13.99 20.98 13.67 20.80 13.31C20.63 12.95 20.52 12.56 20.50 12.16L20.50 12C20.50 11.57 20.59 11.14 20.77 10.75C20.94 10.36 21.20 10.01 21.53 9.73C21.88 9.43 22.11 9.01 22.19 8.55C22.26 8.10 22.18 7.63 21.95 7.23L21.10 5.76C20.88 5.39 20.55 5.09 20.15 4.92C19.76 4.75 19.31 4.72 18.89 4.82L18.72 4.87C18.34 5.00 17.94 5.05 17.54 5.03C17.14 5.00 16.75 4.89 16.4 4.71L16.25 4.63C15.88 4.42 15.56 4.13 15.31 3.78C15.06 3.43 14.89 3.03 14.80 2.61C14.71 2.15 14.47 1.74 14.11 1.45C13.75 1.16 13.30 .99 12.84 1ZM11.15 3H12.84C12.98 3.70 13.26 4.36 13.68 4.94C14.09 5.52 14.63 6.01 15.25 6.37C15.87 6.72 16.55 6.94 17.26 7.01C17.97 7.08 18.69 6.99 19.37 6.76L20.21 8.23C19.67 8.69 19.24 9.27 18.94 9.92C18.65 10.57 18.50 11.28 18.5 12C18.50 12.71 18.65 13.42 18.95 14.07C19.24 14.72 19.67 15.29 20.21 15.76L19.37 17.23C18.69 16.99 17.97 16.91 17.26 16.98C16.55 17.05 15.86 17.27 15.25 17.63C14.63 17.98 14.09 18.47 13.68 19.05C13.26 19.63 12.98 20.29 12.84 21H11.15C11.01 20.29 10.73 19.63 10.31 19.05C9.90 18.47 9.36 17.98 8.75 17.62C8.13 17.27 7.44 17.05 6.73 16.98C6.02 16.91 5.30 16.99 4.62 17.23L3.78 15.76C4.32 15.29 4.75 14.71 5.05 14.06C5.34 13.41 5.49 12.71 5.5 12C5.50 11.28 5.34 10.57 5.05 9.92C4.75 9.27 4.32 8.69 3.78 8.23L4.62 6.76C5.30 7.00 6.02 7.08 6.73 7.01C7.44 6.94 8.13 6.72 8.75 6.37C9.36 6.01 9.90 5.52 10.31 4.94C10.73 4.36 11.01 3.70 11.15 3ZM12.00 8C10.94 8 9.92 8.42 9.17 9.17C8.42 9.92 8.00 10.93 8.00 12C8.00 13.06 8.42 14.07 9.17 14.82C9.92 15.57 10.94 16 12.00 16C13.06 16 14.08 15.57 14.83 14.82C15.58 14.07 16.00 13.06 16.00 12C16.00 10.93 15.58 9.92 14.83 9.17C14.08 8.42 13.06 8 12.00 8ZM12.00 10H12L12.20 10.01C12.69 10.06 13.15 10.29 13.48 10.65C13.81 11.02 14.00 11.50 14 12L13.99 12.20C13.95 12.58 13.80 12.95 13.55 13.25C13.31 13.55 12.98 13.78 12.62 13.90C12.25 14.02 11.85 14.03 11.48 13.93C11.11 13.83 10.77 13.62 10.51 13.34C10.25 13.05 10.08 12.69 10.02 12.31C9.96 11.93 10.01 11.54 10.17 11.18C10.32 10.83 10.58 10.53 10.91 10.32C11.23 10.11 11.61 10.00 12 10"] {
			d: path("m 23.94,18.78 c .03,-0.25 .05,-0.51 .05,-0.78 0,-0.27 -0.02,-0.52 -0.05,-0.78 l 1.68,-1.32 c .15,-0.12 .19,-0.33 .09,-0.51 l -1.6,-2.76 c -0.09,-0.17 -0.31,-0.24 -0.48,-0.17 l -1.99,.8 c -0.41,-0.32 -0.86,-0.58 -1.35,-0.78 l -0.30,-2.12 c -0.02,-0.19 -0.19,-0.33 -0.39,-0.33 l -3.2,0 c -0.2,0 -0.36,.14 -0.39,.33 l -0.30,2.12 c -0.48,.2 -0.93,.47 -1.35,.78 l -1.99,-0.8 c -0.18,-0.07 -0.39,0 -0.48,.17 l -1.6,2.76 c -0.10,.17 -0.05,.39 .09,.51 l 1.68,1.32 c -0.03,.25 -0.05,.52 -0.05,.78 0,.26 .02,.52 .05,.78 l -1.68,1.32 c -0.15,.12 -0.19,.33 -0.09,.51 l 1.6,2.76 c .09,.17 .31,.24 .48,.17 l 1.99,-0.8 c .41,.32 .86,.58 1.35,.78 l .30,2.12 c .02,.19 .19,.33 .39,.33 l 3.2,0 c .2,0 .36,-0.14 .39,-0.33 l .30,-2.12 c .48,-0.2 .93,-0.47 1.35,-0.78 l 1.99,.8 c .18,.07 .39,0 .48,-0.17 l 1.6,-2.76 c .09,-0.17 .05,-0.39 -0.09,-0.51 l -1.68,-1.32 0,0 z m -5.94,2.01 c -1.54,0 -2.8,-1.25 -2.8,-2.8 0,-1.54 1.25,-2.8 2.8,-2.8 1.54,0 2.8,1.25 2.8,2.8 0,1.54 -1.25,2.8 -2.8,2.8 l 0,0 z");
			transform: scale(1.2) translate(-8px, -8px)
			}
			[d*="M21.20 3.01C21.66 3.05 22.08 3.26 22.41 3.58C22.73 3.91 22.94 4.33 22.98 4.79L23 5V19C23.00 19.49 22.81 19.97 22.48 20.34C22.15 20.70 21.69 20.93 21.20 20.99L21 21H3L2.79 20.99C2.30 20.93 1.84 20.70 1.51 20.34C1.18 19.97 .99 19.49 1 19V13H3V19H21V5H11V3H21L21.20 3.01ZM1.29 3.29C1.10 3.48 1.00 3.73 1.00 4C1.00 4.26 1.10 4.51 1.29 4.70L5.58 9H3C2.73 9 2.48 9.10 2.29 9.29C2.10 9.48 2 9.73 2 10C2 10.26 2.10 10.51 2.29 10.70C2.48 10.89 2.73 11 3 11H9V5C9 4.73 8.89 4.48 8.70 4.29C8.51 4.10 8.26 4 8 4C7.73 4 7.48 4.10 7.29 4.29C7.10 4.48 7 4.73 7 5V7.58L2.70 3.29C2.51 3.10 2.26 3.00 2 3.00C1.73 3.00 1.48 3.10 1.29 3.29ZM19.10 11.00L19 11H12L11.89 11.00C11.66 11.02 11.45 11.13 11.29 11.29C11.13 11.45 11.02 11.66 11.00 11.89L11 12V17C10.99 17.24 11.09 17.48 11.25 17.67C11.42 17.85 11.65 17.96 11.89 17.99L12 18H19L19.10 17.99C19.34 17.96 19.57 17.85 19.74 17.67C19.90 17.48 20.00 17.24 20 17V12L19.99 11.89C19.97 11.66 19.87 11.45 19.70 11.29C19.54 11.13 19.33 11.02 19.10 11.00ZM13 16V13H18V16H13Z"] {
			d: path("M25,17 L17,17 L17,23 L25,23 L25,17 L25,17 Z M29,25 L29,10.98 C29,9.88 28.1,9 27,9 L9,9 C7.9,9 7,9.88 7,10.98 L7,25 C7,26.1 7.9,27 9,27 L27,27 C28.1,27 29,26.1 29,25 L29,25 Z M27,25.02 L9,25.02 L9,10.97 L27,10.97 L27,25.02 L27,25.02 Z");
			transform: scale(1.083) translate(-6.75px, -6.75px)
			}
			[d*="M21.20 3.01L21 3H3L2.79 3.01C2.30 3.06 1.84 3.29 1.51 3.65C1.18 4.02 .99 4.50 1 5V19L1.01 19.20C1.05 19.66 1.26 20.08 1.58 20.41C1.91 20.73 2.33 20.94 2.79 20.99L3 21H21L21.20 20.98C21.66 20.94 22.08 20.73 22.41 20.41C22.73 20.08 22.94 19.66 22.99 19.20L23 19V5C23.00 4.50 22.81 4.02 22.48 3.65C22.15 3.29 21.69 3.06 21.20 3.01ZM3 15V5H21V15H3ZM7.87 6.72L7.79 6.79L4.58 10L7.79 13.20C7.88 13.30 7.99 13.37 8.11 13.43C8.23 13.48 8.37 13.51 8.50 13.51C8.63 13.51 8.76 13.48 8.89 13.43C9.01 13.38 9.12 13.31 9.21 13.21C9.31 13.12 9.38 13.01 9.43 12.89C9.48 12.76 9.51 12.63 9.51 12.50C9.51 12.37 9.48 12.23 9.43 12.11C9.37 11.99 9.30 11.88 9.20 11.79L7.41 10L9.20 8.20L9.27 8.13C9.42 7.93 9.50 7.69 9.48 7.45C9.47 7.20 9.36 6.97 9.19 6.80C9.02 6.63 8.79 6.52 8.54 6.51C8.30 6.49 8.06 6.57 7.87 6.72ZM14.79 6.79C14.60 6.98 14.50 7.23 14.50 7.5C14.50 7.76 14.60 8.01 14.79 8.20L16.58 10L14.79 11.79L14.72 11.86C14.57 12.06 14.49 12.30 14.50 12.54C14.51 12.79 14.62 13.02 14.79 13.20C14.97 13.37 15.20 13.48 15.45 13.49C15.69 13.50 15.93 13.42 16.13 13.27L16.20 13.20L19.41 10L16.20 6.79C16.01 6.60 15.76 6.50 15.5 6.50C15.23 6.50 14.98 6.60 14.79 6.79ZM3 19V17H21V19H3Z"] {
			d: path("m 28,11 0,14 -20,0 0,-14 z m -18,2 16,0 0,10 -16,0 0,-10 z");
			transform: scale(1.2) translate(-8px, -8px);
			fill: rgb(255, 255, 255);
			fill-rule: evenodd
			}
			[d*="M21.20 3.01L21 3H3L2.79 3.01C2.30 3.06 1.84 3.29 1.51 3.65C1.18 4.02 .99 4.50 1 5V19L1.01 19.20C1.05 19.66 1.26 20.08 1.58 20.41C1.91 20.73 2.33 20.94 2.79 20.99L3 21H21L21.20 20.98C21.66 20.94 22.08 20.73 22.41 20.41C22.73 20.08 22.94 19.66 22.99 19.20L23 19V5C23.00 4.50 22.81 4.02 22.48 3.65C22.15 3.29 21.69 3.06 21.20 3.01ZM3 15V5H21V15H3ZM16.87 6.72H16.86L16.79 6.79L13.58 10L16.79 13.20C16.88 13.30 16.99 13.37 17.11 13.43C17.23 13.48 17.37 13.51 17.50 13.51C17.63 13.51 17.76 13.48 17.89 13.43C18.01 13.38 18.12 13.31 18.21 13.21C18.31 13.12 18.38 13.01 18.43 12.89C18.48 12.76 18.51 12.63 18.51 12.50C18.51 12.37 18.48 12.23 18.43 12.11C18.37 11.99 18.30 11.88 18.20 11.79L16.41 10L18.20 8.20L18.27 8.13C18.42 7.93 18.50 7.69 18.49 7.45C18.47 7.20 18.37 6.97 18.20 6.79C18.02 6.62 17.79 6.52 17.55 6.50C17.30 6.49 17.06 6.57 16.87 6.72ZM5.79 6.79C5.60 6.98 5.50 7.23 5.50 7.5C5.50 7.76 5.60 8.01 5.79 8.20L7.58 10L5.79 11.79L5.72 11.86C5.57 12.06 5.49 12.30 5.50 12.54C5.51 12.79 5.62 13.02 5.79 13.20C5.97 13.37 6.20 13.48 6.45 13.49C6.69 13.50 6.93 13.42 7.13 13.27L7.20 13.20L10.41 10L7.20 6.79C7.01 6.60 6.76 6.50 6.5 6.50C6.23 6.50 5.98 6.60 5.79 6.79ZM3 19V17H21V19H3Z"] {
			d: path("m 26,13 0,10 -16,0 0,-10 z m -14,2 12,0 0,6 -12,0 0,-6 z");
			transform: scale(1.2) translate(-8px, -8px);
			fill: rgb(255, 255, 255);
			fill-rule: evenodd
			}
			[d*="M21 3H3C2.46 3 1.96 3.21 1.58 3.58C1.21 3.96 1 4.46 1 5V8C1.68 8.00 2.34 8.05 3 8.15V5H21V19H13.84C13.94 19.65 13.99 20.31 14 21H21C21.53 21 22.03 20.78 22.41 20.41C22.78 20.03 23 19.53 23 19V5C23 4.46 22.78 3.96 22.41 3.58C22.03 3.21 21.53 3 21 3ZM1 10V12C2.18 12 3.35 12.23 4.44 12.68C5.53 13.13 6.52 13.80 7.36 14.63C8.19 15.47 8.86 16.46 9.31 17.55C9.76 18.64 10 19.81 10 21H12C12 18.08 10.84 15.28 8.77 13.22C6.71 11.15 3.91 10 1 10ZM1 14V16C1.65 16 2.30 16.12 2.91 16.38C3.52 16.63 4.07 17.00 4.53 17.46C4.99 17.92 5.36 18.48 5.61 19.08C5.87 19.69 6 20.34 6 21H8C8 19.14 7.26 17.36 5.94 16.05C4.63 14.73 2.85 14 1 14ZM1 18V21H4C3.99 20.20 3.68 19.44 3.12 18.87C2.55 18.31 1.79 18.00 1 18Z"] {
			d: path("M27,9 L9,9 C7.9,9 7,9.9 7,11 L7,14 L9,14 L9,11 L27,11 L27,25 L20,25 L20,27 L27,27 C28.1,27 29,26.1 29,25 L29,11 C29,9.9 28.1,9 27,9 L27,9 Z M7,24 L7,27 L10,27 C10,25.34 8.66,24 7,24 L7,24 Z M7,20 L7,22 C9.76,22 12,24.24 12,27 L14,27 C14,23.13 10.87,20 7,20 L7,20 Z M7,16 L7,18 C11.97,18 16,22.03 16,27 L18,27 C18,20.92 13.07,16 7,16 L7,16 Z");
			transform: scale(1.083) translate(-6.75px, -6.75px)
			}
			[d*="M10 3H3V10C3 10.26 3.10 10.51 3.29 10.70C3.48 10.89 3.73 11 4 11C4.26 11 4.51 10.89 4.70 10.70C4.89 10.51 5 10.26 5 10V6.41L9.29 10.70L9.36 10.77C9.56 10.92 9.80 11.00 10.04 10.99C10.29 10.98 10.52 10.87 10.70 10.70C10.87 10.52 10.98 10.29 10.99 10.04C11.00 9.80 10.92 9.56 10.77 9.36L10.70 9.29L6.41 5H10C10.26 5 10.51 4.89 10.70 4.70C10.89 4.51 11 4.26 11 4C11 3.73 10.89 3.48 10.70 3.29C10.51 3.10 10.26 3 10 3ZM20 13C19.73 13 19.48 13.10 19.29 13.29C19.10 13.48 19 13.73 19 14V17.58L14.70 13.29L14.63 13.22C14.43 13.07 14.19 12.99 13.95 13.00C13.70 13.01 13.47 13.12 13.29 13.29C13.12 13.47 13.01 13.70 13.00 13.95C12.99 14.19 13.07 14.43 13.22 14.63L13.29 14.70L17.58 19H14C13.73 19 13.48 19.10 13.29 19.29C13.10 19.48 13 19.73 13 20C13 20.26 13.10 20.51 13.29 20.70C13.48 20.89 13.73 21 14 21H21V14C21 13.73 20.89 13.48 20.70 13.29C20.51 13.10 20.26 13 20 13Z"] {
			d: path("M7,11H6V6h5v1H7V11z M18,6h-5v1h4v4h1V6z M18,13h-1v4h-4v1h5V13z M11,17H7v-4H6v5h5V17z");
			transform: scale(1.5) translate(-4px, -4px)
			}
			[d*="M3.29 3.29C3.11 3.46 3.01 3.70 3.00 3.94C2.98 4.19 3.06 4.43 3.22 4.63L3.29 4.70L7.58 8.99H5C4.73 8.99 4.48 9.10 4.29 9.29C4.10 9.47 4 9.73 4 9.99C4 10.26 4.10 10.51 4.29 10.70C4.48 10.89 4.73 10.99 5 10.99H11V4.99C11 4.73 10.89 4.47 10.70 4.29C10.51 4.10 10.26 3.99 10 3.99C9.73 3.99 9.48 4.10 9.29 4.29C9.10 4.47 9 4.73 9 4.99V7.58L4.70 3.29L4.63 3.22C4.43 3.06 4.19 2.98 3.94 3.00C3.70 3.01 3.46 3.11 3.29 3.29ZM19 13H13V19C13 19.26 13.10 19.51 13.29 19.70C13.48 19.89 13.73 20 14 20C14.26 20 14.51 19.89 14.70 19.70C14.89 19.51 15 19.26 15 19V16.41L19.29 20.70L19.36 20.77C19.56 20.92 19.80 21.00 20.04 20.99C20.29 20.98 20.52 20.87 20.70 20.70C20.87 20.52 20.98 20.29 20.99 20.04C21.00 19.80 20.92 19.56 20.77 19.36L20.70 19.29L16.41 15H19C19.26 15 19.51 14.89 19.70 14.70C19.89 14.51 20 14.26 20 14C20 13.73 19.89 13.48 19.70 13.29C19.51 13.10 19.26 13 19 13Z"] {
			d: path("M10,10H6V9h3V6h1V10z M18,9h-3V6h-1v4h4V9z M15,15h3v-1h-4v4h1V15z M10,14H6v1h3v3h1V14z");
			transform: scale(1.5) translate(-4px, -4px)
			}
			[d*="M12 .99C5.92 .99 1 5.92 1 11.99C1 18.07 5.92 22.99 12 22.99C18.07 22.99 23 18.07 23 11.99C23 5.92 18.07 .99 12 .99ZM12 2.99C14.38 2.99 16.67 3.94 18.36 5.63C20.05 7.32 21 9.61 21 11.99C21 14.38 20.05 16.67 18.36 18.36C16.67 20.05 14.38 20.99 12 20.99C9.61 20.99 7.32 20.05 5.63 18.36C3.94 16.67 3 14.38 3 11.99C3 9.61 3.94 7.32 5.63 5.63C7.32 3.94 9.61 2.99 12 2.99ZM14 6.00C13.73 6.00 13.48 6.10 13.29 6.29C13.10 6.48 13 6.73 13 7.00V17.00C13 17.26 13.10 17.52 13.29 17.70C13.48 17.89 13.73 18.00 14 18.00C14.26 18.00 14.51 17.89 14.70 17.70C14.89 17.52 15 17.26 15 17.00V7.00C15 6.73 14.89 6.48 14.70 6.29C14.51 6.10 14.26 6.00 14 6.00ZM10 8.00C9.73 8.00 9.48 8.10 9.29 8.29C9.10 8.48 9 8.73 9 9.00V15.00C9 15.26 9.10 15.52 9.29 15.70C9.48 15.89 9.73 16.00 10 16.00C10.26 16.00 10.51 15.89 10.70 15.70C10.89 15.52 11 15.26 11 15.00V9.00C11 8.73 10.89 8.48 10.70 8.29C10.51 8.10 10.26 8.00 10 8.00ZM18 9.00C17.73 9.00 17.48 9.10 17.29 9.29C17.10 9.48 17 9.73 17 10.00V14.00C17 14.26 17.10 14.52 17.29 14.70C17.48 14.89 17.73 15.00 18 15.00C18.26 15.00 18.51 14.89 18.70 14.70C18.89 14.52 19 14.26 19 14.00V10.00C19 9.73 18.89 9.48 18.70 9.29C18.51 9.10 18.26 9.00 18 9.00ZM6 10.00C5.73 10.00 5.48 10.10 5.29 10.29C5.10 10.48 5 10.73 5 11.00V13.00C5 13.26 5.10 13.52 5.29 13.70C5.48 13.89 5.73 14.00 6 14.00C6.26 14.00 6.51 13.89 6.70 13.70C6.89 13.52 7 13.26 7 13.00V11.00C7 10.73 6.89 10.48 6.70 10.29C6.51 10.10 6.26 10.00 6 10.00Z"] {
			d: path("M7 13H5v-2h2v2zm3-4H8v6h2V9zm3-3h-2v12h2V6zm3 2h-2v8h2V8zm3 2h-2v4h2v-4zm-7-7c-4.96 0-9 4.04-9 9s4.04 9 9 9 9-4.04 9-9-4.04-9-9-9m0-1c5.52 0 10 4.48 10 10s-4.48 10-10 10S2 17.52 2 12 6.48 2 12 2z")
			}
			[d*="M9.65 6.00L9.5 6H2.5L2.34 6.00C1.97 6.04 1.63 6.21 1.38 6.49C1.13 6.77 1.00 7.12 1 7.5V13.5L1.00 13.65C1.04 14.02 1.21 14.36 1.49 14.61C1.77 14.86 2.12 15 2.5 15H4.5L3.81 17.75C3.77 17.89 3.77 18.03 3.79 18.17C3.82 18.31 3.87 18.45 3.95 18.56C4.03 18.68 4.14 18.78 4.26 18.85C4.38 18.92 4.51 18.97 4.66 18.99L4.78 19H8.55L8.72 18.98C8.88 18.95 9.04 18.89 9.17 18.79C9.30 18.68 9.40 18.55 9.47 18.40L9.52 18.24L10.62 13.96C10.84 13.11 10.96 12.24 10.99 11.36L11 10.98V7.5C11 7.12 10.86 6.77 10.61 6.49C10.36 6.21 10.02 6.04 9.65 6.00ZM21.65 6.00L21.5 6H14.5L14.34 6.00C13.97 6.04 13.63 6.21 13.38 6.49C13.13 6.77 13 7.12 13 7.5V13.5L13.00 13.65C13.04 14.02 13.21 14.36 13.49 14.61C13.77 14.86 14.12 15 14.5 15H16.5L15.81 17.75C15.77 17.89 15.77 18.03 15.79 18.17C15.82 18.31 15.87 18.44 15.95 18.56C16.03 18.68 16.14 18.78 16.26 18.85C16.38 18.92 16.51 18.97 16.66 18.99L16.78 19H20.55L20.72 18.98C20.88 18.95 21.04 18.89 21.17 18.79C21.30 18.68 21.40 18.55 21.47 18.40L21.52 18.24L22.62 13.96C22.84 13.11 22.96 12.24 22.99 11.36L23 10.98V7.5C23 7.12 22.86 6.77 22.61 6.49C22.36 6.21 22.02 6.04 21.65 6.00ZM3 13V8H9V10.98C9.00 11.71 8.91 12.44 8.76 13.16L8.68 13.47L7.78 17H6.06L6.44 15.48L7.06 13H3ZM15 13V8H21V10.98C21 11.71 20.91 12.44 20.76 13.16L20.68 13.47L19.78 17H18.06L18.44 15.48L19.06 13H15Z"] {
			d: path("M17.5,7c1.93,0,3.5,1.57,3.5,3.5c0,1-0.53,4.5-0.85,6.5h-2.02l0.24-1.89l0.14-1.09l-1.1-0.03C15.5,13.94,14,12.4,14,10.5 C14,8.57,15.57,7,17.5,7             M6.5,7C8.43,7,10,8.57,10,10.5c0,1-0.53,4.5-0.85,6.5H7.13l0.24-1.89l0.14-1.09l-1.1-0.03 C4.5,13.94,3,12.4,3,10.5C3,8.57,4.57,7,6.5,7             M17.5,6C15.01,6,13,8.01,13,10.5c0,2.44,1.95,4.42,4.38,4.49L17,18h4c0,0,1-6,1-7.5 C22,8.01,19.99,6,17.5,6L17.5,6z             M6.5,6C4.01,6,2,8.01,2,10.5c0,2.44,1.95,4.42,4.38,4.49L6,18h4c0,0,1-6,1-7.5 C11,8.01,8.99,6,6.5,6L6.5,6z")
			}
			[d*="M19.4 .2C19.29 .27 19.20 .37 19.13 .49C19.07 .60 19.02 .72 19.01 .85C18.99 .98 18.99 1.12 19.03 1.24C19.06 1.37 19.12 1.49 19.2 1.6L20.8 .4C20.64 .18 20.40 .04 20.14 .01C19.87 -0.02 19.61 .04 19.4 .2ZM20.8 .4L20 1L19.2 1.59C20.37 3.16 21.00 5.06 21.00 7.01C20.99 8.97 20.35 10.87 19.17 12.42C19.01 12.64 18.94 12.90 18.98 13.16C19.02 13.43 19.16 13.66 19.37 13.83C19.58 13.99 19.84 14.05 20.11 14.02C20.37 13.98 20.61 13.84 20.77 13.63C22.21 11.73 22.99 9.41 23 7.02C23.00 4.63 22.23 2.31 20.8 .4ZM10 2C8.67 2 7.40 2.52 6.46 3.46C5.52 4.40 5 5.67 5 7C5 8.32 5.52 9.59 6.46 10.53C7.40 11.47 8.67 12 10 12C11.32 12 12.59 11.47 13.53 10.53C14.47 9.59 15 8.32 15 7C15 5.67 14.47 4.40 13.53 3.46C12.59 2.52 11.32 2 10 2ZM16.17 2.29C15.97 2.48 15.86 2.73 15.86 2.99C15.85 3.26 15.95 3.51 16.14 3.71C16.98 4.58 17.44 5.68 17.49 6.80L17.5 7.02C17.49 8.22 17.01 9.40 16.10 10.32C15.92 10.51 15.83 10.77 15.83 11.03C15.84 11.29 15.95 11.53 16.13 11.71C16.32 11.90 16.57 12.00 16.83 12.00C17.09 12.00 17.34 11.90 17.53 11.72C18.78 10.44 19.49 8.77 19.5 7.03L19.49 6.71C19.42 5.09 18.74 3.53 17.58 2.32C17.49 2.23 17.38 2.15 17.26 2.10C17.14 2.05 17.01 2.02 16.88 2.01C16.75 2.01 16.62 2.03 16.49 2.08C16.37 2.13 16.26 2.20 16.17 2.29ZM10 4C10.39 4 10.78 4.07 11.14 4.22C11.51 4.37 11.84 4.60 12.12 4.87C12.39 5.15 12.62 5.48 12.77 5.85C12.92 6.21 13 6.60 13 7C13 7.39 12.92 7.78 12.77 8.14C12.62 8.51 12.39 8.84 12.12 9.12C11.84 9.39 11.51 9.62 11.14 9.77C10.78 9.92 10.39 10 10 10C9.20 10 8.44 9.68 7.87 9.12C7.31 8.55 7 7.79 7 7C7 6.20 7.31 5.44 7.87 4.87C8.44 4.31 9.20 4 10 4ZM10.39 13.01L10 13C8.01 12.99 6.10 13.73 4.63 15.06L4.34 15.34C3.60 16.08 3.01 16.96 2.60 17.93C2.20 18.90 1.99 19.94 2 21C2 21.26 2.10 21.51 2.29 21.70C2.48 21.89 2.73 22 3 22C3.26 22 3.51 21.89 3.70 21.70C3.89 21.51 4 21.26 4 21C4.00 19.40 4.63 17.88 5.75 16.75L5.97 16.55C7.07 15.55 8.51 15 10 15L10.29 15.00C11.78 15.08 13.18 15.70 14.24 16.75L14.44 16.97C15.44 18.07 16 19.51 16 21C16 21.26 16.10 21.51 16.29 21.70C16.48 21.89 16.73 22 17 22C17.26 22 17.51 21.89 17.70 21.70C17.89 21.51 18 21.26 18 21C18.00 19.01 17.26 17.10 15.93 15.63L15.65 15.34C14.25 13.93 12.37 13.10 10.39 13.01Z"] {
			d: path("M11.72,11.93C13.58,11.59,15,9.96,15,8c0-2.21-1.79-4-4-4C8.79,4,7,5.79,7,8c0,1.96,1.42,3.59,3.28,3.93 C4.77,12.21,2,15.76,2,20h18C20,15.76,17.23,12.21,11.72,11.93z            M8,8c0-1.65,1.35-3,3-3s3,1.35,3,3s-1.35,3-3,3S8,9.65,8,8z            M11,12.9c5.33,0,7.56,2.99,7.94,6.1H3.06C3.44,15.89,5.67,12.9,11,12.9z            M16.68,11.44l-0.48-0.88C17.31,9.95,18,8.77,18,7.5 c0-1.27-0.69-2.45-1.81-3.06l0.49-0.88C18.11,4.36,19,5.87,19,7.5C19,9.14,18.11,10.64,16.68,11.44z            M18.75,13.13l-0.5-0.87 C19.95,11.28,21,9.46,21,7.5s-1.05-3.78-2.75-4.76l0.5-0.87C20.75,3.03,22,5.19,22,7.5S20.76,11.97,18.75,13.13z")
			}
			.ytp-delhi-modern .ytp-settings-menu .ytp-menuitem [d*="M21.20 3.01L21 3H3L2.79 3.01C2.30 3.06 1.84 3.29 1.51 3.65C1.18 4.02 .99 4.50 1 5V19L1.01 19.20C1.05 19.66 1.26 20.08 1.58 20.41C1.91 20.73 2.33 20.94 2.79 20.99L3 21H21L21.20 20.98C21.66 20.94 22.08 20.73 22.41 20.41C22.73 20.08 22.94 19.66 22.99 19.20L23 19V5C23.00 4.50 22.81 4.02 22.48 3.65C22.15 3.29 21.69 3.06 21.20 3.01ZM3 19V5H21V19H3ZM6.97 8.34C6.42 8.64 5.96 9.09 5.64 9.63L5.50 9.87C5.16 10.53 4.99 11.26 5 12L5.00 12.27C5.04 12.92 5.21 13.55 5.50 14.12L5.64 14.36C5.96 14.90 6.42 15.35 6.97 15.65L7.21 15.77C7.79 16.01 8.43 16.06 9.03 15.91L9.29 15.83C9.88 15.61 10.39 15.23 10.77 14.73C10.93 14.53 11.00 14.27 10.97 14.02C10.94 13.77 10.82 13.53 10.63 13.37C10.44 13.20 10.19 13.11 9.93 13.12C9.68 13.13 9.44 13.24 9.26 13.43L9.19 13.50C9.05 13.70 8.85 13.85 8.62 13.94L8.54 13.97C8.35 14.02 8.16 14.00 7.99 13.92L7.91 13.88C7.67 13.75 7.48 13.56 7.35 13.32L7.28 13.20C7.11 12.88 7.02 12.52 7.00 12.16L7 12C6.99 11.58 7.09 11.16 7.28 10.79L7.35 10.67C7.48 10.43 7.67 10.24 7.91 10.11C8.10 10.00 8.32 9.97 8.54 10.02L8.62 10.05C8.81 10.12 8.98 10.24 9.11 10.39L9.19 10.49L9.26 10.57C9.43 10.74 9.66 10.85 9.91 10.87C10.15 10.89 10.40 10.81 10.59 10.66C10.79 10.51 10.92 10.29 10.96 10.05C11.01 9.80 10.96 9.55 10.83 9.34L10.77 9.26L10.60 9.05C10.24 8.65 9.79 8.35 9.29 8.16L9.03 8.08C8.34 7.91 7.60 8.00 6.97 8.34ZM14.97 8.34C14.42 8.64 13.96 9.09 13.64 9.63L13.50 9.87C13.16 10.53 12.99 11.26 13 12L13.00 12.27C13.04 12.92 13.21 13.55 13.50 14.12L13.64 14.36C13.96 14.90 14.42 15.35 14.97 15.65L15.21 15.77C15.79 16.01 16.43 16.06 17.03 15.91L17.29 15.83C17.88 15.61 18.39 15.23 18.77 14.73C18.93 14.53 19.00 14.27 18.97 14.02C18.94 13.77 18.82 13.53 18.63 13.37C18.44 13.20 18.19 13.11 17.93 13.12C17.68 13.13 17.44 13.24 17.26 13.43L17.19 13.50C17.05 13.70 16.85 13.85 16.62 13.94L16.54 13.97C16.35 14.02 16.16 14.00 15.99 13.92L15.91 13.88C15.67 13.75 15.48 13.56 15.35 13.32L15.28 13.20C15.11 12.88 15.02 12.52 15.00 12.16L15 12C14.99 11.58 15.09 11.16 15.28 10.79L15.35 10.67C15.48 10.43 15.67 10.24 15.91 10.11C16.10 10.00 16.32 9.97 16.54 10.02L16.62 10.05C16.81 10.12 16.98 10.24 17.11 10.39L17.19 10.49L17.26 10.57C17.43 10.74 17.66 10.85 17.91 10.87C18.15 10.89 18.40 10.81 18.59 10.66C18.79 10.51 18.92 10.29 18.96 10.05C19.01 9.80 18.96 9.55 18.83 9.34L18.77 9.26L18.60 9.05C18.24 8.65 17.79 8.35 17.29 8.16L17.03 8.08C16.34 7.91 15.60 8.00 14.97 8.34Z"] {
			d: path("M6,14v-4c0-0.55,.45-1,1-1h3c0.55,0,1,.45,1,1v1H9.5v-0.5h-2v3h2V13H11v1c0,.55-0.45,1-1,1H7C6.45,15,6,14.55,6,14z            M14,15h3c0.55,0,1-0.45,1-1v-1h-1.5v0.5h-2v-3h2V11H18v-1c0-0.55-0.45-1-1-1h-3c-0.55,0-1,.45-1,1v4C13,14.55,13.45,15,14,15z            M20,4H4v16h16V4 M21,3v18H3V3.01C3,3,3,3,3.01,3H21L21,3z");
			transform: translate(0, 0)
			}
			[d*="M12.33 1.00C12.22 1.00 12.11 1.00 12 1C5.92 1 1 5.92 1 12C1 18.07 5.92 23 12 23C13.90 23.00 15.78 22.50 17.44 21.55C19.10 20.61 20.48 19.25 21.46 17.61L21.64 17.29C22.06 16.52 21.21 15.73 20.35 15.88C18.76 16.15 17.12 15.94 15.66 15.27C14.19 14.59 12.97 13.49 12.14 12.11C11.31 10.73 10.91 9.13 11.01 7.52C11.11 5.91 11.69 4.37 12.67 3.09L12.89 2.83C13.45 2.16 13.20 1.03 12.33 1.00ZM15.56 2.60C15.45 2.84 15.43 3.11 15.51 3.36C15.59 3.61 15.77 3.82 16.01 3.94C16.91 4.39 17.73 4.99 18.44 5.71L18.73 6.03L18.80 6.10C18.99 6.27 19.22 6.36 19.47 6.37C19.72 6.37 19.96 6.28 20.15 6.12C20.33 5.95 20.45 5.72 20.48 5.48C20.51 5.23 20.44 4.98 20.29 4.78L20.23 4.70L19.87 4.31C19.01 3.43 18.01 2.70 16.90 2.15C16.67 2.03 16.39 2.01 16.14 2.10C15.89 2.18 15.68 2.36 15.56 2.60M10.24 3.17C9.42 4.64 8.99 6.31 9 8C9 13.42 13.32 17.84 18.71 17.99C17.86 18.93 16.83 19.69 15.67 20.21C14.52 20.73 13.26 21.00 12 21C9.76 21.00 7.60 20.17 5.95 18.67C4.29 17.17 3.25 15.10 3.03 12.88C2.81 10.65 3.43 8.43 4.76 6.63C6.09 4.84 8.05 3.60 10.24 3.17M21.16 7.88C20.93 7.96 20.73 8.12 20.61 8.34C20.49 8.55 20.45 8.81 20.50 9.05L20.53 9.15L20.66 9.56C20.93 10.53 21.04 11.54 20.98 12.55C20.97 12.81 21.06 13.06 21.23 13.26C21.41 13.45 21.65 13.57 21.92 13.59C22.18 13.60 22.44 13.52 22.63 13.34C22.83 13.17 22.95 12.93 22.97 12.67C23.05 11.44 22.92 10.20 22.58 9.02L22.43 8.51L22.39 8.42C22.29 8.19 22.11 8.01 21.88 7.91C21.65 7.81 21.40 7.80 21.16 7.88Z"] {
			d: path("M16.67,4.31C19.3,5.92,21,8.83,21,12c0,4.96-4.04,9-9,9c-2.61,0-5.04-1.12-6.72-3.02C5.52,17.99,5.76,18,6,18 c6.07,0,11-4.93,11-11C17,6.08,16.89,5.18,16.67,4.31 M14.89,2.43C15.59,3.8,16,5.35,16,7c0,5.52-4.48,10-10,10 c-1,0-1.97-0.15-2.89-0.43C4.77,19.79,8.13,22,12,22c5.52,0,10-4.48,10-10C22,7.48,19,3.67,14.89,2.43L14.89,2.43z M12,6H6v1h4.5 L6,10.99v0.05V12h6v-1H7.5L12,7.01V6.98V6L12,6z")
			}
			[d*="M12 1c1.44 0 2.87.28 4.21.83a11 11 0 0 1 3.45 2.27l-1.81 1.05A9 9 0 0 0 3 12a9 9 0 0 0 18-.00l-.01-.44a8.99 8.99 0 0 0-.14-1.20l1.81-1.05A11.00 11.00 0 0 1 10.51 22.9 11 11 0 0 1 12 1Zm7.08 6.25-7.96 3.25a1.74 1.74 0 1 0 1.73 2.99l6.8-5.26a.57.57 0 0 0-.56-.98Z"],
			[d*="M9.80 1.22C8.59 1.46 7.44 1.91 6.38 2.54L5.93 2.82L5.85 2.88C5.66 3.04 5.53 3.26 5.49 3.51C5.45 3.75 5.51 4.00 5.65 4.21C5.78 4.41 5.99 4.56 6.23 4.62C6.47 4.69 6.72 4.66 6.94 4.54L7.03 4.49L7.40 4.26C8.27 3.74 9.21 3.38 10.20 3.18C10.46 3.12 10.69 2.97 10.84 2.75C10.98 2.53 11.04 2.26 10.98 2.00C10.93 1.74 10.77 1.51 10.55 1.36C10.33 1.22 10.06 1.16 9.80 1.22M13.02 2.00C12.99 2.13 12.99 2.26 13.02 2.39C13.04 2.52 13.09 2.64 13.16 2.75C13.24 2.86 13.33 2.95 13.44 3.03C13.55 3.10 13.67 3.15 13.80 3.18L14.20 1.22C14.07 1.19 13.94 1.19 13.81 1.22C13.68 1.24 13.56 1.29 13.45 1.36C13.34 1.44 13.24 1.53 13.17 1.64C13.09 1.75 13.04 1.87 13.02 2.00ZM14.20 1.22L14.00 2.20L13.80 3.18C15.77 3.58 17.54 4.63 18.85 6.15C20.15 7.68 20.90 9.60 20.99 11.61L21.00 12.00C21.00 14.07 20.28 16.08 18.96 17.69C17.65 19.30 15.82 20.40 13.79 20.82L13.99 21.8L14.19 22.78C16.59 22.29 18.77 21.01 20.36 19.14C21.96 17.27 22.88 14.93 22.99 12.47L23.00 12.00C23.00 9.46 22.12 7.00 20.52 5.04C18.91 3.08 16.68 1.73 14.20 1.22ZM2.88 5.85L2.82 5.93L2.54 6.38C1.91 7.44 1.46 8.59 1.22 9.80C1.19 9.93 1.19 10.06 1.21 10.19C1.24 10.32 1.29 10.44 1.36 10.55C1.51 10.77 1.74 10.93 2 10.98C2.25 11.04 2.53 10.98 2.75 10.84C2.97 10.69 3.12 10.46 3.18 10.20C3.38 9.21 3.74 8.27 4.26 7.40L4.49 7.03L4.54 6.95C4.65 6.73 4.68 6.47 4.62 6.23C4.56 5.99 4.41 5.78 4.20 5.65C4.00 5.51 3.75 5.46 3.50 5.49C3.26 5.53 3.03 5.66 2.88 5.85ZM17 12.00L9 7.2V16.8L17 12.00ZM2 13.01C1.87 13.04 1.74 13.09 1.64 13.16C1.53 13.23 1.43 13.33 1.36 13.44C1.29 13.55 1.24 13.67 1.21 13.80C1.19 13.93 1.19 14.06 1.22 14.19C1.46 15.40 1.91 16.55 2.54 17.61L2.82 18.06L2.88 18.14C3.03 18.33 3.26 18.46 3.50 18.50C3.75 18.53 4.00 18.48 4.20 18.34C4.41 18.21 4.56 18.00 4.62 17.76C4.68 17.52 4.65 17.27 4.54 17.05L4.49 16.96L4.26 16.59C3.74 15.72 3.38 14.78 3.18 13.79C3.15 13.66 3.10 13.54 3.02 13.43C2.95 13.32 2.86 13.23 2.75 13.15C2.64 13.08 2.51 13.03 2.39 13.01C2.26 12.98 2.12 12.98 2 13.01ZM5.65 19.79C5.51 19.99 5.46 20.24 5.49 20.49C5.53 20.73 5.66 20.95 5.85 21.11L5.93 21.17L6.38 21.45C7.44 22.08 8.59 22.53 9.80 22.77C10.06 22.83 10.33 22.77 10.55 22.63C10.77 22.48 10.93 22.25 10.98 21.99C11.03 21.73 10.98 21.46 10.84 21.24C10.69 21.02 10.46 20.87 10.20 20.81C9.21 20.61 8.27 20.25 7.40 19.73L7.03 19.50L6.94 19.45C6.72 19.34 6.47 19.31 6.23 19.37C5.99 19.43 5.78 19.58 5.65 19.79ZM14.19 22.78L13.79 20.82C13.66 20.84 13.54 20.89 13.43 20.97C13.32 21.04 13.23 21.13 13.15 21.24C13.08 21.35 13.03 21.48 13.01 21.60C12.98 21.73 12.98 21.87 13.01 22C13.04 22.12 13.09 22.25 13.16 22.35C13.23 22.46 13.33 22.56 13.44 22.63C13.55 22.70 13.67 22.75 13.80 22.78C13.93 22.80 14.06 22.80 14.19 22.78Z"] {
			d: path("M10,8v8l6-4L10,8L10,8z M6.3,5L5.7,4.2C7.2,3,9,2.2,11,2l0.1,1C9.3,3.2,7.7,3.9,6.3,5z            M5,6.3L4.2,5.7C3,7.2,2.2,9,2,11 l1,.1C3.2,9.3,3.9,7.7,5,6.3z            M5,17.7c-1.1-1.4-1.8-3.1-2-4.8L2,13c0.2,2,1,3.8,2.2,5.4L5,17.7z            M11.1,21c-1.8-0.2-3.4-0.9-4.8-2 l-0.6,.8C7.2,21,9,21.8,11,22L11.1,21z            M22,12c0-5.2-3.9-9.4-9-10l-0.1,1c4.6,.5,8.1,4.3,8.1,9s-3.5,8.5-8.1,9l0.1,1 C18.2,21.5,22,17.2,22,12z")
			}
			[d*="M9 3C8.11 2.99 7.25 3.29 6.54 3.83C5.84 4.38 5.34 5.14 5.12 6H3C2.73 6 2.48 6.10 2.29 6.29C2.10 6.48 2 6.73 2 7C2 7.26 2.10 7.51 2.29 7.70C2.48 7.89 2.73 8 3 8H5.12C5.34 8.85 5.84 9.61 6.55 10.16C7.25 10.70 8.11 10.99 9 10.99C9.88 10.99 10.74 10.70 11.44 10.16C12.15 9.61 12.65 8.85 12.87 8H21C21.26 8 21.51 7.89 21.70 7.70C21.89 7.51 22 7.26 22 7C22 6.73 21.89 6.48 21.70 6.29C21.51 6.10 21.26 6 21 6H12.87C12.65 5.14 12.15 4.38 11.45 3.83C10.74 3.29 9.88 2.99 9 3ZM9 5C9.53 5 10.03 5.21 10.41 5.58C10.78 5.96 11 6.46 11 7C11 7.53 10.78 8.03 10.41 8.41C10.03 8.78 9.53 9 9 9C8.46 9 7.96 8.78 7.58 8.41C7.21 8.03 7 7.53 7 7C7 6.46 7.21 5.96 7.58 5.58C7.96 5.21 8.46 5 9 5ZM15 13C14.11 12.99 13.25 13.29 12.54 13.83C11.84 14.38 11.34 15.14 11.12 16H3C2.73 16 2.48 16.10 2.29 16.29C2.10 16.48 2 16.73 2 17C2 17.26 2.10 17.51 2.29 17.70C2.48 17.89 2.73 18 3 18H11.12C11.34 18.85 11.84 19.61 12.55 20.16C13.25 20.70 14.11 20.99 15 20.99C15.88 20.99 16.74 20.70 17.44 20.16C18.15 19.61 18.65 18.85 18.87 18H21C21.26 18 21.51 17.89 21.70 17.70C21.89 17.51 22 17.26 22 17C22 16.73 21.89 16.48 21.70 16.29C21.51 16.10 21.26 16 21 16H18.87C18.65 15.14 18.15 14.38 17.45 13.83C16.74 13.29 15.88 12.99 15 13ZM15 15C15.53 15 16.03 15.21 16.41 15.58C16.78 15.96 17 16.46 17 17C17 17.53 16.78 18.03 16.41 18.41C16.03 18.78 15.53 19 15 19C14.46 19 13.96 18.78 13.58 18.41C13.21 18.03 13 17.53 13 17C13 16.46 13.21 15.96 13.58 15.58C13.96 15.21 14.46 15 15 15Z"] {
			d: path("M15,17h6v1h-6V17z M11,17H3v1h8v2h1v-2v-1v-2h-1V17z M14,8h1V6V5V3h-1v2H3v1h11V8z            M18,5v1h3V5H18z M6,14h1v-2v-1V9H6v2H3v1 h3V14z M10,12h11v-1H10V12z")
			}
			[d*="m 17,23 h 2 V 17 H 17 Z M 18,8 C 12.47,8 8,12.47 8,18 8,23.52 12.47,28 18,28 23.52,28 28,23.52 28,18 28,12.47 23.52,8 18,8 Z m 0,18 c -4.41,0 -8,-3.59 -8,-8 0,-4.41 3.59,-8 8,-8 4.41,0 8,3.59 8,8 0,4.41 -3.59,8 -8,8 z M 17,15 h 2 v -2 h -2 z"] {
			d: path("M18,8 C12.47,8 8,12.47 8,18 C8,23.52 12.47,28 18,28 C23.52,28 28,23.52 28,18 C28,12.47 23.52,8 18,8 L18,8 Z M17,16 L19,16 L19,24 L17,24 L17,16 Z M17,12 L19,12 L19,14 L17,14 L17,12 Z")
			}
		`,
		default: true
	}
};