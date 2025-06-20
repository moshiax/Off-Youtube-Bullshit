function createSponsoredRemoverInterval() {
  return setInterval(() => {
    const badges = document.querySelectorAll('div.badge.badge-style-type-members-only');
    badges.forEach(badge => {
      const item = badge.closest('ytd-rich-item-renderer');
      if (item) item.remove();
    });
  }, 100);
}

function createSleepTimerRemoverInterval() {
  return setInterval(() => {
    const path = document.querySelector('svg path[d="M16.67,4.31C19.3,5.92,21,8.83,21,12c0,4.96-4.04,9-9,9c-2.61,0-5.04-1.12-6.72-3.02C5.52,17.99,5.76,18,6,18 c6.07,0,11-4.93,11-11C17,6.08,16.89,5.18,16.67,4.31 M14.89,2.43C15.59,3.8,16,5.35,16,7c0,5.52-4.48,10-10,10 c-1,0-1.97-0.15-2.89-0.43C4.77,19.79,8.13,22,12,22c5.52,0,10-4.48,10-10C22,7.48,19,3.67,14.89,2.43L14.89,2.43z M12,6H6v1h4.5 L6,10.99v0.05V12h6v-1H7.5L12,7.01V6.98V6L12,6z"]');
    if (path) {
      const menuItem = path.closest('.ytp-menuitem');
      if (menuItem) menuItem.remove();
    }
  }, 100);
}

chrome.storage.local.get(Object.keys(vars), result => {
  const loggingEnabled = !!result.logging;

  for (const key in vars) {
    if (result[key]) {
      if (loggingEnabled) console.log(`Feature enabled: ${key}`);

      if (key === 'nosponsored') {
        createSponsoredRemoverInterval();
        if (loggingEnabled) console.log("Started sponsored remover interval");
      } else if (key === 'nosleeptimer') {
        createSleepTimerRemoverInterval();
        if (loggingEnabled) console.log("Started sleep timer remover interval");
      } else if (key === 'autoconfirm') {
        const s = document.createElement('script');
        s.src = chrome.runtime.getURL('autoconfirm.js');
        s.onload = () => {
          if (loggingEnabled) console.log("Injected autoconfirm.js script");
          s.remove();
        };
        (document.head || document.documentElement).appendChild(s);
      }

      if (cssRules[key]) {
        const style = document.createElement('style');
        style.textContent = cssRules[key];
        document.head.appendChild(style);
        if (loggingEnabled) console.log(`Injected CSS rule for ${key}`);
      }
    }
  }
});
