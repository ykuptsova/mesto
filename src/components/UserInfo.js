class UserInfo {
  constructor(config) {
    this.name = config.name
    this.info = config.info
  }

  // считывает данные пользователя со страницы и возвращает их в объекте
  getUserInfo() {
    return {
      name: document.querySelector(this.name).textContent,
      info: document.querySelector(this.info).textContent,
    }
  }

  // устанавливает данные формы на страницу
  setUserInfo(data) {
    const profileName = document.querySelector(this.name)
    profileName.textContent = data.get('name')
    const profileInfo = document.querySelector(this.info)
    profileInfo.textContent = data.get('info')
  }
}

export default UserInfo
