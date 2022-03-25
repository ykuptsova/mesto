import Popup from './Popup.js'

class PopupWithImage extends Popup {
  open(card) {
    const popup = document.querySelector(this.selector)
    const description = popup.querySelector('.popup__image-description')
    const image = popup.querySelector('.popup__image')

    description.textContent = card.name
    image.setAttribute('src', card.link)
    image.setAttribute('alt', card.alt)

    super.open()
  }
}

export default PopupWithImage
