import Popup from './Popup.js'

class PopupWithImage extends Popup {
  constructor(selector) {
    super(selector)
    this.description = this.popup.querySelector('.popup__image-description')
    this.image = this.popup.querySelector('.popup__image')
  }

  open(card) {
    this.description.textContent = card.name
    this.image.setAttribute('src', card.link)
    this.image.setAttribute('alt', card.alt)

    super.open()
  }
}

export default PopupWithImage
