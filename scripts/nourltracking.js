document.addEventListener("copy", async () => {
	try {
		let text = await navigator.clipboard.readText();

		if (/https?:\/\/(www\.)?(youtube\.com|youtu\.be)\/[^\s]+/i.test(text) && /\?si=[^&\s]*/.test(text)) {
			const originalText = text;

			// Removes ?si
			text = text.replace(/([?&])si=[^&\s]*/g, '');

			// Youtu.be ---> youtube.com
			const shortMatch = text.match(/youtu\.be\/([a-zA-Z0-9_-]{11})/);
			if (shortMatch) {
				text = `www.youtube.com/watch?v=${shortMatch[1]}`;
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