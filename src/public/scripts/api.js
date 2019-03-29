export default ({ route='', body={} }) => {
  return fetch(`/api/${route}`, {
    'method': 'POST',
    'headers': {
      'Accept': 'application/json, text/plain, text/html',
      'Content-Type': 'application/json',
    },
    'body': JSON.stringify(body),
  }).then(res => res.json())
}
