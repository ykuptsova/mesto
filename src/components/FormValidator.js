class FormValidator {
  constructor(config, formElement) {
    this.config = config
    this.formElement = formElement
    this.submitButtonElement = this.formElement.querySelector(
      this.config.submitButtonSelector,
    )
    this.inputList = Array.from(
      this.formElement.querySelectorAll(this.config.inputSelector),
    )
  }

  enableValidation() {
    this.formElement.addEventListener('submit', (evt) => {
      evt.preventDefault()
    })
    // объект props передаём дальше, он будет содержать в себе все необходимые свойства
    this._setEventListeners()
  }

  disableSubmitButton() {
    // отключаем кнопку submit
    this.submitButtonElement.classList.add(this.config.inactiveButtonClass)
  }

  clearValidationErrors() {
    this.inputList.forEach((inputElement) => {
      this._hideInputError(inputElement)
    })
  }

  _setEventListeners() {
    // inactiveButtonClass навешивается на кнопку формы, если она неактивна.
    //   эту функцию вызываем здесь, чтобы сделать кнопку неактивной при открытии страницы.
    //   иначе кнопка будет активной до первого ввода в поля формы.
    this._toggleButtonState()
    // навешиваем слушатель на ввод в поля пароля
    this.inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement)
        this._toggleButtonState()
      })
    })
  }

  _toggleButtonState() {
    // проверяем валидность формы
    const isFormValid = this.formElement.checkValidity()
    // если форма невалидна, то присваиваем свойству disabled кнопки значение true
    this.submitButtonElement.disabled = !isFormValid
    // если форма невалидна, добавляем кнопке класс
    this.submitButtonElement.classList.toggle(
      this.config.inactiveButtonClass,
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
    inputElement.classList.remove(this.config.inputErrorClass)
    errorElement.classList.remove(this.config.errorVisibleClass)
    errorElement.textContent = ''
  }

  _showInputError(inputElement) {
    const errorElement = inputElement.nextElementSibling
    inputElement.classList.add(this.config.inputErrorClass)
    errorElement.classList.add(this.config.errorVisibleClass)
    errorElement.textContent = inputElement.validationMessage
  }
}

export default FormValidator
