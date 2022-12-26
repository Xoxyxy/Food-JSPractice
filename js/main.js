require('es6-promise').polyfill()
import 'nodelist-foreach-polyfill'

import tabs from './modules/tabs'
import modal from './modules/modal'
import timer from './modules/timer'
import cards from './modules/cards'
import forms from './modules/forms'
import slider from './modules/slider'
import calculator from './modules/calculator'

window.addEventListener('DOMContentLoaded', () => {
  tabs('.tabheader__item', '.tabcontent', '.tabheader__items', 'tabheader__item_active')
  modal('[data-modal]', '.modal')
  timer('.timer', '2023-01-01')
  cards()
  forms('form')
  slider({
    container: '.offer__slider',
    wrapper: '.offer__slider-wrapper',
    field: '.offer__slider-inner',
    slide: '.offer__slide',
    totalCounter: '#total',
    currentCounter: '#current',
    nextArrow: '.offer__slider-prev',
    prevArrow: '.offer__slider-next'
  })
  calculator()
})