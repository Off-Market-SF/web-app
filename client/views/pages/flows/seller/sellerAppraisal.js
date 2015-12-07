//a helper function to translated input form values into a named category
var getCategory = function(value, type){
	if(type === 'sqft'){
		sqft = round(value);
		if(sqft > 2500)
			return '>2500';
		if(sqft < 2500 && sqft > 2000)
			return '>2000 <2500';
		if(sqft < 2000 && sqft > 1500)
			return '>1500 <2000';
		if(sqft > 1500)
			return '<1500';
	}
	if(type === 'quality'){
		if(value === '1')
			return 'new';
		if(value === '2')
			return 'good';
		if(value === '3')
			return 'average';
		if(value === '4')
			return 'renovation';
	}
};


Template.sellerAppraisal.helpers({
	//returns the lowAppraisal value
	lowAppraisal: function(averagePrice){
		var sqFtCategory = getCategory(this.sqft, 'sqft');
		var qualityCategory = getCategory(this.quality, 'quality');
		var sqftCoef = CompCoefs.findOne({name: 'sqft', category: sqFtCategory});
		var qualityCoef = CompCoefs.findOne({name: 'quality', category: qualityCategory});
		if(sqftCoef.value < qualityCoef.value)
			return ('$' + round(sqftCoef.value * round(this.sqft) * averagePrice)).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
		else
			return ('$' + round(qualityCoef.value * round(this.sqft) * averagePrice)).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	},
	//returns the highAppraisal value
	highAppraisal: function(averagePrice) {
		var sqFtCategory = getCategory(this.sqft, 'sqft');
		var qualityCategory = getCategory(this.quality, 'quality');
		var sqftCoef = CompCoefs.findOne({name: 'sqft', category: sqFtCategory});
		var qualityCoef = CompCoefs.findOne({name: 'quality', category: qualityCategory});
		if(sqftCoef.value > qualityCoef.value)
			return ('$' + round(sqftCoef.value * round(this.sqft) * averagePrice)).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
		else
			return ('$' + round(qualityCoef.value * round(this.sqft) * averagePrice)).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	},
	//returns the average $/sqft
	averagePrice: function() {
		var homeComps = HomeComps.find({compGroup: this.compGroup}, {limit: 4}).fetch();
		//sums the sqft price
		var sumSqFtPrice = _.reduce(homeComps, function(memo, homeComp){
			var num = round(homeComp.sqFtPrice);
			return memo + num;
		}, 0);
	return round(sumSqFtPrice / 4);
	},
	//returns the top four home comps for a given compGroup
	homeComps: function() {
		return HomeComps.find({compGroup: this.compGroup}, {limit: 4}).fetch();
	}
});

Template.sellerAppraisal.events({
	//click events that route differentially based on whether the individual
	//has identified as a seller or homeowner
	'click #tell-me-more': function(){
		var routeName = Router.current().route.name;
		if(routeName === 'sellerAppraisal')
			Router.go('sellerAttractive');
		if(routeName === 'homeownerAppraisal')
			Router.go('homeownerAttractive');
	},
	'click #sell-higher': function() {
		var routeName = Router.current().route.name;
		if(routeName === 'sellerAppraisal')
			Router.go('sellerHigher');
		if(routeName === 'homeownerAppraisal')
			Router.go('homeownerHigher');
	}
});