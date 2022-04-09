import './index.css'

import {
  elementTemplate,
  profilePicButton,
  profileEditButton,
  popupProfileForm,
  newCardButton,
  popupPlaceForm,
  popupPicForm,
  popupPlaceSubmitButton,
  validatorConfig,
} from '../data/elements.js'
import api from '../components/Api.js'

import Card from '../components/Card.js'
import Section from '../components/Section.js'
import PopupWithImage from '../components/PopupWithImage.js'
import PopupWithForm from '../components/PopupWithForm.js'
import PopupWithConfirm from '../components/PopupWithConfirm.js'
import FormValidator from '../components/FormValidator.js'
import UserInfo from '../components/UserInfo.js'

const popupConfirmTrash = new PopupWithConfirm('.popup_type_confirm-trash')
popupConfirmTrash.setEventListeners()

// --- работа с данными пользователя
let userId
let cardsSection

const userInfo = new UserInfo({
  avatar: '.profile__pic',
  name: '.profile__name',
  info: '.profile__info',
})

api
  .getUserInfo()
  .then((data) => {
    userId = data._id
    userInfo.setUserInfo(data)
    profileEditButton.classList.add('profile__edit-button_enabled')
  })
  .then(() => api.getInitialCards(userId))
  .then((cards) => {
    cardsSection = new Section(
      { items: cards, renderer: renderCard },
      '.elements__content',
    )
    cardsSection.render()
  })
  .catch((error) => {
    console.log('Could not fetch user info or cards:', error)
  })

function renderCard(data) {
  const card = createCard(data, elementTemplate, openPopupPicture)
  return card.render()
}

function createCard(cardData, template, onClick) {
  return new Card(userId, cardData, template, onClick, popupConfirmTrash, api)
}

function openPopupPicture(card) {
  popupPicture.open(card)
}

// --- работа с попапами
const popupPic = new PopupWithForm('.popup_type_pic', (data) => {
  return api
    .setUserAvatar(data)
    .then((data) => {
      userInfo.setUserInfo(data)
      popupPic.close()
    })
    .catch((error) => {
      console.log('Could not not set user avatar:', error)
    })
})
const popupProfile = new PopupWithForm('.popup_type_profile', (data) => {
  if (!data) return
  return api
    .setUserInfo(data)
    .then((data) => {
      userInfo.setUserInfo(data)
      popupProfile.close()
    })
    .catch((error) => {
      console.log('Could not not set user info:', error)
    })
})
const popupPlace = new PopupWithForm('.popup_type_card-add', (data) => {
  const name = data.card_name
  const link = data.link
  return api
    .addCard({ name, link })
    .then((card) => {
      cardsSection.addItem(card)
      popupPlace.close()
    })
    .catch((error) => {
      console.log('Could not add card:', error)
    })
})
const popupPicture = new PopupWithImage('.popup_type_picture')
;[popupPic, popupProfile, popupPlace, popupPicture].forEach((popup) => {
  popup.setEventListeners()
})

profilePicButton.addEventListener('click', () => {
  formValidators['pic'].resetValidation()
  popupPic.open()
})

profileEditButton.addEventListener('click', () => {
  const data = userInfo.getUserInfo()
  formValidators['profile'].resetValidation()
  popupProfile.setInputValues(data)
  popupProfile.open()
})

newCardButton.addEventListener('click', () => {
  formValidators['card-add'].resetValidation()
  popupPlace.open()
})

// --- работа с валидаторами
const formValidators = {}
const enableValidation = (config) => {
  const formList = Array.from(document.querySelectorAll(config.formSelector))
  formList.forEach((formElement) => {
    const validator = new FormValidator(config, formElement)
    validator.enableValidation()
    const formName = formElement.getAttribute('name')
    formValidators[formName] = validator
  })
}

enableValidation(validatorConfig)
