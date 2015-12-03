HomeCustomers = new Mongo.Collection("homeCustomers");

var validateAccountInfo = function(accountAttributes){
	var errors = {};
	if(!accountAttributes.password || accountAttributes.password.length < 8)
		errors.password = "Invalid password submitted";
	if(!accountAttributes.duration || isNaN(accountAttributes.duration))
		errors.duration = "Invalid ownership duration submitted";
	if(!accountAttributes.interest || isNaN(accountAttributes.interest))
		errors.interest = "Invalid interest level submitted";
	return errors;
};

var validatePricingInfo = function(pricingAttributes){
	var errors = {};
	if(!pricingAttributes.desiredTiming || isNaN(pricingAttributes.desiredTiming))
		errors.desiredTiming = "Error in desiredTiming parameter";
	if(!pricingAttributes.floorPrice || isNaN(pricingAttributes.floorPrice))
		errors.floorPrice = "Error in floorPrice";
	if(!pricingAttributes.contactPref || (pricingAttributes.contactPref != 'email' && pricingAttributes.contactPref != 'phone'))
		errors.contactPref = "Error in contactPref";
	if(pricingAttributes.phone){
		if(pricingAttributes.phone.length != 10 || isNaN(pricingAttributes.phone))
			errors.phone = "Phone not a 10 digit number";
	}
	return errors;
};	

Meteor.methods({
	addSellerAccountInfo: function(accountAttributes){
		check(accountAttributes, {
			password: String,
			duration: String,
			interest: String,
			sellerID: String,
			homeCustomerID: String
		});

		var errors = validateAccountInfo(accountAttributes);
		if(errors.duration || errors.password || errors.interest)
			throw new Meteor.Error('invalid-account-info', 'Account info could not be validated');

		var actor = Actors.findOne(accountAttributes.sellerID);
		if(!actor && Meteor.isServer)
			throw new Meteor.Error('invalid-actor', 'Could not find actor for id');
		var homeCustomer = HomeCustomers.findOne(accountAttributes.homeCustomerID);
		if(!homeCustomer)
			throw new Meteor.Error('invalid-homeCustomer', 'Could not find homecustomer for id');
		var actorAttributes = {
			lastUpdatedDate: (new Date()).toUTCString(),
			password: accountAttributes.password,
			sellerStats: {
				interest: accountAttributes.interest
			}
		};
		var homeCustomerAttributes = {
			lastUpdatedDate: (new Date()).toUTCString(),
			interest: accountAttributes.interest,
			ownershipDuration: accountAttributes.duration
		};
		Actors.update(actor, {$set: actorAttributes});
		HomeCustomers.update(homeCustomer, {$set: homeCustomerAttributes});
		return {};
	},
	addDesiredPricing: function(pricingAttributes){
		check(pricingAttributes, {
			desiredTiming: String,
			floorPrice: String,
			contactPref: String,
			phone: Match.Optional(String),
			homeCustomerID: String,
			actorID: String
		});

		var errors = validatePricingInfo(pricingAttributes);
		if(errors.desiredTiming || errors.contactPref || errors.floorPrice || errors.phone)
			throw new Meteor.Error('invalid-pricing-info', 'Pricing info could not be validated');

		var actor = Actors.findOne(pricingAttributes.actorID);
		if(!actor && Meteor.isServer)
			throw new Meteor.Error('invalid-actor', 'Could not find actor');
		var homeCustomer = HomeCustomers.findOne(pricingAttributes.homeCustomerID);
		if(!homeCustomer && Meteor.isServer)
			throw new Meteor.Error('invalid-homeCustomer', 'Could not find homecustomer');

		var actorAttributes = {
			contactPref: pricingAttributes.contactPref,
			lastUpdatedDate: (new Date()).toUTCString()
		};
		if(pricingAttributes.phone){
			actorAttributes = _.extend(actorAttributes, {
				phone: pricingAttributes.phone
			});
		}
		var homeCustomerAttributes = {
			desiredTiming: pricingAttributes.desiredTiming,
			floorPrice: pricingAttributes.floorPrice,
			contactPref: pricingAttributes.contactPref,
			lastUpdatedDate: (new Date()).toUTCString()
		};
		Actors.update(actor, {$set: actorAttributes});
		HomeCustomers.update(homeCustomer, {$set: homeCustomerAttributes});

		return {};
	}
});