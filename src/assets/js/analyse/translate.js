import _get from 'lodash/get';
const $ = window.jQuery;
let translations;

$(() => {
	// get translations
	translations = $(".analyseBoards").data("translations");
});

export default function (key){
	return _get(translations, key, key);
};