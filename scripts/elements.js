// элементы карточки
export const elementTemplate = document.querySelector('.element__template')
export const elementsContent = document.querySelector('.elements__content')

// элементы панели профиля
export const profileName = document.querySelector('.profile__name')
export const profileInfo = document.querySelector('.profile__info')

// попап профиля
export const profileEditButton = document.querySelector('.profile__edit-button')
export const popupProfile = document.querySelector('.popup_type_profile')
export const popupProfileForm = popupProfile.querySelector('.popup__form')
export const popupProfileSubmitButton = popupProfile.querySelector(
  '.popup__save-button',
)
export const popupProfileCloseButton = popupProfile.querySelector(
  '.popup__close-button',
)
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
export const popupPlaceCloseButton = popupPlace.querySelector(
  '.popup__close-button',
)
export const popupPlaceInputName = popupPlaceForm.querySelector(
  '.popup__input_type_name',
)
export const popupPlaceInputInfo = popupPlaceForm.querySelector(
  '.popup__input_type_info',
)

// попап картинки места
export const popupPicture = document.querySelector('.popup_type_picture')
export const popupPictureImage = popupPicture.querySelector('.popup__image')
export const popupPictureDescription = popupPicture.querySelector(
  '.popup__image-description',
)
export const popupPictureCloseButton = popupPicture.querySelector(
  '.popup__close-button',
)
