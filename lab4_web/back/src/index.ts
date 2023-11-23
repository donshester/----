import express from 'express'
import cookieParser from 'cookie-parser'
import dotenv from 'dotenv'
import { AppDataSource } from './dataSource'
import router from './routes'
import { errorHandler } from './middlewares/error.middleware'
import cors from 'cors'
dotenv.config()

AppDataSource.initialize()
  .then(() => {
    console.log('Data Source has been initialized!')
    const app = express()
    app.use(
      cors({
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
        credentials: true,
        origin: 'http://localhost:3001',
        optionsSuccessStatus: 200,
      }),
    )
    app.use(function (req, res, next) {
      res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3001')

      res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3001')
      res.setHeader('Access-Control-Allow-Credentials', 'true')
      res.setHeader('Access-Control-Max-Age', '1800')
      res.setHeader('Access-Control-Allow-Headers', 'content-type')
      res.setHeader('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, PATCH, OPTIONS')
      next()
    })
    app.use(cookieParser())

    app.use(express.json())

    app.use('/api', router)
    app.use(errorHandler)

    const port = process.env.PORT || 3000
    app.listen(port, () => {
      console.log(`[server]: Server is running at http://localhost:${port}`)
    })
  })
  .catch((err) => {
    console.error('Error during Data Source initialization:', err)
  })
