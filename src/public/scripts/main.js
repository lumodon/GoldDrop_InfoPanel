import setupMenuButtons from './menu'

import { populateDataJson } from './api'

import populateNormalData from './normalData/populate'
import addNormalDataClickEvents from './normalData/clickEvents'

import populatePaxData from './paxData/populate'

function main() {
  document.addEventListener('DOMContentLoaded', () => {
    setupMenuButtons()

    populateDataJson({'route': 'populatedata'}).then((data) => {
      populateNormalData(data)
      populatePaxData(data)
    }).then(() => {
      addNormalDataClickEvents()
    })
  })
}

main()
