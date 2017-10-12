const express=require('express');
const bodyParser=require('body-parser');
const mongoose = require('mongoose');

//set uo express app
const app=express();

//connect to mongodb
mongoose.connect('mongodb://localhost/ninjago');
mongoose.Promise=global.Promise;

app.use(express.static('public')); 

app.use(bodyParser.json());
app.use('/api',require('./routes/api'));

app.use(function(err,req,res,next){
// console.log(err);
res.status(422).send({error:err.message});
});

// app.get('/api',function(req,res){
// console.log('Get request');
// res.send({name:'Misho'});
// });



//listen to requests
app.listen(process.env.port || 4000,function(){
console.log('Now listening fpr request');
});