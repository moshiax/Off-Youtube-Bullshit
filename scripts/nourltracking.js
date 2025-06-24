document.addEventListener("copy", async (e) => {
  try {
    let text = await navigator.clipboard.readText();

    if (/(https?:\/\/(www\.)?(youtube\.com|youtu\.be)\/[^\s]+)(\?si=[^&\s]+)?/.test(text)) {
      text = text.replace(/(\?si=[^&\s]*)/, "");
      await navigator.clipboard.writeText(text);

      if (document.documentElement.getAttribute('data-logging-enabled') === 'true') {
        console.log(`${document.documentElement.getAttribute('data-extension-name')}: Parameter ?si= removed from copied YouTube link`);
      }
    }
  } catch (err) {
    if (document.documentElement.getAttribute('data-logging-enabled') === 'true') {
      console.error(`${document.documentElement.getAttribute('data-extension-name')}: Error processing copy event:`, err);
    }
  }
});
