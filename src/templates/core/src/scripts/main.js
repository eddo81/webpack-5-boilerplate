/* eslint-disable no-unused-vars */
import LoadModule from './modules';
import CheckSelector from './utils/checkselector';

function init() {

}

if(/complete|interactive|loaded/.test(document.readyState)) {
	init();
} else {
	document.addEventListener('DOMContentLoaded', init, false);
}
