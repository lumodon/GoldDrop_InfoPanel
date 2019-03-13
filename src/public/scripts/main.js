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
    const brandListContainer = document.getElementById('brand-list')
    console.log(data)
    for(brand of data.brands) {
      const brandDiv = document.createElement('div')
      brandDiv.classList.add('brand-list-item')
      brandDiv.id = brand.brand_name.replace(/[,.'"\s_]/g, '-')
      brandListContainer.appendChild(brandDiv)

      const categoriesContainer = document.createElement('div')
      categoriesContainer.classList.add('categories-container', 'flex-container', 'vertical')

      brandDiv.innerHTML = `
      <div class="brand-header flex-container header">
        <span class="brand-title">${brand.brand_name}</span>
        <span class="brand-value">${brand.brand_total_value}</span>
      </div>
      `

      brandDiv.appendChild(categoriesContainer)

      for(category of data.categories) {
        if(category.belongs_to_brand === brand.brand_name) {
          const categoryDiv = document.createElement('div')
          categoryDiv.classList.add('category-list-item')
          categoriesContainer.appendChild(categoryDiv)

          const itemContainer = document.createElement('div')
          itemContainer.classList.add('item-container', 'flex-container', 'vertical', 'hidden')

          categoryDiv.innerHTML = `
          <div class="category-header flex-container header">
            <span class="category-title">${category.category_name.split('**')[1]}</span>
            <span class="category-value">${category.category_total_value}</span>
          </div>
          `

          categoryDiv.appendChild(itemContainer)

          for(item of data.items) {
            const itemDiv = document.createElement('div')
            itemDiv.classList.add('item-list-item', 'flex-container')
            itemContainer.appendChild(itemDiv)

            itemDiv.innerHTML = `
              <span class="item-sales-order">${item.belongs_to_salesorder}</span>
              <span class="item-value">${item.item_value}</span>
            `
          }
        }
      }
    }
    return true
  }).then(() => {
    for(categoryListItem of document.querySelectorAll('.category-list-item')) {
      const currentListItem = categoryListItem
      categoryListItem.addEventListener('click', (e) => {
        const clickedItem = currentListItem.querySelector('.item-container')
        console.log(clickedItem)
        const isHidden = Array.from(clickedItem.classList).includes('hidden')
        clickedItem.classList[isHidden ? 'remove' : 'add']('hidden')
      })
    }
  })
})