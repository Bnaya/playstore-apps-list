function getInitData (firstToken) {
    return new Promise(function (resolve, reject) {
        var formData = new FormData();
        formData.append('xhr', '1');
        formData.append('token', firstToken);

        var myRequest = new XMLHttpRequest();
        myRequest.open('post', 'https://play.google.com/store/xhr/ructx');
        myRequest.send(formData);

        myRequest.addEventListener('load', function () {
            var parsed = shittiJsonParse(myRequest.response),
                data = {
                    devicesList: normalizeDevicesList(parsed[0][2][10]),
                    token: parsed[0][2][0]
                };
            resolve(data);
        });

        myRequest.addEventListener('error', function () {
            reject();
        });
    });
}

// Parse the JSON with some blak magic. ooga of many booga
function shittiJsonParse(string) {
    return JSON.parse(
        string.substr(5).replace(/(\r\n|\n|\r)/gm,"").replace(/,{2,}/g, ', "TRIMEDDDD",')
    );
}

function normalizeDevicesList (list) {
    return list.map(function (deviceAsArray) {
        return {
            name: deviceAsArray[0],
            id: deviceAsArray[1],
            vendor: deviceAsArray[2],
            model: deviceAsArray[3],
            image: deviceAsArray[6],
            carier: deviceAsArray[10],
        };
    });
}

function getTokenFromPageScope () {
    var promise = new Promise(function (resolve, reject) {
        window.setTimeout(() => {
            var a = document.createElement('script');

            a.text = findAccessTokenVar.toString();

            a.text += `
                window.document.body.setAttribute("data-playStoreToken", findAccessTokenVar().b[0])
            `;

            document.body.appendChild(a);

            if (window.document.body.getAttribute('data-playStoreToken') !== 'null') {
                resolve(window.document.body.getAttribute('data-playStoreToken'));
            } else {
                reject();
            }
        }, 3000);
    });

    return promise;
}

function findAccessTokenVar () {
    var a = [],
        bla,
        initDataObject;

    for (bla in window) {
        if (bla.length === 2 && typeof window[bla] === 'object' && window[bla]) { 
            a.push(bla);
        }
    }

    a.forEach(function (value, index) {
        if (isInitDataVar(window[value])) {
            initDataObject = window[value];
        }
    });

    function isInitDataVar (obj) {
        return 'b' in obj && !!obj.b && typeof obj.b === 'object' && 'length' in obj.b && obj.b.length === 20;
    }

    return initDataObject;
}

export {getInitData, shittiJsonParse, normalizeDevicesList, getTokenFromPageScope, findAccessTokenVar};