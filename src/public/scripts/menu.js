export default () => {
  const menuButtons = document.querySelectorAll('.menu-option')
  for(const menuButton of menuButtons) {
    menuButton.addEventListener('click', () => {
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
}
