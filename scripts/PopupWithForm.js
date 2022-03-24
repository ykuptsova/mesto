import Popup from './Popup.js'

class PopupWithForm extends Popup {
  constructor(selector, submitCallback) {
    super(selector)
    this.submitCallback = submitCallback
  }

  getForm() {
    return document.querySelector(this.selector).querySelector('.popup__form')
  }

  setEventListeners() {
    super.setEventListeners()
    // добавляем обработчик сабмита формы
    this.getForm().addEventListener('submit', () => {
      event.preventDefault()
      const data = this._getInputValues()
      this.submitCallback(data)
      super.close()
    })
  }

  close() {
    super.close()
    // сбрасываем форму
    this.getForm().reset()
  }

  _getInputValues() {
    return new FormData(this.getForm())
  }
}

export default PopupWithForm
