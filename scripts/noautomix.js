document.addEventListener("click", function (e) {
	const container = e.target.closest("yt-lockup-view-model, ytd-video-renderer");
	let anchor = container?.querySelector("a");

	if (!container) {
		const player = e.target.closest("#media-container-link, #thumbnail");
		if (!player) return;
		anchor = player;
	}

	if (!anchor || !anchor.href.includes("/watch")) return;

	const originalUrl = anchor.href;
	const url = new URL(originalUrl);
	const videoId = url.searchParams.get("v");
	const list = url.searchParams.get("list");
	const pp = url.searchParams.get("pp");
	const index = url.searchParams.get("index");

	if (!videoId || !pp || !list || index) return;

	const isMusicVideoMix = list.startsWith("RD") && list.length === 13;

	if (isMusicVideoMix) {
		e.preventDefault();
		e.stopPropagation();

		const cleanUrl = `https://www.youtube.com/watch?v=${videoId}`;

		if (document.documentElement.dataset.loggingEnabled === 'true') {
			const extName = document.documentElement.dataset.extensionName || 'musicVideoCleaner';
			console.log(`${extName}: redirected music video Mix`);
			console.log(`${extName}: from → ${originalUrl}`);
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
	}
}, true);