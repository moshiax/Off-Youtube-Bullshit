const injectedScripts = new Set();
const injectedCssKeys = new Set();
const extensionName = chrome.runtime.getManifest().name || 'unknown';

chrome.storage.local.get(Object.keys(config), result => {
	const loggingEnabled = !!result.logging;
	document.documentElement.dataset.loggingEnabled = loggingEnabled ? 'true' : 'false';
	document.documentElement.dataset.extensionName = extensionName;

	for (const key in config) {
		const setting = config[key];
		let value = result[key];

		if (value === undefined) value = setting.default;

		if (!value) {
			continue;
		}

		if (setting.style) {
			injectCss(key, setting.style, loggingEnabled);
		}

		if (setting.script) {
			injectScript(setting.script, loggingEnabled);
		}
	}
});

function injectScript(file, loggingEnabled) {
	if (injectedScripts.has(file)) return;

	const s = document.createElement('script');
	s.src = chrome.runtime.getURL(file);
	s.onload = () => {
		if (loggingEnabled) console.log(`${extensionName}: Injected ${file}`);
		s.remove();
	};
	(document.head || document.documentElement).appendChild(s);
	injectedScripts.add(file);
}

function injectCss(key, cssText, loggingEnabled) {
	if (injectedCssKeys.has(key)) return;

	const style = document.createElement('style');
	style.textContent = cssText;
	document.head.appendChild(style);
	injectedCssKeys.add(key);

	if (loggingEnabled) console.log(`${extensionName}: Injected CSS for ${key}`);
}