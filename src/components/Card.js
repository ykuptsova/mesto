import api from '../data/api.js'
import PopupWithConfirm from '../components/PopupWithConfirm.js'

const popupConfirmTrash = new PopupWithConfirm('.popup_type_confirm-trash')
popupConfirmTrash.setEventListeners()

class Card {
  constructor(userId, cardData, template, handleCardClick) {
    this.userId = userId
    this.cardData = cardData
    this.template = template
    this.handleCardClick = handleCardClick
    this.cardTemplate = this.template.content.querySelector('.element')
    this.element = null
  }

  render() {
    // клонируем template карточки
    const isCreated = Boolean(this.element)
    if (!isCreated) {
      this.element = this.cardTemplate.cloneNode(true)
    }

    // наполняем элемент карточки данными
    this.element.setAttribute('data-card-id', this.cardData._id)

    const elementTitle = this.element.querySelector('.element__title')
    elementTitle.textContent = this.cardData.name

    const elementImage = this.element.querySelector('.element__image')
    elementImage.setAttribute('src', this.cardData.link)
    elementImage.setAttribute('alt', this.cardData.alt)

    const elementHeart = this.element.querySelector('.element__heart')
    if (this.cardData.liked) {
      elementHeart.classList.add('element__heart_active')
    } else {
      elementHeart.classList.remove('element__heart_active')
    }

    const elementLikeCounter = this.element.querySelector(
      '.element__like_counter',
    )
    elementLikeCounter.textContent = this.cardData.likes

    const elementTrash = this.element.querySelector('.element__trash')
    if (this.cardData.owned) {
      elementTrash.classList.add('element__trash_active')
    } else {
      elementTrash.classList.remove('element__trash_active')
    }

    // добавляем слушатели на элемент карточки
    if (!isCreated) {
      this._setEventListeners(this.element)
    }

    return this.element
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
    if (this.cardData.liked) {
      api.unlikeCard(this.cardData._id, this.userId).then((card) => {
        if (!card) return
        this.cardData = card
        this.render()
      })
    } else {
      api.likeCard(this.cardData._id, this.userId).then((card) => {
        if (!card) return
        this.cardData = card
        this.render()
      })
    }
  }

  _handleTrash(evt) {
    const element = evt.target.closest('.element')
    const id = element.getAttribute('data-card-id')
    if (!id) return

    popupConfirmTrash.open(() => {
      api.deleteCard(id).then(() => {
        element.remove()
      })
    })
  }

  _handleClick() {
    this.handleCardClick(this.cardData)
  }
}

export default Card
