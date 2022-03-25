import {
  elementTemplate,
  profileEditButton,
  popupProfileForm,
  popupProfileInputName,
  popupProfileInputInfo,
  newCardButton,
  popupPlaceForm,
  popupPlaceSubmitButton,
} from './elements.js'
import initialCards from './initial-cards.js'

import Card from './Card.js'
import Section from './Section.js'
import PopupWithImage from './PopupWithImage.js'
import PopupWithForm from './PopupWithForm.js'
import FormValidator from './FormValidator.js'
import UserInfo from './UserInfo.js'

// инициализируем данные пользователя
const userInfo = new UserInfo({
  name: '.profile__name',
  info: '.profile__info',
})

// инициализируем попапы
const popupProfile = new PopupWithForm('.popup_type_profile', (data) => {
  userInfo.setUserInfo(data)
})
const popupPlace = new PopupWithForm('.popup_type_card-add', (data) => {
  const name = data.get('card_name')
  const link = data.get('link')
  const alt = `${name}, Фото`
  cardsSection.addItem({ name, link, alt })
  addCardFormValidator.disableSubmitButton()
})
const popupPicture = new PopupWithImage('.popup_type_picture')
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
  popupPicture.open(card)
}

// создаем и рендерим секцию для карточек
const cardsSection = new Section(
  { items: initialCards, renderer: renderCard },
  '.elements__content',
)
cardsSection.render()

// добавляем слушатели открытия и закрытия попапа редактирования профиля
profileEditButton.addEventListener('click', () => {
  const data = userInfo.getUserInfo()
  popupProfileInputName.value = data.name
  popupProfileInputInfo.value = data.info
  popupProfile.open()
})

// добавляем слушатели открытия и закрытия попапа добавления карточки
newCardButton.addEventListener('click', () => popupPlace.open())

// запускаем валидацию форм
addCardFormValidator.enableValidation()
editProfileFormValidator.enableValidation()
