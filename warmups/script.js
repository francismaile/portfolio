/*
 * Reverse a String – Enter a string and the program will reverse it and print it out.
 * https://eddmann.com/posts/ten-ways-to-reverse-a-string-in-javascript/
 * https://www.freecodecamp.org/news/how-to-reverse-a-string-in-javascript-in-3-different-ways-75e4763c68cb/
 */


/* Reverse a string three ways */
// using for loop
function revFor( str ) {
	let strRev = '';
	for( let i = str.length-1; i >= 0 ; i-- ) {
		strRev += str[i];
	}
	return strRev;
}

// using array functions
const revArr = ( str ) => [...str].reverse().join('');

// using recursion
function revRec( str ) {
	if( str === '' ) return "";
	else return revRecur(str.substr(1)) + str.charAt(0);
}

/* FizzBuzz */


