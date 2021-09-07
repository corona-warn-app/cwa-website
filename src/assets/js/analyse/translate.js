import _get from 'lodash/get';

export default function (key){
	return _get(analyseTranslations, key, key);
};