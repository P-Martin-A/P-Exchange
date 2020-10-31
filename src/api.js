const URL = 'https://api.coincap.io/v2'

function getAssets() {
  return fetch(`${URL}/assets?limit=20`)
          .then(res => res.json())
          .then(res => res.data)
          .catch(rej => console.error(rej))
}

function getAsset(coin) {
  return fetch(`${URL}/assets/${coin}`)
          .then(res => res.json())
          .then(res => res.data)
          .catch(rej => console.error(rej))
}

function getAssetHistory(coin) {
  const DATE  = new Date(),
        END   = DATE.getTime()

  DATE.setDate(DATE.getDate() - 1)
  
  const START = DATE.getTime()

  return fetch(`${URL}/assets/${coin}/history?interval=h1&start=${START}&end=${END}`)
          .then(res => res.json())
          .then(res => res.data)
          .catch(rej => console.error(rej))
}

function getMarkets(coin) {
  return fetch(`${URL}/assets/${coin}/markets?limit=5`)
          .then(res => res.json())
          .then(res => res.data)
          .catch(rej => console.error(rej))
}

function getExchange(id) {
  return fetch(`${URL}/exchanges/${id}`)
          .then(res => res.json())
          .then(res => res.data)
          .catch(rej => console.error(rej))
}

export default {
  getAssets,
  getAsset,
  getAssetHistory,
  getMarkets,
  getExchange
}