require('dotenv').config()

const cors = require('cors')

const express = require('express')
const mongoose = require('mongoose')

const workoutRoutes = require('./routes/workouts')
const userRoutes = require('./routes/user')

// express app
const app = express()

app.use(cors());

mongoose.set('strictQuery', false);

// middleware

app.use(express.json())  // to handle data coming from POST or PATCH request

app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
    
})


// routes
app.use('/api/workouts', workoutRoutes)
app.use('/api/user', userRoutes)

// Connect to DB
mongoose.connect(process.env.MONGO_URI)
.then(() => {
    // listen for requests
    app.listen(process.env.PORT, () => {
        console.log('connected to DB & listening on port', process.env.PORT)
    })
})
.catch((error) => {
    console.log(error)
    
})


