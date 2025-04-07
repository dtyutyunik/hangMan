import './App.css';
import Letters from './components/Letters';
import Candidates from './components/Candidates';
import React, { use, useEffect, useState } from 'react';
import Header from './components/Header';

function App() {

  const [gameState, setGameState] = useState('play')
  const [currentWord, setCurrentWord] = useState('apple');
  const [chancesLeft, setChancesLeft] = useState(9);
  const [guessedLetters, setGuessedLetters] = useState(Array(currentWord.length).fill(false))


  console.log(guessedLetters)


  const restart = () => {
    setGameState('play')
    setChancesLeft(9)
  }

  useEffect(() => {
    if (guessedLetters.every(word => word === true)) {
      return setGameState('win')
    }

    if (gameState === 'win') {
      setGameState('win');
    } else if (gameState === 'lose') {
      setGameState('lose');
    }
  }, [chancesLeft, gameState, guessedLetters])


  const handleGuess = (letter) => {
    console.log('letter pressed', letter)

    let guessedWord = false;

    if (chancesLeft > 1) {
      setGuessedLetters(prevWord => {

        const updatedLetters = currentWord.split('').map((char, index) => {
          if (prevWord[index] === true) {
            return true;
          }
          if (char === letter.toLowerCase()) {
            prevWord[index] = true;
            guessedWord = true;
            return true;
          } else {
            return false;
          }
        });
        console.log('updated letter', updatedLetters)
        return updatedLetters;

      })
    }

    if (!guessedWord) {
      if (chancesLeft < 1) {
        return setGameState('lose')

      } else {
        return setChancesLeft(chances => chances - 1)
      }
    }



  }



  return (
    <div className="main">
      <Header />
      <Candidates contender={false} />
      <section className='game-status'>
        <h2>Game Status</h2>
        <p> Well done</p>
        {/* {gameState === 'win' && <div className='win'>You Win</div>} */}
        {/* {gameState === 'lose' && <div className='lose'>You Lose</div>} */}
      </section>

      <section className="word-container">
        {currentWord.split("").map((letter, index) => {
          return (<>
            <span key={index} className={`letter`}>
              <span className={guessedLetters[index] === true ? 'revealed' : 'hidden'}>{letter.toUpperCase()}</span>
            </span>
          </>)
        })}
      </section>
      <Letters chooseLetter={handleGuess} />
      {gameState === 'play' ? null : <button onClick={restart}>New Game</button>}
      {chancesLeft}
    </div>
  );
}

export default App;
