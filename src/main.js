import BackgroundCode from './PlayStoreAppsLists/BackgroundCode';
import PageActionWindow from './PlayStoreAppsLists/PageActionWindow';
import PageCode from './PlayStoreAppsLists/pageCode';

if (window.location.pathname === '/pageActionWindow.html') {
	var pageActionWindow = new PageActionWindow();

	pageActionWindow.start();
} else if ('pageAction' in window.chrome) {
	var background = new BackgroundCode();

	background.start();
} else {
	var pageCode = new PageCode();

	pageCode.start();
}
