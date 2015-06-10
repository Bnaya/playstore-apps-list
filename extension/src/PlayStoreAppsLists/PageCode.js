import {getInitData, getTokenFromPageScope} from './Utils/misc';
import AppsInstaller from './Utils/AppsInstaller';
import Ui from './Ui/Ui';

class PageCode {
    constructor () {
    }

    start() {
        getTokenFromPageScope()
            .then(getInitData)
            .then((data) => {
                this.data = data;
                window.chrome.runtime.sendMessage(null, {
                    showAddPageAction: true,
                    devicesList: data.devicesList
                }, {}, () => {});
            }).catch(function () {
            });


        var ui = new Ui();  

        ui.start();

        this.handleMessages();
    }

    handleMessages() {
        window.chrome.runtime.onMessage.addListener((message) => {
            if (message && 'installApps' in message) {

                window.playStoreInstaller = new AppsInstaller(this.data.token, message.payload.device);

                Promise.all(message.payload.apps.map(function (appId) {
                    return window.playStoreInstaller.install(appId);
                })).then(function () {
                });
            }
        });
    }
}

export default PageCode;