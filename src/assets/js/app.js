import $ from 'jquery';
import 'what-input';

window.jQuery = $;

console.log('loaded');
console.log(typeof($) == 'function' ? 'jQuery loaded' : 'loading issue');

