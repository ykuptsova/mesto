// определяем все DOM-элементы в одной константе для удобства доступа
const dom = {
  elementTemplate: document.querySelector('.element__template'),
  elementsContent: document.querySelector('.elements__content'),

  profileName: document.querySelector('.profile__name'),
  profileInfo: document.querySelector('.profile__info'),

  profileEditButton: document.querySelector('.profile__edit-button'),
  popupProfile: {
    popup: document.querySelector('.popup_type_profile'),
    closeButton: document.querySelector('.popup_type_profile .popup__close-button'),
    formElement: document.querySelector('.popup_type_profile .popup__form'),
    inputName: document.querySelector('.popup_type_profile .popup__form .popup__input_type_name'),
    inputInfo: document.querySelector('.popup_type_profile .popup__form .popup__input_type_info'),    
  },

  newCardButton: document.querySelector('.profile__new-card-button'),
  popupPlace: {
    popup: document.querySelector('.popup_type_card-add'),
    closeButton: document.querySelector('.popup_type_card-add .popup__close-button'),
    formElement: document.querySelector('.popup_type_card-add .popup__form'),
    inputName: document.querySelector('.popup_type_card-add .popup__form .popup__input_type_name'),
    inputInfo: document.querySelector('.popup_type_card-add .popup__form .popup__input_type_info'),    
  },

  popupPicture: {
    popup: document.querySelector('.popup_type_picture'),
    image: document.querySelector('.popup_type_picture .popup__image'),
    description: document.querySelector('.popup_type_picture .popup__image-description'),
    closeButton: document.querySelector('.popup_type_picture .popup__close-button'), 
  },
}


// обработчик слушателя like карточки
function handleLike (evt) {
  evt.target.classList.toggle('element__heart_active');
}


// обработчик слушателя trash карточки
function handleTrash (evt) {
  const element = evt.target.closest('.element')
  element.parentElement.removeChild(element)
  // element.closest('.elements__content').removeChild(element)
}


// создает элемент для заданной карточки
function createCard (card) {
  // клонируем template карточки
  const element = dom.elementTemplate.content.querySelector('.element').cloneNode(true)  

  // наполняем элемент карточки данными
  element.querySelector('.element__title').textContent = card.name  
  const elementImage = element.querySelector('.element__image')
  elementImage.setAttribute('src', card.link)
  elementImage.setAttribute('alt', card.alt)

  // добавляем слушатель like карточки
  element.querySelector('.element__heart').addEventListener('click', handleLike);

  // добавляем слушатель trash карточки
  element.querySelector('.element__trash').addEventListener('click', handleTrash)

  // добавляем слушатель открытия попапа с картинкой
  element.querySelector('.element__image').addEventListener('click', () => {
    dom.popupPicture.description.textContent = card.name
    dom.popupPicture.image.setAttribute('src', card.link)
    dom.popupPicture.image.setAttribute('alt', card.alt)
    openPopup(dom.popupPicture.popup)
  })

  return element
}


// открывает попап
function openPopup (popup) {
  popup.classList.add('popup_opened')
}


// закрывает заданный попап с транзицией
function closePopup (popup) {  
  popup.style.visibility = 'visible'
  popup.classList.remove('popup_opened')
  setTimeout(() => popup.style.visibility = null, 500)
}


// создаем все карточки на старте
initialCards.forEach((card) => {
  const cardElement = createCard(card)
  dom.elementsContent.append(cardElement)  
})


// добавляем слушатели открытия и закрытия попапа редактирования профиля
dom.profileEditButton.addEventListener('click', () => {
  dom.popupProfile.inputName.value = dom.profileName.textContent
  dom.popupProfile.inputInfo.value = dom.profileInfo.textContent
  dom.popupProfile.popup.classList.add('popup_opened')
})
dom.popupProfile.closeButton.addEventListener('click', () => {  
  closePopup(dom.popupProfile.popup)
})
dom.popupProfile.formElement.addEventListener('submit', (event) => {
  event.preventDefault()
  dom.profileName.textContent = dom.popupProfile.inputName.value
  dom.profileInfo.textContent = dom.popupProfile.inputInfo.value
  openPopup(dom.popupProfile.popup)
})


// добавляем слушатели открытия и закрытия попапа добавления карточки
dom.newCardButton.addEventListener('click', () => {
  dom.popupPlace.inputName.value = ''
  dom.popupPlace.inputInfo.value = ''
  openPopup(dom.popupPlace.popup)
})
dom.popupPlace.closeButton.addEventListener('click', () => {
  closePopup(dom.popupPlace.popup)
})
dom.popupPlace.formElement.addEventListener('submit', (event) => {
  event.preventDefault()
  const name = dom.popupPlace.inputName.value
  const link = dom.popupPlace.inputInfo.value
  const alt = `${name}, Фото`
  const cardElement = createCard({ name, link, alt })
  dom.elementsContent.prepend(cardElement)  
  dom.popupPlace.popup.classList.remove('popup_opened')
})


// добавляем слушатели закрытия попапа с полноэкранной картинкой
dom.popupPicture.closeButton.addEventListener('click', () => {
  closePopup(dom.popupPicture.popup)
})

