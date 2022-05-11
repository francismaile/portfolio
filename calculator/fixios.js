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
