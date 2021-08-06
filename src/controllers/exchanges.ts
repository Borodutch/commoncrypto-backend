import { tickers } from '@/helpers/ccxt'
import { Controller, Get } from 'amala'

@Controller('/exchanges')
export default class ExchangesController {
  @Get('/')
  exchanges() {
    return Object.keys(tickers)
  }
}
