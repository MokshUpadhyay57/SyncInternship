const questionContainer = document.getElementById('question-container');
const answerButtons = document.getElementById('answer-buttons');
const nextButton = document.getElementById('next-button');

let currentQuestionIndex = 0;
let score = 0;
let questions = [];

async function fetchQuestions() {
  try {
    const response = await fetch('quiz.json');
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    questions = await response.json();
    startQuiz();
  } catch (error) {
    console.error('Error fetching questions:', error);
  }
}

function startQuiz() {
  score = 0;
  nextButton.style.display = 'none';
  showQuestion();
}

function showQuestion() {
  const question = questions[currentQuestionIndex];
  questionContainer.innerText = question.question;
  answerButtons.innerHTML = '';
  question.answers.forEach(answer => {
    const button = document.createElement('button');
    button.innerText = answer.text;
    button.classList.add('btn');
    button.addEventListener('click', () => selectAnswer(answer.correct));
    answerButtons.appendChild(button);
  });
}

function selectAnswer(correct) {
  if (correct) {
    score++;
  }
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length - 1) {
    showQuestion();
  } else {
    endQuiz();
  }
}

function endQuiz() {
  questionContainer.innerText = `Your Score: ${score}/${questions.length}`;
  answerButtons.innerHTML = '';
  nextButton.style.display = 'block';
}

// Event listener for the "Next" button
function nextQuestion() {
    // Logic to move to the next question
    nextButton.addEventListener('click', () => {
      currentQuestionIndex = 0;
      startQuiz();
    });
  }

// Fetch questions when the page loads
fetchQuestions();
