let modal = document.getElementById('simple-modal'),
    aboutTheGame = document.getElementById('about-the-game'),
    closeBtn = document.querySelector('.close-btn'),
    move = document.getElementById('move'),
    removeToPlay = document.getElementById('removeToPlay');

const openModal = () => {
    modal.style.display = 'block';
};

const closeModal = () => {
    modal.style.display = 'none';
};

const clickOutside = (e) => {
    if (e.target === modal) {
        modal.style.display = 'none';
    }
};

//The variable to store the idnex of an empty button
let emptyBtn = 0;
//This flag is for the timer to make it stop
let flag = 0;
//Create an array of buttons from a NodeList
let items = Array.from(document.querySelectorAll('button'));

//Set an empty array that will be filled with elements later on. Not the buttons! But the elements from 1 to 15 including '' which is a textContent of an empty button;
let arrOfElems = [];

//Get rid of the 'about' button. As a result, get an array of buttons to work with 
let arrayWithButtons = items.slice(1);

//Start a timer
const startTimer = () => {

    let timer = document.getElementById('timer');
    setInterval(() => {
        // Stop the timer when the game is over
        if (timer.textContent < 1000 && flag === 0) {
            timer.textContent = parseInt(timer.textContent) + 1;
        }
    }, 1000);
};

const shuffleAnArray = () => Math.random() - 0.5;

const checkUntilSolvable = (arrayOfItems) => {
    //Set a variable to store the sum. It's a check for order to ensure that the given order of elements can lead to a solution. At the end, if the sum is an even number the startGame function starts
    let sum = 0;
    for (i = 0; i <= arrayOfItems.length - 1; i++) {

        if (arrayOfItems[i] === '' && (i <= 3)) {
            sum = 1;
            break;
        } else if (arrayOfItems[i] === '' && i <= 7) {
            sum = 2;
            break;
        } else if (arrayOfItems[i] === '' && i <= 11) {
            sum = 3;
            break;
        } else if (arrayOfItems[i] === '' && i <= 15) {
            sum = 4;
            break;
        }
    }

    //Setting cycles (outer and inner) that takes every given button and 
    for (let i = 0; i <= arrayOfItems.length - 1; i++) {
        let j = arrayOfItems.length - i;

        for (let k = 1; k < j; k++) {

            if (Number(arrayOfItems[i]) > (Number(arrayOfItems[i + k])) && +(arrayOfItems[i + k] != '')) {
                sum++;
            }
        }
    }

    //Check for the order to ensure that a given order of elements make this task solvable
    if (sum % 2 == 0) {
        startGame(arrayWithButtons, arrOfElems);
        //else sort elements until it fits the order
    } else {
        arrOfElems.sort(shuffleAnArray);
        checkUntilSolvable(arrayOfItems);
    }
};

//Sorting elements in random order. In this function ar is a new array of sorted elements and ne
const mixItems = (arrayWithButtons, arrayWithElems) => {
    for (let prop in arrayWithButtons) {
        arrayWithElems[prop] = arrayWithButtons[prop].textContent;
    }
    const sortedArray = arrayWithElems.sort(shuffleAnArray);
    checkUntilSolvable(sortedArray);
};

const startGame = (arrButtons, arrElems) => {
    move.textContent = -1;
    removeToPlay.style.display = 'block';
    for (let i = 0; i <= arrButtons.length - 1; i++) {
        arrButtons[i].textContent = arrElems[i];
        removeToPlay.removeEventListener('click', init, true);
    }
};

//The main function. This is where the program execution starts
const init = () => {
    move.textContent = 0;
    removeToPlay.style.display = "none";
    removeToPlay.textContent = '';
    removeToPlay.style.background = '#EFEFEF';
    startTimer();

    //Mixing elements 
    mixItems(arrayWithButtons, arrOfElems);

    //Initialize a game by clicking the green btn, this start the timer
    startGame(arrayWithButtons, arrOfElems);

    //Check the index of button with text.Content equals to ''
    emptyBtn = arrOfElems.indexOf('');

    //Describe moving patterns and checking for completion
    playTheGame(arrayWithButtons);
}

