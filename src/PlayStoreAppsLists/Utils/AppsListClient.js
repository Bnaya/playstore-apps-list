class AppsListClient {
    constructor() {

    }

    sendMessage(method, payload) {
        return new Promise(function (resolve, reject) {
            window.chrome.runtime.sendMessage(null, {
                appList: true,
                method: method,
                payload: payload
            }, {}, (response) => {
                resolve(response);
            });
        });
    }

    add(appId, title) {
        return this.sendMessage('add', {
            id: appId,
            title: title
        });
    }

    remove(appId) {
        return this.sendMessage('remove', {
            id: appId
        });
    }

    get (appId) {
        return this.sendMessage('get', {
            id: appId
        });
    }

    getAll () {
        return this.sendMessage('getAll');
    }
}

export default AppsListClient;