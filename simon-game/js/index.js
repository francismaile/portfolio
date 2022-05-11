// sound: http://marcgg.com/blog/2016/11/01/javascript-audio/

let Simon = (function() {
  let pattern = [];
  let patternIndex = 0;
  let pwrOn = false;
  const randInt = (min, max) =>  Math.floor(Math.random() * (max - min + 1)) + min;
  const colorBtns = document.querySelectorAll(".quarter");
  const gameBoard = document.getElementById("circle-container");
  const stepsCounter = document.getElementById("steps");

  const strictModeControl = document.getElementById("strictModeInput");
  let strictMode = strictModeControl.checked;
  strictModeControl.addEventListener("change", function(){
    strictMode = strictModeControl.checked;
  });

  const pwrSwitch = document.getElementById("switch");
  pwrSwitch.addEventListener("change", () => {
    pwrOn = pwrSwitch.checked;
    if(pwrOn) {
      stepsCounter.textContent = '--';
    } else {
      stepsCounter.textContent = '';
    }
  });

  gameBoard.addEventListener("click", hitButton);
  let btnsDisabled = true;

  const colorSounds = [];
  for (var i = 0; i <= 3; i++) {
    colorSounds[i] = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound' + (i + 1) + '.mp3');
    colorSounds[i].volume = 1.0;
  }

  const winSound = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound1.mp3');
  const failSound = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound4.mp3');

  function updatePattern() {
    patternIndex = 0;
    pattern.push(randInt(0, 3));
    console.log(listColors(pattern));
    stepsCounter.textContent = pattern.length.toString().padStart(2, "0");
  }

  function listColors(pattern) {
    let colorPattern = [];
    const colors = ['green', 'red', 'yellow', 'blue'];
    pattern.forEach(function (colorNumber) {
      colorPattern.push(colors[colorNumber]);
    });
    return colorPattern;
  }

  function playPattern(i = 0) {
    if(!pwrOn) return false;
    btnsDisabled = true;
    setTimeout(function () {
      playButton(pattern[i]);
      if (++i < pattern.length) {          // If i > pattern.length, keep going
        playPattern(i);       // Call the loop again, and pass it the current value of i
      } else {
        btnsDisabled = false;
      }
    }, 750);
  };

  function playButton(btn) {
    colorBtns[btn].classList.add('light'); // change color of button in some way
    colorSounds[btn].play(); // play sound
    setTimeout(function() { colorBtns[btn].classList.remove('light'); }, 450); // return button to original color
  }


  function fail(l) {
    btnsDisabled = true;
    failSound.play(); // play sound
    setTimeout(function () {
      for (let i = 0; i < 4; i++) {
        colorBtns[i].classList.add('light'); // change color of button in some way
        setTimeout(function() { colorBtns[i].classList.remove('light'); }, 380); // return button to original color
      }
      if (--l) {
        setTimeout(failMessage, 450, l);
        //failMessage(l); // Call the loop again, and pass it the current value of l
      } else {
        btnsDisabled = false;
      }
    }, 500);
  }

  function hitButton(e) {
    if(btnsDisabled || !e.target.className.includes("quarter")) return false;

    const btn = e.target.dataset.index;
    playButton(btn);
    if( parseInt(btn) === pattern[patternIndex] ) {
      patternIndex += 1;
    } else {
      fail(4); // if they get it wrong
      if( strictMode ) {
        // start over from scratch
        setTimeout(Simon.startGame, 2000);
      } else {
        // replay pattern and let them try again
        patternIndex = 0;
        setTimeout(playPattern, 2000);
      }
    }
    if( patternIndex >= pattern.length ) { // if they get the whole pattern correct
      if (pattern.length >= 20) {
        win(); // if the lenght of the pattern is 20
      } else {
        // add another color and play on
        setTimeout(function() {
          updatePattern();
          playPattern()
        }, 1000);
      }
    }
  }

  return {
    startGame: function () {
      if( !pwrOn ) return false;
      pattern = [];
      updatePattern();
      playPattern();
    },
    getPattern: function(arg) {
      return pattern;
    },
    getButtons: function(arg) {
      if ( ! arg) return colorBtns[arg];
      else return colorBtns[arg];
    },
    getBtnHandler: function() {
      console.log(btnHandler);
    }

  };

})();

document.getElementById("start").addEventListener("click", Simon.startGame);
