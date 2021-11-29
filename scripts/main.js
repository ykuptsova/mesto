const initialCards = [
  {
    name: 'Норвегия, Лофотены',
    link: './images/places/norway-lofoten.jpeg',
    alt: 'Маленькие жёлтые домики на фоне гор',
  },
  {
    name: 'Австрия, Тироль',
    link: './images/places/austria-tirol.jpeg',
    alt: 'Фото Альп в облаках',
  },
  {
    name: 'Германия, Нойшванштайн',
    link: './images/places/germany-neuschwanstein.jpg',
    alt: 'Фото замка Нойшванштайн с Германии',
  },
  {
    name: 'Финляндия, Лапландия',
    link: './images/places/finland-lapland.jpg',
    alt: 'Северное сияние',
  },
  {
    name: 'Швейцария, Церматт',
    link: './images/places/switzerland-zermatt.jpg',
    alt: 'Фото домиков на фоне горы',
  },
  {
    name: 'Турция, Каппадокия',
    link: './images/places/turkey-cappadocia.jpg',
    alt: 'Фестиваль воздушных шаров',
  },
]; 


// определяем все DOM-элементы в одной константе для удобства доступа
const dom = {
  elementTemplate: document.querySelector('#element__template'),
  elementsContent: document.querySelector('.elements__content'),

  profileName: document.querySelector('.profile__name'),
  profileInfo: document.querySelector('.profile__info'),

  profileEditButton: document.querySelector('.profile__edit-button'),
  editProfile: {
    popup: document.querySelector('#editProfile'),
    closeButton: document.querySelector('#editProfile .popup__close-button'),
    formElement: document.querySelector('#editProfile .popup__form'),
    inputName: document.querySelector('#editProfile .popup__form .popup__input_type_name'),
    inputInfo: document.querySelector('#editProfile .popup__form .popup__input_type_info'),    
  },

  profilePlusButton: document.querySelector('.profile__plus-button'),
  addPlace: {
    popup: document.querySelector('#addPlace'),
    closeButton: document.querySelector('#addPlace .popup__close-button'),
    formElement: document.querySelector('#addPlace .popup__form'),
    inputName: document.querySelector('#addPlace .popup__form .popup__input_type_name'),
    inputInfo: document.querySelector('#addPlace .popup__form .popup__input_type_info'),    
  },

  openImg: {
    popup: document.querySelector('#openImg'),
    image: document.querySelector('#openImg .popup__image'),
    description: document.querySelector('#openImg .popup__image-description'),
    closeButton: document.querySelector('#openImg .popup__close-button'), 
  },
}


// создает элемент для заданной карточки
function createCard (card) {
  // клонируем template карточки
  const element = dom.elementTemplate.content.querySelector('.element').cloneNode(true)

  // наполняем элемент карточки данными
  element.querySelector('.element__title').innerText = card.name
  element.querySelector('.element__image').setAttribute('src', card.link)
  element.querySelector('.element__image').setAttribute('alt', card.alt)

  // добавляем слушатель like карточки
  element.querySelector('.element__heart').addEventListener('click', () => {
    element.querySelector('.element__heart').classList.toggle('element__heart_active')
  })

  // добавляем слушатель trash карточки
  element.querySelector('.element__trash').addEventListener('click', () => {
    element.parentElement.removeChild(element)
  })

  // добавляем слушатель открытия попапа с картинкой
  element.querySelector('.element__image').addEventListener('click', () => {
    dom.openImg.description.innerText = card.name
    dom.openImg.image.setAttribute('src', card.link)
    dom.openImg.image.setAttribute('alt', card.alt)
    dom.openImg.popup.classList.add('popup_opened')
  })

  // добавляем карточку на страницу
  dom.elementsContent.append(element)  
}


// закрывает заданный попап с транзицией
function closePopup (popup) {  
  popup.style.visibility = 'visible'
  popup.classList.remove('popup_opened')
  setTimeout(() => popup.style.visibility = null, 500)
}


// создаем все карточки на старте
initialCards.forEach(createCard)


// добавляем слушатели открытия и закрытия попапа редактирования профиля
dom.profileEditButton.addEventListener('click', () => {
  dom.editProfile.inputName.value = dom.profileName.textContent
  dom.editProfile.inputInfo.value = dom.profileInfo.textContent
  dom.editProfile.popup.classList.add('popup_opened')
})
dom.editProfile.closeButton.addEventListener('click', () => {  
  closePopup(dom.editProfile.popup)
})
dom.editProfile.formElement.addEventListener('submit', (event) => {
  event.preventDefault()
  dom.profileName.textContent = dom.editProfile.inputName.value
  dom.profileInfo.textContent = dom.editProfile.inputInfo.value
  dom.editProfile.popup.classList.remove('popup_opened')
})


// добавляем слушатели открытия и закрытия попапа добавления карточки
dom.profilePlusButton.addEventListener('click', () => {
  dom.addPlace.inputName.value = ''
  dom.addPlace.inputInfo.value = ''
  dom.addPlace.popup.classList.add('popup_opened')
})
dom.addPlace.closeButton.addEventListener('click', () => {
  closePopup(dom.addPlace.popup)
})
dom.addPlace.formElement.addEventListener('submit', (event) => {
  event.preventDefault()
  const name = dom.addPlace.inputName.value
  const link = dom.addPlace.inputInfo.value
  const alt = `${name}, Фото`
  createCard({ name, link, alt })
  dom.addPlace.popup.classList.remove('popup_opened')
})


// добавляем слушатели закрытия попапа с полноэкранной картинкой
dom.openImg.closeButton.addEventListener('click', () => {
  closePopup(dom.openImg.popup)
})