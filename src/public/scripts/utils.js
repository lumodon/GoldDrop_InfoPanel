const createElement = (type, classList, parent, parentQuerySelector=document) => {
  const ele = document.createElement(type)
  ele.classList.add(...classList)
  if(parent) {
    if(parent instanceof HTMLElement) {
      parent.appendChild(ele)
    } else if(typeof parent === 'string') {
      parentQuerySelector.querySelector(parent).appendChild(ele)
    }
  }

  return ele
}

const convertToCurrency = (value) => {
  return Number(value).toLocaleString('en-US', {
    'style': 'currency', 'currency': 'USD'
  })
}

const calculateRealValue = (total, sample) => {
  const [ totalNum, sampleNum ] = ([total, sample]).map(it => Number(it.replace(/[$,]/g, '')))
  return convertToCurrency(totalNum - sampleNum)
}

export {
  convertToCurrency,
  calculateRealValue,
  createElement,
}
