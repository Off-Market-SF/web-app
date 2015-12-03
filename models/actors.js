Actors = new Mongo.Collection("actors");

var ActorsSchema = new SimpleSchema({
	firstName: {
		type: String
	},
	lastName: {
		type: String
	},
	email: {
		type: String
	},
	phone: {
		type: String
	},
	isBuyer: {
		type: Boolean
	},
	buyerStats: {
		type: Object,
		blackbox: true,
		optional: true
	},
	isSeller: {
		type: Boolean
	},
	sellerStats: {
		type: Object,
		blackbox: true,
		optional: true
	},
	creationDate: {
		type: String
	},
	lastUpdatedDate: {
		type: String
	},
	password: {
		type: String,
		min: 8,
		max: 20,
		optional: true
	}
});

validateActor = function(actorAttributes){
	errors = {};
	if(!actorAttributes.firstName)
		errors.firstName = "A first name is required";
	if(!actorAttributes.lastName)
		errors.lastName = "A last name is required";
	if(!actorAttributes.email)
		errors.email = "A valids email address is required";
	if(!actorAttributes.isBuyer && !actorAttributes.isSeller)
		errors.actorType = "One must either be a buyer or a seller. Or both.";
	var emailRegEx = /.+@.+\..+/i;
	if(!emailRegEx.test(actorAttributes.email))
		errors.email = "A valid email address is required";
	return errors;
}

Meteor.methods({
	insertActor: function(actorAttributes){
		check(actorAttributes, {
			firstName: String,
			lastName: String,
			email: String,
			phone: Match.Optional(String),
			isBuyer: Match.Optional(Boolean),
			isSeller: Match.Optional(Boolean),
			buyerStats: Match.Optional(Object),
			sellerStats: Match.Optional(Object),
			password: Match.Optional(String),
			referredBy: Match.Optional(String)
		});

		var errors = validateActor(actorAttributes);
		if(errors.actorType || errors.firstName || errors.lastName || errors.email)
			throw new Meteor.Error('invalid-actor', 'The actor attempted to be created is invalid');

		
		var sameActor = Actors.findOne({email: actorAttributes.email});
		if(sameActor){
			actorAttributes = _.extend(actorAttributes, {
				lastUpdatedDate: (new Date()).toUTCString()
			});
			Actors.update(sameActor, {$set: actorAttributes});
			return {
				userExists: true,
				_id: sameActor._id
			};
		}

		var actor = _.extend(actorAttributes, {
			creationDate: (new Date()).toUTCString(),
			lastUpdatedDate: (new Date()).toUTCString()
		});

		var actorID = Actors.insert(actor);
		return {
			_id: actorID
		};
	},
	addEmailList: function(arguments){
		check(arguments, {
			emailList: String,
			actorID: String
		});

		var actor = Actors.findOne({_id: arguments.actorID});
		if(!actor && Meteor.isServer)
			throw new Meteor.Error('no-actor', 'Could not find the Actor for the email list');

		Actors.update(actor, {$set: {emailList: arguments.emailList}});
		return {
			_id: actor._id
		}
	}
});