const setTextContentForMove = () => move.textContent = parseInt(move.textContent) + 1;;

const newFunc1 = () => {
    arrayWithButtons[emptyBtn].textContent = arrayWithButtons[emptyBtn - 1].textContent
    arrayWithButtons[emptyBtn - 1].textContent = "";

    if (arrayWithButtons[emptyBtn - 1] != null) {

        arrayWithButtons[emptyBtn - 1].removeEventListener("click", newFunc1, true)
    }
    if (arrayWithButtons[emptyBtn + 1] != null) {

        arrayWithButtons[emptyBtn + 1].removeEventListener("click", newFunc2, true)
    }
    if (arrayWithButtons[emptyBtn - 4] != null) {

        arrayWithButtons[emptyBtn - 4].removeEventListener("click", newFunc3, true)
    }
    if (arrayWithButtons[emptyBtn + 4] != null) {

        arrayWithButtons[emptyBtn + 4].removeEventListener("click", newFunc4, true)
    }

    emptyBtn--;
    playTheGame(arrayWithButtons);
};

const newFunc2 = () => {
    arrayWithButtons[emptyBtn].textContent = arrayWithButtons[emptyBtn + 1].textContent
    arrayWithButtons[emptyBtn + 1].textContent = ""

    if (arrayWithButtons[emptyBtn - 1] != null) {
        arrayWithButtons[emptyBtn - 1].removeEventListener("click", newFunc1, true)
    }
    if (arrayWithButtons[emptyBtn + 1] != null) {
        arrayWithButtons[emptyBtn + 1].removeEventListener("click", newFunc2, true)
    }
    if (arrayWithButtons[emptyBtn - 4] != null) {
        arrayWithButtons[emptyBtn - 4].removeEventListener("click", newFunc3, true)
    }
    if (arrayWithButtons[emptyBtn + 4] != null) {
        arrayWithButtons[emptyBtn + 4].removeEventListener("click", newFunc4, true)
    }

    emptyBtn++;
    playTheGame(arrayWithButtons);
};

const newFunc3 = () => {
    arrayWithButtons[emptyBtn].textContent = arrayWithButtons[emptyBtn - 4].textContent
    arrayWithButtons[emptyBtn - 4].textContent = ""
    if (arrayWithButtons[emptyBtn - 1] != null) {
        arrayWithButtons[emptyBtn - 1].removeEventListener("click", newFunc1, true)
    }
    if (arrayWithButtons[emptyBtn + 1] != null) {
        arrayWithButtons[emptyBtn + 1].removeEventListener("click", newFunc2, true)
    }
    if (arrayWithButtons[emptyBtn - 4] != null) {
        arrayWithButtons[emptyBtn - 4].removeEventListener("click", newFunc3, true)
    }
    if (arrayWithButtons[emptyBtn + 4] != null) {
        arrayWithButtons[emptyBtn + 4].removeEventListener("click", newFunc4, true)
    }

    emptyBtn = emptyBtn - 4;
    playTheGame(arrayWithButtons);
};

const newFunc4 = () => {
    arrayWithButtons[emptyBtn].textContent = arrayWithButtons[emptyBtn + 4].textContent
    arrayWithButtons[emptyBtn + 4].textContent = ""

    if (arrayWithButtons[emptyBtn - 1] != null) {
        arrayWithButtons[emptyBtn - 1].removeEventListener("click", newFunc1, true)
    }
    if (arrayWithButtons[emptyBtn + 1] != null) {
        arrayWithButtons[emptyBtn + 1].removeEventListener("click", newFunc2, true)
    }
    if (arrayWithButtons[emptyBtn - 4] != null) {
        arrayWithButtons[emptyBtn - 4].removeEventListener("click", newFunc3, true)
    }
    if (arrayWithButtons[emptyBtn + 4] != null) {
        arrayWithButtons[emptyBtn + 4].removeEventListener("click", newFunc4, true)
    }

    emptyBtn = emptyBtn + 4;
    playTheGame(arrayWithButtons);
};

