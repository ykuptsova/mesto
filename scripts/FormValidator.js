class FormValidator {
  constructor(config, formElement) {
    this.config = config
    this.formElement = formElement
  }

  enableValidation() {
    this.formElement.addEventListener('submit', (evt) => {
      evt.preventDefault()
    })
    // объект props передаём дальше, он будет содержать в себе все необходимые свойства
    this._setEventListeners()
  }

  _setEventListeners() {
    const config = this.config
    const formElement = this.formElement

    // разбиваем конфиг на составляющие, чтобы передать нужные свойства в функции
    const {
      inputSelector,
      submitButtonSelector,
      inactiveButtonClass,
      errorVisibleClass,
      inputErrorClass,
    } = config
    // inputSelector позволяет найти все поля ввода
    const inputList = Array.from(formElement.querySelectorAll(inputSelector))
    // inactiveButtonClass навашивается на кнопку формы, если она неактивна.
    //   эту функцию вызываем здесь, чтобы сделать кнопку неактивной при открытии страницы.
    //   иначе кнопка будет активной до первого ввода в поля формы.
    this._toggleButtonState()
    // навешиваем слушатель на ввод в поля пароля
    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement)
        this._toggleButtonState()
      })
    })
  }

  _toggleButtonState() {
    // с помощью submitButtonSelector находим кнопку отправки формы
    const buttonElement = this.formElement.querySelector(
      this.config.submitButtonSelector,
    )
    // проверяем валидность формы
    const isFormValid = this.formElement.checkValidity()
    // если форма невалидна, то присваиваем свойству disabled кнопки значение true
    buttonElement.disabled = !isFormValid
    // если форма невалидна, добавляем кнопке класс
    buttonElement.classList.toggle(
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
