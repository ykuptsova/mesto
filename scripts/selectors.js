// определяем все DOM-элементы в одной константе для удобства доступа
const selectors = {
  elementTemplate: document.querySelector('.element__template'),
  elementsContent: document.querySelector('.elements__content'),

  profileName: document.querySelector('.profile__name'),
  profileInfo: document.querySelector('.profile__info'),

  profileEditButton: document.querySelector('.profile__edit-button'),
  popupProfile: {
    popup: document.querySelector('.popup_type_profile'),
    form: document
      .querySelector('.popup_type_profile')
      .querySelector('.popup__form'),
    submitButton: document
      .querySelector('.popup_type_profile')
      .querySelector('.popup__save-button'),
    closeButton: document
      .querySelector('.popup_type_profile')
      .querySelector('.popup__close-button'),
    formElement: document
      .querySelector('.popup_type_profile')
      .querySelector('.popup__form'),
    inputName: document
      .querySelector('.popup_type_profile')
      .querySelector('.popup__form')
      .querySelector('.popup__input_type_name'),
    inputInfo: document
      .querySelector('.popup_type_profile')
      .querySelector('.popup__form')
      .querySelector('.popup__input_type_info'),
  },

  newCardButton: document.querySelector('.profile__new-card-button'),
  popupPlace: {
    popup: document.querySelector('.popup_type_card-add'),
    form: document
      .querySelector('.popup_type_card-add')
      .querySelector('.popup__form'),
    submitButton: document
      .querySelector('.popup_type_card-add')
      .querySelector('.popup__save-button'),
    closeButton: document
      .querySelector('.popup_type_card-add')
      .querySelector('.popup__close-button'),
    formElement: document
      .querySelector('.popup_type_card-add')
      .querySelector('.popup__form'),
    inputName: document
      .querySelector('.popup_type_card-add')
      .querySelector('.popup__form')
      .querySelector('.popup__input_type_name'),
    inputInfo: document
      .querySelector('.popup_type_card-add')
      .querySelector('.popup__form')
      .querySelector('.popup__input_type_info'),
  },

  popupPicture: {
    popup: document.querySelector('.popup_type_picture'),
    image: document
      .querySelector('.popup_type_picture')
      .querySelector('.popup__image'),
    description: document
      .querySelector('.popup_type_picture')
      .querySelector('.popup__image-description'),
    closeButton: document
      .querySelector('.popup_type_picture')
      .querySelector('.popup__close-button'),
  },
}

export default selectors
