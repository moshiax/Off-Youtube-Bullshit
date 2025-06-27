document.addEventListener("copy", async (e) => {
  try {
    let text = await navigator.clipboard.readText();

    if (/(https?:\/\/(www\.)?(youtube\.com|youtu\.be)\/[^\s]+)/i.test(text) && /\?si=[^&\s]*/.test(text)) {
      const originalText = text;
      text = text.replace(/\?si=[^&\s]*/, "");
      await navigator.clipboard.writeText(text);

      if (document.documentElement.getAttribute('data-logging-enabled') === 'true') {
        console.log(`${document.documentElement.getAttribute('data-extension-name')}: Removed ?si= parameter: ${originalText} --> ${text}`);
      }
    }
  } catch (err) {
    if (document.documentElement.getAttribute('data-logging-enabled') === 'true') {
      console.error(`${document.documentElement.getAttribute('data-extension-name')}: Error processing copy event:`, err);
    }
  }
});
