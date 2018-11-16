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
  if (!replacement.hidden) handleReplacement(replacement);
});

/**
 * Функция для задач поиска и сравнения строк с регуляркой
 */
function handleComparison(comparison) {

  // ############ Ваш код должен быть ниже!!! ############ >>>>>>>>>

  // Здесь можно заполнить блок своими тестовыми примерами 
  // они отобразятся на странице в input полях
  var inputs = comparison.querySelectorAll("input.compare");
  // Первая половина примеров это ПРАВИЛЬНЫЕ примеры, которые подходят под регулярку
  inputs[0].value = "";
  inputs[1].value = "";
  // Вторая половина примеров это НЕПРАВИЛЬНЫЕ примеры, которые не должны 
  // подходить под регулярку (без таких примеров можно было бы написать регулярку, 
  // которая бы распознавала абсолютно все примеры строк)
  inputs[2].value = "";
  inputs[3].value = "";

  /**
   * Функция, в которой с помощью регулярки вы решаете свою задачу
   * Данная функция запускается каждый раз при первой загрузке страницы для
   * каждого input-а. Затем эта функция запускается, когда пользователь обновляет
   * один из input-ов. При этом в value подается новое значение из input-а
   * В зависимости от возвращаемого значения функции соответствующий её вызову
   * input помечается как прошедший или не прошедший тест.
   * @param {String} value - содержимое input-а 
   */
  function checkCompare(value) {
    // Здесь вы создаете регулярку и сравниваете с value
    // Функция должна вернуть true, если сравнение успешно
    // При возвращении из функции строки эта строка будет показана в браузере
    // Для задач поиска как раз необходимо возвращать строку с результатами поиска
    // Для задач поиска необходимо использовать методы match или exec
    // Эти методы возвращают массив. Вам необходимо преобразовать этот массив в
    // строку и вернуть из функции в отформатированном виде со всеми
    // значениями и индексами, получаемыми от match или exec
    // Если совпадений не найдено, необходимо вернуть false или пустую строку,
    return false;
  }

  // <<<<<<<<< ############ Конец вашего кода!!! ############

  // Будем обрабатывать событие ввода в поле из всех input-ов блока 
  // comparison через всплытие события от конкретного input до comparison
  // Почти все события в JS всплывают вверх по DOM дереву
  comparison.oninput = function (event) {
    // Узнаем в каком input произошло событие ввода пользователя
    var inputElem = event.target;
    // Запускаем обработчик
    handler(inputElem);
  }

  // При загрузке страницы запускается проверка регулярок
  for (var index = 0; index < inputs.length; index++) {
    handler(inputs[index]);
  }

  function handler(inputElem) {
    // Вызываем вашу функцию проверки регулярки
    var checkResult = checkCompare(inputElem.value);
    var answer = inputElem.nextElementSibling;
    var compareResult = inputElem.nextElementSibling.nextElementSibling;

    // Выясняем есть ли родительского элемента класс .wrong-sample
    var wrongSampleFlag = inputElem.closest(".wrong-sample") ? true : false;
    // Если функция с регуляркой вернула boolean, то просто меняем цвет элемента
    if (wrongSampleFlag && typeof checkResult === "boolean") checkResult = !checkResult;
    // Если проверка успешна меняем цвет на положительный
    match(answer, checkResult);
    if (checkResult === true) {
      answer.textContent = wrongSampleFlag ? "Не совпало" : "Совпало";
    } else if (checkResult === false) {
      answer.textContent = wrongSampleFlag ? "Совпало" : "Не совпало";
    }

    // Если функция с регуляркой возвращает строку, то отображаем эту строку в браузере
    if (typeof checkResult === "string") {
      if (checkResult !== "") {
        compareResult.classList.add("visible");
        wrongSampleFlag = !wrongSampleFlag;
      }
      else compareResult.classList.remove("visible");
      match(answer, wrongSampleFlag);
      answer.textContent = checkResult === "" ? "Не найдено" : "Найдено";
    } else {
      compareResult.classList.remove("visible");
    }
    compareResult.querySelector(".message").textContent = checkResult;
  }

}

function match(elem, matchFlag) {
  // Переключаем классы CSS у элемента, чтобы поменять его цвет
  matchFlag = typeof matchFlag === "undefined" ? true : matchFlag;
  if (matchFlag === true) {
    elem.classList.remove("no-match");
    elem.classList.add("match");
  } else {
    elem.classList.remove("match");
    elem.classList.add("no-match");
  }
}

/**
 * Функция для задач замены в строке по регулярке
 */
function handleReplacement(replacement) {

  // ############ Ваш код должен быть ниже!!! ############ >>>>>>>>>

  // Здесь можно заполнить блок своими тестовыми примерами
  // они отобразятся на странице в input полях
  var enters = replacement.querySelectorAll("textarea.enter");
  enters[0].value = "";
  enters[1].value = "";
  enters[2].value = "";

  var expectations = replacement.querySelectorAll("textarea.expectation");
  expectations[0].value = "";
  expectations[1].value = "";
  expectations[2].value = "";

  /**
   * Функция, в которой с помощью регулярки вы решаете свою задачу
   * Данная функция запускается каждый раз при первой загрузке страницы для
   * каждой textarea.enter (у которой placeholder="Строка для замены"). 
   * Затем эта функция запускается, когда пользователь обновляет
   * одну из textarea. При этом в value подается новое значение из textarea.enter
   * Функция должна возвращать строку, которая является результатом замены согласно
   * условию вашей задачи.
   * Если результат замены не совпадает с тем, что находится в "textarea.expectation",
   * то делаем цвет textarea с результатом замены красным, иначе зеленым.
   * @param {String} value - содержимое textarea.enter 
   */
  function replace(value) {
    // Здесь вы создаете регулярку 
    // И строку, которая будет заменять совпадения регулярки в value
    // Функция должна вернуть строку с результатом замены    
    return "";
  }

  // <<<<<<<<< ############ Конец вашего кода!!! ############

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
    // Если проверка успешна меняем цвет на положительный
    match(children[1], replaceResult && replaceResult === expectationValue);
  }
}