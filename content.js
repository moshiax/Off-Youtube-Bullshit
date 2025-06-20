const injectedScripts = new Set();
const injectedCssKeys = new Set();

chrome.storage.local.get(Object.keys(vars), result => {
  const loggingEnabled = !!result.logging;

  for (const key in vars) {
    if (result[key] && cssRules[key]) {
      injectCss(key, cssRules[key], loggingEnabled);
    }
  }

  for (const key in vars) {
    if (!result[key]) continue;

    if (loggingEnabled) console.log(`Feature enabled: ${key}`);

    if (key === 'nosponsored') {
      injectScript('scripts/nosponsored.js', loggingEnabled);
    } else if (key === 'nosleeptimer') {
      injectScript('scripts/nosleeptimer.js', loggingEnabled);
    } else if (key === 'autoconfirm') {
      injectScript('scripts/autoconfirm.js', loggingEnabled);
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
    if (loggingEnabled) console.log(`Injected ${file}`);
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
  if (loggingEnabled) console.log(`Injected CSS rule for ${key}`);
}
