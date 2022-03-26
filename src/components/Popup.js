class Popup {
  constructor(selector) {
    this.popup = document.querySelector(selector)
    this.popupCloseButton = this.popup.querySelector('.popup__close-button')
    this._handleEscClose = this._handleEscClose.bind(this)
  }

  open() {
    this.popup.classList.add('popup_opened')
    document.addEventListener('keydown', this._handleEscClose)
  }

  close() {
    this.popup.classList.remove('popup_opened')
    document.removeEventListener('keydown', this._handleEscClose)
  }

  _handleEscClose(event) {
    if (event.key === 'Escape') {
      this.close()
    }
  }

  setEventListeners() {
    // если клик был на popup-элементе а не на внутреннем контейнере -> закрываем попап
    this.popup.addEventListener('click', () => {
      if (event.target.classList.contains('popup')) {
        this.close()
      }
    })
    // добавляем слушатель закрытия попапа по клику на крестике
    this.popupCloseButton.addEventListener('click', () => this.close())
  }
}

export default Popup
