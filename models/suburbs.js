Suburbs = new Mongo.Collection("suburbs");

var SuburbsSchema = new SimpleSchema({
	region: {
		type: String
	},
	name: {
		type: String
	}
});

Suburbs.attachSchema(SuburbsSchema);