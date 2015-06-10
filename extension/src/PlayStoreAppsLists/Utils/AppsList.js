import storage from './storage';

class AppsListClient {
    constructor() {
    }

    add(appId, title) {
        return this.getAll().then(function (list) {
            list[appId] = title;

            return storage.set({
                previewList: list
            });
        });
    }

    remove(appId) {
        return this.getAll().then(function (list) {
            delete list[appId];

            return storage.set({
                previewList: list
            });
        });
    }

    get(appId) {
        return this.getAll().then(function (list) {
            return list[appId];
        });
    }

    getAll() {
        return storage.get('previewList').then(function (items) {
            return items.previewList || {};
        });
    }
}

export default AppsListClient;