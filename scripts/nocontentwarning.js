function clickDaButton(rootElement = document.documentElement) {
    const errorButtons = rootElement.querySelectorAll(
        "yt-playability-error-supported-renderers#error-screen yt-touch-feedback-shape"
    );

    if (errorButtons.length > 0) {
        for (const button of errorButtons) {
            button.click();
            console.log("[nocontentwarning.js] clicked.");
        }
    }
}

document.addEventListener('yt-navigate-finish', () => {
    if (!location.href.includes("watch") || location.href.includes("&rco=1")) return;

    setTimeout(() => {
        clickDaButton(document.documentElement);
    }, 300);
});