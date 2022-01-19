import {
  elementTemplate,
  elementsContent,
  profileName,
  profileInfo,
  profileEditButton,
  popupProfile,
  popupProfileForm,
  popupProfileSubmitButton,
  popupProfileCloseButton,
  popupProfileInputName,
  popupProfileInputInfo,
  newCardButton,
  popupPlace,
  popupPlaceForm,
  popupPlaceSubmitButton,
  popupPlaceCloseButton,
  popupPlaceInputName,
  popupPlaceInputInfo,
  popupPicture,
  popupPictureImage,
  popupPictureDescription,
  popupPictureCloseButton,
} from './elements.js'
import initialCards from './initial-cards.js'

import Card from './Card.js'
import FormValidator from './FormValidator.js'

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

// добавляет новую карточку места
function addNewCard(event) {
  event.preventDefault()
  const name = popupPlaceInputName.value
  const link = popupPlaceInputInfo.value
  const alt = `${name}, Фото`
  const card = createCard(
    { name, link, alt },
    elementTemplate,
    openPopupPicture,
  )
  const cardElement = card.render()
  elementsContent.prepend(cardElement)
  popupPlaceForm.reset()
  addCardFormValidator.disableSubmitButton()
  closePopup(popupPlace)
}

// обработчик открытия попапа на клик по карточке
function openPopupPicture(card) {
  popupPictureDescription.textContent = card.name
  popupPictureImage.setAttribute('src', card.link)
  popupPictureImage.setAttribute('alt', card.alt)
  openPopup(popupPicture)
}

// обработчик слушателя редактирования профиля
function handleProfileSubmit(event) {
  event.preventDefault()
  profileName.textContent = popupProfileInputName.value
  profileInfo.textContent = popupProfileInputInfo.value
  closePopup(popupProfile)
}

// слушатель закрытия попапов на нажатие Esc
function closePopupOnEscape(event) {
  if (event.key !== 'Escape') return
  // находим открытый popup
  const openedPopup = document.querySelector('.popup_opened')
  if (openedPopup) {
    closePopup(openedPopup)
  }
}

// открывает попап
function openPopup(popup) {
  popup.classList.add('popup_opened')
  document.addEventListener('keydown', closePopupOnEscape)
}

// закрывает заданный попап с транзицией
function closePopup(popup) {
  popup.classList.remove('popup_opened')
  document.removeEventListener('keydown', closePopupOnEscape)
}

// создаем все карточки на старте
initialCards.forEach((data) => {
  const card = createCard(data, elementTemplate, openPopupPicture)
  const cardElement = card.render()
  elementsContent.append(cardElement)
})

// добавляем слушатели открытия и закрытия попапа редактирования профиля
profileEditButton.addEventListener('click', () => {
  popupProfileInputName.value = profileName.textContent
  popupProfileInputInfo.value = profileInfo.textContent
  openPopup(popupProfile)
})
popupProfileCloseButton.addEventListener('click', () =>
  closePopup(popupProfile),
)
popupProfileForm.addEventListener('submit', handleProfileSubmit)

// добавляем слушатели открытия и закрытия попапа добавления карточки
newCardButton.addEventListener('click', () => openPopup(popupPlace))
popupPlaceCloseButton.addEventListener('click', () => closePopup(popupPlace))
popupPlaceForm.addEventListener('submit', addNewCard)

// добавляем слушатели закрытия попапа с полноэкранной картинкой
popupPictureCloseButton.addEventListener('click', () => {
  closePopup(popupPicture)
})

// добавляем слушатель закрытия попапа по клику на overlay
const popups = [popupProfile, popupPlace, popupPicture]
popups.forEach((popup) => {
  popup.addEventListener('click', (event) => {
    // если клик был на popup-элементе а не на внутреннем контейнере -> закрываем попап
    if (event.target.classList.contains('popup')) {
      closePopup(popup)
    }
  })
})

// запускаем валидацию форм
addCardFormValidator.enableValidation()
editProfileFormValidator.enableValidation()
