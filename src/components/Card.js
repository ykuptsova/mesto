class Card {
  constructor(
    userId,
    cardData,
    template,
    handleCardClick,
    popupConfirmTrash,
    api,
  ) {
    this._userId = userId
    this._cardData = cardData
    this._template = template
    this._handleCardClick = handleCardClick
    this._popupConfirmTrash = popupConfirmTrash
    this._api = api

    this._element = null
  }

  render() {
    // клонируем template карточки
    const cardTemplate = this._template.content.querySelector('.element')
    this._element = cardTemplate.cloneNode(true)

    // наполняем элемент карточки данными
    this._element.setAttribute('data-card-id', this._cardData._id)

    this._title = this._element.querySelector('.element__title')
    this._title.textContent = this._cardData.name

    this._image = this._element.querySelector('.element__image')
    this._image.setAttribute('src', this._cardData.link)
    this._image.setAttribute('alt', this._cardData.alt)

    this._heart = this._element.querySelector('.element__heart')
    this._likeCounter = this._element.querySelector('.element__like_counter')
    this._updateLikeState()

    this._trash = this._element.querySelector('.element__trash')
    this._updateTrashState()

    // добавляем слушатели на элемент карточки
    this._setEventListeners()

    return this._element
  }

  _updateLikeState() {
    this._likeCounter.textContent = this._cardData.likes
    if (this._cardData.liked) {
      this._heart.classList.add('element__heart_active')
    } else {
      this._heart.classList.remove('element__heart_active')
    }
  }

  _updateTrashState() {
    if (this._cardData.owned) {
      this._trash.classList.add('element__trash_active')
    } else {
      this._trash.classList.remove('element__trash_active')
    }
  }

  _setEventListeners() {
    // добавляем слушатель like карточки
    this._element
      .querySelector('.element__heart')
      .addEventListener('click', () => this._handleLike())

    // добавляем слушатель открытия попапа с картинкой
    this._element
      .querySelector('.element__image')
      .addEventListener('click', () => this._handleClick())

    // добавляем слушатель trash карточки
    if (this._cardData.owned) {
      this._element
        .querySelector('.element__trash')
        .addEventListener('click', () => this._handleTrash())
    }
  }

  _handleLike() {
    const request = this._cardData.liked
      ? this._api.unlikeCard(this._cardData._id, this._userId)
      : this._api.likeCard(this._cardData._id, this._userId)
    request
      .then((card) => {
        if (!card) return
        this._cardData = card
        this._updateLikeState()
      })
      .catch((error) => {
        console.log('Could not like / unlike card:', error)
      })
  }

  _handleTrash() {
    const id = this._cardData._id
    if (!id) return

    this._popupConfirmTrash.open(() => {
      this._api
        .deleteCard(id)
        .then(() => {
          this._element.remove()
          this._popupConfirmTrash.close()
        })
        .catch((error) => {
          console.log('Could not delete card:', error)
        })
    })
  }

  _handleClick() {
    this._handleCardClick(this._cardData)
  }
}

export default Card
