import { closeModal, openModal } from "./modal"
import { postData } from "../services/services"

function forms(formSelector) {
  const forms = document.querySelectorAll(formSelector),
    message = {
      loading: 'icons/spiner.svg',
      success: 'Спасибо! Скоро мы с вами свяжемся',
      failure: 'Что-то пошло не так...'
    }

  const bindPostData = form => {
    form.addEventListener('submit', event => {
      event.preventDefault()

      const statusMessage = document.createElement('img')
      statusMessage.src = message.loading
      statusMessage.style.cssText = `
        display: block;
        margin: 0 auto;
      `
      form.insertAdjacentElement('afterend', statusMessage)

      const formData = new FormData(form)

      const json = JSON.stringify(Object.fromEntries(formData.entries()))

      postData('http://localhost:3000/requests', json)
        .then(data => {
          showThanksModal(message.success)
          statusMessage.remove()
        }).catch(() => {
          showThanksModal(message.failure)
        }).finally(() => {
          form.reset()
        })
    })
  }

  forms.forEach(form => {
    bindPostData(form)
  })

  function showThanksModal(message) {
    const prevModalDialog = document.querySelector('.modal__dialog')
    prevModalDialog.classList.add('hide')
    openModal('.modal')

    const thanksModal = document.createElement('div')
    thanksModal.classList.add('modal__dialog')
    thanksModal.innerHTML = `
        <div class="modal__content">
          <div data-close class="modal__close">&times;</div>
          <div class="modal__title">${message}</div>
        </div>
      `
    document.querySelector('.modal').append(thanksModal)

    setTimeout(() => {
      thanksModal.remove()
      prevModalDialog.classList.add('show')
      prevModalDialog.classList.remove('hide')
      closeModal('.modal')
    }, 4000)
  }
}

export default forms