const noSWKey = "no-service-worker-sandboxed-frame";
document.documentElement.setAttribute(noSWKey, '');

if ('ServiceWorkerContainer' in window) {
	ServiceWorkerContainer.prototype.register = new Proxy(ServiceWorkerContainer.prototype.register, {
		apply(target, thisArg, args) {
			if ('caches' in window) {
				caches.keys().then(keys => Promise.all(keys.map(k => caches.delete(k))));
			}
			return Promise.reject("ServiceWorker registration blocked");
		}
	});
}

window.addEventListener("message", function(e) {
	if (e.data === noSWKey) {
		e.preventDefault();
		e.stopPropagation();
		if (e.source && e.source.ServiceWorkerContainer) {
			e.source.ServiceWorkerContainer.prototype.register = ServiceWorkerContainer.prototype.register;
		}
	}
}, false);

if ('navigator' in window && 'serviceWorker' in navigator) {
	navigator.serviceWorker.getRegistrations().then(registrations => {
		registrations.forEach(r => r.unregister());
	});
}