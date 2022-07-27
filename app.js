//importing modules
var express = require('express');
var mongoose = require('mongoose');
var bodyparser = require('body-parser');
var cors = require('cors');
var path = require('path');

const route = require('./routes/route');

var app = express();

const port=3000;

//connect to mongodb
mongoose.connect('mongodb://localhost:27017/contactlist');

//on connection
mongoose.connection.on('connected',()=>{
    console.log('Connection to mongodb successful');
})

mongoose.connection.on('error',(err)=>{
    if(err){
        console.log('Error in connecting to mongodb'+err);
    }
})

//adding middleware
app.use(cors());

//body-parser 
app.use(bodyparser.json());

//static files
app.use(express.static(path.join(__dirname,'public')));

app.use('/api',route);

app.listen(port,()=>{
    console.log('port no.'+port+' is active');
})

app.get('/',(req,res)=>{
    res.send('foobar');
})