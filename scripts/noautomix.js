document.addEventListener("click", function (e) {
	if (
		e.defaultPrevented ||
		e.ctrlKey ||
		e.metaKey ||   // cmd on macos
		e.shiftKey ||
		e.altKey ||
		e.button !== 0 // only left mouse button
	) return;

	const anchor = e.target.closest('a[href*="/watch"]');
	if (!anchor) return;

	const moreActionsBtn = e.target.closest(
		'div.ytLockupMetadataViewModelMenuButton, button[aria-label="More actions"]'
	);
	if (moreActionsBtn) return;

	const url = new URL(anchor.href);
	const videoId = url.searchParams.get("v");
	const list = url.searchParams.get("list");
	const pp = url.searchParams.get("pp");
	const index = url.searchParams.get("index");

	if (!videoId || !pp || !list || index) return;

	const isMusicVideoMix = list.startsWith("RD") && list.length === 13;
	if (!isMusicVideoMix) return;

	e.preventDefault();
	e.stopPropagation();

	const cleanUrl = `https://www.youtube.com/watch?v=${videoId}`;

	if (document.documentElement.dataset.loggingEnabled === 'true') {
		const extName = document.documentElement.dataset.extensionName;
		console.log(`${extName}: redirected music video Mix`);
		console.log(`${extName}: from → ${anchor.href}`);
		console.log(`${extName}: to   → ${cleanUrl}`);
	}

	const app = document.querySelector("ytd-app");
	if (!app) return;

	app.dispatchEvent(new CustomEvent("yt-navigate", {
		bubbles: true,
		composed: true,
		detail: {
			endpoint: {
				commandMetadata: {
					webCommandMetadata: {
						url: "/watch?v=" + videoId,
						webPageType: "WEB_PAGE_TYPE_WATCH",
						rootVe: 3832
					}
				},
				watchEndpoint: {
					videoId: videoId
				}
			}
		}
	}));
}, true);