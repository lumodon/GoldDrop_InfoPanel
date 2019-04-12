function populate(data) {
  const skus = {}
  for(const sale of data.salesReport) {
    // HELP DEEPLY APPENDING WITH CHECKS!!
    if(skus[sale.sku]) {
      if(skus[sale.sku].sales && skus[sale.sku].sales[sale.cost_per_unit]) {
        skus[sale.sku].sales[sale.cost_per_unit].total += Number(sale.quantity)
        skus[sale.sku].sales[sale.cost_per_unit].sales.push(sale)
      } else {
        skus[sale.sku].sales[sale.cost_per_unit] = {
          'total': Number(sale.quantity),
          'sales': [sale],
        }
      }
    } else {
      skus[sale.sku] = {
        'name': sale.unit_name,
        'sales': {
          [sale.cost_per_unit]: {
            'total': Number(sale.quantity),
            'sales': [sale],
          }
        }
      }
    }
  }

  console.log(skus)

  const parentContainer = document.querySelector('.sales-by-product .list')

  for(const sku in skus) {
    const skuContainer = document.createElement('div')
    skuContainer.classList.add('flex-container', 'vertical', 'sku-container')
    parentContainer.appendChild(skuContainer)

    skuContainer.innerHTML = `
      <span class="category-title">${skus[sku].name}</span>
      <div class="values-list vertical flex-container">
        <span class="values-list-total"></span>
        <span class="category-title big-row-item">SKU: ${sku}</span>
      </div>
    `

    const valuesList = skuContainer.querySelector('.values-list')
    for(const cost in skus[sku].sales) {
      const costContainer = document.createElement('div')
      costContainer.classList.add('flex-container', 'vertical', 'cost-container', 'big-row-item', 'space-bottom')
      valuesList.appendChild(costContainer)

      costContainer.innerHTML = `
        <span class="cost-amount">Price Point: ${cost}</span>
        <span class="quantity-amount" style="border-bottom: 2px solid black;">Total Qty: ${skus[sku].sales[cost].total}</span>
        <div class="cost-list vertical flex-container"></div>
      `
      const costList = costContainer.querySelector('.cost-list')
      try {
        for(const value of skus[sku].sales[cost].sales) {
          const itemItself = document.createElement('div')
          itemItself.classList.add('item')
          costList.appendChild(itemItself)

          itemItself.innerHTML = `
            <span>Quantity: ${value.quantity}</span>
          `
        }
      } catch(e) {
        debugger;
        console.error(e)
      }
    }
  }


}

export default populate
