Homes = new Mongo.Collection('homes');


validateRegisterSeller = function(sellerAttributes){
	var errors = {};
	//city regex; address regex; zip constraint; isSeller + isHomeowner presence
	//email regex
	var emailRegEx = /.+@.+\..+/i;
	var cityRegEx = /^[A-Za-z\.\s\-]*$/;
	var addressRegEx = /^[A-Za-z0-9'\.\-\s\,\#]*$/;
	if(!sellerAttributes.firstName || !sellerAttributes.lastName)
		errors.sellerName = "A name is required";
	if(!sellerAttributes.address || !addressRegEx.test(sellerAttributes.address))
		errors.address = "A valid address is required";
	if(!sellerAttributes.city || !cityRegEx.test(sellerAttributes.city))
		errors.city = "A valid city is required";
	if(!sellerAttributes.state || !isValidState(sellerAttributes.state))
		errors.state = "A valid state is required";
	if(!sellerAttributes.zip || sellerAttributes.zip.length != 5 || isNaN(sellerAttributes.zip))
		errors.zip = "A valid zip is required";
	if(!sellerAttributes.email || !emailRegEx.test(sellerAttributes.email))
		errors.email = "A valid email is required";
	return errors;
};

var validateRegisterSellerHome = function(homeAttributes){
	var errors = {};
	if(!homeAttributes.bedrooms || isNaN(homeAttributes.bedrooms))
		errors.bedrooms = "Bedrooms value must be a number";
	if(!homeAttributes.garages || isNaN(homeAttributes.garages))
		errors.garages = "garages value must be a number";
	if(!homeAttributes.halfBathrooms || isNaN(homeAttributes.halfBathrooms))
		errors.bedrooms = "halfBathrooms value must be a number";
	if(!homeAttributes.fullBathrooms || isNaN(homeAttributes.fullBathrooms))
		errors.fullBathrooms = "fullBathrooms value must be a number";
	if(!homeAttributes.quality || isNaN(homeAttributes.quality))
		errors.quality = "quality value must be a number";
	if(!homeAttributes.sqft || isNaN(homeAttributes.sqft))
		errors.sqft = "sqft value must be a number";
	return errors;
};

var getNeighborhoodAndCompGroup = function(sellerAttributes){
	var neighborhoodAndComp = {};
	var neighborhood = Neighborhoods.findOne({name: 'Default'});
	console.log(neighborhood);
	if(!neighborhood && Meteor.isServer)
		throw new Meteor.Error('invalid-neighborhood', 'cannot find neighborhood for address');
	neighborhoodAndComp.neighborhoodID = neighborhood._id;
	neighborhoodAndComp.compGroup = neighborhood.homeCompGroup;
	return neighborhoodAndComp;
};

Meteor.methods({
	registerSellerHome: function(homeAttributes){
		check(homeAttributes, {
			bedrooms: String,
			garages: String,
			halfBathrooms: String,
			fullBathrooms: String,
			quality: String,
			sqft: String,
			homeID: String,
			sellerID: String,
			additionalInfo: Match.Optional(String)
		});
		var errors = validateRegisterSellerHome(homeAttributes);
		if(errors.bedrooms || errors.fullBathrooms || errors.garages || errors.sqft || errors.quality || errors.halfBathrooms)
			throw new Meteor.Error('invalid-register-seller-home', 'An input to registerSellerHome is off');

		var home = {
			bedrooms: homeAttributes.bedrooms,
			garages: homeAttributes.garages,
			halfBathrooms: homeAttributes.halfBathrooms,
			fullBathrooms: homeAttributes.fullBathrooms,
			quality: homeAttributes.quality,
			sqft: homeAttributes.sqft,
			compSize: getCompSize(homeAttributes.sqft),
			source: "OM"
		};
		var homeCustomer = {
			homeID: homeAttributes.homeID,
			actorID: homeAttributes.sellerID,
			actorType: 'owner',
			homeComments: homeAttributes.additionalInfo
		};
		var sameHome = Homes.findOne(homeAttributes.homeID);
		if(!sameHome && Meteor.isServer)
			throw new Meteor.Error('invalid-register-seller-home', 'homeID did not turn up a home');
		home = _.extend(home, {
			lastUpdatedDate: (new Date()).toUTCString()
		});
		Homes.update(sameHome, {$set: home});
		var homeCustomerID = HomeCustomers.insert(homeCustomer);
		return {
			homeCustomerID: homeCustomerID
		}
	},
	registerSeller: function(sellerAttributes){
		check(sellerAttributes, {
			firstName: String,
			lastName: String,
			address: String,
			city: String,
			state: String,
			zip: String,
			email: String,
			isSeller: Boolean,
			isHomeowner: Boolean
		});

		var errors = validateRegisterSeller(sellerAttributes);
		if(errors.sellerName || errors.address || errors.city || errors.state || errors.zip || errors.email)
			throw new Meteor.Error('invalid-register-seller', 'An input to registerSeller is off');

		var actor = {
			firstName: sellerAttributes.firstName,
			lastName: sellerAttributes.lastName,
			email: sellerAttributes.email,
			isSeller: sellerAttributes.isSeller,
			isHomeowner: sellerAttributes.isHomeowner
		};
		
		var sameActor = Actors.findOne({email: sellerAttributes.email});
		var userExists = false;
		var sellerID;
		var homeID;
		if(sameActor){
			actor = _.extend(actor, {
				lastUpdatedDate: (new Date()).toUTCString()
			});
			
			Actors.update(sameActor, {$set: actor});
			sellerID = actor._id;
			userExists = true;
		}else{
			actor = _.extend(actor, {
				creationDate: (new Date()).toUTCString(),
				lastUpdatedDate: (new Date()).toUTCString()
			});
			
			sellerID = Actors.insert(actor);
		}
		
		var sanitizedAddress = sanitizeAddress(sellerAttributes.address);
		var sanitizedCity = sanitizeCity(sellerAttributes.city);
		var neighborhoodAndComp = getNeighborhoodAndCompGroup(sellerAttributes);
		var home = {
			address: sanitizedAddress,
			city: sanitizedCity,
			state: sellerAttributes.state,
			zip: sellerAttributes.zip,
			neighborhoodID: neighborhoodAndComp.neighborhoodID,
			compGroup: neighborhoodAndComp.compGroup
		}
		
		var sameHome = Homes.findOne({address: sanitizedAddress, city: sanitizedCity, zip: sellerAttributes.zip});
		if(sameHome){
			home = _.extend(home, {
				lastUpdatedDate: (new Date()).toUTCString()
			});
			
			Homes.update(sameHome, {$set: home});
			homeID = sameHome._id;
		} else {
			home = _.extend(home, {
				creationDate: (new Date()).toUTCString(),
				lastUpdatedDate: (new Date()).toUTCString()
			});
			
			homeID = Homes.insert(home);

		}
		return {
			homeID: homeID,
			sellerID: sellerID,
			compGroup: neighborhoodAndComp.compGroup,
			userExists: userExists
		};
	}
});