class AppsInstaller {
    constructor (token, deviceId) {
        this.token = token;
        this.deviceId = deviceId;
    }

    install(appPackageIdentifier) {
        return new Promise((resolve, reject) => {
            var formData, myRequest;

            formData = new FormData();
            formData.append('id', appPackageIdentifier);
            formData.append('device', this.deviceId);
            formData.append('xhr', '1');
            formData.append('token', this.token);

            myRequest = new XMLHttpRequest();
            myRequest.open('POST', 'https://play.google.com/store/install');
            myRequest.send(formData);

            myRequest.addEventListener('load', function () {
                resolve(myRequest);
            });

            myRequest.addEventListener('error', function () {
                reject(myRequest);
            });
        });
    }

}

export default AppsInstaller;