import Popup from './Popup.js'

class PopupWithImage extends Popup {
  constructor(selector) {
    super(selector)
    this._description = this._popup.querySelector('.popup__image-description')
    this._image = this._popup.querySelector('.popup__image')
  }

  open(card) {
    this._description.textContent = card.name
    this._image.setAttribute('src', card.link)
    this._image.setAttribute('alt', card.alt)

    super.open()
  }
}

export default PopupWithImage
