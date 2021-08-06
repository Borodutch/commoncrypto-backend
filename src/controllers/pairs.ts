import { tickers } from '@/helpers/ccxt'
import { Controller, Ctx, Get, Params } from 'amala'

@Controller('/pairs')
export default class PairsController {
  @Get('/:exchange')
  exchanges(@Ctx() ctx, @Params('exchange') exchange: string) {
    if (!tickers[exchange]) {
      ctx.status = 404
      return 'Exchange not found'
    }
    return Object.keys(tickers[exchange])
  }
}
