let isPhoneRequired = false

const phoneLabelSpan = document.querySelector('.phone-label-span')
const phoneField = document.getElementById('phone')

document.querySelector('#phone-checkbox')
  .addEventListener('change', function() {
    if (this.checked) {
      phoneLabelSpan.style.display = 'inline'
      phoneField.required = !isPhoneRequired
      isPhoneRequired = !isPhoneRequired
    } else {
      phoneLabelSpan.style.display = 'none'
      phoneField.required = !isPhoneRequired
      isPhoneRequired = !isPhoneRequired
    }
  })

document.querySelector('button[type="submit"]')
  .addEventListener('click', function(event) {
    event.preventDefault()
    let firstNameField = document.getElementById('firstName')
    let lastNameField = document.getElementById('lastName')
    let emailField = document.getElementById('email')
    let textareaField = document.getElementById('open-text-area')
    let productField = document.getElementById('product')
    let helpRadio = document.querySelector('input[value="ajuda"]')
    let emailCheckbox = document.getElementById('email-checkbox')
    let phoneCheckbox = document.getElementById('phone-checkbox')
    let fileField = document.querySelector('input[type="file"]')
    let successMessage = document.querySelector('.success')
    if (!firstNameField.value || !lastNameField.value || !emailField.value || !textareaField.value) {
      return showAndHideErrorMessage()
    }
    if (isPhoneRequired && !phoneField.value) {
      return showAndHideErrorMessage()
    }
    if (!emailField.value.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/)) {
      return showAndHideErrorMessage()
    }
    firstNameField.value = ''
    lastNameField.value = ''
    emailField.value = ''
    textareaField.value = ''
    phoneField.value = ''
    productField.selectedIndex = 0
    helpRadio.checked = true
    emailCheckbox.checked = false
    phoneCheckbox.checked = false
    fileField.value = ''
    phoneLabelSpan.style.display = 'none'
    successMessage.style.display = 'block'
    isPhoneRequired = false
    scroll(0,0)
    hideMessageAfterTimeout(successMessage)
  }, false)

function showAndHideErrorMessage() {
  const errorMessage = document.querySelector('.error')
  errorMessage.style.display = 'block'
  scroll(0,0)
  hideMessageAfterTimeout(errorMessage)
  return
}

function hideMessageAfterTimeout(element) {
  setTimeout(function() {
    element.style.display = 'none'
  }, 3000)
}
