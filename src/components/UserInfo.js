class UserInfo {
  constructor(config) {
    this.avatar = document.querySelector(config.avatar)
    this.name = document.querySelector(config.name)
    this.info = document.querySelector(config.info)
    this.editButton = document.querySelector(config.editButton)
  }

  // считывает данные пользователя со страницы и возвращает их в объекте
  getUserInfo() {
    return {
      avatar: this.avatar.getAttribute('src'),
      name: this.name.textContent,
      info: this.info.textContent,
    }
  }

  // устанавливает данные формы на страницу
  setUserInfo(data) {
    if (data.avatar) {
      this.avatar.setAttribute('src', data.avatar)
    }
    this.name.textContent = data.name
    this.info.textContent = data.info
  }

  // разрешает редактирование профиля пользователя
  enableEdit() {
    this.editButton.classList.add('profile__edit-button_enabled')
  }
}

export default UserInfo
