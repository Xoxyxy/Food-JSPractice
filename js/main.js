window.addEventListener('DOMContentLoaded', () => {
  // Tabs
  const tabs = document.querySelectorAll('.tabheader__item'),
    tabsContent = document.querySelectorAll('.tabcontent'),
    tabsParent = document.querySelector('.tabheader__items')

  const hideTabContent = () => {
    tabsContent.forEach(tabContent => {
      tabContent.classList.add('hide')
      tabContent.classList.remove('show', 'fade')
    })
    tabs.forEach(tab => {
      tab.classList.remove('tabheader__item_active')
    })
  }

  const showTabContent = (i = 0) => {
    tabsContent[i].classList.add('show', 'fade')
    tabsContent[i].classList.remove('hide')
    tabs[i].classList.add('tabheader__item_active')
  }

  const changeTabs = event => {
    const target = event.target
    if (target && target.classList.contains('tabheader__item')) {
      tabs.forEach((tab, i) => {
        if (target == tab) {
          hideTabContent()
          showTabContent(i)
        }
      })
    }
  }

  tabsParent.addEventListener('click', changeTabs)
  hideTabContent()
  showTabContent()

  // Modal
  const modalBtn = document.querySelectorAll('[data-modalBtn]'),
    modal = document.querySelector('.modal'),
    modalClose = modal.querySelector('.modal__close'),
    body = document.body

  if (modal && modalBtn) {
    const showModal = () => {
      modal.classList.add('show', 'fadeModal')
      body.classList.add('body--fixed')
    }

    const hideModal = () => {
      modal.classList.remove('show', 'fadeModal')
      body.classList.remove('body--fixed')
    }

    modalBtn.forEach(btn => {
      btn.addEventListener('click', showModal)
    })

    modalClose.addEventListener('click', hideModal)

    modal.addEventListener('click', event => {
      if (event.target === modal) {
        hideModal()
      }
    })

    document.addEventListener('keydown', event => {
      if (event.code == 'Escape' && modal.classList.contains('show')) {
        hideModal()
      }
    })

    const showModalByScroll = () => {
      if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight - 1) {
        showModal()
        window.removeEventListener('scroll', showModalByScroll)
      }
    }

    window.addEventListener('scroll', showModalByScroll)
  }

  // Timer
  const deadline = '2022-11-1'

  const getTimeRemaining = endtime => {
    let days, hours, minutes, seconds
    const total = Date.parse(endtime) - Date.parse(new Date())

    if (total <= 0) {
      days = 0,
        hours = 0,
        minutes = 0,
        seconds = 0
    } else {
      days = Math.floor(total / (1000 * 60 * 60 * 24)),
        hours = Math.floor(total / (1000 * 60 * 60) % 24),
        minutes = Math.floor((total / 1000 / 60) % 60),
        seconds = Math.floor((total / 1000) % 60)
    }
    return {
      'total': total,
      'days': days,
      'hours': hours,
      'minutes': minutes,
      'seconds': seconds
    }
  }

  const getZero = num => {
    if (num >= 0 && num < 10) {
      return `0${num}`
    } else return num
  }

  const setClock = (selector, endtime) => {
    const timer = document.querySelector(selector),
      days = timer.querySelector('#days'),
      hours = timer.querySelector('#hours'),
      minutes = timer.querySelector('#minutes'),
      seconds = timer.querySelector('#seconds'),
      timerInterval = setInterval(updateClock, 1000)

    updateClock()

    function updateClock() {
      const t = getTimeRemaining(endtime)
      days.innerHTML = getZero(t.days)
      hours.innerHTML = getZero(t.hours)
      minutes.innerHTML = getZero(t.minutes)
      seconds.innerHTML = getZero(t.seconds)

      if (t.total < 0) {
        clearInterval(timerInterval)
      }
    }
  }

  setClock('.timer', deadline)
})