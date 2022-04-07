// элементы карточки
export const elementTemplate = document.querySelector('.element__template')

// попап профиля
export const profileEditButton = document.querySelector('.profile__edit-button')
export const popupProfile = document.querySelector('.popup_type_profile')
export const popupProfileForm = popupProfile.querySelector('.popup__form')
export const popupProfileInputName = popupProfileForm.querySelector(
  '.popup__input_type_name',
)
export const popupProfileInputInfo = popupProfileForm.querySelector(
  '.popup__input_type_info',
)

// попап карточки места
export const newCardButton = document.querySelector('.profile__new-card-button')
export const popupPlace = document.querySelector('.popup_type_card-add')
export const popupPlaceForm = popupPlace.querySelector('.popup__form')
export const popupPlaceSubmitButton = popupPlace.querySelector(
  '.popup__save-button',
)

// попап картинки места
export const popupPicture = document.querySelector('.popup_type_picture')