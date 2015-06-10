import AppsListClient from './Utils/AppsList';

class PageActionWindow {
    constructor () {
        this.payload = JSON.parse(window.decodeURIComponent(window.location.search.replace('?payload=', '')));
        this.appsListClient = new AppsListClient();
    }

    start() {
        this.createAppListView();
        this.generateDevicesListView();

        window.document.querySelector('.install-button').addEventListener('click', this.installButtonClick.bind(this));
        window.document.querySelector('.remove-button').addEventListener('click', this.removeButtonClick.bind(this));
    }

    installButtonClick() {
        var selectedApps = Array.prototype.slice.call(window.document.querySelectorAll('select.apps option:checked')).map(function (option) {
            return option.value;
        });

        // If there are no selected apps, install the entire list
        if (selectedApps.length === 0) {
            selectedApps = Array.prototype.slice.call(window.document.querySelectorAll('select.apps option')).map(function (option) {
                return option.value;
            });
        }

        window.chrome.tabs.sendMessage(this.payload.tabId, {
            installApps: true,
            payload: {
                device: window.document.querySelector('select.device').value,
                apps: selectedApps
            }
        }, {}, () => {});
    }

    removeButtonClick() {
        var elsArray = Array.prototype.slice.call(window.document.querySelectorAll('select.apps option:checked'));

        elsArray.forEach((option) => {
            this.appsListClient.remove(option.value);
            option.remove();
        });
    }

    createAppListView() {
        this.generateAppListView().then(function (html) {
            window.document.querySelector('.list-container').innerHTML = html;
        });
    }

    generateAppListView() {
        return this.appsListClient.getAll().then(function (list) {
            var appId, htmlStr = `<select class="apps" multiple>`,
                arrayList = [];

            for (appId in list) {
                arrayList.push({
                    id: appId,
                    title: list[appId]
                });
            }

            arrayList.sort((a, b) => {
                return a.title.localeCompare(b.title);
            });

            arrayList.forEach((app) => {
                htmlStr += `<option value="${app.id}">${app.title}</option>`;
            });

            htmlStr += `</select>`;

            return htmlStr;
        });
    }

    generateDevicesListView() {
        var htmlStr = `<select class="device">`,
            opts;


        opts = this.payload.devicesList.map(function (device) {
            return `<option value="${device.id}">${device.name}</option>`;
        });

        htmlStr += opts.join('') + `</select>`;

        window.document.querySelector('.device-container').innerHTML = htmlStr;
    }
}

export default PageActionWindow;