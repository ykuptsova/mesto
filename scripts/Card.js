class Card {
  constructor(card, template, onClick) {
    this.card = card
    this.template = template
    this.onClick = onClick
  }

  render() {
    const card = this.card

    // клонируем template карточки
    const element = this.template.content
      .querySelector('.element')
      .cloneNode(true)

    // наполняем элемент карточки данными
    element.querySelector('.element__title').textContent = card.name
    const elementImage = element.querySelector('.element__image')
    elementImage.setAttribute('src', card.link)
    elementImage.setAttribute('alt', card.alt)

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

    return element
  }

  _handleLike(evt) {
    evt.target.classList.toggle('element__heart_active')
  }

  _handleTrash(evt) {
    const element = evt.target.closest('.element')
    element.remove()
  }

  _handleClick() {
    this.onClick(this.card)
  }
}

export default Card
