const injectedScripts = new Set();
const injectedCssKeys = new Set();
const extensionName = chrome.runtime.getManifest().name || 'unknown';

chrome.storage.local.get(Object.keys(vars), result => {

	const loggingEnabled = !!result.logging;
	document.documentElement.setAttribute('data-logging-enabled', loggingEnabled ? 'true' : 'false');
	document.documentElement.setAttribute('data-extension-name', extensionName);

	for (const key in vars) {
		if (result[key] && cssRules[key]) {
			injectCss(key, cssRules[key], !!result.logging);
		}
	}

	for (const key in vars) {
		if (!result[key]) continue;

		if (loggingEnabled) {
			console.log(`${document.documentElement.getAttribute('data-extension-name')}: Feature enabled: ${key}`);
		}

		if (key === 'nosleeptimer') {
			injectScript('scripts/nosleeptimer.js', loggingEnabled);
		} else if (key === 'autoconfirm') {
			injectScript('scripts/autoconfirm.js', loggingEnabled);
		} else if (key === 'nourltracking') {
			injectScript('scripts/nourltracking.js', loggingEnabled);
		}
	}
});

function injectScript(file, loggingEnabled) {
	if (injectedScripts.has(file)) {
		return;
	}

	const s = document.createElement('script');
	s.src = chrome.runtime.getURL(file);
	s.onload = () => {
		if (loggingEnabled) {
			console.log(`${document.documentElement.getAttribute('data-extension-name')}: Injected ${file}`);
		}
		s.remove();
	};
	(document.head || document.documentElement).appendChild(s);
	injectedScripts.add(file);
}

function injectCss(key, cssText, loggingEnabled) {
	if (injectedCssKeys.has(key)) {
		return;
	}

	const style = document.createElement('style');
	style.textContent = cssText;
	document.head.appendChild(style);
	injectedCssKeys.add(key);
	if (loggingEnabled) {
		console.log(`${document.documentElement.getAttribute('data-extension-name')}: Injected CSS rule for ${key}`);
	}
}