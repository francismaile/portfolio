let calculator = (function() {
  let buffer = "";
  let evaled = true;

  function format(num) {
    return Math.round( num * Math.pow(10,8) ) / Math.pow(10,8);
  }

  function factor(num) {
    buffer = buffer + num;
    let addOpFound = 0;
    if( (addOpFound = buffer.indexOf('+')) < 0) {
      addOpFound = buffer.indexOf('-');
    }
    addOpFound = addOpFound + 1;
    buffer = buffer.substring(0,addOpFound) + evaluate(buffer.substring(addOpFound));
    return (evaluate(buffer.substring(addOpFound)));
  }
  function evaluate(fn) {
    evaled = true;
    fn = fn.replace(/[^-()\d/*+.]/g, ''); // strip anything other than digits, (), -+/* and . *code credit
    return new Function('return ' + fn)();
  }
  return {
    add: function(num) {
      const result = evaluate( buffer + num );
      buffer = result + "+";
      return Math.round(result);
    },
    subtract: function(num) {
      const result = evaluate( buffer + num );
      buffer = result + "-";
      return result;
    },
    multiply: function(num) {
      const result = factor(num);
      buffer = buffer + "*";
      return result;
    },
    divide: function(num) {
      factor(num);
      buffer = buffer + "/";
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
        return buffer.slice(0,buffer.length-1) / num;
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
    }

  }
})();
/*
Math.round( orig * Math.pow(10,places) ) / Math.pow(10,places)
1) Multiple the original number by 10^x (10 to the power of x)
2) Apply Math.round() to the result
3) Divide result by 10^x
http://www.javascriptkit.com/javatutors/round.shtml
*/
document.addEventListener("DOMContentLoaded", function() {
  // setup display
  const display = document.getElementById("display");

  /* number buttons */
  const digitBtns = document.getElementsByClassName("digit");
  // assign onClick handlers here
  for( i = 0; i < digitBtns.length; i++ ) {
    digitBtns.item(i).addEventListener('click', function() {
      if(display.textContent === "0" || calculator.isEvaled()) {
        updateDisplay(this.innerText);
        calculator.setEvaled(false);
      } else {
        updateDisplay(display.textContent + this.innerText);
      }
      document.getElementById("clear").textContent = "C"
    });
  }

  /* setup maths operations buttons */
  const opsBtns =  document.getElementsByClassName("op");
  for( i = 0; i < opsBtns.length; i++ ) {
    opsBtns.item(i).addEventListener('click', function(event) {
      updateDisplay( calculator[this.id](display.textContent) );
    });
  }

  /* equals btn */
  document.getElementById("equals").addEventListener('click', function(e) {
    updateDisplay(calculator.equals(display.textContent));
  });

  /* decimal btn */
  document.getElementById("decimal").addEventListener('click', function(e) {
    if(display.textContent === "0" || calculator.isEvaled()) {
      updateDisplay("0.");
      calculator.setEvaled(false);
    } else {
      updateDisplay(display.textContent + ".");
    }
  });

  /* percent key */
  document.getElementById("percent").addEventListener('click', function(e) {
    updateDisplay( calculator.percent(display.textContent) );
  });

  /* sign change key */
  document.getElementById("sign").addEventListener('click', function(e) {
    display.textContent = display.textContent * -1;
  });

  /* clear key */
  document.getElementById("clear").addEventListener('click', function(e) {
    if(this.textContent === "C") {
      this.textContent = "AC";
    } else {
      calculator.clear();
    }
    updateDisplay("0");
  });

  updateDisplay("0");

});

function addDigit(digit) {
  if(display.textContent === "0" || calculator.isEvaled()) {
    updateDisplay(digit);
    calculator.setEvaled(false);
  } else {
    updateDisplay(display.textContent + digit);
  }
}

function updateDisplay(content) {
  display.textContent = content;
}
// *code credit: stackoverflow.com/questions/6479236/calculate-string-value-in-javascript-not-using-eval#﻿6479415
