import AppsList from './Utils/AppsList';

class BackgroundCode {
    constructor () {
    }

    start() {
        this.manageListRequests();
        this.setPageActionCode();
    }

    manageListRequests() {
        this.list = new AppsList();

        window.chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
            if (message && 'appList' in message) {
                switch  (message.method) {
                    case 'add':
                        this.list.add(message.payload.id, message.payload.title);
                        break;

                    case 'remove':
                        this.list.remove(message.payload.id);
                        break;

                    case 'get':
                        sendResponse(this.list.get(message.payload.id));
                        break;

                    case 'getAll':
                        sendResponse(this.list.getAll());
                        break;
                }
            }
        });
    }

    setPageActionCode() {
        window.chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
            if (message && 'showAddPageAction' in message && message.showAddPageAction) {
                window.chrome.pageAction.setPopup({
                    tabId: sender.tab.id,
                    popup: 'pageActionWindow.html?payload=' + window.encodeURIComponent(window.JSON.stringify({
                        tabId: sender.tab.id,
                        devicesList: message.devicesList
                    }))
                });
                window.chrome.pageAction.setIcon({
                    tabId: sender.tab.id,
                    path: 'images/list_icon_512.png'
                }, function () {

                });
                window.chrome.pageAction.show(sender.tab.id);
            }
        });
    }
}

export default BackgroundCode;