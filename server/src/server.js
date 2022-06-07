import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import userRoute from './routes/userRoute.js'
import { v4 as uuidv4 } from 'uuid'

console.log(userRoute)

const app = express()
const port = process.env.PORT || 3001
const db = mongoose.connection
mongoose.connect('mongodb://localhost:27017/gitkeep', {
	useNewUrlParser: true,
	useUnifiedTopology: true
})
db.once('open', () => {
	console.log('DB connected')
})
app.use(express.json())
app.use(cors())
app.use('/user', userRoute)

app.listen(port, () => console.log('app on port '+ port))