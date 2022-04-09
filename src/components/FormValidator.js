class FormValidator {
  constructor(config, formElement) {
    this._config = config
    this._formElement = formElement
    this._submitButtonElement = this._formElement.querySelector(
      this._config.submitButtonSelector,
    )
    this._inputList = Array.from(
      this._formElement.querySelectorAll(this._config.inputSelector),
    )
  }

  enableValidation() {
    this._formElement.addEventListener('submit', (evt) => {
      evt.preventDefault()
    })
    // объект props передаём дальше, он будет содержать в себе все необходимые свойства
    this._setEventListeners()
  }

  resetValidation() {
    this._toggleButtonState()
    this._clearValidationErrors()
  }

  disableSubmitButton() {
    // отключаем кнопку submit
    this._submitButtonElement.classList.add(this._config.inactiveButtonClass)
    this._submitButtonElement.disabled = true
  }

  clearForm() {
    this._clearValidationErrors()
    this._formElement.reset()
  }

  _clearValidationErrors() {
    this._inputList.forEach((inputElement) => {
      this._hideInputError(inputElement)
    })
  }

  _setEventListeners() {
    // inactiveButtonClass навешивается на кнопку формы, если она неактивна.
    //   эту функцию вызываем здесь, чтобы сделать кнопку неактивной при открытии страницы.
    //   иначе кнопка будет активной до первого ввода в поля формы.
    this._toggleButtonState()
    // навешиваем слушатель на ввод в поля пароля
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement)
        this._toggleButtonState()
      })
    })
  }

  _toggleButtonState() {
    // проверяем валидность формы
    const isFormValid = this._formElement.checkValidity()
    // если форма невалидна, то присваиваем свойству disabled кнопки значение true
    this._submitButtonElement.disabled = !isFormValid
    // если форма невалидна, добавляем кнопке класс
    this._submitButtonElement.classList.toggle(
      this._config.inactiveButtonClass,
      !isFormValid,
    )
  }

  _checkInputValidity(inputElement) {
    if (inputElement.validity.valid) {
      this._hideInputError(inputElement)
    } else {
      this._showInputError(inputElement)
    }
  }

  _hideInputError(inputElement) {
    const errorElement = inputElement.nextElementSibling
    inputElement.classList.remove(this._config.inputErrorClass)
    errorElement.classList.remove(this._config.errorVisibleClass)
    errorElement.textContent = ''
  }

  _showInputError(inputElement) {
    const errorElement = inputElement.nextElementSibling
    inputElement.classList.add(this._config.inputErrorClass)
    errorElement.classList.add(this._config.errorVisibleClass)
    errorElement.textContent = inputElement.validationMessage
  }
}

export default FormValidator
