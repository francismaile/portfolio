// data-href
 document.querySelectorAll('.nav-link').forEach( menuItem => {
			menuItem.addEventListener( 'click', e => {
			document.getElementById(e.target.dataset.href).scrollIntoView(true);
		});

	});
	// const scrollTo = function(toElem) { return false; };

const windowSizeOutput = document.querySelector('#winSize');

function reportWindowSize() {
  winSize.textContent = window.innerWidth + ', ' + window.innerHeight;
}

window.onresize = reportWindowSize;

document.getElementById('form').addEventListener('submit', (e) => {
	// e.preventDefault();
	// console.log(e.target);
	const formData = new FormData(e.target);
		// console.log(formData);
	for(const [key, value] of formData.entries()) {
		console.log(key, value);
		sessionStorage.setItem(key,value);
	}

});

/*
 * https://stackoverflow.com/questions/22753052/remove-url-parameters-without-refreshing-page
 *
https://stackoverflow.com/questions/901115/how-can-i-get-query-string-values-in-javascript
Update: Jan-2022

Using Proxy() is more performant than using Object.fromEntries() and better supported

const params = new Proxy(new URLSearchParams(window.location.search), {
  get: (searchParams, prop) => searchParams.get(prop),
});
// Get the value of "some_key" in eg "https://example.com/?some_key=some_value"
let value = params.some_key; // "some_value"
Update: June-2021

For a specific case when you need all query params:

const urlSearchParams = new URLSearchParams(window.location.search);
const params = Object.fromEntries(urlSearchParams.entries());
Update: Sep-2018

You can use URLSearchParams which is simple and has decent (but not complete) browser support.

const urlParams = new URLSearchParams(window.location.search);
const myParam = urlParams.get('myParam');
Original

You don't need jQuery for that purpose. You can use just some pure JavaScript:

function getParameterByName(name, url = window.location.href) {
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}
Usage:

// query string: ?foo=lorem&bar=&baz
var foo = getParameterByName('foo'); // "lorem"
var bar = getParameterByName('bar'); // "" (present with empty value)
var baz = getParameterByName('baz'); // "" (present with no value)
var qux = getParameterByName('qux'); // null (absent)


*/

