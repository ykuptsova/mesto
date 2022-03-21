import {
  elementTemplate,
  profileName,
  profileInfo,
  profileEditButton,
  popupProfileForm,
  popupProfileInputName,
  popupProfileInputInfo,
  newCardButton,
  popupPlaceForm,
  popupPlaceSubmitButton,
  popupPlaceInputName,
  popupPlaceInputInfo,
  popupPictureImage,
  popupPictureDescription,
} from './elements.js'
import initialCards from './initial-cards.js'

import Card from './Card.js'
import Section from './Section.js'
import Popup from './Popup.js'
import FormValidator from './FormValidator.js'

// инициализируем попапы
const popupProfile = new Popup('.popup_type_profile')
const popupPlace = new Popup('.popup_type_card-add')
const popupPicture = new Popup('.popup_type_picture')
;[popupProfile, popupPlace, popupPicture].forEach((popup) => {
  popup.setEventListeners()
})

// инициализируем валидаторы
const validatorConfig = {
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-button',
  errorVisibleClass: 'popup__input-error_visible',
  inputErrorClass: 'popup__input_type_error',
  inactiveButtonClass: 'popup__save-button_disabled',
}

const addCardFormValidator = new FormValidator(validatorConfig, popupPlaceForm)
const editProfileFormValidator = new FormValidator(
  validatorConfig,
  popupProfileForm,
)

// создает новую карточку
function createCard(cardData, template, onClick) {
  return new Card(cardData, template, onClick)
}

// создает DOM-элемент карточки
function renderCard(data) {
  const card = createCard(data, elementTemplate, openPopupPicture)
  return card.render()
}

// обработчик открытия попапа на клик по карточке
function openPopupPicture(card) {
  popupPictureDescription.textContent = card.name
  popupPictureImage.setAttribute('src', card.link)
  popupPictureImage.setAttribute('alt', card.alt)
  popupPicture.open()
}

// обработчик слушателя редактирования профиля
function handleProfileSubmit(event) {
  event.preventDefault()
  profileName.textContent = popupProfileInputName.value
  profileInfo.textContent = popupProfileInputInfo.value
  popupProfile.close()
}

// создаем и рендерим секцию для карточек
const cardsSection = new Section(
  { items: initialCards, renderer: renderCard },
  '.elements__content',
)
cardsSection.render()

// добавляет новую карточку места
function addNewCard(event) {
  event.preventDefault()
  const name = popupPlaceInputName.value
  const link = popupPlaceInputInfo.value
  const alt = `${name}, Фото`

  cardsSection.addItem({ name, link, alt })

  popupPlaceForm.reset()
  addCardFormValidator.disableSubmitButton()
  popupPlace.close()
}

// добавляем слушатели открытия и закрытия попапа редактирования профиля
profileEditButton.addEventListener('click', () => {
  popupProfileInputName.value = profileName.textContent
  popupProfileInputInfo.value = profileInfo.textContent
  popupProfile.open()
})
popupProfileForm.addEventListener('submit', handleProfileSubmit)

// добавляем слушатели открытия и закрытия попапа добавления карточки
newCardButton.addEventListener('click', () => popupPlace.open())
popupPlaceForm.addEventListener('submit', addNewCard)

// запускаем валидацию форм
addCardFormValidator.enableValidation()
editProfileFormValidator.enableValidation()
