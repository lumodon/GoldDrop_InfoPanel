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
}
