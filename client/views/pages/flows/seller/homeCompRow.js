Template.homeCompRow.helpers({
	stylizedPrice: function() {
		return '$' + this.price.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	},
	stylizedSqFtPrice: function() {
		return '$' + this.sqFtPrice.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	}
});