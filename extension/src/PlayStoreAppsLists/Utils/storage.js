var storageArea  = window.chrome.storage.local;

export default {
	get: function (keys) {
		return new Promise(function (resolve, reject) {
			storageArea.get(keys, function (items) {
				if (window.chrome.runtime.lastError) {
					reject(window.chrome.runtime.lastError);
				} else {
					resolve(items);
				}
			});
		});
	},

	getBytesInUse: function (keys) {
		return new Promise(function (resolve, reject) {
			storageArea.getBytesInUse(keys, function (bytesInUse) {
				if (window.chrome.runtime.lastError) {
					reject(window.chrome.runtime.lastError);
				} else {
					resolve(bytesInUse);
				}
			});
		});
	},

	set: function (items) {
		return new Promise(function (resolve, reject) {
			storageArea.set(items, function () {
				if (window.chrome.runtime.lastError) {
					reject(window.chrome.runtime.lastError);
				} else {
					resolve();
				}
			});
		});
	},

	remove: function (keys) {
		return new Promise(function (resolve, reject) {
			storageArea.remove(keys, function () {
				if (window.chrome.runtime.lastError) {
					reject(window.chrome.runtime.lastError);
				} else {
					resolve();
				}
			});
		});
	},

	clear: function () {
		return new Promise(function (resolve, reject) {
			storageArea.clear(function () {
				if (window.chrome.runtime.lastError) {
					reject(window.chrome.runtime.lastError);
				} else {
					resolve();
				}
			});
		});
	}
};