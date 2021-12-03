// валидирует заданную форму
function validate (form, formInput, showErrors = true) {
  const inputErrorClass = 'popup__input_type_error'
  const submitButtonInactiveClass = 'popup__save-button_disabled'

  let formInvalid = false

  const fields = form.querySelectorAll('.popup__form-field')
  fields.forEach(field => {
    const input = field.querySelector('.popup__input')
    const error = field.querySelector('.popup__input-error')
    if (formInput && input === formInput) {
      if (!input.validity.valid && showErrors) {
        input.classList.add(inputErrorClass)
        error.textContent = input.validationMessage        
      } else {      
        input.classList.remove(inputErrorClass)
        error.textContent = ''
      }
    }
    formInvalid = formInvalid || !input.validity.valid
  })

  const submitButton = form.querySelector('.popup__save-button')    
  if (formInvalid) {
    submitButton.classList.add(submitButtonInactiveClass)       
  } else {
    submitButton.classList.remove(submitButtonInactiveClass)             
  }
}


// включает валидацию заданной формы по изменению полей ввода
function enableValidation (form) {
  validate(form)
  form.querySelectorAll('.popup__input').forEach(input => {
    input.addEventListener('input', () => {
      validate(form, input)
    })
  })
}


// включаем валидацию для форм
enableValidation(dom.popupProfile.form)
enableValidation(dom.popupPlace.form)
