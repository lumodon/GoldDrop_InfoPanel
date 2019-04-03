import generatePrice from './price/price'
import generateCustomer from './customer/customer'
import generateProduct from './product/product'

function clearAllPopulatedData() {
  for(const child of document.querySelector('#pax-pods').children) {
    // for(const innerChild of child.children) {
      child.innerHTML = ``
    // }
  }
}

export default (data) => {
  clearAllPopulatedData()
  generatePrice(data, 'only', true)
  generatePrice(data, 'excluded', true)
  generatePrice(data, 'any', false)
  generateCustomer(data)
  generateProduct(data)
}
