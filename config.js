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
		`,
		default: true
	},

	fixHeader: {
		label: "Fix Youtube headers",
		description: "Removes blur and background from YouTube's header",
		style: `
			ytd-masthead { background: var(--yt-spec-base-background) !important; }
			#header.style-scope.ytd-rich-grid-renderer { display: none !important; }
			#frosted-glass.loading-with-chipbar,
			#frosted-glass.with-chipbar.ytd-app {
				background: transparent !important;
				backdrop-filter: none !important;
			}
			.yt-spec-icon-badge-shape--type-notification-refresh .yt-spec-icon-badge-shape__badge {
				background-color: red !important;
				color: white !important;
			}
		`,
		default: true
	},

	hideRightArrow: {
		label: "Hide Right Navigation Arrow",
		description: "Removes the right navigation arrow",
		style: `#right-arrow-container { display: none !important; }`,
		default: true
	},

	hideTeaserCarousel: {
		label: "Hide Teaser Carousel",
		description: "Removes the premiere chat icon teaser carousel",
		style: `#teaser-carousel { display: none !important; }`,
		default: true
	},

	hideGamesShelf: {
		label: "Hide Games Shelf",
		description: "Removes the games block on YouTube",
		style: `.ytd-rich-shelf-renderer { display: none !important; }`,
		default: true
	},

	hideShortsShelf: {
		label: "Hide Shorts Shelf",
		description: "Removes Shorts section from descriptions and other places",
		style: `ytd-reel-shelf-renderer { display: none !important; }`,
		default: true
	},

	transparentSearchBox: {
		label: "Transparent Search Box",
		description: "Makes the search background transparent instead of grey",
		style: `.ytSearchboxComponentSearchButtonDark, .ytSearchboxComponentInputBox { background-color: transparent !important; }`,
		default: true
	},

	hideVoiceSearchButton: {
		label: "Hide Voice Search Button",
		description: "Removes the voice search button in the header",
		style: `#voice-search-button.ytd-masthead { display: none !important; }`,
		default: true
	},

	hideYoutubeSurveys: {
		label: "Hide YouTube Surveys",
		description: "Removes pop-up surveys and dialogs (How do you like this video?)",
		style: `
			#tp-yt-paper-dialog.style-scope.ytd-popup-container,
			ytd-single-option-survey-renderer,
			ytd-inline-survey-renderer,
			ytd-checkbox-survey-renderer {
				display: none !important;
			}
		`,
		default: true
	},

	hideHorizontalScrollbar: {
		label: "Hide Horizontal Scrollbar",
		description: "Removes horizontal scrollbar on the page",
		style: `html, body { overflow-x: hidden !important; }`,
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
		`,
		default: true
	},

	hidePropaganda: {
		label: "Hide propaganda",
		description: 'Removes propaganda (<a href="https://support.google.com/youtube/answer/9004474" target="_blank" rel="noopener noreferrer">support.google.com</a>) and elements that thinking instead of you',
		style: `#clarify-box, .ytp-paid-content-overlay { display: none !important; }`,
		default: true
	},

	hideLoadingMocking: {
		label: "Hide 'Video is not loading?' Message",
		description: 'Removes mocking from hindus youtube devs \'Video is not loading?\' (<a href="https://www.reddit.com/r/youtube/comments/1lafhcc/youtube_is_now_artificially_slowing_down_youtube/" target="_blank" rel="noopener noreferrer">reddit.com</a>)',
		style: `#text-container.style-scope.yt-notification-action-renderer { display: none !important; }`,
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
			ytd-video-description-infocards-section-renderer a#header {
				display: none !important;
			}
		`,
		default: true
	},

	hideUselessThings: {
		label: "Hide useless things",
		description: "Hides useless elements as copyright notifications etc.",
		style: `#footer:has(#guide-links-primary) { display: none !important; }`,
		default: true
	},

	nosponsored: {
		label: "No 'Sponsored'",
		description: "Removes YouTube videos with 'Only for sponsors', promos, etc",
		style: `
			ytd-rich-item-renderer:has(.badge.badge-style-type-members-only),
			/* ytd-grid-video-renderer.style-scope:has(.badge.badge-style-type-members-only), Meant to hide sponsored on channel page but breaks playlist arrows (how? wtf youtube) */
			#masthead-ad,
			#big-yoodle ytd-statement-banner-renderer,
			ytd-rich-section-renderer:has(> #content > ytd-statement-banner-renderer),
			ytd-rich-section-renderer:has(> #content > ytd-rich-shelf-renderer[has-paygated-featured-badge]),
			ytd-rich-section-renderer:has(> #content > ytd-brand-video-shelf-renderer),
			ytd-rich-section-renderer:has(> #content > ytd-brand-video-singleton-renderer),
			ytd-rich-section-renderer:has(> #content > ytd-inline-survey-renderer),
			tp-yt-paper-dialog:has(> #mealbar-promo-renderer),
			ytd-rich-item-renderer:has(> .ytd-rich-item-renderer > ytd-ad-slot-renderer),
			ytd-search-pyv-renderer.ytd-item-section-renderer,
			ytd-ad-slot-renderer.ytd-item-section-renderer,
			ytd-engagement-panel-section-list-renderer[target-id="engagement-panel-ads"],
			#movie_player .ytp-suggested-action,
			#below #panels,
			.ytp-ad-action-interstitial,
			.ytp-paid-content-overlay,
			ytm-paid-content-overlay-renderer,
			#items > ytd-ad-slot-renderer {
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

	restoreFullscreenScroll: {
		label: "Restore fullscreen scroll",
		description: "Restoring page scrolling in fullscreen",
		style: `
			ytd-app[fullscreen] { overflow: auto !important; }
			ytd-app[scrolling] {
				bottom: 0 !important;
				scrollbar-width: none !important;
				-ms-overflow-style: none !important;
			}
			ytd-app[fullscreen]::-webkit-scrollbar,
			ytd-app[scrolling]::-webkit-scrollbar { display: none !important; }
			ytd-watch-flexy[fullscreen] #columns { display: flex !important; }
		`,
		default: true
	},
	
	restoreOldControls: {
		label: "Restore old player controls",
		description: "Restores old player controls layout (not the icons yet)",
		style: `
			/* https://www.reddit.com/r/youtube/comments/1ni5tre/make_new_youtube_ui_look_like_an_old_ui/ */

			@-moz-document domain("youtube.com") {
			:root{
				--toolbar-height: 52px;
				--element-margin: 2px;
				--element-height: calc(var(--toolbar-height) - var(--element-margin));
				--bg-color: #0000;
			}

			/* SIZE */
			.ytp-delhi-modern .ytp-tooltip{margin-top:12px !important;}
			.ytp-delhi-modern .ytp-chrome-bottom,
			.ytp-delhi-modern .ytp-chrome-controls,
			.ytp-delhi-modern.ytp-big-mode:not(.ytp-xsmall-width-mode) .ytp-chrome-bottom,
			.ytp-delhi-modern.ytp-big-mode:not(.ytp-xsmall-width-mode) .ytp-right-controls .ytp-right-controls-right,
			.ytp-delhi-modern.ytp-big-mode:not(.ytp-xsmall-width-mode) .ytp-right-controls .ytp-right-controls-left{
				height:var(--toolbar-height) !important;
				line-height:var(--toolbar-height) !important;
			}
			.ytp-delhi-modern.ytp-big-mode:not(.ytp-xsmall-width-mode) .ytp-progress-bar-container,
			.ytp-delhi-modern:not(.ytp-player-minimized) .ytp-progress-bar-container{bottom:var(--toolbar-height) !important;}

			/* Overlays container */
			.ytp-delhi-modern.ytp-big-mode.ytp-fullscreen-grid-peeking .ytp-overlays-container,
			.ytp-delhi-modern.ytp-fullscreen-grid-peeking .ytp-overlays-container{bottom:calc(var(--toolbar-height)+20px) !important;}

			.ytp-delhi-modern .ytp-chrome-controls .ytp-right-controls,
			.ytp-delhi-modern .ytp-prev-button:not(.ytp-miniplayer-button-container>*),
			.ytp-delhi-modern .ytp-chrome-controls .ytp-next-button:not(.ytp-miniplayer-button-container>*).ytp-playlist-ui,
			.ytp-delhi-modern .ytp-chrome-controls .ytp-play-button,
			.ytp-delhi-modern.ytp-delhi-horizontal-volume-controls .ytp-volume-area,
			.ytp-delhi-modern .ytp-time-display:not(.ytp-miniplayer-ui *),
			.ytp-delhi-modern .ytp-chapter-container{margin:var(--element-margin) 0 !important;padding:0 !important;}

			/* Play button */
			.ytp-delhi-modern .ytp-chrome-controls .ytp-play-button{
				--size: var(--element-height);
				height: var(--size) !important;
				width: var(--size) !important;	
			}

			/* Play icon */
			.ytp-delhi-modern-icons .ytp-chrome-controls .ytp-play-button svg{
				padding: 11px !important;
				--size: 28px;
				height: var(--size) !important;
				width: var(--size) !important;
			}

			/* gradient */
			.ytp-chrome-bottom:after{
				content:'';
				position:absolute;
				left:-100px;
				bottom:-2px;
				width:calc(100%+200px);
				background:linear-gradient(0deg,#000a,#0000);
				height:calc(var(--toolbar-height)+10px);
				z-index:-1;
			}

			/* fullscreen fixes */
			.ytp-delhi-modern.ytp-delhi-horizontal-volume-controls.ytp-big-mode:not(.ytp-xsmall-width-mode) .ytp-volume-area,
			.ytp-big-mode .ytp-volume-slider,
			.ytp-delhi-modern .ytp-chrome-controls .ytp-mute-button,
			.ytp-delhi-modern.ytp-big-mode:not(.ytp-xsmall-width-mode) .ytp-time-display,
			.ytp-delhi-modern.ytp-big-mode:not(.ytp-xsmall-width-mode) .ytp-chrome-controls .ytp-next-button:not(.ytp-miniplayer-button-container>*),
			.ytp-big-mode.ytp-delhi-modern .ytp-chrome-controls .ytp-prev-button:not(ytp-miniplayer-button-container>*),
			.ytp-delhi-modern.ytp-big-mode:not(.ytp-xsmall-width-mode) .ytp-time-wrapper,
			.ytp-delhi-modern.ytp-big-mode:not(.ytp-xsmall-width-mode) .ytp-chapter-title.ytp-button{
				height:var(--element-height) !important;
				min-height:var(--element-height) !important;
				line-height:var(--element-height) !important;
				margin-top:0 !important;
				margin-bottom:0 !important;
			}

			.ytp-big-mode.ytp-delhi-modern-icons .ytp-chrome-controls .ytp-button svg,
			.ytp-delhi-modern.ytp-big-mode:not(.ytp-xsmall-width-mode) .ytp-chrome-controls .ytp-next-button:not(.ytp-miniplayer-button-container>*) svg,
			.ytp-big-mode.ytp-delhi-modern .ytp-chrome-controls .ytp-prev-button:not(ytp-miniplayer-button-container>*) svg{padding-top:14px;}
			.ytp-big-mode.ytp-delhi-modern.ytp-delhi-horizontal-volume-controls .ytp-volume-area .ytp-volume-icon svg{padding-top:10px;}

			/* COLORS */
			.ytp-delhi-modern .ytp-time-wrapper:not(.ytp-miniplayer-ui *),
			.ytp-delhi-modern.ytp-delhi-horizontal-volume-controls .ytp-volume-area,
			.ytp-delhi-modern .ytp-chrome-controls .ytp-play-button,
			.ytp-delhi-modern .ytp-chrome-controls .ytp-right-controls,
			.ytp-delhi-modern .ytp-chrome-controls>*>*,
			.ytp-delhi-modern .ytp-chapter-title.ytp-button{background:var(--bg-color) !important;}

			/* Video endscreen fix */
			.ytp-fullscreen-grid-active.html5-video-player.ended-mode .ytp-modern-videowall-still:nth-child(n+4){display:block;}
			.ytp-fullscreen-grid-active.html5-video-player.ended-mode .ytp-modern-videowall-still:nth-child(n+11),
			.ytp-fullscreen-grid-expand-button{display:none;}
			.ytp-fullscreen-grid-active.ytp-grid-scrollable .ytp-fullscreen-grid{top:10%;}
			.ytp-fullscreen-grid-stills-container{grid-template-columns:repeat(5,1fr);}
			}
		`,
		default: true
	}
};