import { createElement, convertToCurrency } from '../../utils'
import { MINIMUM_VALUE_FOR_SAMPLE } from '../constants'

function getNumFromString(val) {
  return Number(val.replace(/[$,]/g, ''))
}

function reorganizeData(inputData) {
  const outputData = {}

  for(const item of inputData) {
    const values = {
      'total': getNumFromString(item.items_total_value),
      'quantity': Number(item.quantity),
    }

    if(outputData[item.cost_per_unit]) {
      if(outputData[item.cost_per_unit][item.customer]) {
        const oii = outputData[item.cost_per_unit][item.customer]
        const sum = oii.total + getNumFromString(item.items_total_value)

        outputData[item.cost_per_unit][item.customer].total = Math.round(sum * 100) / 100
        outputData[item.cost_per_unit][item.customer].quantity += Number(item.quantity)
      } else {
        outputData[item.cost_per_unit][item.customer] = values
      }
    } else {
      outputData[item.cost_per_unit] = {
        [item.customer]: values,
      }
    }
  }
  return outputData
}

function generateProductByPriceDetails(type, productDataCustomers) {
  const productDetails = createElement('div', ['product-details', 'flex-container'])
  productDetails.innerHTML = `
  <div class="product-list-header header">
    <span class="product-type-title">${type}</span>
  </div>
  <div class="values-list flex-container"></div>
  `

  const detailsElement = createElement('div', ['grid'], '.values-list', productDetails)

  let newItems = ``
  let productIndex = 0
  const productKeys = Object.keys(productDataCustomers)
  const productData = Object.values(productDataCustomers)
  while(productIndex < productData.length) {
    const item = productData[productIndex]

    const styleLabel = `style="grid-column: ${String(2*productIndex + 1)}; grid-row: `
    const styleItem = `style="grid-column: ${String(2*productIndex + 2)}; grid-row: `

    newItems += `
      <span ${styleLabel}1;" class="label-item">Customer:</span>
      <span ${styleItem}1;" class="value-item">${productKeys[productIndex]}</span>
      <span ${styleLabel}2;" class="label-item">Total Value:</span>
      <span ${styleItem}2;" class="value-item">${convertToCurrency(item.total)}</span>
      <span ${styleLabel}3;" class="label-item">Quantity:</span>
      <span ${styleItem}3;" class="value-item">${item.quantity}</span>
    `
    productIndex++
  }
  detailsElement.innerHTML = newItems
  return productDetails
}

function generatePrice(data) {
  const podData = reorganizeData(data.podData)

  for(const itemType of ['Products', 'Samples']) {
    const itemDiv = createElement('div', ['price-list-item', 'flex-container', 'vertical'], '#by-price')
    itemDiv.innerHTML = `
    <div class="price-list-header">
      <span class="customer-title">${itemType}</span>
    </div>
    <div class="lists vertical flex-container"></div>
    `

    const lists = itemDiv.querySelector('.lists')
    for(const priceType in podData) {
      if(itemType === 'Products' && getNumFromString(priceType) > MINIMUM_VALUE_FOR_SAMPLE
      || itemType === 'Samples' && getNumFromString(priceType) <= MINIMUM_VALUE_FOR_SAMPLE) {
        const details = generateProductByPriceDetails(priceType, podData[priceType])
        lists.appendChild(details)
      }
    }
  }
}

export default generatePrice
