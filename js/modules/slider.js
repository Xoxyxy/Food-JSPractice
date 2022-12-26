function slider({ container, slide, nextArrow, prevArrow, totalCounter, currentCounter, wrapper, field }) {
  const slides = document.querySelectorAll(slide),
    slider = document.querySelector(container),
    prev = document.querySelector(nextArrow),
    next = document.querySelector(prevArrow),
    current = document.querySelector(currentCounter),
    total = document.querySelector(totalCounter),
    slidesWrapper = document.querySelector(wrapper),
    slidesField = document.querySelector(field),
    width = window.getComputedStyle(slidesWrapper).width

  let slideIndex = 1
  let offset = 0

  if (slides.length < 10) {
    total.innerText = `0${slides.length}`
    current.innerText = `0${slideIndex}`
  } else {
    total.textContent = slides.length
    current.innerText = slideIndex
  }

  slidesField.style.width = 100 * slides.length + '%'

  slides.forEach(slide => {
    slide.style.width = width
  })

  const indicators = document.createElement('ol'),
    dots = []
  indicators.classList.add('carousel-indicators')
  slider.append(indicators)

  for (let i = 0; i < slides.length; i++) {
    const dot = document.createElement('li')
    dot.classList.add('dot')
    dot.setAttribute('data-slide-to', i + 1)
    if (i == 0) {
      dot.style.opacity = '1'
    }
    indicators.append(dot)
    dots.push(dot)
  }

  const changeDot = () => {
    dots.forEach(dot => dot.style.opacity = '.5')
    dots[slideIndex - 1].style.opacity = '1'
  }

  const replaceWords = word => +word.replace(/\D/g, '')

  next.addEventListener('click', () => {
    if (offset == replaceWords(width) * (slides.length - 1)) {
      offset = 0
    } else {
      offset += replaceWords(width)
    }

    slidesField.style.transform = `translateX(-${offset}px)`

    if (slideIndex == slides.length) {
      slideIndex = 1
    } else {
      slideIndex++
    }

    if (slides.length < 10) {
      current.innerText = `0${slideIndex}`
    } else current.innerText = slideIndex

    changeDot()
  })

  prev.addEventListener('click', () => {
    if (offset == 0) {
      offset = replaceWords(width) * (slides.length - 1)
    } else {
      offset -= replaceWords(width)
    }

    slidesField.style.transform = `translateX(-${offset}px)`

    if (slideIndex == 1) {
      slideIndex = slides.length
    } else {
      slideIndex--
    }

    if (slides.length < 10) {
      current.innerText = `0${slideIndex}`
    } else current.innerText = slideIndex

    changeDot()
  })

  dots.forEach(dot => {
    dot.addEventListener('click', event => {
      const slideTo = event.target.getAttribute('data-slide-to')

      slideIndex = slideTo

      offset = replaceWords(width) * (slideTo - 1)
      slidesField.style.transform = `translateX(-${offset}px)`

      if (slides.length < 10) {
        current.innerText = `0${slideIndex}`
      } else current.innerText = slideIndex

      changeDot()
    })
  })
}

export default slider