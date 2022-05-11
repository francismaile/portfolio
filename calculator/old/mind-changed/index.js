/*
 Everything we have at this point seems to work.
 We need to:
		add display overflow handling.
		finish styling
		figure out what function factor() does and how
 */

const display = document.getElementById('display');
const printer = document.getElementById('printer-tape');
const clearBtn = document.getElementById("clear");

document.querySelectorAll('.digit').forEach(
	element => {
		element.addEventListener( 'click', (e) => {
			if(display.value === '' || calculator.isEvaled() ) {
				updateDisplay(e.target.textContent);
				calculator.setEvaled(false);
			} else {
				updateDisplay(display.value + e.target.textContent);
			}
			clearBtn.textContent = "C";
		});
	}
);

document.querySelectorAll('.op').forEach(
	element => {
		element.addEventListener( 'click', function (element) {
      updateDisplay( calculator[this.id](display.value) );
		});
	}
);

/* percent key */
document.getElementById('percent').addEventListener('click', function(e) {
	updateDisplay( calculator.percent(display.value) );
});

/* decimal btn */
document.getElementById("decimal").addEventListener('click', (e) => {
	if(display.value === '' || display.value === '0'|| calculator.isEvaled()) {
		updateDisplay('0.');
		calculator.setEvaled(false);
	} else {
		updateDisplay(display.value + '.');
	}
});

/* clear key */
clearBtn.addEventListener('click', function(e) {
	if(this.textContent === "C") {
		this.textContent = "AC";
	} else {
		calculator.clear();
	}
	updateDisplay('');
});

/* equals btn */
document.getElementById("equals").addEventListener('click', function(e) {
	updateDisplay(calculator.equals(display.value));
});

/* sign change key */
document.getElementById("sign").addEventListener('click', function(e) {
	display.value = display.value * -1;
});

function updateDisplay(content) {
  display.value = content;
}