//Initialize a game by clicking the green btn, this start the timer
const playTheGame = (arrButtons) => {
    let count = 0;

    //Check for consistency
    for (let i in arrayWithButtons) {
        if ((+i + 1) == (arrayWithButtons[i].textContent)) {
            count++;
        }
    }

    if (count == (arrayWithButtons.length - 1) && arrayWithButtons[arrayWithButtons.length - 1].textContent === '') {

        //Creat congratulation div
        const div = document.createElement('div');
        div.className = 'alert alert-success';
        const congratsMessage = `Congrats! Your result is ${move.textContent} moves for ${timer.textContent} seconds. Please refresh the page to play again!`;
        div.appendChild(document.createTextNode(congratsMessage));

        const container = document.querySelector('.container');
        const form = document.querySelector('.row');
        container.insertBefore(div, form);

        //This flag is for the timer to make it stop if and when the condition above is true
        flag = 1;

    } else {
        count = 0;
    }

    //Create patterns for buttons
    if (emptyBtn === 0) {

        arrButtons[emptyBtn + 1].addEventListener('click', newFunc2, true);
        arrButtons[emptyBtn + 4].addEventListener('click', newFunc4, true);

    } else if (emptyBtn === 1 || emptyBtn === 2) {

        arrButtons[emptyBtn - 1].addEventListener('click', newFunc1, true);
        arrButtons[emptyBtn + 1].addEventListener('click', newFunc2, true);
        arrButtons[emptyBtn + 4].addEventListener('click', newFunc4, true);
        setTextContentForMove();

    } else if (emptyBtn === 3) {

        arrButtons[emptyBtn - 1].addEventListener('click', newFunc1, true);
        arrButtons[emptyBtn + 4].addEventListener('click', newFunc4, true);
        setTextContentForMove();

    } else if (emptyBtn === 4 || emptyBtn === 8) {

        arrButtons[emptyBtn + 1].addEventListener('click', newFunc2, true);
        arrButtons[emptyBtn - 4].addEventListener('click', newFunc3, true);
        arrButtons[emptyBtn + 4].addEventListener('click', newFunc4, true);
        setTextContentForMove();

    } else if (emptyBtn === 5 || emptyBtn === 6 || emptyBtn === 9 || emptyBtn === 10) {

        arrButtons[emptyBtn - 1].addEventListener('click', newFunc1, true);
        setTextContentForMove();
        arrButtons[emptyBtn + 1].addEventListener('click', newFunc2, true);
        arrButtons[emptyBtn - 4].addEventListener('click', newFunc3, true);
        arrButtons[emptyBtn + 4].addEventListener('click', newFunc4, true);

    } else if (emptyBtn === 7 || emptyBtn === 11) {

        arrButtons[emptyBtn - 1].addEventListener('click', newFunc1, true);
        setTextContentForMove();
        arrButtons[emptyBtn - 4].addEventListener('click', newFunc3, true);
        arrButtons[emptyBtn + 4].addEventListener('click', newFunc4, true);

    } else if (emptyBtn === 12) {
        setTextContentForMove();
        arrButtons[emptyBtn + 1].addEventListener('click', newFunc2, true);
        arrButtons[emptyBtn - 4].addEventListener('click', newFunc3, true);
        setTextContentForMove();

    } else if (emptyBtn === 13 || emptyBtn === 14) {

        arrButtons[emptyBtn + 1].addEventListener('click', newFunc2, true);
        setTextContentForMove();
        arrButtons[emptyBtn - 4].addEventListener('click', newFunc3, true);
        arrButtons[emptyBtn - 1].addEventListener('click', newFunc1, true);

    } else if (emptyBtn === 15) {

        arrButtons[emptyBtn - 4].addEventListener('click', newFunc3, true);
        setTextContentForMove();
        arrButtons[emptyBtn - 1].addEventListener('click', newFunc1, true);
    }
}

//Setting event listeners
closeBtn.addEventListener('click', closeModal);
window.addEventListener('click', clickOutside);
removeToPlay.addEventListener('click', init, true);
aboutTheGame.addEventListener('click', openModal);