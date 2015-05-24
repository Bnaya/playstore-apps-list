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
            });


        var ui = new Ui();  

        ui.start();

        this.handleMessages();
    }

    handleMessages() {
        window.chrome.runtime.onMessage.addListener((message) => {
            if (message && 'installApps' in message) {

                window.playStoreInstaller = new AppsInstaller(this.data.token, message.payload.device);

                message.payload.apps.map(function (appId) {
                    return window.playStoreInstaller.install(appId);
                });
            }
        });
    }
}

export default PageCode;