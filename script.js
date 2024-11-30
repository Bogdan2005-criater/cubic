let randomNumber = Math.floor(Math.random() * 100) + 1; // Генерируем случайное число от 1 до 100
let attemptsLeft = 10; // Устанавливаем число оставшихся попыток

// Получаем элементы из HTML по их ID
const guessField = document.getElementById('guessField');
const guessSubmit = document.getElementById('guessSubmit');
const resultMessage = document.getElementById('resultMessage');
const attemptsRemaining = document.getElementById('attemptsRemaining');
const resetContainer = document.getElementById('resetContainer');

// Добавляем обработчик событий для кнопки "Угадать"
guessSubmit.addEventListener('click', checkGuess);

function checkGuess() {
    const userGuess = guessField.value.trim(); // Получаем значение из поля ввода и удаляем пробелы

    if (userGuess === '') {
        resultMessage.textContent = 'Поле ввода не может быть пустым!';
        return; // Прекращаем выполнение функции, если поле пустое
    }

    const userGuessNumber = Number(userGuess); // Преобразуем значение в число

    if (isNaN(userGuessNumber) || userGuessNumber < 1 || userGuessNumber > 100) {
        resultMessage.textContent = 'Пожалуйста, введите число от 1 до 100.';
        return; // Прекращаем выполнение функции, если значение некорректно
    }

    // Используем цикл for для обработки одной попытки
    for (let i = 0; i < 1; i++) {
        attemptsLeft--; // Уменьшаем число оставшихся попыток на одну

        if (userGuessNumber === randomNumber) {
            resultMessage.textContent = 'Поздравляем! Вы угадали число!';
            setGameOver(); // Завершаем игру, если число угадано
            break; // Выходим из цикла, так как игра окончена
        } else if (attemptsLeft === 0) { // Проверяем, закончились ли попытки
            resultMessage.textContent = 'Игра окончена! Вы проиграли.';
            setGameOver(); // Завершаем игру, если попытки закончились
            break; // Выходим из цикла, так как игра окончена
        } else { // Если число не угадано и попытки еще есть
            if (userGuessNumber < randomNumber) {
                resultMessage.textContent = 'Загаданное число больше.';
            } else if (userGuessNumber > randomNumber) {
                resultMessage.textContent = 'Загаданное число меньше.';
            }

            // Обновляем информацию о числе оставшихся попыток
            attemptsRemaining.textContent = `Осталось попыток: ${attemptsLeft}`;
        }
    }

    // Очищаем поле ввода и устанавливаем фокус на него
    guessField.value = '';
    guessField.focus();
}

function setGameOver() {
    guessField.disabled = true; // Отключаем поле ввода
    guessSubmit.disabled = true; // Отключаем кнопку "Угадать"

    const resetButton = document.createElement('button'); // Создаем элемент кнопки
    resetButton.textContent = 'Начать заново'; // Устанавливаем текст кнопки
    resetButton.classList.add('reset-button'); // Добавляем класс для стилизации кнопки

    resetContainer.appendChild(resetButton); // Добавляем кнопку в контейнер resetContainer

    resetButton.addEventListener('click', resetGame); // Добавляем обработчик события клика, который вызывает функцию resetGame
}

function resetGame() {
    attemptsLeft = 10; // Сбрасываем число оставшихся попыток на 10

    const resetButton = document.querySelector('.reset-button'); // Находим кнопку "Начать заново"
    resetButton.parentNode.removeChild(resetButton); // Удаляем кнопку из DOM

    guessField.disabled = false; // Включаем поле ввода
    guessSubmit.disabled = false; // Включаем кнопку "Угадать"

    guessField.value = ''; // Очищаем поле ввода
    guessField.focus(); // Устанавливаем фокус на поле ввода

    resultMessage.textContent = ''; // Очищаем сообщение о результате
    attemptsRemaining.textContent = `Осталось попыток: ${attemptsLeft}`; // Обновляем сообщение о числе оставшихся попыток

    randomNumber = Math.floor(Math.random() * 100) + 1; // Генерируем новое случайное число от 1 до 100
}
