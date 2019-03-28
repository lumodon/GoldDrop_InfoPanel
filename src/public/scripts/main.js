import populateNormalData from './populateNormalData'

function main() {
  document.addEventListener('DOMContentLoaded', () => {
    const fetchJson = ({ route='', body={} }) => {
      return fetch(`/api/${route}`, {
        'method': 'POST',
        'headers': {
          'Accept': 'application/json, text/plain, text/html',
          'Content-Type': 'application/json',
        },
        'body': JSON.stringify(body),
      }).then(res => res.json())
    }

    fetchJson({'route': 'populatedata'}).then((data) => {
      populateNormalData(data)

      return true
    }).then(() => {
      for(const categoryListItem of document.querySelectorAll('.category-list-item')) {
        const currentListItem = categoryListItem
        categoryListItem.addEventListener('click', (e) => {
          const clickedItem = currentListItem.querySelector('.item-container')
          const isHidden = Array.from(clickedItem.classList).includes('hidden')
          clickedItem.classList[isHidden ? 'remove' : 'add']('hidden')
        })
      }
    })
  })

  return true
}

main()
