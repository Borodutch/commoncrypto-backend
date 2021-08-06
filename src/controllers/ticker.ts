import { tickers } from '@/helpers/ccxt'
import { Controller, Ctx, Get, Params } from 'amala'

@Controller('/ticker')
export default class TickerController {
  @Get('/:exchange/:pair')
  sybmols(
    @Ctx() ctx,
    @Params('exchange') exchange: string,
    @Params('pair') pair: string
  ) {
    if (!tickers[exchange] || !tickers[exchange][pair]) {
      ctx.status = 404
      return 'Exchange or pair not found'
    }
    return tickers[exchange][pair]
  }
}
