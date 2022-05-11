let slides = document.getElementsByClassName("slider_slide");
let navlinks = document.getElementsByClassName("slider_navlink");
let currentSlide = 0;

	document.getElementById("slider-next").addEventListener("click", () => {
		changeSlide(currentSlide + 1)
	});
	document.getElementById("slider-prev").addEventListener("click", () => {
		changeSlide(currentSlide - 1)
	});

function changeSlide(moveTo) {
		if (moveTo >= slides.length) {moveTo = 0;}
		if (moveTo < 0) {moveTo = slides.length - 1;}
		slides[currentSlide].classList.toggle("active");
		navlinks[currentSlide].classList.toggle("active");
		slides[moveTo].classList.toggle("active");
		navlinks[moveTo].classList.toggle("active");

		currentSlide = moveTo;
	}


document.querySelectorAll('.slider_navlink').forEach((bullet, bulletIndex) => {
	bullet.addEventListener('click', () => {
		if (currentSlide !== bulletIndex) {
				changeSlide(bulletIndex);
			}
	})
})

/****************************************************************************************************/
/* Use CSS3 2D transform to avoid performance issues (mobile)                                       */
/* https://stackoverflow.com/questions/16989585/css-3-slide-in-from-left-transition#answer-31819499 */
/****************************************************************************************************/


	var $slider = document.getElementById('other-slider');
	var $toggle = document.getElementById('toggle');

	$toggle.addEventListener('click', function() {
			var isOpen = $slider.classList.contains('slide-in');

			$slider.setAttribute('class', isOpen ? 'slide-out' : 'slide-in');
		});

