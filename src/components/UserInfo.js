class UserInfo {
  constructor(config) {
    this._id = null
    this._name = null
    this._info = null
    this._avatar = null

    this._avatarElement = document.querySelector(config.avatar)
    this._nameElement = document.querySelector(config.name)
    this._infoElement = document.querySelector(config.info)
  }

  // считывает данные пользователя со страницы и возвращает их в объекте
  getUserInfo() {
    return {
      _id: this._id,
      name: this._nameElement.textContent,
      info: this._infoElement.textContent,
      avatar: this._avatarElement.getAttribute('src'),
    }
  }

  // устанавливает данные формы на страницу
  setUserInfo({ _id, name, info, avatar }) {
    this._id = _id
    this._name = name
    this._info = info
    this._avatar = avatar

    this._nameElement.textContent = name
    this._infoElement.textContent = info
    if (avatar) {
      this._avatarElement.setAttribute('src', avatar)
    }
  }
}

export default UserInfo
