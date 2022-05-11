/*
Math.round( orig * Math.pow(10,places) ) / Math.pow(10,places)
1) Multiple the original number by 10^x (10 to the power of x)
2) Apply Math.round() to the result
3) Divide result by 10^x
http://www.javascriptkit.com/javatutors/round.shtml
*/

let calculator = (function() {
  let buffer = "";
  let evaled = true;

  function format(num) {
		// this cleans up floating point math
    return Math.round( num * Math.pow(10,8) ) / Math.pow(10,8);
  }

  function factor(num) {
    buffer = buffer + num;
    let addOpFound = 0;
    if( (addOpFound = buffer.indexOf('+', 1)) < 0) {
      addOpFound = buffer.indexOf('-', 1);
			addOpFound = addOpFound + 1;
			console.log('sub:', buffer.substring(addOpFound));
			buffer = buffer.substring(0,addOpFound) + evaluate(buffer.substring(addOpFound));
			console.log('left:', buffer.substring(0,addOpFound))
			console.log('right:', evaluate(buffer.substring(addOpFound)));
    }
		console.log({factor}, {buffer});
    return evaluate(buffer);
  }

	function evaluate(fn) {
		console.log({evaluate});
		console.log({fn});
    evaled = true;
    fn = fn.replace(/[^-()\d/*+.]/g, ''); //strip anything other than digits, (), -+/* and . *code credit
    return new Function('return ' + fn)();
  }

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
			console.log({num}, {result});
      buffer = buffer + "*";
      return format(result);
    },
    divide: function(num) {
      const result = factor(num);
      buffer = buffer + "/";
      return format(result);
    },
    equals: function(num) {
      const result = evaluate( buffer + num );
      evaled = true;
      buffer = "";
      return format(result);
    },
    percent: function(num) {
      if(buffer.endsWith("*") || buffer.endsWith("/")) {
        return num / 100;
      } else {
        return buffer.slice(0,buffer.length-1) * (num / 100);
      }
    },
    clear: function(clearType) {
      buffer = "";
      evaled = true;
    },
    isEvaled: function(setTo) {
			if(typeof setTo === 'boolean') {
				evaled = setTo;
			}
      return evaled;
    },
    /* setEvaled: function(setTo) {
      if(arguments.length === 0) setTo = true;
      evaled = setTo;
    },*/
		addMemory: function(num) {
		},
		getBuffer: function() {
			return buffer;
		}
  }
})();
