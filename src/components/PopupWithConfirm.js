import Popup from './Popup.js'

class PopupWithConfirm extends Popup {
  constructor(selector) {
    super(selector)
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

  open(submitCallback) {
    this.submitCallback = submitCallback
    super.open()
  }
}

export default PopupWithConfirm
