import express from 'express'
import cors from 'cors'
import globalErrorHandler from './app/Utils/globalError.handler'
import router from './app/modules/Router/index.Router'
const app = express()

app.use(express.json())
app.use(cors())


app.get('/', (req, res) => {
    res.send('Hello, this is bike riding sever!!')
})

//all route integrate here

app.use('/api', router)

//global error handler

app.use(globalErrorHandler)

export default app