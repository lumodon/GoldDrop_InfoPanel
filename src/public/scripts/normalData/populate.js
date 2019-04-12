import generateCustomer from './customer/customer'
import populateLegacy from './legacy/legacy'

export default (data) => {
  generateCustomer(data)
  populateLegacy(data)
}
