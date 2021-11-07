const popup = document.querySelector('.popup')
const popupCloseButton = document.querySelector('.popup__close-button')
const popupSaveButton = document.querySelector('.popup__save-button')
const popupName = document.querySelector('.popup__name')
const popupInfo = document.querySelector('.popup__info')
const profileEditButton = document.querySelector('.profile__edit-button')
const profileName = document.querySelector('.profile__name')
const profileInfo = document.querySelector('.profile__info')


let name = 'Хвост'
let info = 'Путешественник'
profileName.textContent = name
profileInfo.textContent = info


profileEditButton.addEventListener('click', function () {
  popupName.value = name
  popupInfo.value = info
  popup.classList.add('popup_opened')
})

popupCloseButton.addEventListener('click', function () {
  popup.classList.remove('popup_opened')
})

popupSaveButton.addEventListener('click', function () {
  profileName.textContent = name = popupName.value
  profileInfo.textContent = info = popupInfo.value
  popup.classList.remove('popup_opened')
})