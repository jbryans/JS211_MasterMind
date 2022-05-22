'use strict';

const assert = require('assert');
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let board = [];
let solution = '';
let letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];

const printBoard = () =>  {
  for (let i = 0; i < board.length; i++) {
    console.log(board[i]);
  }
}

const generateSolution = () =>  {
  for (let i = 0; i < 4; i++) {
    const randomIndex = getRandomInt(0, letters.length);
    solution += letters[randomIndex];
  }
}

const getRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min)) + min;
}

const generateHint = (guess) =>  {
  // create variables solutionArray and guessArray that each split up passed in arguments, [.split] on empty string ('')
  let solutionArray = guess.split('');
  let guessArray = solution.split('');

  // Create a variable correctLetterLocations and set it to 0. This variable will record how many correct "letter-locations" were guessed.
  let correctLetterLocations = 0;

  let correctLetters = 0;

  //In a for loop, iterate over the solutionArray, comparing each index of solutionArray against the same index of guessArray
  for (let i = 0; i < 4; i++){
    if (guessArray[i] === solutionArray[i]){

      //If the item matches, increment correctLetterLocations, and set that index in solutionArray to null.
      correctLetterLocations++;
      solutionArray[i] = null;

    }
  }
  // console.log(solutionArray);
  // console.log(guessArray);
  //Set a variable correctLetters equal to 0, and in a for loop, again iterate over the solutionArray. Using .indexOf, determine if the item at the current index in guessArray appears inside of solutionArray
  for (let i=0; i<4; i++) {
    //Save that index in a variable called targetIndex
    let targetIndex = solutionArray.indexOf(guessArray[i]); 
    //Now, if targetIndex is greater than -1 increment correctLetters and set the item in solutionArray at that index equal to null.
    if (targetIndex > -1) {
      correctLetters++;
      solutionArray[targetIndex] = null;
      // console.log(solutionArray);
  }
}
// return a string that prints out the hints you generated, with correctLetterLocations being red, correctLetters being white, and separated by a hyphen. 
return correctLetterLocations + "-" + correctLetters;

}


const mastermind = (guess) => {
  // solution = 'abcd'; // Comment this out to generate a random solution
  // add guess and hint to the board
  if (guess == solution) {
    console.log("You guessed it!")
    console.log("Resetting game.")
    board = []
    return "You guessed it!"
  } else {
    hint = generateHint(guess)
    if (board.length == 10) {
      console.log(`You ran out of turns! The solution was ${solution}`)
    } else {
      board.push(guess.concat(" ", hint))
      console.log("Guess again.")
    }
  }

}


const getPrompt = () =>  {
  rl.question('guess: ', (guess) => {
    mastermind(guess);
    printBoard();
    getPrompt();
  });
}

// Tests

if (typeof describe === 'function') {
  solution = 'abcd';
  describe('#mastermind()', () => {
    it('should register a guess and generate hints', () => {
      mastermind('aabb');
      assert.equal(board.length, 1);
    });
    it('should be able to detect a win', () => {
      assert.equal(mastermind(solution), 'You guessed it!');
    });
  });

  describe('#generateHint()', () => {
    it('should generate hints', () => {
      assert.equal(generateHint('abdc'), '2-2');
    });
    it('should generate hints if solution has duplicates', () => {
      assert.equal(generateHint('aabb'), '1-1');
    });

  });

} else {

  generateSolution();
  getPrompt();
}