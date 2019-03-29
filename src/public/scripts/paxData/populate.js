import { convertToCurrency } from '../utils'

function generateProductByCustomerDetails(type, productData, total) {
  const productDetails = document.createElement('div')
  productDetails.classList.add('product-details',  'flex-container')
  productDetails.innerHTML = `
  <div class="product-list-header header">
    <span class="product-type-title">${type}</span>
  </div>
  <div class="totals flex-container vertical">
    <label>Total:</label>
    <span class="type-value">${convertToCurrency(total)}</span>
  </div>
  <div class="values-list flex-container"></div>
  `

  const detailsContainer = productDetails.querySelector('.values-list')
  for(const item of productData) {
    const detailsElement = document.createElement('div')
    detailsElement.innerHTML = `
    <div class="grid">
        <span class="label-item">Item:</span>
        <span class="value-item">${item.unit_name}</span>
        <span class="label-item extra-info">Sales Order:</span>
        <span class="value-item extra-info item-sales-order">${item.sales_order}</span>
        <span class="label-item">Total Value:</span>
        <span class="value-item item-value">${item.items_total_value}</span>
        <span class="label-item">$ Per Unit:</span>
        <span class="value-item">${item.cost_per_unit}</span>
        <span class="label-item">Quantity:</span>
        <span class="value-item">${item.quantity}</span>
    </div>
    `
    detailsContainer.appendChild(detailsElement)
  }

  return productDetails
}

function generateProductDetails(type, prouductData, total) {
  const productDetails = document.createElement('div')
  productDetails.classList.add('product-details',  'flex-container', 'vertical')
  productDetails.innerHTML = `
  <div class="product-list-header header">
    <span class="product-type-title">${type}</span>
  </div>
  <div class="values-list flex-container">
    <label>Total: </label>
    <span class="type-value">${total}</span>
  </div>
  `

  return productDetails
}

export default (data) => {
  function generateCustomer() {
    const dataByCustomer = {}
    for(const paxpodData of data.podData) {
      dataByCustomer[paxpodData.customer] = {
        'products': [],
        'samples': [],
      }
    }
    for(const paxpodData of data.podData) {
      const totalValueNum = Number(paxpodData.items_total_value.replace(/[$,]/g, ''))

      dataByCustomer[paxpodData.customer][totalValueNum >= 5 ? 'products' : 'samples'].push(paxpodData)
    }
    for(const customerName in dataByCustomer) {
      const customer = dataByCustomer[customerName]

      const customerDiv = document.createElement('div')
      customerDiv.classList.add('customer-list-item', 'flex-container', 'vertical')
      document.querySelector('#by-customer').appendChild(customerDiv)
      customerDiv.innerHTML = `
      <div class="customer-list-header">
        <span class="customer-title">${customerName}</span>
      </div>
      <div class="lists vertical flex-container"></div>
      `

      const lists = customerDiv.querySelector('.lists')

      for(const productType in customer) {
        let runningTotalForCustomer = 0
        for(const item of customer[productType]) {
          const appendingValue = Number(item.items_total_value.replace(/[$,]/g, ''))
          runningTotalForCustomer = Math.round((runningTotalForCustomer + appendingValue) * 100) / 100
        }
        const details = generateProductByCustomerDetails(productType, customer[productType], String(runningTotalForCustomer))
        lists.appendChild(details)
      }
    }
  }

  function generateProduct() {
    const dataByProduct = {}
    for(const paxpodData of data.podData) {
      dataByProduct[paxpodData.unit_name] = []
    }
    for(const paxpodData of data.podData) {
      dataByProduct[paxpodData.unit_name].push(paxpodData)
    }
    for(const productName in dataByProduct) {
      const product = dataByProduct[productName]

      const productDiv = document.createElement('div')
      productDiv.classList.add('product-list-item', 'flex-container', 'vertical')
      document.querySelector('#by-product').appendChild(productDiv)
      productDiv.innerHTML = `
      <div class="product-list-header">
        <span class="product-title">${productName}</span>
      </div>
      <div class="lists flex-container"></div>
      `

      const lists = productDiv.querySelector('.lists')

      let runningTotalForProduct = 0
      for(const item of product) {
        runningTotalForProduct = Math.round((runningTotalForProduct + Number(item.items_total_value.replace(/[$,]/g, ''))) * 100) / 100
        const details = generateProductDetails('', item, String(runningTotalForProduct))
        lists.appendChild(details)
      }
    }
  }

  generateCustomer()
  generateProduct()
}
