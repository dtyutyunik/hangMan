import React, { useMemo } from "react";

const ALPHABET = Array.from({ length: 26 }, (_, i) => String.fromCharCode(65 + i));

const Letters = ({ guessedLetters, currentWord, chooseLetter, gameState }) => {


    const guessedSet = useMemo(() => new Set(guessedLetters), [guessedLetters]);
    const wordSet = useMemo(() => new Set(currentWord.split("")), [currentWord]);

    return (
        <div className="letterContainer">

            {ALPHABET.map((letter) => {
                const guessed = guessedSet.has(letter.toLocaleLowerCase());
                const inWord = guessed && wordSet.has(letter.toLocaleLowerCase())

                let className = "letter";
                if (inWord) className += " correct"
                else if (guessed && !inWord) className += " wrong";

                if (gameState !== 'play')
                    className += " disabledLetter"


                return <button className={className}
                    aria-label={`letter ${letter}`}
                    aria-disabled={guessed || gameState !== 'play'}
                    disabled={guessed || gameState !== 'play'} onClick={() => chooseLetter(letter.toLocaleLowerCase())} key={letter}>{letter}</button>
            })}
        </div>
    )
}

export default React.memo(Letters);