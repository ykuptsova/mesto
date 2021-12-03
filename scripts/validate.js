// валидирует заданную форму
function validate (form, formInput, showErrors = true) {
  const inputErrorClass = 'popup__input_type_error'  

  let formInvalid = false

  const fields = form.querySelectorAll('.popup__form-field')
  fields.forEach(field => {
    const input = field.querySelector('.popup__input')
    const error = field.querySelector('.popup__input-error')
    if (!showErrors) {
      input.classList.remove(inputErrorClass)
      error.textContent = ''
    } else if (formInput && input === formInput) {
      if (!input.validity.valid) {
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
  setSubmitButtonActive(submitButton, !formInvalid)
}


// устанавлиает состояние активности для submit кнопки формы
function setSubmitButtonActive (submitButton, active) {
  const submitButtonInactiveClass = 'popup__save-button_disabled'
  if (active) {
    submitButton.classList.remove(submitButtonInactiveClass)             
  } else {
    submitButton.classList.add(submitButtonInactiveClass)           
  }
}


// включает валидацию заданной формы по изменению полей ввода
function enableValidation (config) {
  validate(config.form)
  config.form
    .querySelectorAll(config.inputClass)
    .forEach(input => {
      input.addEventListener('input', () => {
        validate(config.form, input)
      })
    })
}


// включаем валидацию для форм
enableValidation({ form: dom.popupProfile.form, inputClass: '.popup__input' })
enableValidation({ form: dom.popupPlace.form, inputClass: '.popup__input' })
