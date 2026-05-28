const questions = [
    {
        question: "1. The rainforest ___ very wet.",
        options: ["is", "are", "be"],
        answer: "is"
    },
    {
        question: "2. Monkeys ___ in the trees.",
        options: ["live", "lives", "living"],
        answer: "live"
    },
    {
        question: "3. A jaguar ___ fast.",
        options: ["run", "runs", "running"],
        answer: "runs"
    },
    {
        question: "4. They ___ many colorful birds.",
        options: ["see", "sees", "seeing"],
        answer: "see"
    },
    {
        question: "5. The trees ___ tall and green.",
        options: ["is", "are", "am"],
        answer: "are"
    }
];

let currentQuestion = 0;
let score = 0;
let time = 0;
let timerInterval;

const questionEl = document.getElementById("question");
const answersEl = document.getElementById("answers");
const bike = document.getElementById("bike");
const scoreEl = document.getElementById("score");
const timerEl = document.getElementById("timer");

const correctSound = document.getElementById("correctSound");
const wrongSound = document.getElementById("wrongSound");
const finishSound = document.getElementById("finishSound");

function startTimer() {
    timerInterval = setInterval(() => {
        time++;
        timerEl.textContent = `Time: ${time}s`;
    }, 1000);
}

function loadQuestion() {
    if (currentQuestion === 0) startTimer();
    const q = questions[currentQuestion];
    questionEl.textContent = q.question;
    answersEl.innerHTML = "";
    q.options.forEach(option => {
        const btn = document.createElement("button");
        btn.textContent = option;
        btn.onclick = () => checkAnswer(option);
        answersEl.appendChild(btn);
    });
}


function checkAnswer(selected) {
    const correct = questions[currentQuestion].answer;
    if (selected === correct) {
        correctSound.play();
        score += 20;
        scoreEl.textContent = `Score: ${score}`;

  
        bike.style.transform = `translateX(${(currentQuestion + 1) * 127}px)`;

        currentQuestion++;
        if (currentQuestion < questions.length) {
            setTimeout(loadQuestion, 500);
        } else {
            clearInterval(timerInterval);
            finishSound.play();
            questionEl.textContent = `🏁 You finished the race! Final Score: ${score}, Time: ${time}s`;
            answersEl.innerHTML = "";

            // Stop background music and race audio
            raceAudio.pause();
            bgMusic.pause();
        }
    } else {
        wrongSound.play();
        alert("Oops! Try again.");
    }
}


loadQuestion();


  

window.addEventListener("DOMContentLoaded", () => {
  const raceAudio = document.getElementById("raceAudio");
  const bgMusic = document.getElementById("bgMusic");

  raceAudio.volume = 0.4;
  bgMusic.volume = 0.8;
});


