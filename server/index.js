import bodyParser from 'koa-bodyparser'
import Koa from 'koa'
import logger from 'koa-logger'
import mongoose from 'mongoose'
import restc from 'restc'
import routing from './routes/'
import { port, connectionString } from './config'
import cors from '@koa/cors'

mongoose.Promise = global.Promise;
mongoose.connect(connectionString)
mongoose.connection.on('error', console.error)

// Create Koa Application
const app = new Koa();
const serve = require('koa-static');

app
  .use(cors())
  .use(logger())  
  .use(serve('apidocs'))
  .use(restc.koa2())
  .use(bodyParser())

routing(app);

// Start the application
app.listen(port, () => console.log(`✅  The server is running at http://localhost:${port}/`))

export default app
