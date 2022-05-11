/*
 Everything we have at this point seems to work.
 We need to:
		add display overflow handling.
		provide for key input
		add memory functions m+, m-, mr, mc
 */

const display = document.getElementById('digits');
const clearBtn = document.getElementById("clear");
const errorDisplay = document.getElementById('error');
const memoryIndicator = document.getElementById('memory');

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
		element.addEventListener( 'click', function (event) {
      updateDisplay( calculator[event.target.id](display.textContent) );
		});
	}
);

/* memory buttons */
document.querySelectorAll('.memBtn').forEach(
	memBtn => {
		memBtn.addEventListener( 'click', function (event) {
      handleMemory(event.target.id);
		});
	}
);

function handleMemory(how) {
			console.log({how});
	// add value of display to memory contents
	// remove value of display from memory contents
	// recall value from memory replace contents of display
	// clear contents of memory
	switch (how) {
		case 'mClear':
			Memory.clear();
			memoryIndicator.textContent = '';
			break;
		case 'mRecall':
			updateDisplay(Memory.get());
			calculator.isEvaled(false);
			break;
		case 'mPlus':
			Memory.add(display.textContent);
			memoryIndicator.textContent = 'M';
			calculator.isEvaled(true);
			break;
		case 'mMinus':
			Memory.subtract(display.textContent);
			memoryIndicator.textContent = 'M';
			calculator.isEvaled(true);
			break;
		default:
			break;

	}

}


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
	errorDisplay.textContent = '';
	updateDisplay('0');
});

/* equals btn */
document.getElementById('equals').addEventListener('click', function(e) {
	updateDisplay(calculator.equals(display.textContent));
});

/* sign change key */
document.getElementById("sign").addEventListener('click', function(e) {
	if(!calculator.isOverFlowed()) display.textContent = display.textContent * -1;
});

function updateDisplay(content, isDigit) {
	if(errorDisplay.textContent === 'E') return;
	if(calculator.isEvaled()) display.textContent = '';
	if(calculator.isOverFlowed()) {
		const digitCnt = content.toString().startsWith('-') ? 9:8
		display.textContent = content.toString().slice(0,digitCnt);
		errorDisplay.textContent = 'E';
		return;
	}
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

const digitsBkgnd = document.getElementById('digits-bkgnd');

screen.orientation.addEventListener("change", function(e) {
	// Do something on change
	const orientation = e.target.type.slice(0, e.target.type.indexOf('-'));
	// console.log('flip:', {orientation});
	if(orientation === 'portrait') {
		digitsBkgnd.textContent = '-8.8.8.8.8.8.8.8.';
	} else {
		digitsBkgnd.textContent = '-8.8.8.8.8.8.8.8.8.8.8.8.';
	}


});
	
