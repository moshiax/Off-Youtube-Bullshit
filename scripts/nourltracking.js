(function() {
	document.addEventListener("copy", async () => {
		try {
			let text = await navigator.clipboard.readText();

			if (/https?:\/\/(www\.)?(youtube\.com|youtu\.be)\/\S+/i.test(text) && /[?&]si=[^&\s]*/.test(text)) {
				const originalText = text;

				const url = new URL(text);
				url.searchParams.delete('si');
				text = url.toString();

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