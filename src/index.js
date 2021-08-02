import './sass/index.scss';
import { Quiz } from './tools/Quiz';

const startBtn = document.querySelector('.btn--start');
const scoreBtn = document.querySelector('.btn--scores');
const inputName = document.querySelector('.app-container__input');

startBtn.addEventListener('click', () => {
    new Quiz(inputName.value).startGame();
});
startBtn.addEventListener('touch', () => {
    new Quiz(inputName.value).startGame();
});
scoreBtn.addEventListener('click', () => {
    new Quiz().drawScores();
});
scoreBtn.addEventListener('touch', () => {
    new Quiz().drawScores();
});
