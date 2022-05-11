let calculator = (function() {
  let buffer = "";
  let evaled = true;

  function format(num) {
    return Math.round( num * Math.pow(10,8) ) / Math.pow(10,8);
  }

  function factor(num) {
    buffer = buffer + num;
    let addOpFound = 0;
    if( (addOpFound = buffer.indexOf('+', 1)) < 0) {
      addOpFound = buffer.indexOf('-', 1);
    }
    addOpFound = addOpFound + 1;
    buffer = buffer.substring(0,addOpFound) + evaluate(buffer.substring(addOpFound));
    return (evaluate(buffer.substring(addOpFound)));
  }
  function evaluate(fn) {
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
      buffer = buffer + "*";
      return format(result);
    },
    divide: function(num) {
      const result = factor(num);
      buffer = buffer + "/";
      return format(result);
    },
    equals: function(num) {
      const result = evaluate( buffer + (evaled ? "" : num) );
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
      evaled = false;
    },
    isEvaled: function() {
      return evaled;
    },
    setEvaled: function(setTo) {
      if(arguments.length === 0) setTo = true;
      evaled = setTo;
    },
		getBuffer: function() {
			return buffer;
		}

  }
})();
