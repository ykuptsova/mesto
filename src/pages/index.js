import './index.css'

import {
  elementTemplate,
  profilePicButton,
  profileEditButton,
  popupPicInputAvatar,
  popupProfileForm,
  popupProfileInputName,
  popupProfileInputInfo,
  newCardButton,
  popupPlaceForm,
  popupPicForm,
  popupPlaceSubmitButton,
} from '../data/elements.js'
import api from '../data/api.js'

import Card from '../components/Card.js'
import Section from '../components/Section.js'
import PopupWithImage from '../components/PopupWithImage.js'
import PopupWithForm from '../components/PopupWithForm.js'
import FormValidator from '../components/FormValidator.js'
import UserInfo from '../components/UserInfo.js'

// --- работа с данными пользователя
let userId
let cardsSection

const userInfo = new UserInfo({
  avatar: '.profile__pic',
  name: '.profile__name',
  info: '.profile__info',
  editButton: '.profile__edit-button',
})

api
  .getUserInfo()
  .then((data) => {
    userId = data._id
    userInfo.setUserInfo(data)
    userInfo.enableEdit()
  })
  .then(() => api.getInitialCards(userId))
  .then((cards) => {
    cardsSection = new Section(
      { items: cards, renderer: renderCard },
      '.elements__content',
    )
    cardsSection.render()
  })

function renderCard(data) {
  const card = createCard(data, elementTemplate, openPopupPicture)
  return card.render()
}

function createCard(cardData, template, onClick) {
  return new Card(userId, cardData, template, onClick)
}

function openPopupPicture(card) {
  popupPicture.open(card)
}

// --- работа с попапами
const popupPic = new PopupWithForm('.popup_type_pic', (data) => {
  return api.setUserAvatar(data).then((data) => {
    if (!data) return
    userInfo.setUserInfo(data)
  })
})
const popupProfile = new PopupWithForm('.popup_type_profile', (data) => {
  if (!data) return
  return api.setUserInfo(data).then((data) => userInfo.setUserInfo(data))
})
const popupPlace = new PopupWithForm('.popup_type_card-add', (data) => {
  const name = data.card_name
  const link = data.link
  addCardFormValidator.disableSubmitButton()
  return api.addCard({ name, link }).then((card) => {
    addCardFormValidator.clearForm()
    if (!card) return
    cardsSection.addItem(card)
  })
})
const popupPicture = new PopupWithImage('.popup_type_picture')
;[popupPic, popupProfile, popupPlace, popupPicture].forEach((popup) => {
  popup.setEventListeners()
})

profilePicButton.addEventListener('click', () => {
  const data = userInfo.getUserInfo()
  popupPicInputAvatar.value = data.avatar
  // editProfileFormValidator.clearValidationErrors()
  popupPic.open()
})

profileEditButton.addEventListener('click', () => {
  const data = userInfo.getUserInfo()
  popupProfileInputName.value = data.name
  popupProfileInputInfo.value = data.info
  editProfileFormValidator.clearValidationErrors()
  popupProfile.open()
})

newCardButton.addEventListener('click', () => {
  addCardFormValidator.clearValidationErrors()
  popupPlace.open()
})

// --- работа с валидаторами
const validatorConfig = {
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-button',
  errorVisibleClass: 'popup__input-error_visible',
  inputErrorClass: 'popup__input_type_error',
  inactiveButtonClass: 'popup__save-button_disabled',
}
const addCardFormValidator = new FormValidator(validatorConfig, popupPlaceForm)
const editAvatarFormValidator = new FormValidator(validatorConfig, popupPicForm)
const editProfileFormValidator = new FormValidator(
  validatorConfig,
  popupProfileForm,
)

addCardFormValidator.enableValidation()
editAvatarFormValidator.enableValidation()
editProfileFormValidator.enableValidation()
