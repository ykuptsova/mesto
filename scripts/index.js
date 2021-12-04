// обработчик слушателя like карточки
function handleLike(evt) {
  evt.target.classList.toggle('element__heart_active')
}

// обработчик слушателя trash карточки
function handleTrash(evt) {
  const element = evt.target.closest('.element')
  element.remove()
}

// обработчик слушателя редактирования профиля
function handleProfileSubmit(event) {
  event.preventDefault()
  dom.profileName.textContent = dom.popupProfile.inputName.value
  dom.profileInfo.textContent = dom.popupProfile.inputInfo.value
  closePopup(dom.popupProfile.popup)
}

// создает элемент для заданной карточки
function createCard(card) {
  // клонируем template карточки
  const element = dom.elementTemplate.content
    .querySelector('.element')
    .cloneNode(true)

  // наполняем элемент карточки данными
  element.querySelector('.element__title').textContent = card.name
  const elementImage = element.querySelector('.element__image')
  elementImage.setAttribute('src', card.link)
  elementImage.setAttribute('alt', card.alt)

  // добавляем слушатель like карточки
  element.querySelector('.element__heart').addEventListener('click', handleLike)

  // добавляем слушатель trash карточки
  element
    .querySelector('.element__trash')
    .addEventListener('click', handleTrash)

  // добавляем слушатель открытия попапа с картинкой
  element.querySelector('.element__image').addEventListener('click', () => {
    dom.popupPicture.description.textContent = card.name
    dom.popupPicture.image.setAttribute('src', card.link)
    dom.popupPicture.image.setAttribute('alt', card.alt)
    openPopup(dom.popupPicture.popup)
  })

  return element
}

// добавляет новую карточку места
function addNewCard(event) {
  event.preventDefault()
  const name = dom.popupPlace.inputName.value
  const link = dom.popupPlace.inputInfo.value
  const alt = `${name}, Фото`
  const cardElement = createCard({ name, link, alt })
  dom.elementsContent.prepend(cardElement)
  dom.popupPlace.formElement.reset()
  closePopup(dom.popupPlace.popup)
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
initialCards.forEach((card) => {
  const cardElement = createCard(card)
  dom.elementsContent.append(cardElement)
})

// добавляем слушатели открытия и закрытия попапа редактирования профиля
dom.profileEditButton.addEventListener('click', () =>
  openPopup(dom.popupProfile.popup),
)
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

// пред-заполняет формы данными и включает валидацию
function initForms() {
  dom.popupProfile.inputName.value = dom.profileName.textContent
  dom.popupProfile.inputInfo.value = dom.profileInfo.textContent

  const validationClasses = {
    fieldSelector: '.popup__form-field',
    errorSelector: '.popup__input-error',
    errorVisibleClass: 'popup__input-error_visible',
    inputErrorClass: 'popup__input_type_error',
    inactiveButtonClass: 'popup__save-button_disabled',
  }

  // валидация полей редактирования профиля
  enableValidation({
    formSelector: '.popup_type_profile .popup__form',
    inputSelector: '.popup_type_profile .popup__input_type_name',
    submitButtonSelector: '.popup_type_profile .popup__save-button',
    ...validationClasses,
  })

  enableValidation({
    formSelector: '.popup_type_profile .popup__form',
    inputSelector: '.popup_type_profile .popup__input_type_info',
    submitButtonSelector: '.popup_type_profile .popup__save-button',
    ...validationClasses,
  })

  // валидация полей добавления карточки
  enableValidation({
    formSelector: '.popup_type_card-add .popup__form',
    inputSelector: '.popup_type_card-add .popup__input_type_name',
    submitButtonSelector: '.popup_type_card-add .popup__save-button',
    ...validationClasses,
  })

  enableValidation({
    formSelector: '.popup_type_card-add .popup__form',
    inputSelector: '.popup_type_card-add .popup__input_type_info',
    submitButtonSelector: '.popup_type_card-add .popup__save-button',
    ...validationClasses,
  })
}

initForms()
