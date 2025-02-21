const questions = [
    {
        scenario: "You are the center fielder. The ball is hit to you with no runners on base.",
        question: "Where do you throw the ball?",
        options: ["Home plate", "Third base", "Second base", "First base"],
        answer: 2, // Second base
        explanation: "With no runners on base, throw to second base to keep the batter from advancing further."
    },
    {
        scenario: "You are the shortstop. The ball is hit to left field with a runner on first.",
        question: "Where do you position yourself?",
        options: ["Cover second base", "Go to third base", "Stay near shortstop", "Move toward left field"],
        answer: 0, // Cover second base
        explanation: "With a runner on first and the ball in left field, cover second base for a possible throw or to tag the runner."
    },
    {
        scenario: "You are the third baseman. The ball is hit to left field with a runner on second.",
        question: "What is your role?",
        options: ["Cover third base", "Be the cutoff man for home", "Back up the shortstop", "Stay at third"],
        answer: 1, // Be the cutoff man for home
        explanation: "For balls hit to left field, the third baseman acts as the cutoff man for throws to home plate."
    },
    {
        scenario: "You are the first baseman. The ball is hit to right field with a runner on first.",
        question: "Where do you position yourself?",
        options: ["Stay at first base", "Move to second base", "Be the cutoff man for home", "Back up the pitcher"],
        answer: 2, // Be the cutoff man for home
        explanation: "With a runner on first and the ball in right field, the first baseman becomes the cutoff man for throws to home."
    },
    {
        scenario: "You are the catcher. The ball is hit to the outfield with a runner on third.",
        question: "What do you do?",
        options: ["Stay at home plate", "Call for the throw to home", "Move toward the pitcher", "Back up first base"],
        answer: 1, // Call for the throw to home
        explanation: "The catcher directs the play by calling for the throw to home to stop the runner from scoring."
    },
    {
        scenario: "You are the right fielder. The ball is hit to you with runners on first and third.",
        question: "Where do you throw the ball?",
        options: ["Home plate", "Third base", "Second base", "First base"],
        answer: 0, // Home plate
        explanation: "With runners on first and third, throw to home plate to prevent the runner on third from scoring."
    },
    {
        scenario: "You are the second baseman. The ball is hit to center field with a runner on first.",
        question: "Where do you position yourself?",
        options: ["Cover first base", "Cover second base", "Be the cutoff man", "Back up the center fielder"],
        answer: 1, // Cover second base
        explanation: "With a runner on first, the second baseman covers second base for a potential play."
    },
    {
        scenario: "You are the left fielder. The ball is hit to you with a runner on second.",
        question: "Where do you throw the ball?",
        options: ["Home plate", "Third base", "Second base", "First base"],
        answer: 1, // Third base
        explanation: "Throw to third base to prevent the runner from advancing or to get them out if they try."
    },
    {
        scenario: "You are the pitcher. The ball is hit to the outfield with a runner on second.",
        question: "What is your role?",
        options: ["Stay on the mound", "Back up home plate", "Cover first base", "Be the cutoff man"],
        answer: 1, // Back up home plate
        explanation: "The pitcher backs up home plate in case of an overthrow or a play at the plate."
    },
    {
        scenario: "You are the shortstop. The ball is hit to right field with runners on first and second.",
        question: "What is your role?",
        options: ["Cover second base", "Be the cutoff man for home", "Cover third base", "Back up the second baseman"],
        answer: 1, // Be the cutoff man for home
        explanation: "With runners on first and second, the shortstop often acts as the cutoff man for throws to home from right field."
    }
];

let currentQuestion = 0;
let score = 0;
let bestScore = localStorage.getItem('bestScore') || 0;
document.getElementById('best-score').textContent = bestScore;
document.getElementById('total-questions').textContent = questions.length;
document.getElementById('total-questions-score').textContent = questions.length;

function startQuiz() {
    document.getElementById('main-menu').style.display = 'none';
    document.getElementById('quiz').style.display = 'block';
    loadQuestion();
}

function loadQuestion() {
    const q = questions[currentQuestion];
    document.getElementById('question-number').textContent = currentQuestion + 1;
    document.getElementById('scenario').textContent = q.scenario + " " + q.question;
    const optionsDiv = document.getElementById('options');
    optionsDiv.innerHTML = '';
    q.options.forEach((option, index) => {
        const button = document.createElement('button');
        button.textContent = option;
        button.onclick = () => checkAnswer(index);
        optionsDiv.appendChild(button);
    });
}

function checkAnswer(selected) {
    const q = questions[currentQuestion];
    if (selected === q.answer) {
        score++;
        showFeedback('Correct!', q.explanation);
    } else {
        showFeedback('Incorrect', q.explanation);
    }
}

function showFeedback(title, explanation) {
    document.getElementById('quiz').style.display = 'none';
    document.getElementById('feedback').style.display = 'block';
    document.getElementById('feedback-title').textContent = title;
    document.getElementById('explanation').textContent = explanation;
}

document.getElementById('next-question').onclick = () => {
    currentQuestion++;
    if (currentQuestion < questions.length) {
        loadQuestion();
        document.getElementById('feedback').style.display = 'none';
        document.getElementById('quiz').style.display = 'block';
    } else {
        showFinalScore();
    }
};

function showFinalScore() {
    document.getElementById('feedback').style.display = 'none';
    document.getElementById('final-score').style.display = 'block';
    document.getElementById('score').textContent = score;
    let message;
    const percentage = (score / questions.length) * 100;
    if (percentage <= 50) {
        message = "Keep practicing! Check the explanations to get better.";
    } else if (percentage <= 80) {
        message = "Nice job! You’re getting the hang of it.";
    } else {
        message = "Awesome! You’re a fielding pro!";
    }
    document.getElementById('performance-message').textContent = message;
    if (score > bestScore) {
        bestScore = score;
        localStorage.setItem('bestScore', bestScore);
        document.getElementById('best-score').textContent = bestScore;
    }
}

document.getElementById('start-quiz').onclick = startQuiz;
document.getElementById('instructions').onclick = () => {
    document.getElementById('main-menu').style.display = 'none';
    document.getElementById('instructions-page').style.display = 'block';
};
document.getElementById('high-scores').onclick = () => {
    document.getElementById('main-menu').style.display = 'none';
    document.getElementById('high-scores-page').style.display = 'block';
};
document.getElementById('back-to-menu').onclick = () => {
    document.getElementById('instructions-page').style.display = 'none';
    document.getElementById('main-menu').style.display = 'block';
};
document.getElementById('back-to-menu-hs').onclick = () => {
    document.getElementById('high-scores-page').style.display = 'none';
    document.getElementById('main-menu').style.display = 'block';
};
document.getElementById('play-again').onclick = () => {
    currentQuestion = 0;
    score = 0;
    document.getElementById('final-score').style.display = 'none';
    startQuiz();
};