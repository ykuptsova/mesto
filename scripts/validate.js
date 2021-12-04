const hideInputError = (inputElement, { errorClass, inputErrorClass }) => {
  const errorElement = inputElement
    .closest('.popup__form-field')
    .querySelector(`.popup__input-error`)
  inputElement.classList.remove(inputErrorClass)
  errorElement.classList.remove(errorClass)
  errorElement.textContent = ''
}

const showInputError = (inputElement, { errorClass, inputErrorClass }) => {
  const errorElement = inputElement
    .closest('.popup__form-field')
    .querySelector(`.popup__input-error`)
  inputElement.classList.add(inputErrorClass)
  errorElement.classList.add(errorClass)
  errorElement.textContent = inputElement.validationMessage
}

const checkInputValidity = (inputElement, config) => {
  if (inputElement.validity.valid) {
    hideInputError(inputElement, config)
  } else {
    showInputError(inputElement, config)
  }
}

const toggleButtonState = (formElement, buttonElement, inactiveButtonClass) => {
  // проверяем валидность формы
  const isFormValid = formElement.checkValidity()
  // если форма невалидна, то присваиваем свойству disabled кнопки значение true
  buttonElement.disabled = !isFormValid
  // если форма невалидна, добавляем кнопке класс
  buttonElement.classList.toggle(inactiveButtonClass, !isFormValid)
}

const setEventListeners = (formElement, config) => {
  // разбиваем конфиг на составляющие, чтобы передать нужные свойства в функции
  const {
    inputSelector,
    submitButtonSelector,
    inactiveButtonClass,
    errorClass,
    inputErrorClass,
  } = config
  // inputSelector позволяет найти все поля ввода
  const inputList = Array.from(formElement.querySelectorAll(inputSelector))
  // с помощью submitButtonSelector находим кнопку отправки формы.
  const buttonElement = formElement.querySelector(submitButtonSelector)
  // inactiveButtonClass навашивается на кнопку формы, если она неактивна.
  //   эту функцию вызываем здесь, чтобы сделать кнопку неактивной при открытии страницы.
  //   иначе кнопка будет активной до первого ввода в поля формы.
  toggleButtonState(formElement, buttonElement, inactiveButtonClass)
  // навешиваем слушатель на ввод в поля пароля
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      checkInputValidity(inputElement, { errorClass, inputErrorClass })
      toggleButtonState(formElement, buttonElement, inactiveButtonClass)
    })
  })
}

const enableValidation = (config) => {
  const { formSelector, ...props } = config
  const inputList = Array.from(document.querySelectorAll(formSelector))
  inputList.forEach((formElement) => {
    formElement.addEventListener('submit', (evt) => {
      evt.preventDefault()
    })
    // объект props передаём дальше, он будет содержать в себе все необходимые свойства
    setEventListeners(formElement, props)
  })
}
