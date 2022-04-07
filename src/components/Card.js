import api from '../data/api.js'
import PopupWithConfirm from '../components/PopupWithConfirm.js'

class Card {
  constructor(cardData, template, handleCardClick) {
    this.cardData = cardData
    this.template = template
    this.handleCardClick = handleCardClick
    this.cardTemplate = this.template.content.querySelector('.element')
  }

  render() {
    // клонируем template карточки
    const element = this.cardTemplate.cloneNode(true)

    // наполняем элемент карточки данными
    element.setAttribute('data-card-id', this.cardData._id)

    const elementTitle = element.querySelector('.element__title')
    elementTitle.textContent = this.cardData.name

    const elementImage = element.querySelector('.element__image')
    elementImage.setAttribute('src', this.cardData.link)
    elementImage.setAttribute('alt', this.cardData.alt)

    const elementTrash = element.querySelector('.element__trash')
    if (!this.cardData.owned) {
      elementTrash.remove()
    }

    // добавляем слушатели на элемент карточки
    this._setEventListeners(element)

    return element
  }

  _setEventListeners(element) {
    // добавляем слушатель like карточки
    element
      .querySelector('.element__heart')
      .addEventListener('click', (evt) => this._handleLike(evt))

    // добавляем слушатель открытия попапа с картинкой
    element
      .querySelector('.element__image')
      .addEventListener('click', (evt) => this._handleClick(evt))

    // добавляем слушатель trash карточки
    if (this.cardData.owned) {
      element
        .querySelector('.element__trash')
        .addEventListener('click', (evt) => this._handleTrash(evt))
    }
  }

  _handleLike(evt) {
    evt.target.classList.toggle('element__heart_active')
  }

  _handleTrash(evt) {
    const popupConfirmTrash = new PopupWithConfirm(
      '.popup_type_confirm-trash',
      () => {
        const element = evt.target.closest('.element')
        const id = element.getAttribute('data-card-id')
        if (!id) return
        api.deleteCard(id).then(() => {
          element.remove()
        })
      },
    )
    popupConfirmTrash.setEventListeners()
    popupConfirmTrash.open()
  }

  _handleClick() {
    this.handleCardClick(this.cardData)
  }
}

export default Card
