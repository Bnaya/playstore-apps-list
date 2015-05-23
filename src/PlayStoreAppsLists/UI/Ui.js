import AppsListClient from '../Utils/AppsListClient';

class Ui {
    constructor () {
    }

    start () {
        this.startAddButton();

        this.appListClient = new AppsListClient();
    }

    startAddButton() {
        var lastUrl = '';

        window.setInterval(() => {
            if (lastUrl !== window.location.href) {
                if (window.location.pathname === "/store/apps/details" && window.document.querySelector('.details-actions')) {
                    lastUrl = window.location.href;
                    this.applyButton();
                }
            }
        }, 500);
    }

    buttonClick(e) {
        var buttonEl = e.currentTarget;

        if (buttonEl.dataset.action === 'remove') {
            this.appListClient.remove(document.querySelector('.details-wrapper').dataset.docid);
            buttonEl.innerText = 'Add to list';
            buttonEl.dataset.action = 'add';
        } else if (buttonEl.dataset.action === 'add') {
            this.appListClient.add(document.querySelector('.details-wrapper').dataset.docid, window.document.querySelector('.document-title').innerText.trim());
            buttonEl.innerText = 'Remove from list';
            buttonEl.dataset.action = 'remove';
        }
    }

    applyButton() {
        this.appListClient.get(document.querySelector('.details-wrapper').dataset.docid).then((app) => {
            var el = this.createButtonElement();

            if (app) {
                el.innerText = 'Remove from list';
                el.dataset.action = 'remove';
            } else {
                el.innerText = 'Add to list';
                el.dataset.action = 'add';
            }

            el.addEventListener('click', this.buttonClick.bind(this));

            window.document.querySelector('.details-actions').appendChild(el);
        });
    }

    createButtonElement() {
        var el = document.createElement('div'),
            style = `
            height: 36px;
            font-size: 14px;
            font-weight: bold;
            cursor: pointer;
            display: inline-block;
            vertical-align: top;
            color: #fff;
            background-color: #337ab7;
            border-color: #2e6da4;
            border-radius: 5px;
            text-align: center;
            line-height: 36px;
            padding: 0px 10px;
            `;

        el.classList.add('ugly-button');
        el.setAttribute('style', style);

        return el;        
    }
}

export default Ui;