class UserInfo {
  constructor(config) {
    this.name = document.querySelector(config.name)
    this.info = document.querySelector(config.info)
  }

  // считывает данные пользователя со страницы и возвращает их в объекте
  getUserInfo() {
    return {
      name: this.name.textContent,
      info: this.info.textContent,
    }
  }

  // устанавливает данные формы на страницу
  setUserInfo(data) {
    this.name.textContent = data.name
    this.info.textContent = data.info
  }
}

export default UserInfo
