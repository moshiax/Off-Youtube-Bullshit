const injectedCssMap = new Map();
const injectedScripts = new Set();

const extensionName = chrome.runtime.getManifest().name || 'unknown';
document.documentElement.dataset.extensionName = extensionName;

let rydInitPromise = null;

function log(...args) {
	if (document.documentElement.dataset.loggingEnabled === 'true') console.log(...args);
}

function generateUserID(length = 36) {
	const charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
	const values = crypto.getRandomValues(new Uint32Array(length));
	return Array.from(values, v => charset[v % charset.length]).join('');
}

function initRydDataset() {
	if (rydInitPromise) return rydInitPromise;
	rydInitPromise = new Promise(resolve => {
		chrome.storage.local.get(['rydUserId', 'rydRegistrationConfirmed'], res => {
			const userId = res.rydUserId || generateUserID();
			const registrationConfirmed = !!res.rydRegistrationConfirmed;
			Object.assign(document.documentElement.dataset, {
				rydUserId: userId,
				rydRegistrationConfirmed: registrationConfirmed ? 'true' : 'false'
			});
			if (!res.rydUserId) {
				chrome.storage.local.set({ rydUserId: userId, rydRegistrationConfirmed: false }, resolve);
			} else resolve();
		});
	});
	return rydInitPromise;
}

function updateStorage() {
	chrome.storage.local.set({
		rydUserId: document.documentElement.dataset.rydUserId || '',
		rydRegistrationConfirmed: document.documentElement.dataset.rydRegistrationConfirmed === 'true'
	});
}

window.addEventListener('message', async (event) => {
	if (event.source !== window) return;
	const { type, source, action, payload = {}, requestId } = event.data || {};
	if (type !== 'RYD_CLIENT_BRIDGE' || source !== 'page' || event.origin !== window.location.origin) return;

	await initRydDataset();

	if (action === 'getTokenState') {
		window.postMessage({
			type: 'RYD_CLIENT_BRIDGE', source: 'extension', requestId,
			payload: {
				userId: document.documentElement.dataset.rydUserId || '',
				registrationConfirmed: document.documentElement.dataset.rydRegistrationConfirmed === 'true'
			}
		}, event.origin);
		return;
	}

	if (action === 'setTokenState') {
		if (payload.userId) document.documentElement.dataset.rydUserId = payload.userId;
		if (payload.registrationConfirmed !== undefined) {
			document.documentElement.dataset.rydRegistrationConfirmed = payload.registrationConfirmed ? 'true' : 'false';
		}
		updateStorage();
		window.postMessage({
			type: 'RYD_CLIENT_BRIDGE', source: 'extension', requestId,
			payload: {
				ok: true,
				userId: document.documentElement.dataset.rydUserId || '',
				registrationConfirmed: document.documentElement.dataset.rydRegistrationConfirmed === 'true'
			}
		}, event.origin);
	}
});

function injectScript(file) {
	if (injectedScripts.has(file)) return;
	const s = document.createElement('script');
	s.src = chrome.runtime.getURL(file);
	s.dataset.name = file.split('/').pop();
	s.onload = () => { log(`${extensionName}: Injected ${file}`); s.remove(); };
	(document.head || document.documentElement).appendChild(s);
	injectedScripts.add(file);
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

chrome.storage.local.get(Object.keys(config), result => {
	const toSet = {};
	for (const key in config) if (result[key] === undefined) toSet[key] = config[key].default;
	if (Object.keys(toSet).length) chrome.storage.local.set(toSet);

	const loggingEnabled = result.logging ?? toSet.logging;
	document.documentElement.dataset.loggingEnabled = loggingEnabled ? 'true' : 'false';

	for (const key in config) {
		const value = result[key] ?? toSet[key];
		if (!value) continue;
		const { style, script } = config[key];
		if (style) injectCss(key, style);
		if (script) injectScript(script);
	}
});

initRydDataset();

chrome.runtime.onMessage.addListener(({ type, key, value }) => {
	if (type === 'toggleSetting') {
		document.documentElement.dataset.loggingEnabled = key === 'logging' ? value ? 'true' : 'false' : document.documentElement.dataset.loggingEnabled;
		const setting = config[key];
		if (!setting) return;
		if (setting.style) value ? injectCss(key, setting.style) : removeCss(key);
		if (setting.script && value) injectScript(setting.script);
		log(`${extensionName}: Received message`, { type, key, value });
	}
});