import dom from './dom.js'
import initialCards from './initial-cards.js'

import Card from './Card.js'
import FormValidator from './FormValidator.js'

const {
  popupPlace,
  popupProfile,
  elementsContent,
  popupPicture,
  profileName,
  profileInfo,
  elementTemplate,
  profileEditButton,
  newCardButton,
} = dom

// создает новую карточку
function createCard(cardData, template, onClick) {
  return new Card(cardData, template, onClick)
}

// добавляет новую карточку места
function addNewCard(event) {
  event.preventDefault()
  const name = popupPlace.inputName.value
  const link = popupPlace.inputInfo.value
  const alt = `${name}, Фото`
  const card = createCard(
    { name, link, alt },
    elementTemplate,
    openPopupPicture,
  )
  const cardElement = card.render()
  elementsContent.prepend(cardElement)
  popupPlace.formElement.reset()
  popupPlace.submitButton.classList.add('popup__save-button_disabled')
  closePopup(popupPlace.popup)
}

// обработчик открытия попапа на клик по карточке
function openPopupPicture(card) {
  popupPicture.description.textContent = card.name
  popupPicture.image.setAttribute('src', card.link)
  popupPicture.image.setAttribute('alt', card.alt)
  openPopup(popupPicture.popup)
}

// обработчик слушателя редактирования профиля
function handleProfileSubmit(event) {
  event.preventDefault()
  profileName.textContent = popupProfile.inputName.value
  profileInfo.textContent = popupProfile.inputInfo.value
  closePopup(popupProfile.popup)
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
  popupProfile.inputName.value = profileName.textContent
  popupProfile.inputInfo.value = profileInfo.textContent
  openPopup(popupProfile.popup)
})
popupProfile.closeButton.addEventListener('click', () =>
  closePopup(popupProfile.popup),
)
popupProfile.formElement.addEventListener('submit', handleProfileSubmit)

// добавляем слушатели открытия и закрытия попапа добавления карточки
newCardButton.addEventListener('click', () => openPopup(popupPlace.popup))
popupPlace.closeButton.addEventListener('click', () =>
  closePopup(popupPlace.popup),
)
popupPlace.formElement.addEventListener('submit', addNewCard)

// добавляем слушатели закрытия попапа с полноэкранной картинкой
popupPicture.closeButton.addEventListener('click', () => {
  closePopup(popupPicture.popup)
})

// добавляем слушатель закрытия попапа по клику на overlay
const popups = [popupProfile.popup, popupPlace.popup, popupPicture.popup]
popups.forEach((popup) => {
  popup.addEventListener('click', (event) => {
    // если клик был на popup-элементе а не на внутреннем контейнере -> закрываем попап
    if (event.target.classList.contains('popup')) {
      closePopup(popup)
    }
  })
})

// запускаем валидацию форм
const validatorConfig = {
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-button',
  errorVisibleClass: 'popup__input-error_visible',
  inputErrorClass: 'popup__input_type_error',
  inactiveButtonClass: 'popup__save-button_disabled',
}

const addCardFormValidator = new FormValidator(
  validatorConfig,
  document.querySelector('.popup__form[name="card-add"]'),
)
addCardFormValidator.enableValidation()

const editProfileFormValidator = new FormValidator(
  validatorConfig,
  document.querySelector('.popup__form[name="profile"]'),
)
editProfileFormValidator.enableValidation()
