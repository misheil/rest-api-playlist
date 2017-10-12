const express=require('express');

//set uo express app
const router=express.Router();
const Ninja=require('../moduls/ninja');

// get a list of ninjas from the db

router.get('/ninjas',function(req,res,next){
// res.send({type:'GET'});

/* Ninja.find({}).then(function(ninjas){
  res.send(ninjas);
}):*/
Ninja.geoNear(
  {type: 'Point', coordinates: [parseFloat(req.query.lng), parseFloat(req.query.lat)]},  
  {maxDistance: 100000, spherical: true}
).then(function(ninjas){
  res.send(ninjas);
});

});


router.post('/ninjas',function(req,res,next){
	// console.log(req.body);
	// var ninja=new Ninja(req.body);
	// ninja.save();

Ninja.create(req.body).then(function(ninja){
		res.send(ninja).catch(next);
});



res.send({
	type:'POST',
	name:req.body.name,
	rank:req.body.rank
});

});



// Update the ninja to the db
router.put('/ninjas/:id',function(req,res,next){
	Ninja.findByIdAndUpdate({_id:req.params.id},req.body).then(function(ninja){

Ninja.findOne({_id:req.params.id}).then(function(ninja){ 
		res.send(ninja);
		});
	});
// res.send({type:'PUT'});
});


router.delete('/ninjas/:id',function(req,res,next){
	Ninja.findByIdAndRemove({_id:req.params.id}).then(function(ninja){
		 
		res.send(ninja);
	});
// console.log(req.params.id);
// res.send({type:'DELETE',id:req.params.id});
});

module.exports =router;