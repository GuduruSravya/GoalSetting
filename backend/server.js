const express = require('express');
const colors = require('colors');
const dotenv = require('dotenv').config();
const {connectDb} = require('./config/db');
const {errorHandler} = require('./middleware/errorMiddleware')

connectDb()
const port = process.env.PORT || 5000;

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use('/api/goals',require('./routes/goalRoutes'));
app.use('/api/users',require('./routes/userRoutes'));
app.use(errorHandler);

app.listen(port, ()=>console.log(`Server started listening on port ${port}`))