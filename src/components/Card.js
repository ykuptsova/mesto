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
    element.querySelector('.element__title').textContent = this.cardData.name
    const elementImage = element.querySelector('.element__image')
    elementImage.setAttribute('src', this.cardData.link)
    elementImage.setAttribute('alt', this.cardData.alt)

    // добавляем слушатели на элемент карточки
    this._setEventListeners(element)

    return element
  }

  _setEventListeners(element) {
    // добавляем слушатель like карточки
    element
      .querySelector('.element__heart')
      .addEventListener('click', (evt) => this._handleLike(evt))

    // добавляем слушатель trash карточки
    element
      .querySelector('.element__trash')
      .addEventListener('click', (evt) => this._handleTrash(evt))

    // добавляем слушатель открытия попапа с картинкой
    element
      .querySelector('.element__image')
      .addEventListener('click', (evt) => this._handleClick(evt))
  }

  _handleLike(evt) {
    evt.target.classList.toggle('element__heart_active')
  }

  _handleTrash(evt) {
    const element = evt.target.closest('.element')
    element.remove()
  }

  _handleClick() {
    this.handleCardClick(this.cardData)
  }
}

export default Card
