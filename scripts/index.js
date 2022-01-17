import dom from './dom.js'
import initialCards from './initial-cards.js'
import enableValidation from './validate.js'

import Card from './Card.js'
import FormValidator from './FormValidator.js'

// добавляет новую карточку места
function addNewCard(event) {
  event.preventDefault()
  const name = dom.popupPlace.inputName.value
  const link = dom.popupPlace.inputInfo.value
  const alt = `${name}, Фото`
  const card = new Card(
    { name, link, alt },
    dom.elementTemplate,
    openPopupPicture,
  )
  const cardElement = card.render()
  dom.elementsContent.prepend(cardElement)
  dom.popupPlace.formElement.reset()
  closePopup(dom.popupPlace.popup)
}

// обработчик открытия попапа на клик по карточке
function openPopupPicture(card) {
  dom.popupPicture.description.textContent = card.name
  dom.popupPicture.image.setAttribute('src', card.link)
  dom.popupPicture.image.setAttribute('alt', card.alt)
  openPopup(dom.popupPicture.popup)
}

// обработчик слушателя редактирования профиля
function handleProfileSubmit(event) {
  event.preventDefault()
  dom.profileName.textContent = dom.popupProfile.inputName.value
  dom.profileInfo.textContent = dom.popupProfile.inputInfo.value
  closePopup(dom.popupProfile.popup)
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
  const card = new Card(data, dom.elementTemplate, openPopupPicture)
  const cardElement = card.render()
  dom.elementsContent.append(cardElement)
})

// добавляем слушатели открытия и закрытия попапа редактирования профиля
dom.profileEditButton.addEventListener('click', () => {
  dom.popupProfile.inputName.value = dom.profileName.textContent
  dom.popupProfile.inputInfo.value = dom.profileInfo.textContent
  openPopup(dom.popupProfile.popup)
})
dom.popupProfile.closeButton.addEventListener('click', () =>
  closePopup(dom.popupProfile.popup),
)
dom.popupProfile.formElement.addEventListener('submit', handleProfileSubmit)

// добавляем слушатели открытия и закрытия попапа добавления карточки
dom.newCardButton.addEventListener('click', () =>
  openPopup(dom.popupPlace.popup),
)
dom.popupPlace.closeButton.addEventListener('click', () =>
  closePopup(dom.popupPlace.popup),
)
dom.popupPlace.formElement.addEventListener('submit', addNewCard)

// добавляем слушатели закрытия попапа с полноэкранной картинкой
dom.popupPicture.closeButton.addEventListener('click', () => {
  closePopup(dom.popupPicture.popup)
})

// добавляем слушатель закрытия попапа по клику на overlay
const popups = [
  dom.popupProfile.popup,
  dom.popupPlace.popup,
  dom.popupPicture.popup,
]
popups.forEach((popup) => {
  popup.addEventListener('click', (event) => {
    // если клик был на popup-элементе а не на внутреннем контейнере -> закрываем попап
    if (event.target.classList.contains('popup')) {
      closePopup(popup)
    }
  })
})

// запускаем валидацию форм
enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-button',
  errorVisibleClass: 'popup__input-error_visible',
  inputErrorClass: 'popup__input_type_error',
  inactiveButtonClass: 'popup__save-button_disabled',
})
