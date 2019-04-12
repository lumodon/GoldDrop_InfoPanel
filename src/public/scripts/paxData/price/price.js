import { createElement, convertToCurrency } from '../../utils'
import { MINIMUM_VALUE_FOR_SAMPLE } from '../constants'
import * as moment from 'moment'

window['moment'] = moment

function dateIsLastMonth(dateAsEpoch) {
  const beginningOfLastMonth = moment().startOf('month').subtract(1, 'month')
  const endOfLastMonth = moment(beginningOfLastMonth).add(1, 'month').subtract(1, 'second')
  const monthOfProvidedDate = moment(dateAsEpoch)
  return monthOfProvidedDate.isAfter(beginningOfLastMonth) && monthOfProvidedDate.isBefore(endOfLastMonth)
}

function getNumFromString(val) {
  return Number(val.replace(/[$,]/g, ''))
}

function reorganizeData(inputData, delivered) {
  let dateRestricted
  try {
    dateRestricted = document.querySelector('#date-restricted').classList.contains('selected-alt')
  } catch(e) {
    dateRestricted = false
  }
  const outputData = {}
  const deliveredTags = ['DELIVERED', 'DELIVERING', 'COMPLETED']
  let totalQuantity = 0

  for(const item of inputData) {
    const itemDelivered = deliveredTags.includes(item.current_status)
    const notDateLastMonth = !dateIsLastMonth(Number(item.order_date_epoch) * 1000)
    var cond1 = (delivered === 'only' && !itemDelivered)
    var cond2 = (delivered === 'excluded' && itemDelivered)
    var cond3 = (dateRestricted && notDateLastMonth)
    if(
      cond1 || cond2 || cond3
    ) { continue }
    const values = {
      'total': getNumFromString(item.items_total_value),
      'quantity': Number(item.quantity),
      'due_date': moment(Number(item.due_date_epoch) * 1000).format('MMMM Do YYYY, h:mm a'),
      'order_date': moment(Number(item.order_date_epoch) * 1000).format('MMMM Do YYYY, h:mm a'),
      'status': item.current_status,
      'sales_order': item.sales_order,
    }

    if(outputData[item.cost_per_unit]) {
      if(outputData[item.cost_per_unit][item.customer]) {
        const oii = outputData[item.cost_per_unit][item.customer]
        const sum = oii.total + getNumFromString(item.items_total_value)

        outputData[item.cost_per_unit][item.customer].total = Math.round(sum * 100) / 100
        outputData[item.cost_per_unit][item.customer].quantity += Number(item.quantity)
        outputData[item.cost_per_unit].totals.quantity += Number(item.quantity)
      } else {
        outputData[item.cost_per_unit][item.customer] = values
        if(outputData[item.cost_per_unit].totals) {
          outputData[item.cost_per_unit].totals.quantity += Number(item.quantity)
        } else {
          outputData[item.cost_per_unit].totals = {
            'quantity': Number(item.quantity)
          }
        }
      }
    } else {
      outputData[item.cost_per_unit] = {
        [item.customer]: values,
        'totals': {
          'quantity': Number(values.quantity)
        }
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
    <span class="quantity-totals">Quantity: ${productDataCustomers.totals.quantity}</span>
  </div>
  <div class="values-list flex-container"></div>
  `

  const detailsElement = createElement('div', ['grid'], '.values-list', productDetails)

  let newItems = ``
  let productIndex = 0
  const productKeys = Object.keys(productDataCustomers).filter(it => it !== 'totals')
  const productData = []
  for(const key of productKeys) {
    productData.push(productDataCustomers[key])
  }
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
      <span ${styleLabel}4;" class="label-item">Date Ordered:</span>
      <span ${styleItem}4;" class="value-item">${item.order_date}</span>
      <span ${styleLabel}5;" class="label-item">Status:</span>
      <span ${styleItem}5;" class="value-item">${item.status}</span>
      <span ${styleLabel}6;" class="label-item toggle-view due-date hidden">Sales Order #:</span>
      <span ${styleItem}6;" class="value-item toggle-view due-date hidden">${item.sales_order}</span>
    `
    productIndex++
  }
  detailsElement.innerHTML = newItems
  return productDetails
}

function generatePrice(data, delivered='only', dateRestricted=true) {
  const podData = reorganizeData(data.podData, delivered, dateRestricted)

  for(const itemType of ['Products', 'Samples']) {
    const itemDiv = createElement(
      'div',
      ['price-list-item', 'flex-container', 'vertical'],
      `#by-price-${delivered === 'only' ? 'delivered' : (dateRestricted ? 'undelivered' : 'all')}`,
    )
    itemDiv.innerHTML = `
    <div class="price-list-header">
      <span class="customer-title">${itemType}</span>
      <span class="quantity-grand-total"></span>
    </div>
    <div class="lists vertical flex-container"></div>
    `

    const lists = itemDiv.querySelector('.lists')
    const dataArray = Object.keys(podData)
      .sort((a,b) => getNumFromString(b) - getNumFromString(a))
    let grandTotalQuantity = 0
    for(const priceType of dataArray) {
      grandTotalQuantity += podData[priceType].totals.quantity
      if(itemType === 'Products' && getNumFromString(priceType) > MINIMUM_VALUE_FOR_SAMPLE
      || itemType === 'Samples' && getNumFromString(priceType) <= MINIMUM_VALUE_FOR_SAMPLE) {
        const details = generateProductByPriceDetails(priceType, podData[priceType])
        lists.appendChild(details)
      }
    }
    itemDiv.querySelector('.quantity-grand-total').innerText = `Grand Total Quantity: : ${grandTotalQuantity}`
  }
}

export default generatePrice
