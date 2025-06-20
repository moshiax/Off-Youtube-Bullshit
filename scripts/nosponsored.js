(function createSponsoredRemoverInterval() {
  setInterval(() => {
    const badges = document.querySelectorAll('div.badge.badge-style-type-members-only');
    badges.forEach(badge => {
      const item = badge.closest('ytd-rich-item-renderer');
      if (item) item.remove();
    });
  }, 100);
})();
