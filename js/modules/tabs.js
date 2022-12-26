function tabs(tabsSelector, tabsContentSelector, tabsParentSelector, activeClass) {
  const tabs = document.querySelectorAll(tabsSelector),
    tabsContent = document.querySelectorAll(tabsContentSelector),
    tabsParent = document.querySelector(tabsParentSelector)

  const hideTabContent = () => {
    tabsContent.forEach(tabContent => {
      tabContent.classList.add('hide')
      tabContent.classList.remove('show', 'fade')
    })
    tabs.forEach(tab => {
      tab.classList.remove(activeClass)
    })
  }

  const showTabContent = (i = 0) => {
    tabsContent[i].classList.add('show', 'fade')
    tabsContent[i].classList.remove('hide')
    tabs[i].classList.add(activeClass)
  }

  const changeTabs = event => {
    const target = event.target
    if (target && target.classList.contains(tabsSelector.slice(1))) {
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
}

export default tabs