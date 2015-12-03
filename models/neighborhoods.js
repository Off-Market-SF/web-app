Neighborhoods = new Mongo.Collection("neighborhoods");

var NeighborhoodsSchema = new SimpleSchema({
	name: {
		type: String
	},
	suburbID: {
		type: String
	},
	sqFtPrice: {
		type: String
	},
	homeCompGroup: {
		type: String
	}
});

Neighborhoods.attachSchema(NeighborhoodsSchema);