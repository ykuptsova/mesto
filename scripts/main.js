const popup = document.querySelector('.popup')
const popupCloseButton = document.querySelector('.popup__close-button')
const formElement = document.querySelector('.popup__form')
const popupName = document.querySelector('.popup__name')
const popupInfo = document.querySelector('.popup__info')
const profileEditButton = document.querySelector('.profile__edit-button')
const profileName = document.querySelector('.profile__name')
const profileInfo = document.querySelector('.profile__info')


let name = profileName.textContent
let info = profileInfo.textContent


profileEditButton.addEventListener('click', function () {
  popupName.value = name
  popupInfo.value = info
  popup.classList.add('popup_opened')
})

popupCloseButton.addEventListener('click', function () {
  popup.classList.remove('popup_opened')
})

formElement.addEventListener('submit', function (event) {
  event.preventDefault()
  profileName.textContent = name = popupName.value
  profileInfo.textContent = info = popupInfo.value
  popup.classList.remove('popup_opened')
})