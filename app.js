const QUIZ_DIGIT = 4;
const QUIZ_SPEED = 300;
const answerEle = document.querySelector('.answers');
const quizEle = document.querySelector('.quizImages');
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

function jump(ele, content) {
  const next = ele.tabIndex;
  if (!answerEle.children[next]) return;
  if (
    (event.keyCode >= 48 && event.keyCode <= 57) ||
    (event.keyCode >= 96 && event.keyCode <= 105)
  ) {
    answerEle.children[next].select();
  }
}

function selectNumber(element) {
  element.select();
}

function handleGenerateQuiz() {
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

  // quizEle.innerHTML = html;
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

  bom.innerHTML = `<img src="img/${imageFileArray[10]}" alt="ready">`;
  if (i < QUIZ_DIGIT * 2) {
    bom.innerHTML = quizArray[i];
    setTimeout(() => displayQuiz(i + 1, quizArray, bom), QUIZ_SPEED);
  } else {
    quizPlaying = false;
  }
  resetInput(document.querySelectorAll('.answer'));
}

function handleCheckAnswer() {
  if (quizPlaying) {
    return;
  }
  const quizChecks = quiz.filter(i => i < 10);
  const inputs = [...document.querySelectorAll('.answer')];
  const answers = inputs.map(i => parseInt(i.value));
  // const result = [];

  console.log('answers: ', answers);
  console.log(`quizChecks:`, quizChecks);
  const results = answers.map((answer, index) => {
    return answer === quizChecks[index];
  });
  console.log('results: ', results);

  setValidation(results, inputs);
}

function setValidation(results, elements) {
  // console.log('result, elements: ', results, elements);
  results.map((result, index) => {
    if (!result) {
      elements[index].setAttribute('aria-wrong', 'true');
    } else {
      elements[index].setAttribute('aria-correct', 'true');
    }
  });
}
