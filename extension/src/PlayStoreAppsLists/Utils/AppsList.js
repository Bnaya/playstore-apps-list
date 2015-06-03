class AppsList {
    constructor() {
        this.populateList();
    }

    add(appId, title) {
        this.list[appId] = title;
        this.persistList();
    }

    remove(appId) {
        delete this.list[appId];
        this.persistList();
    }

    populateList() {
        var persistData = localStorage.getItem('previewList');

        if (!persistData) {
            this.list = {};
        } else {
            this.list = JSON.parse(localStorage.getItem('previewList'));
        }
    }

    getAll () {
        return this.list;
    }

    get (appId) {
        return this.list[appId];
    }

    persistList() {
        localStorage.setItem('previewList', JSON.stringify(this.list));
    }
}

export default AppsList;