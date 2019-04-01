export default () => {
  for(const categoryListItem of document.querySelectorAll('.normal .list-item')) {
    const currentListItem = categoryListItem
    categoryListItem.addEventListener('click', (e) => {
      const clickedItem = currentListItem.querySelector('.item-container')
      const isHidden = Array.from(clickedItem.classList).includes('hidden')
      clickedItem.classList[isHidden ? 'remove' : 'add']('hidden')
    })
  }
}
