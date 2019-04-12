import { calculateRealValue } from '../../utils'

function populate(data) {
  const salesOrders = {}
  for(const salesOrder of data.salesOrderNumbers) {
    salesOrders[salesOrder.sales_order] = salesOrder.customer
  }

  const brandListContainer = document.getElementById('brand-list')
  for(const brand of data.brands) {
    brand.brandRealValue = calculateRealValue(brand.brand_total_value, brand.sample_value)

    const categoriesContainer = generateBrand(brand, brandListContainer)

    for(const category of data.categories) {
      if(category.belongs_to_brand === brand.brand_name) {
        const categoryRealValue = calculateRealValue(category.category_total_value, category.sample_value)
        const categoryDisplayTitle = category.category_name.split('**')[1]

        const categoryDiv = document.createElement('div')
        categoryDiv.classList.add('list-item')
        categoriesContainer.appendChild(categoryDiv)

        const itemContainer = document.createElement('div')
        itemContainer.classList.add('item-container-normal', 'flex-container', 'vertical')

        const itemSampleContainer = document.createElement('div')
        itemSampleContainer.classList.add('item-container-sample', 'flex-container', 'vertical')

        categoryDiv.innerHTML = `
        <div class="category-header flex-container header">
          <span class="category-title">${categoryDisplayTitle}</span>
          <div class="values-list vertical flex-container">
            <div class="flex-container">
              <label>Total: </label>
              <span class="category-value">${category.category_total_value}</span>
            </div>
            <div class="flex-container">
              <label>Samples: </label>
              <span class="category-value-sample">${category.sample_value}</span>
            </div>
            <div class="flex-container">
              <label>Sales: </label>
              <span class="category-value-real">${categoryRealValue}</span>
            </div>
          </div>
        </div>
        <div class="item-container hidden flex-container vertical"></div>
        `

        const cateroyItemContainer = categoryDiv.querySelector('.item-container')
        cateroyItemContainer.appendChild(itemSampleContainer)
        cateroyItemContainer.appendChild(itemContainer)

        for(const item of data.items) {
          if(item.belongs_to_category === category.category_name) {
            const itemDiv = document.createElement('div')
            itemDiv.classList.add('flex-container', 'vertical', 'bordered')
            let isSample = Number(item.total_value.replace(/[,$]/g, '')) < 1
            if(isSample) {
              itemSampleContainer.appendChild(itemDiv)
            } else {
              itemContainer.appendChild(itemDiv)
            }

            itemDiv.innerHTML = `
            <h4>${item.unit_name}</h4>
            <h5 class="item-customer">${salesOrders[item.belongs_to_salesorder]}</h5>
            <div class="flex-container">
              <div class="flex-container vertical left">
                <span>Sales Order:</span>
                <span>Total Value:</span>
                <span>Per Unit Value:</span>
                <span>Quantity:</span>
                <span>Category:</span>
              </div>
              <div class="flex-container vertical right">
                <span class="item-sales-order">${item.belongs_to_salesorder}</span>
                <span class="item-value">${item.total_value}</span>
                <span class="">${item.cost_per_unit}</span>
                <span class="">${item.quantity}</span>
                <span class="">${item.unit_category}</span>
              </div>
            </div>
            `
          }
        }
      }
    }
  }
}

function generateBrand(data, parent) {
  const brandDiv = document.createElement('div')
  brandDiv.classList.add('brand-list-item')
  brandDiv.id = data.brand_name.replace(/[,.'"\s_]/g, '-')
  parent.appendChild(brandDiv)

  const categoriesContainer = document.createElement('div')
  categoriesContainer.classList.add('categories-container', 'flex-container', 'vertical')

  brandDiv.innerHTML = `
  <div class="flex-container header">
    <span class="brand-title">${data.brand_name}</span>
    <div class="values-list vertical flex-container">
      <div class="flex-container">
        <label>Total: </label>
        <span class="brand-value">${data.brand_total_value}</span>
      </div>
      <div class="flex-container">
        <label>Samples: </label>
        <span class="brand-value-sample">${data.sample_value}</span>
      </div>
      <div class="flex-container">
        <label>Sales: </label>
        <span class="brand-value-real">${data.brandRealValue}</span>
      </div>
    </div>
  </div>
  `

  brandDiv.appendChild(categoriesContainer)
  return categoriesContainer
}

export default populate
