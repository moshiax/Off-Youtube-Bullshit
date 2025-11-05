(function() {
	document.addEventListener("copy", async () => {
		try {
			let text = await navigator.clipboard.readText();

			if (/https?:\/\/(www\.)?(youtube\.com|youtu\.be)\/\S+/i.test(text) && /[?&]si=[^&\s]*/.test(text)) {
				const originalText = text;

				// Remove 'si' param but keep others
				text = text.replaceAll(/([?&])si=[^&\s]*/g, (m, p1, i, s) =>
					p1 === '?' && s.includes('&', i) ? '?' : ''
				).replace(/\?&/, '?').replace(/[?&]$/, '');

				// Convert youtu.be short URL to youtube.com full URL
				// const m = /youtu\.be\/([a-zA-Z0-9_-]{11})/.exec(text);
				// if (m) {
					// const params = text.split('?')[1] || '';
					// text = `www.youtube.com/watch?v=${m[1]}` + (params ? `&${params}` : '');
				// }

				await navigator.clipboard.writeText(text);

				if (document.documentElement.dataset.loggingEnabled === 'true') {
					console.log(`${document.documentElement.dataset.extensionName}: Cleaned YouTube URL: ${originalText} --> ${text}`);
				}
			}
		} catch (err) {
			if (document.documentElement.dataset.loggingEnabled === 'true') {
				console.error(`${document.documentElement.dataset.extensionName}: Error processing copy event:`, err);
			}
		}
	});
})();