class Popup {
  constructor(selector) {
    this.selector = selector
    this._handleEscClose = this._handleEscClose.bind(this)
  }

  open() {
    const popup = document.querySelector(this.selector)
    popup.classList.add('popup_opened')
    document.addEventListener('keydown', this._handleEscClose)
  }

  close() {
    const popup = document.querySelector(this.selector)
    popup.classList.remove('popup_opened')
    document.removeEventListener('keydown', this._handleEscClose)
  }

  _handleEscClose(event) {
    if (event.key === 'Escape') {
      this.close()
    }
  }

  setEventListeners() {
    const popup = document.querySelector(this.selector)
    // если клик был на popup-элементе а не на внутреннем контейнере -> закрываем попап
    popup.addEventListener('click', () => {
      if (event.target.classList.contains('popup')) {
        this.close()
      }
    })
    // добавляем слушатель закрытия попапа по клику на крестике
    const popupCloseButton = popup.querySelector('.popup__close-button')
    popupCloseButton.addEventListener('click', () => this.close())
  }
}

export default Popup
