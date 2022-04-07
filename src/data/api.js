class Api {
  constructor(options) {
    this.options = options
  }

  // --- работа с профилем пользователя
  getUserInfo() {
    return fetch(this._url('users/me'), this._init())
      .then(this._handleResponse)
      .then((userInfo) => ({
        _id: userInfo._id,
        name: userInfo.name,
        info: userInfo.about,
        avatar: userInfo.avatar,
      }))
      .catch(this._handleError)
  }

  setUserInfo(data) {
    const config = {
      method: 'PATCH',
      body: JSON.stringify({
        name: data.name,
        about: data.info,
      }),
    }
    return fetch(this._url('users/me'), this._init(config))
      .then(this._handleResponse)
      .then((userInfo) => ({
        _id: userInfo._id,
        name: userInfo.name,
        info: userInfo.about,
        avatar: userInfo.avatar,
      }))
      .catch(this._handleError)
  }

  // --- работа с карточками
  getInitialCards(userId) {
    return fetch(this._url('cards'), this._init())
      .then(this._handleResponse)
      .then((cards) =>
        cards.map((card) => ({
          _id: card._id,
          name: card.name,
          link: card.link,
          alt: `${card.name} by ${card.owner.name}`,
          owned: card.owner._id === userId,
        })),
      )
      .catch(this._handleError)
  }

  addCard(data) {
    const config = {
      method: 'POST',
      body: JSON.stringify({
        name: data.name,
        link: data.link,
      }),
    }
    return fetch(this._url('cards'), this._init(config))
      .then(this._handleResponse)
      .then((card) => ({
        _id: card._id,
        name: card.name,
        link: card.link,
        alt: `${card.name} by ${card.owner.name}`,
        owned: true,
      }))
      .catch(this._handleError)
  }

  deleteCard(id) {
    const config = {
      method: 'DELETE',
    }
    return fetch(this._url(`cards/${id}`), this._init(config))
      .then(this._handleResponse)
      .catch(this._handleError)
  }

  // --- вспомогательные приватные методы
  _url(path) {
    return `${this.options.baseUrl}/${path}`
  }

  _init(config) {
    return {
      headers: this.options.headers,
      ...config,
    }
  }

  _handleResponse(res) {
    if (res.ok) return res.json()
    return Promise.reject(`Ошибка: ${res.status}`)
  }

  _handleError(err) {
    console.error(err)
  }
}

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-38',
  headers: {
    authorization: 'aa3d044d-2678-4a15-accd-c1c94db4c73c',
    'Content-Type': 'application/json',
  },
})

export default api
