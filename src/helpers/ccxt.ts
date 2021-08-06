import * as ccxt from 'ccxt'

// Create exchanges objects
const exchangesMap = {} as { [key: string]: ccxt.Exchange }
for (const exchange of ccxt.exchanges) {
  const exchangeObject = new ccxt[exchange]()
  if (exchangeObject.hasFetchTickers) {
    exchangesMap[exchange] = exchangeObject
  }
}
console.log(
  `${Object.keys(exchangesMap).length} Exchanges initialized: ${Object.keys(
    exchangesMap
  ).join(', ')}`
)

export const tickers = {}
const tickersRefreshLocks = {}

for (const exchange of Object.values(exchangesMap)) {
  setInterval(async () => {
    if (tickersRefreshLocks[exchange.id]) {
      return
    }
    tickersRefreshLocks[exchange.id] = true
    try {
      const fetchedTickers = await exchange.fetchTickers()
      const preparedTickers = {}
      for (const tickerKey of Object.keys(fetchedTickers)) {
        const ticker = fetchedTickers[tickerKey]
        preparedTickers[ticker.symbol.replace('/', '')] = ticker
      }
      console.log(Object.keys(preparedTickers))
      tickers[exchange.id] = preparedTickers
      console.log(`Refreshed ${exchange.id} tickers`)
    } catch (e) {
      console.error(`Could not refresh ${exchange.id} tickers`)
    } finally {
      tickersRefreshLocks[exchange.id] = false
    }
  }, 5 * 1000)
}
