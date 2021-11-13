const popup = document.querySelector('.popup')
const popupCloseButton = document.querySelector('.popup__close-button')
const formElement = document.querySelector('.popup__form')
const inputName = formElement.querySelector('.popup__input_type_name')
const inputInfo = formElement.querySelector('.popup__input_type_info')
const profileEditButton = document.querySelector('.profile__edit-button')
const profileName = document.querySelector('.profile__name')
const profileInfo = document.querySelector('.profile__info')


function openPopup () {
  inputName.value = profileName.textContent
  inputInfo.value = profileInfo.textContent
  popup.classList.add('popup_opened')
}


function closePopup () {
  popup.classList.remove('popup_opened')
}


function editProfile () {
  event.preventDefault()
  profileName.textContent = inputName.value
  profileInfo.textContent = inputInfo.value
  popup.classList.remove('popup_opened')
}


profileEditButton.addEventListener('click', openPopup)
popupCloseButton.addEventListener('click', closePopup)
formElement.addEventListener('submit', editProfile)