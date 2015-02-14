(function () {
	'use strict';

	var token = getTokenFromPageScope();


	getInitData(token).then(function (data) {
		console.log(data);

		window.playStoreInstaller = new AppsInstaller(data.token, data.devicesList[0].id);
	});
}());

function getInitData (firstToken) {
	return new Promise(function (resolve, reject) {
		var formData = new FormData();
		formData.append('xhr', '1');
		formData.append('token', firstToken);

		var myRequest = new XMLHttpRequest();
		myRequest.open('post', 'https://play.google.com/store/xhr/ructx');
		myRequest.send(formData);

		myRequest.addEventListener('load', function () {
			var parsed = shittiJsonParse(myRequest.response);
				data = {
					devicesList: normalizeDevicesList(parsed[0][2][10]),
					token: parsed[0][2][0]
				};
			resolve(data);
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
	var a = document.createElement('script');

	a.text = [
		//'console.log(window.Ek.b[0])',
		'window.document.body.setAttribute("data-playStoreToken", window.Ek.b[0])'
	];
	document.body.appendChild(a);

	return window.document.body.getAttribute('data-playStoreToken');
}

var AppsInstaller = function (token, deviceId) {
	this.token = token;
	this.deviceId = deviceId;
};

AppsInstaller.prototype.install = function (appPackageIdentifier) {
	return new Promise(function (resolve, reject) {
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
	}.bind(this));
};

var AppsList = function () {
	this.populateList();
};

AppsList.prototype.populateList = function () {
	var persistData = localStorage.getItem('previewList');

	if (!persistData) {
		this.list = [];
	} else {
		this.list = JSON.parse(localStorage.getItem('previewList'));
	}
};

AppsList.prototype.persistList = function () {
	localStorage.setItem('previewList', JSON.stringify(this.list));
};