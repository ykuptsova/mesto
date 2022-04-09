class Popup {
  constructor(selector) {
    this._popup = document.querySelector(selector)
    this._popupCloseButton = this._popup.querySelector('.popup__close-button')
    this._handleEscClose = this._handleEscClose.bind(this)
    setTimeout(() => this._popup.classList.add('popup_initialized'))
  }

  open() {
    this._popup.classList.add('popup_opened')
    document.addEventListener('keydown', this._handleEscClose)
  }

  close() {
    this._popup.classList.remove('popup_opened')
    document.removeEventListener('keydown', this._handleEscClose)
  }

  _handleEscClose(event) {
    if (event.key === 'Escape') {
      this.close()
    }
  }

  setEventListeners() {
    // если клик был на popup-элементе а не на внутреннем контейнере -> закрываем попап
    this._popup.addEventListener('click', (event) => {
      if (event.target.classList.contains('popup')) {
        this.close()
      }
    })
    // добавляем слушатель закрытия попапа по клику на крестике
    this._popupCloseButton.addEventListener('click', () => this.close())
  }
}

export default Popup
