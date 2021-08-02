import { shuffle } from './shuffleArray';
import { addUserToArray, getUsersArray } from './addUserToArray';

let questions = [];

export const getDataQuestions = () => {
    const path = 'data/questions.json';
    fetch(path)
        .then((response) => {
            if (response.status !== 200) {
                throw Error('Coś poszło nie tak');
            } else {
                return response.json();
            }
        })
        .then((data) => {
            dataQuestions(data.questions);
        })
        .catch((err) => console.log(err));
};

const dataQuestions = (data) => {
    questions = data;
};

getDataQuestions();

export class Quiz {
    constructor(inputName = '') {
        this.inputName = inputName;
        this.questionNumber = 1;
        this.heartsLeft = 2;
        this.indexQuestion = 0;
        this.points = 0;

        this.mainApp = document.querySelector('.app-main');
        this.startBtn = document.querySelector('.btn--start');
        this.scoreBtn = document.querySelector('.btn--scores');
    }

    drawGame = () => {
        this.mainApp.innerHTML = `
        <div class="information">
            <div class="information__points">
                <span>${this.points} </span><i class="fas fa-medal"></i>
            </div>
            <div class="information__hearts"> 
                <i class="fas fa-heart"></i>
                <i class="fas fa-heart"></i>
            </div>
        </div>
        <div class="quiz">
            <p class="quiz__question"><span class="quiz__number">${
                this.questionNumber
            }.</span> ${questions[this.indexQuestion].question}</p>
            <ul class="quiz__answers">
                <li option-key="a">
                    A.  ${questions[this.indexQuestion].a}</p>
                </li>
                <li option-key="b">
                    B.  ${questions[this.indexQuestion].b}</p>
                </li>
                <li option-key="c">
                    C.  ${questions[this.indexQuestion].c}</p>
                </li>
                <li option-key="d">
                    D.  ${questions[this.indexQuestion].d}</p>
                </li>
            </ul>
        </div>
        `;

        if (this.heartsLeft === 1) this.removeHeart();
        if (this.heartsLeft === 0) this.endGame();
        this.addAnswersListener();
    };

    drawResult = () => {
        this.mainApp.innerHTML = `
        <div class="results">
            <h2>${this.inputName}</h2>
            <i class="fas fa-medal"></i>
            <div class="results__points">Twój wynik to: <span>${this.points}</span></div>
        </div>
    
        <div class="app-container__buttons">
            <button class="btn btn--start">Zagraj jeszcze raz <i class="fas fa-play-circle"></i></button>
            <button class="btn btn--scores">Najlepsze wyniki <i class="fas fa-medal"></i></button>
        </div>
        `;

        this.resetStats();
    };

    drawScores = () => {
        this.mainApp.textContent = '';
        this.mainApp.innerHTML = `
        <div class="scores">
            <i class="fas fa-medal"></i>
            <h2>NAJLEPSZE WYNIKI</h2>
        </div>
    
        <ul class="users-score">
        </ul>
    
        <div class="app-container__buttons">
            <a href="index.html">
                <button class="btn btn--home">Strona startowa<i class="fas fa-home"></i></button>
            </a>
        </div>
        `;

        const usersScore = getUsersArray();

        const ul = document.querySelector('.users-score');

        usersScore.forEach((item, index) => {
            const li = document.createElement('li');
            li.innerHTML = `
                <span>${index + 1}. ${item.name}</span>
                <span>${item.points}</span>
            `;

            ul.appendChild(li);
        });
    };

    resetStats = () => {
        this.questionNumber = 1;
        this.heartsLeft = 2;
        this.indexQuestion = 0;
        this.points = 0;

        const startBtn = document.querySelector('.btn--start');
        const scoreBtn = document.querySelector('.btn--scores');
        startBtn.addEventListener('click', this.startGame);
        startBtn.addEventListener('touch', this.startGame);
        scoreBtn.addEventListener('click', this.drawScores);
        scoreBtn.addEventListener('touch', this.drawScores);
    };

    addAnswersListener = () => {
        const answers = [...document.querySelectorAll('.quiz__answers li')];
        answers.forEach((item) => {
            item.addEventListener('click', this.checkAnswer);
            item.addEventListener('touch', this.checkAnswer);
        });
    };

    removeAnswersListener = () => {
        const answers = document.querySelectorAll('.quiz__answers li');
        answers.forEach((item) => {
            item.removeEventListener('click', this.checkAnswer);
            item.removeEventListener('touch', this.checkAnswer);
        });
    };

    updateStats = (result) => {
        this.indexQuestion++;
        this.questionNumber++;
        if (result) {
            this.points = this.points + this.indexQuestion * 10;
        } else {
            this.heartsLeft--;
        }

        this.removeAnswersListener();
        setTimeout(() => {
            if (questions.length === this.indexQuestion) this.endGame();
            else this.drawGame();
        }, 1500);
    };

    checkAnswer = (event) => {
        const answers = [...document.querySelectorAll('.quiz__answers li')];
        const clickedAnswer = event.target.getAttribute('option-key');

        answers.forEach((item) => {
            if (
                item.getAttribute('option-key') ===
                questions[this.indexQuestion].correct
            ) {
                item.style.backgroundColor = '#32CD32';
                item.style.borderColor = '#32CD32';
            }
        });

        if (clickedAnswer === questions[this.indexQuestion].correct) {
            event.target.style.color = ' white';

            this.updateStats(true);
        } else {
            event.target.style.backgroundColor = '#FF4C4C';
            event.target.style.borderColor = '#FF4C4C';
            event.target.style.color = ' white';

            this.updateStats(false);
        }
    };

    removeHeart = () => {
        if (this.heartsLeft > 0) {
            const hearts = document.querySelector('.information__hearts');
            hearts.removeChild(hearts.lastElementChild);
        }
    };

    endGame = () => {
        this.mainApp.textContent = '';
        addUserToArray(this.inputName, this.points);
        this.drawResult();
    };

    startGame = () => {
        if (this.inputName) {
            shuffle(questions);
            this.drawGame();
        } else alert('Wpisz swoję imię!');
    };
}
