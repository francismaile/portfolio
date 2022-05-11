  /* number buttons 
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
  /* number buttons * /
	document.querySelectorAll('.digit').forEach( digit => {
		digit.addEventListener('click', (e) => {
			if( display.textContent === '0' || calculator.isEvaled() ) {
				updateDisplay(e.target.textContent, true);
				calculator.isEvaled(false);
			} else {
				updateDisplay(display.textContent + e.target.textContent, true);
			}
			clearBtn.textContent = 'C';
		});
	});
*/
