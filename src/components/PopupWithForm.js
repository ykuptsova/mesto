import Popup from './Popup.js'

class PopupWithForm extends Popup {
  constructor(selector, submitCallback) {
    super(selector)
    this._submitCallback = submitCallback
    this._form = this._popup.querySelector('.popup__form')
    this._saveButton = this._form.querySelector('.popup__save-button')
    this._inputList = this._popup.querySelectorAll('.popup__input')
  }

  setEventListeners() {
    super.setEventListeners()
    // добавляем обработчик сабмита формы
    this._form.addEventListener('submit', (event) => {
      event.preventDefault()
      this._saveButton.textContent = 'Сохранение...'
      const data = this.getInputValues()
      this._submitCallback(data).finally(() => {
        this._saveButton.textContent = 'Сохранить'
      })
    })
  }

  getInputValues() {
    const formValues = {}
    this._inputList.forEach((input) => (formValues[input.name] = input.value))
    return formValues
  }

  setInputValues(data) {
    this._inputList.forEach((input) => {
      input.value = data[input.name]
    })
  }

  close() {
    super.close()
    this._form.reset()
  }
}

export default PopupWithForm
