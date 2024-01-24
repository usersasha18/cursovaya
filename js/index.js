const toggleButton = document.querySelector('#changeTheme');
const root = document.querySelector('#root');
const answers = document.querySelector('#answers');
const modalScore = document.querySelector(".modal-score");

let score = 0;
let answerIndex = 0;

toggleButton.addEventListener('click', checkAnswer);

showQuestion();

function showQuestion() {
    if (answerIndex < data.length) {
        answers.innerHTML = "";
        root.innerHTML = "<h2>" + data[answerIndex]['question']+ "</h2>" + "<br>";
        for (const [index, value] of data[answerIndex]["answers"].entries()) {
            answers.innerHTML += `
            <div class="input-div">
                <label for="answer">${value}</label>
                <input type="radio" name="answer" value="${index + 1}" />
            <div>
            ` + "<br>";
        }
    } else {
        return;
    }
}

function checkAnswer() {
    const fruits = document.querySelectorAll('input[name="answer"]');
    for (const f of fruits) {
        if (f.checked) {
            const radioAnswer = parseInt(f.value);
            const correctAnswer = data[answerIndex]['correct'];

            if (correctAnswer === radioAnswer) {
                console.log("вы ответили правильно");
                score++;
            } else {
                console.log("ответ неверный(");
            }


            answerIndex++;
            showQuestion();

            if (answerIndex === data.length) {
                console.log("ваш скор", score);
                toggleButton.setAttribute('disabled', 'true');
                showModalResult();
            }
            break; // Прерываем цикл, так как уже найден выбранный ответ
        }
    }
}

function showModalResult() {
    modalScore.classList.add("showModal");
    modalScore.style.opacity = 1;
    const resultHTML = `
        <h2>Ваш скор ${score} из ${data.length}</h2>
        <button id="close">Закрыть окно</button>
    `;
    modalScore.innerHTML = resultHTML;


    const closeButton = document.querySelector('#close');
    closeButton.addEventListener("click", closeModal);
}

function closeModal() {
    modalScore.style.display = "none";
    modalScore.classList.remove('showModal')
}