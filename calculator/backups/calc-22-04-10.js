/*
 Everything we have at this point seems to work.
 We need to:
		add display overflow handling.
		provide for key input
		add memory functions m+, m-, mr, mc
 */

const display = document.getElementById('digits');
const clearBtn = document.getElementById("clear");

document.querySelectorAll('.digit').forEach(
	element =>
		element.addEventListener( 'click', (e) => {
			updateDisplay(e.target.textContent, true)
			clearBtn.textContent = 'C';
		})
);

// TODO where to put this?
// clearBtn.textContent = "C";

document.querySelectorAll('.op').forEach(
	element => {
		element.addEventListener( 'click', function (element) {
      updateDisplay( calculator[this.id](display.textContent) );
		});
	}
);

/* memory features */
document.getElementById('memClear').addEventListener('click', function(e) {
//TODO this is on hold until I've finished the display
});


/* percent key */
document.getElementById('percent').addEventListener('click', function(e) {
	updateDisplay( calculator.percent(display.textContent) );
});

/* decimal btn */
document.getElementById("decimal").addEventListener('click', (e) => {
	if(display.textContent.includes('.')) return;
	if(display.textContent === '' || display.textContent === '0'|| calculator.isEvaled()) {
		updateDisplay('0.');
		calculator.isEvaled(false);
	} else {
		updateDisplay(display.textContent + '.');
	}
});

/* clear key */
clearBtn.addEventListener('click', function(e) {
	if(e.target.textContent === "C") {
		e.target.textContent = "AC";
	} else {
		calculator.clear();
	}
	updateDisplay('0');
});

/* equals btn */
document.getElementById('equals').addEventListener('click', function(e) {
	updateDisplay(calculator.equals(display.textContent));
});

/* sign change key */
document.getElementById("sign").addEventListener('click', function(e) {
	display.textContent = display.textContent * -1;
});

function updateDisplay(content, isDigit) {
	if(calculator.isEvaled()) display.textContent = '';
	if(isDigit) {
		if(display.textContent.length === 8) return;
		display.textContent = display.textContent + content;
		calculator.isEvaled(false);
	} else {
		// console.log({content});
		// if content length > 8 convert to scientific notation
		// remove enough characters to fit 'e' plus the number of digits in the exponent
		// console.log(Number(content).toExponential());
		// console.log({content}, 'type:', typeof content, 'length', content.toString().length);
		const contentStr = content.toString();
		if(contentStr.includes('e')) {
			// handle exponential answer
			// num.toString().match(/e/)
		} else if(contentStr.length > 8) {
			// handle long result without exponent

		}

		content = content.toString();
		display.textContent = content;
	}
}

display.textContent = 0;
