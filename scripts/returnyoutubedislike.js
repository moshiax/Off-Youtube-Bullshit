// Return YouTube Dislike Userscript
// License: GPL-3.0
// Original author: Anarios & JRWR
// Full license text: https://www.gnu.org/licenses/gpl-3.0.txt

(function() {
	const extConfig = {
		showUpdatePopup: false, // [true, false*] Show a popup tab after extension update (See what's new)
		disableVoteSubmission: false, // [true, false*] Disable like/dislike submission (Stops counting your likes and dislikes)
		// disableLogging: true, 				 // [true*, false] Disable Logging API Response in JavaScript Console.
		disableLogging: document.documentElement.dataset.loggingEnabled !== 'true',
		coloredThumbs: false, // [true, false*] Colorize thumbs (Use custom colors for thumb icons)
		coloredBar: false, // [true, false*] Colorize ratio bar (Use custom colors for ratio bar)
		colorTheme: "classic", // [classic*, accessible, neon] Color theme (red/green, blue/yellow, pink/cyan)
		numberDisplayFormat: "compactShort", // [compactShort*, compactLong, standard] Number format (For non-English locale users, you may be able to improve appearance with a different option. Please file a feature request if your locale is not covered)
		numberDisplayRoundDown: true, // [true*, false] Round down numbers (Show rounded down numbers)
		tooltipPercentageMode: "none", // [none*, dash_like, dash_dislike, both, only_like, only_dislike] Mode of showing percentage in like/dislike bar tooltip.
		numberDisplayReformatLikes: false, // [true, false*] Re-format like numbers (Make likes and dislikes format consistent)
		rateBarEnabled: false, // [true, false*] Enables ratio bar under like/dislike buttons
	};

	let previousState = 3; //1=LIKED, 2=DISLIKED, 3=NEUTRAL
	let likesvalue = 0;
	let dislikesvalue = 0;
	let preNavigateLikeButton = null;

	let isMobile = location.hostname == "m.youtube.com";
	let isShorts = () => location.pathname.startsWith("/shorts");
	let mobileDislikes = 0;

	function cLog(text, subtext = "") {
		if (!extConfig.disableLogging) {
			subtext = subtext.trim() === "" ? "" : `(${subtext})`;
			console.log(`${document.documentElement.dataset.extensionName}: ${text} ${subtext}`);
		}
	}

	function isInViewport(element) {
		const rect = element.getBoundingClientRect();
		const height = innerHeight || document.documentElement.clientHeight;
		const width = innerWidth || document.documentElement.clientWidth;
		return (
			// When short (channel) is ignored, the element (like/dislike AND short itself) is
			// hidden with a 0 DOMRect. In this case, consider it outside of Viewport
			!(rect.top == 0 && rect.left == 0 && rect.bottom == 0 && rect.right == 0) &&
			rect.top >= 0 &&
			rect.left >= 0 &&
			rect.bottom <= height &&
			rect.right <= width
		);
	}

	function getButtons() {
		if (isShorts()) {
			let elements = document.querySelectorAll(
				isMobile ? "ytm-like-button-renderer" : "#like-button > ytd-like-button-renderer",
			);
			for (let element of elements) {
				if (isInViewport(element)) {
					return element;
				}
			}
		}
		if (isMobile) {
			return (
				document.querySelector(".slim-video-action-bar-actions .segmented-buttons") ??
				document.querySelector(".slim-video-action-bar-actions")
			);
		}
		if (document.getElementById("menu-container")?.offsetParent === null) {
			return (
				document.querySelector("ytd-menu-renderer.ytd-watch-metadata > div") ??
				document.querySelector("ytd-menu-renderer.ytd-video-primary-info-renderer > div")
			);
		} else {
			return document.getElementById("menu-container")?.querySelector("#top-level-buttons-computed");
		}
	}

	function getDislikeButton() {
		const buttons = getButtons();
		if (!buttons || !buttons.children) {
			return null;
		}

		if (buttons.children[0].tagName === "YTD-SEGMENTED-LIKE-DISLIKE-BUTTON-RENDERER") {
			if (buttons.children[0].children[1] === undefined) {
				return document.querySelector("#segmented-dislike-button");
			} else {
				return buttons.children[0].children[1];
			}
		} else {
			if (buttons.querySelector("segmented-like-dislike-button-view-model")) {
				const dislikeViewModel = buttons.querySelector("dislike-button-view-model");
				if (!dislikeViewModel) cLog("Dislike button wasn't added to DOM yet...");
				return dislikeViewModel;
			} else {
				return buttons.children[1];
			}
		}
	}

	function getLikeButton() {
		const buttons = getButtons();

		if (!buttons || !buttons.children) {
			return null;
		}

		const firstChild = buttons.children[0];

		if (firstChild.tagName === "YTD-SEGMENTED-LIKE-DISLIKE-BUTTON-RENDERER") {
			const segmentedButton = document.querySelector("#segmented-like-button");
			if (segmentedButton !== null) {
				return segmentedButton;
			}
			if (firstChild.children[0]) {
				return firstChild.children[0];
			}
		}

		return buttons.querySelector("like-button-view-model") ?? firstChild;
	}

	function getLikeTextContainer() {
		const likeButton = getLikeButton();
		return (
			likeButton.querySelector("#text") ??
			likeButton.getElementsByTagName("yt-formatted-string")[0] ??
			likeButton.querySelector("span[role='text']")
		);
	}

	function getDislikeTextContainer() {
		const dislikeButton = getDislikeButton();
		let result =
			dislikeButton?.querySelector("#text") ??
			dislikeButton?.getElementsByTagName("yt-formatted-string")[0] ??
			dislikeButton?.querySelector("span[role='text']");
		if (result === null) {
			let textSpan = document.createElement("span");
			textSpan.id = "text";
			textSpan.style.marginLeft = "6px";
			dislikeButton?.querySelector("button").appendChild(textSpan);
			if (dislikeButton) dislikeButton.querySelector("button").style.width = "auto";
			result = textSpan;
		}
		return result;
	}

	function createObserver(options, callback) {
		const observerWrapper = new Object();
		observerWrapper.options = options;
		observerWrapper.observer = new MutationObserver(callback);
		observerWrapper.observe = function(element) {
			this.observer.observe(element, this.options);
		};
		observerWrapper.disconnect = function() {
			this.observer.disconnect();
		};
		return observerWrapper;
	}

	let shortsObserver = null;

	if (isShorts() && !shortsObserver) {
		cLog("Initializing shorts mutation observer");
		shortsObserver = createObserver({
				attributes: true,
			},
			(mutationList) => {
				mutationList.forEach((mutation) => {
					if (
						mutation.type === "attributes" &&
						mutation.target.nodeName === "TP-YT-PAPER-BUTTON" &&
						mutation.target.id === "button"
					) {
						cLog("Short thumb button status changed");
						if (mutation.target.getAttribute("aria-pressed") === "true") {
							mutation.target.style.color =
								mutation.target.parentElement.parentElement.id === "like-button" ?
								getColorFromTheme(true) :
								getColorFromTheme(false);
						} else {
							mutation.target.style.color = "unset";
						}
						return;
					}
					cLog("Unexpected mutation observer event: " + mutation.target + mutation.type);
				});
			},
		);
	}

	function checkForUserAvatarButton() {
		if (isMobile) return;
		return !!document.querySelector("#avatar-btn");
	}

	function setLikes(likesCount) {
		if (isMobile) {
			getButtons().children[0].querySelector(".button-renderer-text").innerText = likesCount;
			return;
		}
		getLikeTextContainer().innerText = likesCount;
	}

	function setDislikes(dislikesCount) {
		if (isMobile) {
			mobileDislikes = dislikesCount;
			return;
		}

		const _container = getDislikeTextContainer();
		_container?.removeAttribute("is-empty");
		if (_container?.innerText !== dislikesCount) {
			_container.innerText = dislikesCount;
		}
	}

	function getLikeCountFromButton() {
		try {
			if (isShorts()) {
				return -1;
			}

			const likeButton =
				getLikeButton().querySelector("yt-formatted-string#text") ??
				getLikeButton().querySelector("button");

			const likesStr = likeButton.getAttribute("aria-label").replace(/\D/g, "");
			return likesStr.length > 0 ? parseInt(likesStr, 10) : -1;
		} catch {
			return -1;
		}
	}

	(typeof GM_addStyle != "undefined" ?
		GM_addStyle :
		(styles) => {
			let styleNode = document.createElement("style");
			styleNode.type = "text/css";
			styleNode.innerText = styles;
			document.head.appendChild(styleNode);
		})(`
		#return-youtube-dislike-bar-container {
		  background: var(--yt-spec-icon-disabled);
		  border-radius: 2px;
		}

		#return-youtube-dislike-bar {
		  background: var(--yt-spec-text-primary);
		  border-radius: 2px;
		  transition: all 0.15s ease-in-out;
		}

		.ryd-tooltip {
		  position: absolute;
		  display: block;
		  height: 2px;
		  bottom: -10px;
		}

		.ryd-tooltip-bar-container {
		  width: 100%;
		  height: 2px;
		  position: absolute;
		  padding-top: 6px;
		  padding-bottom: 12px;
		  top: -6px;
		}

		ytd-menu-renderer.ytd-watch-metadata {
		  overflow-y: visible !important;
		}
		
		#top-level-buttons-computed {
		  position: relative !important;
		}
	  `);

	function createRateBar(likes, dislikes) {
		if (isMobile || !extConfig.rateBarEnabled) {
			return;
		}
		let rateBar = document.getElementById("return-youtube-dislike-bar-container");

		const widthPx = getLikeButton().clientWidth + (getDislikeButton()?.clientWidth ?? 52);

		const widthPercent = likes + dislikes > 0 ? (likes / (likes + dislikes)) * 100 : 50;

		let likePercentage = parseFloat(widthPercent.toFixed(1));
		const dislikePercentage = (100 - likePercentage).toLocaleString();
		likePercentage = likePercentage.toLocaleString();

		let tooltipInnerHTML;
		switch (extConfig.tooltipPercentageMode) {
			case "dash_like":
				tooltipInnerHTML = `${likes.toLocaleString()}&nbsp;/&nbsp;${dislikes.toLocaleString()}&nbsp;&nbsp;-&nbsp;&nbsp;${likePercentage}%`;
				break;
			case "dash_dislike":
				tooltipInnerHTML = `${likes.toLocaleString()}&nbsp;/&nbsp;${dislikes.toLocaleString()}&nbsp;&nbsp;-&nbsp;&nbsp;${dislikePercentage}%`;
				break;
			case "both":
				tooltipInnerHTML = `${likePercentage}%&nbsp;/&nbsp;${dislikePercentage}%`;
				break;
			case "only_like":
				tooltipInnerHTML = `${likePercentage}%`;
				break;
			case "only_dislike":
				tooltipInnerHTML = `${dislikePercentage}%`;
				break;
			default:
				tooltipInnerHTML = `${likes.toLocaleString()}&nbsp;/&nbsp;${dislikes.toLocaleString()}`;
		}

		if (!rateBar && !isMobile) {
			let colorLikeStyle = "";
			let colorDislikeStyle = "";
			if (extConfig.coloredBar) {
				colorLikeStyle = "; background-color: " + getColorFromTheme(true);
				colorDislikeStyle = "; background-color: " + getColorFromTheme(false);
			}

			getButtons().insertAdjacentHTML(
				"beforeend",
				`
			<div class="ryd-tooltip" style="width: ${widthPx}px">
			<div class="ryd-tooltip-bar-container">
			   <div
				  id="return-youtube-dislike-bar-container"
				  style="width: 100%; height: 2px;${colorDislikeStyle}"
				  >
				  <div
					 id="return-youtube-dislike-bar"
					 style="width: ${widthPercent}%; height: 100%${colorDislikeStyle}"
					 ></div>
			   </div>
			</div>
			<tp-yt-paper-tooltip position="top" id="ryd-dislike-tooltip" class="style-scope ytd-sentiment-bar-renderer" role="tooltip" tabindex="-1">
			   <!--css-build:shady-->${tooltipInnerHTML}
			</tp-yt-paper-tooltip>
			</div>
	`,
			);
			let descriptionAndActionsElement = document.getElementById("top-row");
			descriptionAndActionsElement.style.borderBottom = "1px solid var(--yt-spec-10-percent-layer)";
			descriptionAndActionsElement.style.paddingBottom = "10px";
		} else {
			document.querySelector(".ryd-tooltip").style.width = widthPx + "px";
			document.getElementById("return-youtube-dislike-bar").style.width = widthPercent + "%";

			if (extConfig.coloredBar) {
				document.getElementById("return-youtube-dislike-bar-container").style.backgroundColor = getColorFromTheme(false);
				document.getElementById("return-youtube-dislike-bar").style.backgroundColor = getColorFromTheme(true);
			}
		}
	}

	async function setState() {
		let statsSet = false;

		try {
			const response = await fetch(`https://returnyoutubedislikeapi.com/votes?videoId=${getVideoId()}`);
			const json = await response.json();

			if (!json || statsSet || "traceId" in response) return;

			const {
				dislikes,
				likes
			} = json;
			cLog("ReturnYouTubeDislike API response:", JSON.stringify(json, null, 2));

			likesvalue = likes;
			dislikesvalue = dislikes;

			setDislikes(numberFormat(dislikes));

			if (extConfig.numberDisplayReformatLikes) {
				const nativeLikes = getLikeCountFromButton();
				if (nativeLikes >= 0) {
					setLikes(numberFormat(nativeLikes));
				}
			}

			createRateBar(likes, dislikes);

			if (extConfig.coloredThumbs) {
				const dislikeButton = getDislikeButton();

				if (isShorts()) {
					const shortLikeButton = getLikeButton().querySelector("tp-yt-paper-button#button");
					const shortDislikeButton = dislikeButton?.querySelector("tp-yt-paper-button#button");

					if (shortLikeButton?.getAttribute("aria-pressed") === "true") {
						shortLikeButton.style.color = getColorFromTheme(true);
					}
					if (shortDislikeButton?.getAttribute("aria-pressed") === "true") {
						shortDislikeButton.style.color = getColorFromTheme(false);
					}

					shortsObserver.observe(shortLikeButton);
					shortsObserver.observe(shortDislikeButton);
				} else {
					getLikeButton().style.color = getColorFromTheme(true);
					if (dislikeButton) dislikeButton.style.color = getColorFromTheme(false);
				}
			}
		} catch (err) {
			cLog("Failed to fetch dislike/like data:", err);
		}
	}

	function updateDOMDislikes() {
		setDislikes(numberFormat(dislikesvalue));
		createRateBar(likesvalue, dislikesvalue);
	}

	function likeClicked() {
		if (!checkForUserAvatarButton()) return;

		if (previousState === 1) {
			likesvalue--;
			updateDOMDislikes();
			previousState = 3;
		} else if (previousState === 2) {
			likesvalue++;
			dislikesvalue--;
			updateDOMDislikes();
			previousState = 1;
		} else if (previousState === 3) {
			likesvalue++;
			updateDOMDislikes();
			previousState = 1;
		}

		if (extConfig.numberDisplayReformatLikes) {
			const nativeLikes = getLikeCountFromButton();
			if (nativeLikes >= 0) {
				setLikes(numberFormat(nativeLikes));
			}
		}
	}

	function dislikeClicked() {
		if (!checkForUserAvatarButton()) return;

		if (previousState === 3) {
			dislikesvalue++;
			updateDOMDislikes();
			previousState = 2;
		} else if (previousState === 2) {
			dislikesvalue--;
			updateDOMDislikes();
			previousState = 3;
		} else if (previousState === 1) {
			likesvalue--;
			dislikesvalue++;
			updateDOMDislikes();
			previousState = 2;

			if (extConfig.numberDisplayReformatLikes) {
				const nativeLikes = getLikeCountFromButton();
				if (nativeLikes >= 0) {
					setLikes(numberFormat(nativeLikes));
				}
			}
		}
	}

	function setInitialState() {
		setState();
	}

	function getVideoId() {
		const urlObject = new URL(window.location.href);
		const pathname = urlObject.pathname;
		if (pathname.startsWith("/clip")) {
			return (document.querySelector("meta[itemprop='videoId']") || document.querySelector("meta[itemprop='identifier']")).content;
		} else {
			if (pathname.startsWith("/shorts")) {
				return pathname.slice(8);
			}
			return urlObject.searchParams.get("v");
		}
	}

	function isVideoLoaded() {
		if (isMobile) {
			return document.getElementById("player").getAttribute("loading") == "false";
		}
		const videoId = getVideoId();

		return (
			// desktop: spring 2024 UI
			document.querySelector(`ytd-watch-grid[video-id='${videoId}']`) !== null ||
			// desktop: older UI
			document.querySelector(`ytd-watch-flexy[video-id='${videoId}']`) !== null ||
			// mobile: no video-id attribute
			document.querySelector('#player[loading="false"]:not([hidden])') !== null
		);
	}

	function roundDown(num) {
		if (num < 1000) return num;
		const int = Math.floor(Math.log10(num) - 2);
		const decimal = int + (int % 3 ? 1 : 0);
		const value = Math.floor(num / 10 ** decimal);
		return value * 10 ** decimal;
	}

	function numberFormat(numberState) {
		let numberDisplay;
		if (extConfig.numberDisplayRoundDown === false) {
			numberDisplay = numberState;
		} else {
			numberDisplay = roundDown(numberState);
		}
		return getNumberFormatter(extConfig.numberDisplayFormat).format(numberDisplay);
	}

	function getNumberFormatter(optionSelect) {
		let userLocales;
		if (document.documentElement.lang) {
			userLocales = document.documentElement.lang;
		} else if (navigator.language) {
			userLocales = navigator.language;
		} else {
			try {
				userLocales = new URL(
					Array.from(document.querySelectorAll("head > link[rel='search']"))
					?.find((n) => n?.getAttribute("href")?.includes("?locale="))
					?.getAttribute("href"),
				)?.searchParams?.get("locale");
			} catch {
				cLog("Cannot find browser locale. Use en as default for number formatting.");
				userLocales = "en";
			}
		}

		let formatterNotation;
		let formatterCompactDisplay;
		switch (optionSelect) {
			case "compactLong":
				formatterNotation = "compact";
				formatterCompactDisplay = "long";
				break;
			case "standard":
				formatterNotation = "standard";
				formatterCompactDisplay = "short";
				break;
			case "compactShort":
			default:
				formatterNotation = "compact";
				formatterCompactDisplay = "short";
		}

		const formatter = Intl.NumberFormat(userLocales, {
			notation: formatterNotation,
			compactDisplay: formatterCompactDisplay,
		});
		return formatter;
	}

	function getColorFromTheme(voteIsLike) {
		let colorString;
		switch (extConfig.colorTheme) {
			case "accessible":
				if (voteIsLike === true) {
					colorString = "dodgerblue";
				} else {
					colorString = "gold";
				}
				break;
			case "neon":
				if (voteIsLike === true) {
					colorString = "aqua";
				} else {
					colorString = "magenta";
				}
				break;
			case "classic":
			default:
				if (voteIsLike === true) {
					colorString = "lime";
				} else {
					colorString = "red";
				}
		}
		return colorString;
	}

	let smartimationObserver = null;

	function setEventListeners(evt) {
		let jsInitChecktimer;

		function checkForJS_Finish() {

			if (isShorts() || (getButtons()?.offsetParent && isVideoLoaded())) {
				const buttons = getButtons();
				const dislikeButton = getDislikeButton();

				if (preNavigateLikeButton !== getLikeButton() && dislikeButton) {

					try {
						getLikeButton().addEventListener("click", likeClicked);
						dislikeButton?.addEventListener("click", dislikeClicked);
						getLikeButton().addEventListener("touchstart", likeClicked);
						dislikeButton?.addEventListener("touchstart", dislikeClicked);
						dislikeButton?.addEventListener("focusin", updateDOMDislikes);
						dislikeButton?.addEventListener("focusout", updateDOMDislikes);
						preNavigateLikeButton = getLikeButton();

						if (!smartimationObserver) {
							smartimationObserver = createObserver({
									attributes: true,
									subtree: true,
									childList: true,
								},
								updateDOMDislikes,
							);
							smartimationObserver.container = null;
						}

						const smartimationContainer = buttons.querySelector("yt-smartimation");
						if (smartimationContainer && smartimationObserver.container != smartimationContainer) {
							smartimationObserver.disconnect();
							smartimationObserver.observe(smartimationContainer);
							smartimationObserver.container = smartimationContainer;
						}
					} catch {
						return;
					} //Don't spam errors into the console
				}
				if (dislikeButton) {
					setInitialState();
					clearInterval(jsInitChecktimer);
				}
			}
		}

		jsInitChecktimer = setInterval(checkForJS_Finish, 111);
	}

	(function() {
		"use strict";
		window.addEventListener("yt-navigate-finish", setEventListeners, true);
		setEventListeners();
	})();
	if (isMobile) {
		let originalPush = history.pushState;
		history.pushState = function(...args) {
			window.returnDislikeButtonlistenersSet = false;
			setEventListeners(args[2]);
			return originalPush.apply(history, args);
		};
		setInterval(() => {
			const dislikeButton = getDislikeButton();
			if (dislikeButton?.querySelector(".button-renderer-text") === null) {
				getDislikeTextContainer().innerText = mobileDislikes;
			} else {
				if (dislikeButton) dislikeButton.querySelector(".button-renderer-text").innerText = mobileDislikes;
			}
		}, 1000);
	}
})();