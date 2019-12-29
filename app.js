const QUIZ_DIGIT = 4;
let QUIZ_SPEED = 800;
const answersEle = document.querySelector('.answers__inputs');
const answerInputs = document.querySelectorAll('.answers__input');
const quizEle = document.querySelector('.quiz__images');
const quiz = [];

let quizPlaying = false;

const imageFileArray = [
  'Semaphore_Kilo.svg',
  'Semaphore_Alpha.svg',
  'Semaphore_Bravo.svg',
  'Semaphore_Charlie.svg',
  'Semaphore_Delta.svg',
  'Semaphore_Echo.svg',
  'Semaphore_Foxtrot.svg',
  'Semaphore_Golf.svg',
  'Semaphore_Hotel.svg',
  'Semaphore_India.svg',
  'Semaphore_Ready.svg',
];

function toggleCheatSheet() {
  const cheatSheet = document.querySelector('.cheatSheet');
  console.log('cheatSheet: ', cheatSheet);
  cheatSheet.classList.toggle('hide');
}

function jump(ele, content) {
  const next = ele.tabIndex;

  if (answersEle.children[next] !== undefined) {
    console.log('answersEle.children[next]: ', answersEle.children[next]);
    if (
      (event.keyCode >= 48 && event.keyCode <= 57) ||
      (event.keyCode >= 96 && event.keyCode <= 105)
    ) {
      answersEle.children[next].select();
    } else if (event.keyCode >= 65 && event.keyCode <= 90) {
      ele.select();
    }
  }
  if (event.keyCode === 13) {
    handleCheckAnswer();
  }
}

function changeSpeed(speed) {
  QUIZ_SPEED = speed;
}
function handleGenerateQuiz() {
  if (quizPlaying) return;

  const quizNumber = generateQuiz(quiz);
  displayQuiz(0, quizNumber, quizEle);
}

function generateQuiz(quizArray) {
  if (!quizEle) return;
  quizArray.length = 0;

  for (let i = 0; i < QUIZ_DIGIT; i++) {
    quizArray.push(Math.round(Math.random() * 9), 10);
  }

  return quizArray.map(i => {
    return `
    <img src="img/${imageFileArray[i]}" alt="${i}">
    `;
  });
}

function resetInput(elements) {
  const targets = [...elements];
  targets.map(target => {
    target.removeAttribute('aria-correct');
    target.removeAttribute('aria-wrong');
  });
}

function displayQuiz(i, quizArray, bom) {
  quizPlaying = true;

  if (i < QUIZ_DIGIT * 2) {
    bom.innerHTML = quizArray[i];
    setTimeout(() => displayQuiz(i + 1, quizArray, bom), QUIZ_SPEED);
  } else {
    quizPlaying = false;
  }
  removeDisable(answerInputs);
  resetInput(answerInputs);
}

function handleCheckAnswer() {
  if (quizPlaying) {
    return;
  }
  const quizChecks = quiz.filter(i => i < 10);
  const inputs = [...answerInputs];
  const answers = inputs.map(i => parseInt(i.value));
  // const result = [];

  // console.log('answers: ', answers);
  // console.log(`quizChecks:`, quizChecks);
  const results = answers.map((answer, index) => {
    return answer === quizChecks[index];
  });
  // console.log('results: ', results);
  if (quizChecks.length >= QUIZ_DIGIT) setValidation(results, inputs);
}

function setValidation(results, elements) {
  resetInput(elements);
  results.map((result, index) => {
    if (!result) {
      elements[index].setAttribute('aria-wrong', 'true');
    } else {
      elements[index].setAttribute('aria-correct', 'true');
    }
  });
}

function handlePlayInput() {
  const inputs = [];
  [...answerInputs].map(i => {
    return inputs.push(parseInt(i.value), 10);
  });
  const inputsHTML = inputs.map(
    i => `<img src="img/${imageFileArray[i]}" alt="${i}">`,
  );
  if (inputs.length === QUIZ_DIGIT * 2) {
    displayQuiz(0, inputsHTML, quizEle);
  }
}

function removeDisable(elements) {
  [...elements].map(i => i.removeAttribute('disabled'));
}
