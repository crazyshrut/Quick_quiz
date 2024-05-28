const questions = [   
    {
        question: 'Which HTML tag is used to define an inline style?',
        options: ['<script>', '<css>', '<style>', '<span>'],
        correctOption: 2
    },
    {
        question: 'Which property is used to change the text color in CSS?',
        options: ['text-color', 'font-color', 'text-style', 'color'],
        correctOption: 3
    },
    {
        question: 'Which of the following is the correct way to comment in HTML?',
        options: ['// Comment', '<!-- Comment -->', '/* Comment */', '<! Comment>'],
        correctOption: 1
    },
];

let correctAnswers = 0;
let correctScore = 0;

let currentQuestionIndex = 0;

function showQuestion() {
    let progressBar = document.querySelector('#myProgress');
    let progress = Math.round((currentQuestionIndex / questions.length) * 100);
    progressBar.value = progress;
    let solved = document.querySelector('.solved');
    solved.textContent = `Questions ${currentQuestionIndex}/${questions.length}`;
    const score = document.querySelector('.score-bar');
    score.textContent = correctScore;
    // document.querySelector('.score-board').style.display = 'flex';



    if (currentQuestionIndex >= questions.length) {
        document.querySelector('.score-board').style.display = 'none';

        document.querySelector('.question-container').innerHTML = `
        <div class="end-page">
        <p>You got ${correctAnswers} out of ${questions.length} questions correct!</p>
        <p class="score">${correctScore}</p>
        <p>Quiz completed!</p>
        <button class="restart">Restart Quiz</button>
        <button class="home">Go Home</button>
        </div>`;

        // Attach event listeners to the dynamically created buttons
        document.querySelector('.restart').addEventListener('click', restartQuiz);
        document.querySelector('.home').addEventListener('click', goHome);
        return;
    }

    enableButton();

    const questionData = questions[currentQuestionIndex];
    const questionElement = document.querySelector('.question');
    const optionButtons = document.querySelectorAll('.options button');

    // Update question text
    questionElement.textContent = questionData.question;

    // Update options text and remove previous classes
    questionData.options.forEach((option, index) => {
        const button = optionButtons[index];
        const answerSpan = button.querySelector('.answer');
        answerSpan.textContent = option;
        button.className = ''; // Remove any previous classes
        button.onclick = () => checkAnswer(button, index);
    });

    // Remove the previous answers and colors
    optionButtons.forEach((button) => {
        button.style.backgroundColor = '';
    });
}

function checkAnswer(button, selectedIndex) {
    const questionData = questions[currentQuestionIndex];
    if (selectedIndex === questionData.correctOption) {
        button.style.backgroundColor = 'green';
        correctAnswers++;
        correctScore += 10;
    } else {
        button.style.backgroundColor = 'rgb(171, 76, 8)';
    }
    currentQuestionIndex++;
    disableButton();
    // progressBar(correctScore, 30);
    setTimeout(showQuestion, 1000);
}



// function progressBar(correctScore, maxProgress) {
//     const scoreBoard = document.querySelector('.score-board');
//     const score = document.querySelector('.score-bar');
//     score.textContent = correctScore;

//     // Assuming progress bar element has ID "myProgress"
//     const progressBar = document.getElementById("myProgress");

//     function updateProgress(value) {
//         // Ensure value stays within valid range (0 to maxProgress)
//         progressBar.value = Math.min(Math.max(value, 0), maxProgress);
//     }

//     // Update progress bar smoothly with animation (optional)
//     let progress = 0;
//     const animationId = requestAnimationFrame(animateProgress);

//     function animateProgress() {
//         if (progress === maxProgress) {
//             cancelAnimationFrame(animationId);
//             return;
//         }

//         progress = Math.min(progress + 5, maxProgress); // Adjustable increment
//         updateProgress(progress);
//         requestAnimationFrame(animateProgress);
//     }
// }

function restartQuiz() {
    currentQuestionIndex = 0;
    correctAnswers = 0;
    correctScore = 0;

    getDefaultQuestions();
    document.querySelector('.score-board').style.display = 'flex';

    showQuestion();
}

function disableButton() {
    const optionButtons = document.querySelectorAll('.options button');
    optionButtons.forEach(btn => btn.disabled = true);
}

function enableButton() {
    const optionButtons = document.querySelectorAll('.options button');
    optionButtons.forEach(btn => btn.disabled = false);
}

function goHome() {
    currentQuestionIndex = 0;
    correctAnswers = 0;
    correctScore = 0;
    document.querySelector('.end-page').innerHTML = '';

    document.querySelector('.start-page').style.display = 'flex';
    document.querySelector('.question-container').style.display = 'none';
    document.querySelector('.score-board').style.display = 'none';
    getDefaultQuestions();
}

document.querySelector('.start-btn').addEventListener('click', () => {
    document.querySelector('.start-page').style.display = 'none';
    document.querySelector('.score-board').style.display = 'flex';
    document.querySelector('.question-container').style.display = 'flex';
    currentQuestionIndex = 0;
    correctAnswers = 0;
    correctScore = 0;
    getDefaultQuestions();
    showQuestion();
});
function getDefaultQuestions(){
    document.querySelector('.question-container').innerHTML = `
    <p class="question">What is the answer to this question?</p>
        <div class="options">
            <button>
                <span class="key"> A </span>
                <span class="answer">Answer 1</span>    
            </button>
            <button>
                <span class="key"> B </span>
                <span class="answer">Answer 2</span>  
            </button>
            <button>
                <span class="key"> C </span>
                <span class="answer">Answer 3</span>  
            </button>
            <button>
                <span class="key"> D </span>
                <span class="answer">Answer 4</span>  
            </button>

            
        </div>`;
}

// Start the quiz by showing the first question
showQuestion();