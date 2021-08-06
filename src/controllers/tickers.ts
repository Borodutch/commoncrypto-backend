import { tickers } from '@/helpers/ccxt'
import { Controller, Ctx, Get, Params } from 'amala'

@Controller('/tickers')
export default class TickersController {
  @Get('/:exchange')
  sybmols(@Ctx() ctx, @Params('exchange') exchange: string) {
    if (!tickers[exchange]) {
      ctx.status = 404
      return 'Exchange not found'
    }
    return tickers[exchange]
  }
}
