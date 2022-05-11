/*
Math.round( orig * Math.pow(10,places) ) / Math.pow(10,places)
1) Multiple the original number by 10^x (10 to the power of x)
2) Apply Math.round() to the result
3) Divide result by 10^x
http://www.javascriptkit.com/javatutors/round.shtml
*/

const calculator = (function() {
	let buffer = "";
	let evaled = true;
	let overflow = false;

	function format(num) {
		// this cleans up floating point math
		const result = Math.round( num * Math.pow(10,8) ) / Math.pow(10,8);
		if(result > 99999999 || result < -99999999) {
			overflow = true;
		}
		return result;

	}

	function factor(num) {
		buffer = buffer + num;
		let addOpFound = 0;
		if( (addOpFound = buffer.indexOf('+', 1)) < 0) {
			addOpFound = buffer.indexOf('-', 1);
		}
		addOpFound = addOpFound + 1;
		buffer = buffer.substring(0,addOpFound) + evaluate(buffer.substring(addOpFound));
		console.log({factor}, buffer.substring(addOpFound));
		return (evaluate(buffer.substring(addOpFound)));
	}

	function evaluate(fn) {
		console.log({fn});
		if(overflow) return;
		evaled = true;
		fn = fn.replace(/[^-()\d/*+.]/g, ''); //strip anything other than digits, (), -+/* and . *code credit
		return new Function('return ' + fn)();
	}

/*
function parse(str) {
  return Function(`'use strict'; return (${str})`)()
}

parse("1+2+3")
 */

	return {
		add: function(num) {
			const result = evaluate( buffer + num );
			buffer = result + "+";
			return format(result);
		},
		subtract: function(num) {
			const result = evaluate( buffer + num );
			buffer = result + "-";
			return format(result);
		},
		multiply: function(num) {
			const result = factor(num);
			buffer = buffer + "*";
			return format(result);
		},
		divide: function(num) {
			const result = factor(num);
			buffer = buffer + "/";
			return format(result);
		},
		equals: function(num) {
			const me = this.equals.name;
			console.log({me}, {evaled});
			const result = evaluate( buffer + (evaled ? "" : num) );
			evaled = true;
			buffer = "";
			return format(result);
		},
		percent: function(num) {
			if(buffer.endsWith("*") || buffer.endsWith("/")) {
				return num / 100;
			} else {
				return format(buffer.slice(0,buffer.length-1) * (num / 100));
			}
		},
		clear: function(clearType) {
			buffer = "";
			evaled = true;
			overflow = false;
			errorDisplay.textContent = 'E';
		},
		isEvaled: function(setTo) {
			if(typeof setTo === 'boolean') {
				evaled = setTo;
			}
			return evaled;
		},
		isOverFlowed: function() {
			return overflow;
		},
		addMemory: function(num) {
		},
		getBuffer: function() {
			return buffer;
		}
	}
})();

