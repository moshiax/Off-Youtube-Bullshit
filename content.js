const injectedScripts = new Set();
const injectedCssKeys = new Set();
const extensionName = chrome.runtime.getManifest().name || 'unknown';
document.documentElement.dataset.extensionName = extensionName;

chrome.storage.local.get(Object.keys(config), result => {
	const toSet = {};

	for (const key in config) {
		if (result[key] === undefined) {
			toSet[key] = config[key].default;
		}
	}

	if (Object.keys(toSet).length > 0) {
		chrome.storage.local.set(toSet);
	}

	let loggingEnabled = result.logging ?? toSet.logging;
	document.documentElement.dataset.loggingEnabled = loggingEnabled ? 'true' : 'false';

	for (const key in config) {
		const setting = config[key];
		let value = result[key];
		if (value === undefined) value = toSet[key];
		if (!value) continue;
		if (setting.style) injectCss(key, setting.style);
		if (setting.script) injectScript(setting.script);
	}
});

function injectScript(file) {
	if (injectedScripts.has(file)) return;

	const s = document.createElement('script');
	s.src = chrome.runtime.getURL(file);
	s.dataset.name = file.split('/').pop();
	s.onload = () => {
		if (document.documentElement.dataset.loggingEnabled === 'true') {
			console.log(`${extensionName}: Injected ${file}`);
		}
		s.remove();
	};
	(document.head || document.documentElement).appendChild(s);
	injectedScripts.add(file);
}

function injectCss(key, cssText) {
	if (injectedCssKeys.has(key)) return;

	const style = document.createElement('style');
	style.textContent = cssText;
	document.head.appendChild(style);
	injectedCssKeys.add(key);

	if (document.documentElement.dataset.loggingEnabled === 'true') {
		console.log(`${extensionName}: Injected CSS for ${key}`);
	}
}