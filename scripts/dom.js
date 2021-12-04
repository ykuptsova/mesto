// определяем все DOM-элементы в одной константе для удобства доступа
const dom = {
  elementTemplate: document.querySelector('.element__template'),
  elementsContent: document.querySelector('.elements__content'),

  profileName: document.querySelector('.profile__name'),
  profileInfo: document.querySelector('.profile__info'),

  profileEditButton: document.querySelector('.profile__edit-button'),
  popupProfile: {
    popup: document.querySelector('.popup_type_profile'),
    form: document.querySelector('.popup_type_profile .popup__form'),    
    submitButton: document.querySelector('.popup_type_profile .popup__save-button'),
    closeButton: document.querySelector('.popup_type_profile .popup__close-button'),
    formElement: document.querySelector('.popup_type_profile .popup__form'),
    inputName: document.querySelector('.popup_type_profile .popup__form .popup__input_type_name'),
    inputInfo: document.querySelector('.popup_type_profile .popup__form .popup__input_type_info'),    
  },

  newCardButton: document.querySelector('.profile__new-card-button'),
  popupPlace: {
    popup: document.querySelector('.popup_type_card-add'),
    form: document.querySelector('.popup_type_card-add .popup__form'),
    submitButton: document.querySelector('.popup_type_card-add .popup__save-button'),
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