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
        chrome.storage.local.set({ [key]: e.target.checked });
      });
    }
  }
});
