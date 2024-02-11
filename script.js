// global variables
// elements for displaying the counter
var hours = document.querySelector('.hours');
var minutes = document.querySelector('.minutes');
var seconds = document.querySelector('.seconds');

// input elements
var hoursInput = document.querySelector('.hoursInput');
var minutesInput = document.querySelector('.minutesInput');
var secondsInput = document.querySelector('.secondsInput');

// command buttons
var startButton = document.querySelector('.startButton');
var pauseButton = document.querySelector('.pauseButton');
var resetButton = document.querySelector('.resetButton');
var setButton = document.querySelector('.setButton');

var counter = null; // 'main' function responsible for returning the value we need

var currentTimePlusInput = null; // sum of user inputs plus the time when we activate counting
//                                  i.e., projected time when the counter will stop
var interval = null; // the difference between the projected time
//                      and the time when clicking 'Start' triggers counting
var startTimer = function () {
    var hoursTimer = hours.innerHTML;
    var minutesTimer = minutes.innerHTML;
    var secondsTimer = seconds.innerHTML;

    if (
        hoursTimer === '00' &&
        minutesTimer === '00' &&
        secondsTimer === '00'
    ) {
        console.error('Let\'s go again');
        return;
    };

    // convert everything to milliseconds
    currentTimePlusInput = new Date().getTime()
        + (hoursTimer * 60 * 60 * 1000)
        + (minutesTimer * 60 * 1000)
        + (secondsTimer * 1000);

    // this means currentTime should reach currentTimePlusInput
    // so that setInterval goes backward, which is what we need
    counter = setInterval(function () {
        var currentTime = new Date().getTime();

        interval = currentTimePlusInput - currentTime + 100; // added 100ms because floor rounds it to a lower value
        //                                                      and the display is not accurate
        console.log(`currentTime: ${currentTime}, currentTimePlusInput: ${currentTimePlusInput}`);
        console.log(`interval: ${interval}`);

        // to display, we need to convert milliseconds back to the values we use
        hoursTimer = Math.floor(
            (interval % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000)
        );
        minutesTimer = Math.floor(
            (interval % (60 * 60 * 1000)) / (60 * 1000)
        );
        secondsTimer = Math.floor(
            (interval % (60 * 1000)) / 1000
        );

        // console.log(`hoursTimer: ${hoursTimer},
        // minutesTimer: ${minutesTimer}, 
        // secondsTimer: ${secondsTimer}`);

        // here it's all clear
        if (hoursTimer < 10) {
            hoursTimer = '0' + hoursTimer;
        };

        if (minutesTimer < 10) {
            minutesTimer = '0' + minutesTimer;
        };

        if (secondsTimer < 10) {
            secondsTimer = '0' + secondsTimer;
        };

        // here it ends
        if (interval < 1000) {
            resetTimer();
            console.warn('Finished!');
        };

        hours.innerHTML = hoursTimer;
        minutes.innerHTML = minutesTimer;
        seconds.innerHTML = secondsTimer;
    }, 1000);

    startButton.style.display = 'none';
    pauseButton.style.display = 'inline-block';
};

// actually pauses the counter and by restarting startTimer
// picks up values from the display
var pauseTimer = function () {
    clearInterval(counter);
    pauseButton.style.display = 'none'; //         visually it looks like the same button
    startButton.style.display = 'inline-block'; // but it's not
};

var resetTimer = function () {
    clearInterval(counter);

    hours.innerHTML = '00';
    minutes.innerHTML = '00';
    seconds.innerHTML = '00';

    hoursInput.value = null;
    minutesInput.value = null;
    secondsInput.value = null;

    counter = null;
    interval = null;

    setButton.removeAttribute('disabled');
    pauseButton.style.display = 'none';
    startButton.style.display = 'inline-block';
};

// already seen
var setTimer = function (event) {
    event.preventDefault();

    if (!hoursInput.value &&
        !minutesInput.value &&
        !secondsInput.value) {
        console.error('Let\'s go again');
        return;
    };

    if (!hoursInput.value ||
        hoursInput.value === null) {
        hoursInput.value = '00';
    } else if (hoursInput.value < 10) {
        hoursInput.value = '0' + hoursInput.value;
    };

    if (!minutesInput.value ||
        minutesInput.value === null) {
        minutesInput.value = '00';
    } else if (minutesInput.value < 10) {
        minutesInput.value = '0' + minutesInput.value;
    };

    if (!secondsInput.value ||
        secondsInput.value === null) {
        secondsInput.value = '00';
    } else if (secondsInput.value < 10) {
        secondsInput.value = '0' + secondsInput.value;
    };

    hours.innerHTML = hoursInput.value;
    minutes.innerHTML = minutesInput.value;
    seconds.innerHTML = secondsInput.value;

    hoursInput.value = null;
    minutesInput.value = null;
    secondsInput.value = null;

    setButton.toggleAttribute('disabled');
};

startButton.addEventListener('click', startTimer);
pauseButton.addEventListener('click', pauseTimer);
resetButton.addEventListener('click', resetTimer);
setButton.addEventListener('click', setTimer);
