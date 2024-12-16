import { useState } from 'react';
import './Pendu.css';

function Pendu() {
  const words = ['lapin', 'ordinateur', 'developpeur', 'pendu', 'associer', 'secheresse', 'attendre', 'chargement', 'peindre', 'gateau', 'appartement', 'escaliers', 'vacances'];
  const [word] = useState(words[Math.floor(Math.random() * words.length)]);
  const [guessedWord, setGuessedWord] = useState(Array(word.length).fill('_'));
  const [attempts, setAttempts] = useState(6);
  const [usedLetters, setUsedLetters] = useState([]);
  const [message, setMessage] = useState('');

  const handleGuess = (letter) => {
    if (usedLetters.includes(letter) || attempts <= 0) return;

    setUsedLetters([...usedLetters, letter]);

    if (word.includes(letter)) {
      const newGuessedWord = guessedWord.map((char, index) =>
        word[index] === letter ? letter : char
      );
      setGuessedWord(newGuessedWord);

      if (!newGuessedWord.includes('_')) {
        setMessage('🎉 Félicitations Vous évitez la corde !');
      }
    } else {
      setAttempts(attempts - 1);
      if (attempts - 1 === 0) {
        setMessage(`💀  La mort était ton unique destin ... 💀 Le mot était "${word}" 💀`);
      }
    }
  };

  const renderKeyboard = () => {
    const alphabet = 'abcdefghijklmnopqrstuvwxyz';
    return alphabet.split('').map((letter) => (
      <button
        key={letter}
        disabled={usedLetters.includes(letter) || attempts <= 0}
        onClick={() => handleGuess(letter)}
        className="letter-button"
      >
        {letter}
      </button>
    ));
  };

  const renderHangman = () => {
    const hangmanStages = [
      '/./skullPendu.jpg', //base
      '/./step1.png',  //6
      '/./step2.png', // 5  
      '/./step3.png', // 4  
      '/./step4.png', // 3  
      '/./step5.png', // 2  
      '/./step6.png', // 1  
      '/./step1.png', // 0 full
    ];
    return (
      <div className="hangman-frame">
        <img
          src={hangmanStages[6 - attempts]}
          alt={`Step ${6 - attempts}`}
          className="hangman-image"
        />
      </div>
    );
  };
  return (
    <div className="pendu-container">
      <h1>PENDU</h1>
      <div className="hangman-frame">
        {renderHangman()}
      </div>
      <div className="word-display">{guessedWord.join(' ')}</div>
      <div className="keyboard">{renderKeyboard()}</div>
      {message && <div className="message">{message}</div>}
    </div>
  );
}

export default Pendu;
