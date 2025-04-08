import './App.css';
import Letters from './components/Letters';
import Candidates from './components/Candidates';
import React, { useEffect, useState, useCallback, lazy, Suspense } from 'react';
import Header from './components/Header';
import { hangmanWords } from './hangmanWords';
import Confetti from 'react-confetti';
import { useWindowSize } from 'react-use';
import { generate } from 'random-words';



function App() {

  const [gameState, setGameState] = useState('play')
  const [chancesLeft, setChancesLeft] = useState(hangmanWords.length);
  const [guessedLetters, setGuessedLetters] = useState([]);
  const [hangmanWordChoices, setHangmanWordChoices] = useState(hangmanWords);
  const { width, height } = useWindowSize();

  const generateNewWord = () => {
    const word = generate({
      exactly: 1,
      minLength: 5,
      maxLength: 11
    });
    return word[0];
  }

  const [currentWord, setCurrentWord] = useState(generateNewWord());

  const restart = () => {
    setGameState('play')
    setChancesLeft(hangmanWords.length)
    setGuessedLetters([])
    setHangmanWordChoices(hangmanWords)
    setCurrentWord(generateNewWord());
    return;
  }

  const wrongAnswer = () => {
    if (chancesLeft < 1) {
      return setGameState('lose')
    } else {
      removeHangmanChoice();
      return setChancesLeft(chances => chances - 1)
    }
  }

  const removeHangmanChoice = useCallback(() => {

    const activeChoices = hangmanWordChoices.filter(word => word.active)
    if (activeChoices.length === 0) return hangmanWordChoices;

    const randomIndex = Math.floor(Math.random() * activeChoices.length)
    const wordToDisable = activeChoices[randomIndex].language;

    setHangmanWordChoices(prevChocies => {
      return prevChocies.map(word => word.language === wordToDisable ? { ...word, active: false } : word)
    })
  }, [hangmanWordChoices]);



  useEffect(() => {

    const isWordGuessed = currentWord.split('').every(letter => guessedLetters.includes(letter));

    if (isWordGuessed) {
      setChancesLeft(hangmanWords.length)
      return setGameState('win')
    }
    if (chancesLeft < 1) {
      return setGameState('lose')
    }

  }, [chancesLeft, gameState, guessedLetters])


  const handleGuess = (letter) => {

    if (guessedLetters.includes(letter)) return;

    setGuessedLetters(prevLetters =>
      prevLetters.includes(letter) ? prevLetters : [...prevLetters, letter]
    )

    if (!currentWord.includes(letter)) {
      wrongAnswer()
    }

  }

  let classNameForGameState = 'game-status';
  classNameForGameState += gameState === "win" ? " win" : gameState === "lose" ? " lose" : "";
  const winState = () => {
    return (< >
      <Suspense fallback={<div>Celebrating...</div>}>
        <Confetti width={width} height={height} />
      </Suspense>
      <h2>You Win!</h2>
      <p> Well done</p>
    </>)
  }

  const loseState = () => {
    return (<>
      <h2>You Lose!, the word was {currentWord.toUpperCase()}</h2>
      <p>Try again?</p>
    </>)
  }


  let selectedGameState = gameState === "win" ? winState() : gameState === "lose" ? loseState() : null;

  return (
    <div className="main">
      <Header />
      <Candidates chancesLeft={chancesLeft} hangmanWordChoices={hangmanWordChoices} />

      <section className={classNameForGameState}>
        {selectedGameState}
      </section>

      <section className="word-container">
        {currentWord.split("").map((letter, index) => {
          return (
            <span key={index} className={`guessingLetter`}>
              <span className={guessedLetters.includes(letter) ? 'revealed' : 'hidden'}>{letter.toUpperCase()}</span>
            </span>
          )
        })}
      </section>
      <Letters gameState={gameState} chooseLetter={handleGuess} guessedLetters={guessedLetters} currentWord={currentWord} />
      {gameState === 'play' ? null : <button className='newGame' onClick={restart}>New Game</button>}
    </div>
  );
}

export default App;
