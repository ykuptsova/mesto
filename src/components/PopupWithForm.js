import Popup from './Popup.js'

class PopupWithForm extends Popup {
  constructor(selector, submitCallback) {
    super(selector)
    this.submitCallback = submitCallback
    this.form = this.popup.querySelector('.popup__form')
  }

  setEventListeners() {
    super.setEventListeners()
    // добавляем обработчик сабмита формы
    this.form.addEventListener('submit', () => {
      event.preventDefault()
      const saveButton = this.form.querySelector('.popup__save-button')
      saveButton.textContent = 'Сохранение...'
      const data = this._getInputValues()
      this.submitCallback(data).finally(() => {
        saveButton.textContent = 'Сохранить'
        super.close()
      })
    })
  }

  _getInputValues() {
    const formValues = {}
    const inputList = this.popup.querySelectorAll('.popup__input')
    inputList.forEach((input) => (formValues[input.name] = input.value))
    return formValues

    // return new FormData(this.form)
  }
}

export default PopupWithForm
