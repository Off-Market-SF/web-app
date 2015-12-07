//helpers that yield contextually determined values for the template
Template.homeCompRow.helpers({
	//stylizes a number with a '$' and appropriate commas
	stylizedPrice: function() {
		return '$' + this.price.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	},
	stylizedSqFtPrice: function() {
		return '$' + this.sqFtPrice.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	}
});