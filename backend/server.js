const express = require('express');
const path = require('path')
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


//Serve frontend
if(process.env.NODE_ENV === 'production'){
    app.use(express.static(path.join(__dirname,'../front-end/build')))

    app.get('*', (req,res)=> res.sendFile(path.resolve(__dirname,'../','front-end','build','index.html')))
}else{
    app.get('/',(req,res)=>res.send('Please set to production'))
}
app.use(errorHandler);

app.listen(port, ()=>console.log(`Server started listening on port ${port}`))