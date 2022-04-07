import Popup from './Popup.js'

class PopupWithConfirm extends Popup {
  constructor(selector, submitCallback) {
    super(selector)
    this.submitCallback = submitCallback
    this.confirmButton = this.popup.querySelector('.popup__confirm-button')
  }

  setEventListeners() {
    super.setEventListeners()
    // добавляем обработчик сабмита формы
    this.confirmButton.addEventListener('click', () => {
      this.submitCallback()
      this.close()
    })
  }
}

export default PopupWithConfirm
