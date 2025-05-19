# Assembly: Endgame

A fun, accessible, and colorful Hangman-style word game built with React!  
Save the programming world from Assembly by guessing the secret word before all your favorite languages are eliminated.

---

## Features

- **Hangman gameplay**: Guess the word by clicking or typing letters.
- **Programming theme**: Each wrong guess "eliminates" a programming language (HTML, CSS, JavaScript, etc.).
- **Sound effects**: Clicks, cheers, and boos (with mute/unmute support).
- **Accessible**: Keyboard navigation and screen reader-friendly status updates.
- **Confetti celebration**: Win the game and enjoy a confetti burst!
- **Responsive UI**: Works well on desktop and mobile.

---

## How to Play

1. Click or tap the letter buttons to guess the word.
2. Each wrong guess eliminates a programming language.
3. Guess the word before all languages are gone to win!
4. Use the sound button to mute/unmute effects.
5. Click "New Game" to play again.

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v16 or newer recommended)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/your-repo.git
   cd your-repo
   ```

2. **Install dependencies:**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start the development server:**
   ```bash
   npm start
   # or
   yarn start
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Project Structure

- `src/AssemblyEndgame.jsx` - Main game component and logic
- `src/components/Status.jsx` - Game status and farewell messages
- `src/components/SoundButton.jsx` - Sound control button
- `src/js/language.js` - Programming languages data
- `src/js/utils.js` - Utility functions (random word, sound, etc.)
- `src/js/audio.js` - Sound effect assets

---

## Customization

- **Add more words:** Edit `src/js/words.js` to expand the word list.
- **Change languages:** Edit `src/js/language.js` to add/remove programming languages.
- **Adjust sound effects:** Replace or add audio files in `src/js/audio.js`.

---

## License

MIT

---

## Credits

- Inspired by [Bob Ziroll's React tutorials](https://scrimba.com/learn/learnreact).
- Confetti effect by [react-confetti](https://github.com/alampros/react-confetti).

# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
