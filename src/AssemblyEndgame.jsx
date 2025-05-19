import { useState, useRef, useEffect } from 'react'
import { SoundButton } from "./components/SoundButton.jsx";
import { Status } from "./components/Status.jsx";
import { languages } from "./js/language.js";
import { clsx } from "./js/clsx.js";
import { playSfx, getRandomWord } from "./js/utils.js";
import { sfxLib } from "./js/audio.js";
import Confetti from 'react-confetti';

export function AssemblyEndgame() {
  //state values
  const [currentWord, setCurrentWord] = useState(() => getRandomWord());
  const [guessedLetters, setGuessedLetters] = useState([]);
  const [controlSound, setControlSound] = useState(true);

  // derived values
  const numGuessesLeft = languages.length - 1;
  const wrongGuessCount = guessedLetters.filter(
    letter => !currentWord.includes(letter)
  ).length;
  const isGameLost = wrongGuessCount >= numGuessesLeft;
  const isGameWon = [...currentWord].every(
    letter => guessedLetters.includes(letter)
  );
  const isGameOver = isGameLost || isGameWon;
  const lastGuessedLetter = guessedLetters[guessedLetters.length - 1];
  const isLastGuessWrong = 
    lastGuessedLetter && 
    !currentWord.includes(lastGuessedLetter);
  const guessesRemaining = numGuessesLeft - wrongGuessCount;
  
  // static values
  const alphabet = "abcdefghijklmnopqrstuvwxyz";

  // reference
  const newGameBtnRef = useRef(null)
  const firstKey = useRef(null);

  useEffect(() => {
    if (isGameOver && newGameBtnRef.current) {
      newGameBtnRef.current.focus();
    } else firstKey.current.focus();
  }, [isGameOver])

  function handleGuessedLetters(letter) {
    setGuessedLetters(prevLetters => (
      prevLetters.includes(letter) ?
      prevLetters :
      [...prevLetters, letter]
    ));
  }

  // keyboard
  const keyboardEls = alphabet  
    .split("")
    .map((ltr, i) => {
      const isGuessed = guessedLetters.includes(ltr);
      const isRight = isGuessed && currentWord.includes(ltr);
      const isWrong = isGuessed && !currentWord.includes(ltr);
      const className = clsx("keyboard-ltr", {
        "keyboard-right": isRight,
        "keyboard-wrong": isWrong
      });

      return (
        <button 
        className={className}
        key={ltr}
        value={ltr}
        onClick={() => {
          handleGuessedLetters(ltr);
          if (controlSound) playSfx(sfxLib.click);
        }}
        disabled={isGameOver || isRight || isWrong}
        aria-label={`Letter ${ltr}`}
        ref={i === 0 ? firstKey : null}
      >
        {ltr.toUpperCase()}
      </button>
      );
    });

  // word hangman
  const letterEls = currentWord
    .split("")
    .map((ltr, i) => {
      const isLtrCorrect = guessedLetters.includes(ltr);
      return (
        <span 
          className="ltr" 
          key={i}
          style={{
            color: !isLtrCorrect ? "#d62c2c" : "#00e676" 
          }}
        >
          {(isLtrCorrect || isGameOver) && ltr.toUpperCase()}
        </span>
      );
    });

  // languages hangman
  const languageEls = languages.map((lang, i) => {
    const isLangLost = wrongGuessCount > i;
    const styles = {
      backgroundColor: lang.backgroundColor,
      color: lang.color
    };
    const className = clsx(
      "lang-chip",
      {
        lost: isLangLost
      }
    );

    return (
      <span
      style={styles}
      className={className}
      key={lang.name}
    >
      {lang.name}
    </span> 
    );
  });

  function handleNewGame() {
    setCurrentWord(getRandomWord());
    setGuessedLetters([]);
  }

  function handleSoundControl() {
    setControlSound(prev => !prev);
  }

  // control sound
  useEffect(() => {
    if (isGameWon) {
      if (controlSound) playSfx(sfxLib.winning);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isGameWon]);

  useEffect(() => {
    if (isGameLost) {
      if (controlSound) playSfx(sfxLib.losing);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isGameLost]);

  useEffect(() => {
    if (isLastGuessWrong && lastGuessedLetter) {
      if (controlSound) playSfx(sfxLib.booo);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLastGuessWrong, lastGuessedLetter]);
  
  return (
    <main>
      <header>
        <h1>Assembly: Endgame</h1>
        <p>Guess the word in under 8 attempts to keep the programming world safe from Assembly!</p>
      </header>

      < Status 
        isGameOver={isGameOver}
        isGameWon={isGameWon}
        isGameLost={isGameLost}
        isLastGuessWrong={isLastGuessWrong}
        wrongGuessCount={wrongGuessCount}
      />

      <section className="languages-container">
        {languageEls}
      </section>

      <section className="word-container">
        {letterEls}
      </section>

      {/* Combined visually-hidden aria-live region for status updates */}
      <section className="sr-only" role="status">
        {
          lastGuessedLetter && 
          <p>
            {
              currentWord.includes(lastGuessedLetter) ?
              `Correct: The letter ${lastGuessedLetter} is in the word. ` :
              `Sorry: the letter ${lastGuessedLetter} is not in the word. `
            }
            You have {guessesRemaining} {
              guessesRemaining === 1 ? "attempt" : "attempts"
            } left.
          </p>
        }
        <p>
          Progress on the word: {
            currentWord
              .split("")
              .map(ltr => 
                guessedLetters.includes(ltr) ? ltr.toUpperCase() : "blank"  
              )
              .join(" ")
          }
        </p>
      </section>

      <section className="keyboard-container">
        {keyboardEls}
        <SoundButton 
          handleSoundControl={handleSoundControl} 
          controlSound={controlSound}
          isGameOver={isGameOver}
        />
      </section>

      {
        isGameOver && 
        <button 
          onClick={handleNewGame} 
          className="new-game-btn"
          ref={newGameBtnRef}
        >
          New Game
        </button>
      }
      {isGameWon && <Confetti />}
    </main>
  );
}

 