import generatePrice from './price/price'
import generateCustomer from './customer/customer'
import generateProduct from './product/product'

export default (data) => {
  generatePrice(data)
  generateCustomer(data)
  generateProduct(data)
}
