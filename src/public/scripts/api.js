import paxPods from './paxData/populate'

// function acquirePaxPods() {
//   return import(/* webpackChunkName: "paxpods" */ './paxData/populate')
//     .then(({ default: paxPods }) => {
//       return paxPods
//     })
// }

const populateDataJson = () => {
  return fetch(`/api/populatedata`, {
    'method': 'POST',
    'headers': {
      'Accept': 'application/json, text/plain, text/html',
      'Content-Type': 'application/json',
    },
  }).then(res => res.json())
}

const repopulatePaxPods = () => {
  return new Promise(resolve => {
    fetch(`/api/populatedata`, {
      'method': 'POST',
      'headers': {
        'Accept': 'application/json, text/plain, text/html',
        'Content-Type': 'application/json',
      },
    })
      .then(res => res.json())
      .then(data => {
        return paxPods(data)
      })
  })
}

export {
  populateDataJson,
  repopulatePaxPods,
}
