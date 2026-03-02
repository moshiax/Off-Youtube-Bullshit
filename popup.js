document.addEventListener("DOMContentLoaded", () => {
	const container = document.getElementById("checkbox-container");

	for (const [key, { label, description }] of Object.entries(config)) {
		const switchEl = document.createElement("label");
		switchEl.classList.add("toggle-switch");

		const tooltip = document.createElement("div");
		tooltip.classList.add("toggle-tooltip");
		tooltip.innerHTML = description || "";
		switchEl.appendChild(tooltip);

		const checkbox = document.createElement("input");
		checkbox.type = "checkbox";
		checkbox.id = key;

		const slider = document.createElement("span");
		slider.classList.add("toggle-slider");

		const text = document.createElement("span");
		text.classList.add("toggle-label");
		text.textContent = label;

		switchEl.append(checkbox, slider, text);
		container.appendChild(switchEl);
		container.appendChild(document.createElement("br"));
	}

	chrome.storage.local.get(Object.keys(config), result => {
		const updates = {};
		for (const key in config) {
			if (result[key] === undefined) updates[key] = config[key].default;
		}
		if (Object.keys(updates).length) {
			chrome.storage.local.set(updates);
			Object.assign(result, updates);
		}
		for (const key in config) {
			const cb = document.getElementById(key);
			if (cb) cb.checked = result[key];
		}
	});

	for (const key in config) {
		const cb = document.getElementById(key);
		if (cb) {
			cb.addEventListener("change", e => {
				const value = e.target.checked;
				chrome.storage.local.set({ [key]: value });

				chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
					if (!tabs[0]) return;
					chrome.tabs.sendMessage(tabs[0].id, {
						type: "toggleSetting",
						key,
						value
					});
				});
			});
		}
	}

	const tokenValueEl = document.getElementById("ryd-token-value");
	const tokenStatusEl = document.getElementById("ryd-token-status");
	const resetTokenBtn = document.getElementById("ryd-reset-token");

	function refreshTokenState() {
		chrome.storage.local.get(["rydUserId", "rydRegistrationConfirmed"], (res) => {
			tokenValueEl.textContent = res.rydUserId || "(empty)";
			tokenStatusEl.textContent = `registration: ${res.rydRegistrationConfirmed ? "confirmed" : "pending"}`;
		});
	}

	function resetRydToken() {
		const charset = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
		const values = new Uint32Array(36);
		crypto.getRandomValues(values);
		let token = "";
		for (let i = 0; i < 36; i++) token += charset[values[i] % charset.length];
		chrome.storage.local.set({ rydUserId: token, rydRegistrationConfirmed: false }, refreshTokenState);
	}

	resetTokenBtn.addEventListener("click", resetRydToken);
	refreshTokenState();
});
