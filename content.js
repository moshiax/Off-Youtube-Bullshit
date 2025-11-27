const injectedCssMap = new Map();

const extensionName = chrome.runtime.getManifest().name || 'unknown';
document.documentElement.dataset.extensionName = extensionName;

function log(...args) {
	if (document.documentElement.dataset.loggingEnabled === 'true') {
		console.log(...args);
	}
}

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
	const s = document.createElement('script');
	s.src = chrome.runtime.getURL(file);
	s.dataset.name = file.split('/').pop();
	s.onload = () => {
		log(`${extensionName}: Injected ${file}`);
		s.remove();
	};
	(document.head || document.documentElement).appendChild(s);
}

function injectCss(key, cssText) {
	if (injectedCssMap.has(key)) return;

	const style = document.createElement('style');
	style.textContent = cssText;
	document.head.appendChild(style);
	injectedCssMap.set(key, style);

	log(`${extensionName}: Injected CSS for ${key}`);
}

function removeCss(key) {
	const style = injectedCssMap.get(key);
	if (!style) return;
	style.remove();
	injectedCssMap.delete(key);

	log(`${extensionName}: Removed CSS for ${key}`);
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {

	if (message.type === 'toggleSetting' && message.key === 'logging') {
		document.documentElement.dataset.loggingEnabled = message.value ? 'true' : 'false';
	}

	log(`${extensionName}: Received message`, message);

	if (message.type === 'toggleSetting') {
		const { key, value } = message;

		const setting = config[key];
		if (!setting) {
			return;
		}

		if (setting.style) {
			if (value) {
				injectCss(key, setting.style);
			} else {
				removeCss(key);
			}
		}

		if (setting.script && value) {
			injectScript(setting.script);
		}
	}
});