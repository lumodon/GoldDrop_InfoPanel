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

function generateProduct(data) {
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

export default generateProduct
