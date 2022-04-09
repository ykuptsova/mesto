import Popup from './Popup.js'

class PopupWithConfirm extends Popup {
  constructor(selector) {
    super(selector)
    this._confirmButton = this._popup.querySelector('.popup__confirm-button')
  }

  setEventListeners() {
    super.setEventListeners()
    // добавляем обработчик сабмита формы
    this._confirmButton.addEventListener('click', () => {
      this._submitCallback()
    })
  }

  open(submitCallback) {
    this._submitCallback = submitCallback
    super.open()
  }
}

export default PopupWithConfirm
