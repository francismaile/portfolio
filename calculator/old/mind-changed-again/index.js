/*
 Everything we have at this point seems to work.
 We need to:
		add display overflow handling.
		provide for key input
		add memory functions m+, m-, mr, mc
 */

const display = document.getElementById('display');
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

/* memory features */
document.getElementById('memClear').addEventListener('click', function(e) {
//TODO this is on hold until I've finished the display
});


/* percent key */
document.getElementById('percent').addEventListener('click', function(e) {
	updateDisplay( calculator.percent(display.value) );
});

/* decimal btn */
document.getElementById("decimal").addEventListener('click', (e) => {
	if(display.value.includes('.')) return;
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
document.getElementById('equals').addEventListener('click', function(e) {
	updateDisplay(calculator.equals(display.value));
});

/* sign change key */
document.getElementById("sign").addEventListener('click', function(e) {
	display.value = '-' + display.value;
});

function updateDisplay(content) {
	// console.log(content.replace(/,/g, ''));
	// console.log(Number(content.replaceAll(/,/g, '')).toLocaleString());
	content = content.toString();
	console.log({content}, 'length:', content.length, 'clean:', Number(content.replaceAll(/,/g, '')).toLocaleString());
	// console.log(content.match(/[\d\-\ ]/g).length);
	// console.log(calculator.getBuffer());
	// let digitCount = content.match(/[\d*\-\ ]/g).length;
	// console.log({digitCount});
  display.value = Number(content.replace(/,/g, '')).toLocaleString();
  // display.value = Number(content.replaceAll(/,/g, '')).toLocaleString();
}

	/* the code below is for fixing the delay when clicking the number
		buttons on ios devices

var keyboard = document.getElementById('calculator');
var buttons = keyboard.children;
var isTouch = ("ontouchstart" in window);
for (var i=0;i<buttons.length;i++) {
    if ( isTouch ) {
        buttons[i].addEventListener('touchstart', clickHandler, false);
    } else {
        buttons[i].addEventListener('click', clickHandler, false);
    }
}

https://stackoverflow.com/questions/12238587/eliminate-300ms-delay-on-click-events-in-mobile-safari#answer-32028915
var keyboard = document.getElementById("button");
var buttons = keyboard.children;
var isTouch = ("ontouchstart" in window);
for (var i=0;i<buttons.length;i++) {
    if ( isTouch ) {
        buttons[i].addEventListener('touchstart', clickHandler, false);
    } else {
        buttons[i].addEventListener('click', clickHandler, false);
    }
}
https://stackoverflow.com/questions/12238587/eliminate-300ms-delay-on-click-events-in-mobile-safari#answer-45701768
window.addEventListener('touchstart', (e) => {
    // alert('fast touch');
		}, { passive : true});
	
	More help
	https://developer.mozilla.org/en-US/docs/Web/API/Touch_events
 https://labs.ft.com/articles/ft-fastclick/
 https://webkit.org/blog/5610/more-responsive-tapping-on-ios/
 https://www.w3.org/TR/pointerevents/#the-touch-action-css-property
 https://codepen.io/vatsa287/pen/eYJVZOp
*/
