const openModal = (modalSelector) => {
  const modal = document.querySelector(modalSelector),
    body = document.body
  modal.classList.add('show', 'fastFade')
  body.classList.add('body--fixed')
}

const closeModal = (modalSelector) => {
  const modal = document.querySelector(modalSelector),
    body = document.body
  modal.classList.remove('show', 'fastFade')
  body.classList.remove('body--fixed')
}

function modal(btnSelector, modalSelector) {
  const modal = document.querySelector(modalSelector),
    modalBtn = document.querySelectorAll(btnSelector)

  modalBtn.forEach(btn => {
    btn.addEventListener('click', () => openModal(modalSelector))
  })

  modal.addEventListener('click', event => {
    if (event.target === modal || event.target.getAttribute('data-close') == '') {
      closeModal(modalSelector)
    }
  })

  document.addEventListener('keydown', event => {
    if (event.code === 'Escape' && modal.classList.contains('show')) {
      closeModal(modalSelector)
    }
  })

  const showModalByScroll = () => {
    if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight - 1) {
      openModal(modalSelector)
      window.removeEventListener('scroll', showModalByScroll)
    }
  }

  window.addEventListener('scroll', showModalByScroll)
}

export default modal
export { closeModal, openModal }