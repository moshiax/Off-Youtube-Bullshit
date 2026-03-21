(function() {
	const originalDispatch = EventTarget.prototype.dispatchEvent;

	EventTarget.prototype.dispatchEvent = function(event) {
		const skipEventTypes = [
			'iron-resize',
			'iron-request-resize-notifications',
			'yt-popup-opened',
			'yt-renderidom-finished',
			'yt-rendererstamper-finished',
			'load',
			'dom-change'
		];

		const skipActionNames = [
			'yt-user-activity',
			'yt-close-popup-action',
			'yt-forward-redux-action-to-live-chat-iframe'
		];

		let shouldSkip = skipEventTypes.includes(event.type);

		if (!shouldSkip && event instanceof CustomEvent && event.detail) {
			shouldSkip = skipActionNames.includes(event.detail.actionName);
		}

		if (!shouldSkip && event instanceof CustomEvent) {
			try {
				const detailJSON = JSON.stringify(event.detail, null, 2);
				console.log(`CustomEvent dispatched: ${event.type} ${detailJSON}`);
			} catch (e) {
				console.log('CustomEvent dispatched (detail not serializable):', event.type, event.detail);
			}
		}

		return originalDispatch.call(this, event);
	};
})();