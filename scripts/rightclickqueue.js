(function() {
	function addToQueue(videoId) {
		const event = new CustomEvent('yt-action', {
			bubbles: true,
			composed: true,
			detail: {
				actionName: 'yt-add-to-playlist-command',
				args: [
					{
						addToPlaylistCommand: {
							openMiniplayer: true,
							videoId: videoId,
							videoIds: [videoId],
							listType: 'PLAYLIST_EDIT_LIST_TYPE_QUEUE'
						}
					},
					document.body,
					{ sourceData: {}, mutationContext: undefined }
				],
				optionalAction: true,
				returnValue: []
			}
		});
		document.querySelector('ytd-app')?.dispatchEvent(event);
		if (document.documentElement.dataset.loggingEnabled === 'true') {
			const extName = document.documentElement.dataset.extensionName;
			console.log(`${extName}: added to queue:`, videoId);
		}
	}

	function attachContextMenuHandler(root = document) {
		const links = root.querySelectorAll('a.yt-lockup-view-model__content-image');
		links.forEach(link => {
			if (link.dataset.queueHandlerAttached) return;
			link.dataset.queueHandlerAttached = 'true';

			link.addEventListener('contextmenu', e => {
				e.preventDefault();
				e.stopPropagation();
				const url = new URL(link.href, location.origin);
				const videoId = url.searchParams.get('v');
				if (videoId) addToQueue(videoId);
			});
		});
	}

	const observer = new MutationObserver(mutations => {
		for (const m of mutations) {
			if (m.addedNodes?.length) {
				m.addedNodes.forEach(node => {
					if (node.nodeType !== 1) return;
					attachContextMenuHandler(node);
				});
			}
		}
	});

	observer.observe(document.documentElement, { childList: true, subtree: true });
	attachContextMenuHandler(document);
})();