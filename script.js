// global variables
// elements for displaying the counter
const hours = document.querySelector('.hours');
const minutes = document.querySelector('.minutes');
const seconds = document.querySelector('.seconds');

// input elements
const hoursInput = document.querySelector('.hoursInput');
const minutesInput = document.querySelector('.minutesInput');
const secondsInput = document.querySelector('.secondsInput');

// command buttons
const startButton = document.querySelector('.startButton');
const pauseButton = document.querySelector('.pauseButton');
const resetButton = document.querySelector('.resetButton');
const setButton = document.querySelector('.setButton');

let counter = null; // 'main' function responsible for returning the value we need

let currentTimePlusInput = null; // sum of user inputs plus the time when we activate counting
//                                  i.e., projected time when the counter will stop
let interval = null; // the difference between the projected time
//                      and the time when clicking 'Start' triggers counting

const startTimer = () => {
    let hoursTimer = hours.innerHTML;
    let minutesTimer = minutes.innerHTML;
    let secondsTimer = seconds.innerHTML;

    if (
        hoursTimer === '00' &&
        minutesTimer === '00' &&
        secondsTimer === '00'
    ) {
        console.error('Let\'s go again');
        return;
    }

    // convert everything to milliseconds
    currentTimePlusInput = new Date().getTime()
        + (hoursTimer * 60 * 60 * 1000)
        + (minutesTimer * 60 * 1000)
        + (secondsTimer * 1000);

    // this means currentTime should reach currentTimePlusInput
    // so that setInterval goes backward, which is what we need
    counter = setInterval(() => {
        const currentTime = new Date().getTime();

        interval = currentTimePlusInput - currentTime + 100; // added 100ms because floor rounds it to a lower value
        //                                                      and the display is not accurate
        console.log({ currentTimePlusInput }, { currentTime }, { interval });

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

        // console.log({ hoursTimer }, { minutesTimer }, { secondsTimer });

        // here it's all clear
        if (hoursTimer < 10) {
            hoursTimer = '0' + hoursTimer;
        }

        if (minutesTimer < 10) {
            minutesTimer = '0' + minutesTimer;
        }

        if (secondsTimer < 10) {
            secondsTimer = '0' + secondsTimer;
        }

        // here it ends
        if (interval < 1000) {
            resetTimer();
            console.warn('Finished!');
        }

        hours.innerHTML = hoursTimer;
        minutes.innerHTML = minutesTimer;
        seconds.innerHTML = secondsTimer;
    }, 1000);

    startButton.style.display = 'none';
    pauseButton.style.display = 'inline-block';
};

// actually pauses the counter and by restarting startTimer
// picks up values from the display
const pauseTimer = () => {
    clearInterval(counter);
    pauseButton.style.display = 'none'; //         visually it looks like the same button
    startButton.style.display = 'inline-block'; // but it's not
};

const resetTimer = () => {
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
const setTimer = (event) => {
    event.preventDefault();

    const formatInput = (input) => {
        if (!input.value || input.value === null) {
            input.value = '00';
        } else if (input.value < 10) {
            input.value = '0' + input.value;
        }
    };

    if (!hoursInput.value &&
        !minutesInput.value &&
        !secondsInput.value) {
        console.error('Let\'s go again');
        return;
    };

    formatInput(hoursInput);
    formatInput(minutesInput);
    formatInput(secondsInput);

    hours.innerHTML = hoursInput.value;
    minutes.innerHTML = minutesInput.value;
    seconds.innerHTML = secondsInput.value;

    [hoursInput, minutesInput, secondsInput].forEach(input => input.value = null);

    setButton.toggleAttribute('disabled');
};

startButton.addEventListener('click', startTimer);
pauseButton.addEventListener('click', pauseTimer);
resetButton.addEventListener('click', resetTimer);
setButton.addEventListener('click', setTimer);
