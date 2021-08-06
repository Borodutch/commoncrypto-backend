# General notes

- Docs are available in [HTML](https://api.commoncrypto.dev) and [Markdown](https://api.commoncrypto.dev/md)
- API runs at [https://api.commoncrypto.dev](https://api.commoncrypto.dev)
- Rate limit is 2 requests per second

# API documentation

### Get `/exchanges`

Returns a list of all exchanges as an array of strings.

### Get `/pairs/:exchange`

Returns a list of all pairs for the given exchange as an array of strings.

### Get `/ticker/:exchange/:pair`

Returns the ticker for the given exchange and pair. Pair format is `CURRENCYCURRENCY` like `BTCUSD`.
