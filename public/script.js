// Отслеживаем событие загрузки страницы, чтобы можно было работать
// с элементами страницы.
document.addEventListener("DOMContentLoaded", function() {
  // Получаем ссылки на блоки страницы со сравнением и заменой
  var comparison = document.querySelector(".comparison");
  var replacement = document.querySelector(".replacement");
  // Можете глянуть в консоли, что они собой представляют
  // Наведите на них мышь в консоли
  console.log(comparison);
  console.log(replacement);

  // Ниже устанавливаем true для того блока, который надо скрыть
  // Выбирайте какой блок скрыть согласно заданию.
  // Достаточно просто раскомментировать необходимую строку
  // comparison.hidden = true;
  // replacement.hidden = true;

  // Если блок отображается, то запускаем функцию его обработки
  if (!comparison.hidden) handleComparison(comparison);
  if (!comparison.hidden) handleReplacement(replacement);
});

/**
 * Функция для задач сравнения строк с регуляркой
 */
function handleComparison(comparison) {

  // ################# Ваш код должен быть ниже!!! #################

  // Здесь можно заполнить блок своими тестовыми примерами
  var inputs = comparison.querySelectorAll("input.compare");
  inputs[0].value = "";
  inputs[1].value = "";
  inputs[2].value = "";
  inputs[3].value = "";

  function checkCompare(value) {
    // Здесь вы создаете регулярку и сравниваете с value
    // Функция должна вернуть true, если сравнение успешно
    // Или для поиска с помощью match или exec результат возвращается в виде строки
    // массив после match или exec необходимо преобразовать в строку и
    // вернуть из функции в отформатированном виде со всеми 
    // значениями и индексами, получаемыми от match или exec
    // При возвращении строки эта строка будет показана в браузере
    // Если совпадений не найдено, необходимо вернуть false
    return false;
  }

  // ################# Конец вашего кода!!! #################

  // Будем обрабатывать событие ввода в поле из всех input-ов блока 
  // comparison через всплытие события от конкретного input до comparison
  // Почти все события в JS всплывают вверх по DOM дереву
  comparison.oninput = function (event) {
    // Узнаем в каком input произошло событие ввода пользователя
    var inputElem = event.target;
    // Запускаем обработчик
    handler(inputElem);
  }

  for (var index = 0; index < inputs.length; index++) {
    handler(inputs[index]);
  }

  function handler(inputElem) {
    // Вызываем вашу функцию проверки регулярки
    var checkResult = checkCompare(inputElem.value);
    // Выясняем есть ли родительского элемента класс .wrong-sample
    var wrongSampleFlag = inputElem.closest(".wrong-sample") ? true : false;
    if (wrongSampleFlag && typeof checkResult === "boolean") checkResult = !checkResult;
    if (checkResult === true) {
      // Если проверка успешна меняем цвет на положительный
      match(inputElem.nextElementSibling);
    } else if (checkResult === false) {
      nomatch(inputElem.nextElementSibling);
    }

    var compareResult = inputElem.nextElementSibling.nextElementSibling;
    if (typeof checkResult === "string") {
      compareResult.classList.add("visible");
      if (!wrongSampleFlag) match(inputElem.nextElementSibling);
      else nomatch(inputElem.nextElementSibling);
    } else {
      compareResult.classList.remove("visible");
    }
    compareResult.querySelector(".message").textContent = checkResult;
  }

}

function match(elem) {
  // Переключаем классы CSS у соседнего элемента, чтобы поменять его цвет
  elem.classList.remove("no-match");
  elem.classList.add("match");
}

function nomatch(elem) {
  elem.classList.remove("match");
  elem.classList.add("no-match");
}

/**
 * Функция для задач замены в строке по регулярке
 */
function handleReplacement(replacement) {

  // ################# Ваш код должен быть ниже!!! #################

  // Здесь можно заполнить блок своими тестовыми примерами
  var enters = replacement.querySelectorAll("textarea.enter");
  enters[0].value = "";
  enters[1].value = "";
  enters[2].value = "";

  var expectations = replacement.querySelectorAll("textarea.expectation");
  expectations[0].value = "";
  expectations[1].value = "";
  expectations[2].value = "";

  function replace(value) {
    // Здесь вы создаете регулярку 
    // И строку, которая будет заменять совпадения регулярки в value
    // Функция должна вернуть строку с результатом замены    
    return "";
  }

  // ################# Конец вашего кода!!! #################

  replacement.oninput = function(event) {
    // Узнаем в каком textarea произошло событие ввода пользователя
    var enterElem = event.target;
    // Запускаем обработчик
    handler(enterElem);
  };

  for (var index = 0; index < enters.length; index++) {
    handler(enters[index]);
  }

  function handler(enterElem) {
    var children = enterElem.parentNode.children;
    // Вызываем вашу функцию проверки регулярки
    var replaceResult = replace(children[0].value);
    if (!replaceResult) children[1].innerHTML = "<span>Результат замены</span>";
    else children[1].textContent = replaceResult;
    var expectationValue = children[2].value;
    if (replaceResult && replaceResult === expectationValue) {
      // Если проверка успешна меняем цвет на положительный
      match(children[1]);
    } else {
      nomatch(children[1]);
    }
  }
}