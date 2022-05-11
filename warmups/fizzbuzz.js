/* Fizz Buzz */
// three different ways
//

fizzBuzz(50);

function fizzBuzz(limit) {
	for(i = 0; i < limit;) console.log(check1(++i));
}

function check(num) {
	return ((num % 3 ? '' : 'Fizz') + (num % 5 ? '' : 'Buzz')) || num ;
}

function check1(num) {
	let say = num % 3 ? '' : 'Fizz';
	say += num % 5 ? '' : 'Buzz';
	return say || num ;
}

function check2(num) {
		let say = '';
		if(!(num % 3)) say = 'Fizz';
		if(!(num % 5)) say += 'Buzz';
		return( say || num );
}

