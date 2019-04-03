import { repopulatePaxPods } from './api'

export default () => {
  const menuButtons = document.querySelectorAll('.menu-option')
  for(const menuButton of menuButtons) {
    menuButton.addEventListener('click', () => {
      for(const otherMenuButton of menuButtons) {
        otherMenuButton.classList.remove('selected')
      }
      menuButton.classList.add('selected')

      const targetBodies = document.querySelectorAll('.' + menuButton.dataset.menu)
      for(const bodyItem of document.querySelectorAll('.page')) {
        if(!bodyItem.classList.contains('hidden')) bodyItem.classList.add('hidden')
      }

      for(const bodyItem of targetBodies) {
        bodyItem.classList.remove('hidden')
      }
    })
  }

  const paxViewFiltering = document.querySelectorAll('.view-type-option')
  for(const filterOption of paxViewFiltering) {
    filterOption.addEventListener('click', () => {
      function revealFilterType(type) {
        for(const filterType of document.querySelectorAll('#pax-pods > div')) {
          filterType.classList.add('hidden')
        }
        document.querySelector(`#by-${type}`).classList.remove('hidden')
      }
      revealFilterType(filterOption.dataset.option)

      for(const otherFilterOption of paxViewFiltering) {
          otherFilterOption.classList.remove('selected')
      }
      filterOption.classList.add('selected')
    })
  }

  const toggleEles = document.querySelectorAll('.toggles .toggle-option')
  for(const toggle of toggleEles) {
    toggle.addEventListener('click', () => {
      const isToggled = toggle.classList.contains('selected-alt')
      toggle.classList[isToggled ? 'remove' : 'add']('selected-alt')

      const target = toggle.dataset['target']
      if(target) {
        for(const targetElement of document.querySelectorAll(`.toggle-view.${target}`)) {
          const isHidden = targetElement.classList.contains('hidden')
          targetElement.classList[isHidden ? 'remove' : 'add']('hidden')
        }
      }

      if(toggle.dataset['trigger'] === 'pax-pods') {
        repopulatePaxPods()
      }
    })
  }
}
