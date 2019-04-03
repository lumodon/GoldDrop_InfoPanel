import generatePrice from './price/price'
import generateCustomer from './customer/customer'
import generateProduct from './product/product'

export default (data) => {
  generatePrice(data, 'only', true)
  generatePrice(data, 'excluded', true)
  generatePrice(data, 'any', false)
  generateCustomer(data)
  generateProduct(data)
}
