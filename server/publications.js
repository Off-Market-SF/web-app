/* ---------------------------------------------------- +/

## Publications ##

All publications-related code. 

/+ ---------------------------------------------------- */
//NOT PUBLISHING Actors currently

//publish all suburbs
Meteor.publish('suburbs', function() {
	return Suburbs.find();
});

//publish all neighborhoods
Meteor.publish('neighborhoods', function(){
	return Neighborhoods.find();
});

//publish all comp coefs
Meteor.publish('compCoefs', function(){
	return CompCoefs.find();
});

//publish home
Meteor.publish('currentHome', function(id){
	return Homes.find(id);
});

//publish comp group
Meteor.publish('compGroup', function(compGroup){
	return HomeComps.find({compGroup: compGroup});
});

// Publish all items

Meteor.publish('allItems', function() {
  return Items.find();
});

// Publish a single item

Meteor.publish('singleItem', function(id) {
  return Items.find(id);
});