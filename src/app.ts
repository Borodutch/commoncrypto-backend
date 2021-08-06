import 'reflect-metadata'
import * as Koa from 'koa'
import * as bodyParser from 'koa-bodyparser'
import { bootstrapControllers } from 'amala'
import * as cors from '@koa/cors'
import * as Router from 'koa-router'
const ratelimit = require('koa-ratelimit')

const db = new Map()

export const app = new Koa()
;(async () => {
  try {
    const router = new Router()
    await bootstrapControllers({
      app,
      router,
      basePath: '/',
      controllers: [__dirname + '/controllers/*'],
      disableVersioning: true,
    })
    app.use(
      ratelimit({
        duration: 1000,
        max: 100,
        errorMessage:
          'Too many requests, please try again later (limit is 100 requests per second)',
        driver: 'memory',
        db,
      })
    )
    app.use(cors({ origin: '*' }))
    app.use(bodyParser())
    app.use(router.routes())
    app.use(router.allowedMethods())
  } catch (err) {
    console.log('Koa app starting error: ', err)
  }
})()
