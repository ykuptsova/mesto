// элементы профиля
export const profilePicButton = document.querySelector(
  '.profile__pic-container',
)
export const popupPic = document.querySelector('.popup_type_pic')
export const popupPicForm = popupPic.querySelector('.popup__form')
export const profileEditButton = document.querySelector('.profile__edit-button')

// элементы карточки
export const elementTemplate = document.querySelector('.element__template')

// попап профиля
export const popupProfile = document.querySelector('.popup_type_profile')
export const popupProfileForm = popupProfile.querySelector('.popup__form')

// попап карточки места
export const newCardButton = document.querySelector('.profile__new-card-button')
export const popupPlace = document.querySelector('.popup_type_card-add')
export const popupPlaceForm = popupPlace.querySelector('.popup__form')
export const popupPlaceSubmitButton = popupPlace.querySelector(
  '.popup__save-button',
)

// попап картинки места
export const popupPicture = document.querySelector('.popup_type_picture')

// настройки валидаторов
export const validatorConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-button',
  errorVisibleClass: 'popup__input-error_visible',
  inputErrorClass: 'popup__input_type_error',
  inactiveButtonClass: 'popup__save-button_disabled',
}
