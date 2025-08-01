document.addEventListener("copy", async () => {
	try {
		let text = await navigator.clipboard.readText();

		if (/https?:\/\/(www\.)?(youtube\.com|youtu\.be)\/\S+/i.test(text) && /[?&]si=[^&\s]*/.test(text)) {
			const originalText = text;

			// Remove 'si' param but keep others
			text = text.replace(/([?&])si=[^&\s]*/g, (m, p1, i, s) =>
				p1 === '?' && s.indexOf('&', i) !== -1 ? '?' : ''
			).replace(/\?&/, '?').replace(/[?&]$/, '');

			// Convert youtu.be short URL to youtube.com full URL, fix param separator
			const m = text.match(/youtu\.be\/([a-zA-Z0-9_-]{11})/);
			if (m) {
				const params = text.split('?')[1] || '';
				text = `www.youtube.com/watch?v=${m[1]}` + (params ? `&${params}` : '');
			}

			await navigator.clipboard.writeText(text);

			if (document.documentElement.getAttribute('data-logging-enabled') === 'true') {
				console.log(`${document.documentElement.getAttribute('data-extension-name')}: Cleaned YouTube URL: ${originalText} --> ${text}`);
			}
		}
	} catch (err) {
		if (document.documentElement.getAttribute('data-logging-enabled') === 'true') {
			console.error(`${document.documentElement.getAttribute('data-extension-name')}: Error processing copy event:`, err);
		}
	}
});