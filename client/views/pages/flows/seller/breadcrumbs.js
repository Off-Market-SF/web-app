//helpers to produce contextually determined values for the breadcrumbs template
Template.breadcrumbs.helpers({
	//For a given breadcrumb step, determines based on the current route whether the step 
	//is active for the purposes of determining whether to have an icon for the step or not
	isActive: function(step) {
		var routeName = Router.current().route.name;
		if(step === 'step1'){
			if(routeName === 'sellerRegister' || routeName === 'homeownerRegister' ||
				routeName === 'sellerHome' || routeName === 'homeownerHome' ||
				routeName === 'sellerAccount' || routeName === 'homeownerAccount' ||
				routeName === 'sellerAppraisal' || routeName === 'homeowenerAppraisal' ||
				routeName === 'sellerTellMore' || routeName === 'homeownerTellMore' ||
				routeName === 'sellerHigherPrice' || routeName === 'homeownerHigherPrice')
				return true;
		}
		if(step === 'step2'){
			if(routeName === 'sellerAccount' || routeName === 'homeownerAccount' || 
				routeName === 'sellerAppraisal' || routeName === 'homeowenerAppraisal' ||
				routeName === 'sellerTellMore' || routeName === 'homeownerTellMore' ||
				routeName === 'sellerHigherPrice' || routeName === 'homeownerHigherPrice')
				return true;
		}
		if(step === 'step3'){
			if(routeName === 'sellerAppraisal' || routeName === 'homeowenerAppraisal' ||
				routeName === 'sellerTellMore' || routeName === 'homeownerTellMore' ||
				routeName === 'sellerHigherPrice' || routeName === 'homeownerHigherPrice')
				return true;
		}
		if(step === 'step4'){
			if(routeName === 'sellerTellMore' || routeName === 'homeownerTellMore' ||
				routeName === 'sellerHigherPrice' || routeName === 'homeownerHigherPrice')
				return true;
		}
	},

	//returns the proper display class for a given step based on the current route
	getStepClass: function(step){
		var routeName = Router.current().route.name;
		if(step === 'step1'){
			if(routeName === 'sellerTellMore' || routeName === 'homeownerTellMore' ||
				routeName === 'sellerHigherPrice' || routeName === 'homeownerHigherPrice')
				return 'completed';
			if(routeName === 'sellerAppraisal' || routeName === 'homeownerAppraisal')
				return 'completed';
			if(routeName === 'sellerAccount' || routeName === 'homeownerAccount')
				return 'completed';
			if(routeName === 'sellerRegister' || routeName === 'homeownerRegister' ||
				routeName === 'sellerHome' || routeName === 'homeownerHome')
				return 'active';
		}
		if(step === 'step2'){
			if(routeName === 'sellerTellMore' || routeName === 'homeownerTellMore' ||
				routeName === 'sellerHigherPrice' || routeName === 'homeownerHigherPrice')
				return 'completed';
			if(routeName === 'sellerAppraisal' || routeName === 'homeownerAppraisal')
				return 'completed';
			if(routeName === 'sellerAccount' || routeName === 'homeownerAccount')
				return 'active';
			if(routeName === 'sellerRegister' || routeName === 'homeownerRegister' ||
				routeName === 'sellerHome' || routeName === 'homeownerHome')
				return 'disabled';
		}
		if(step === 'step3'){
			if(routeName === 'sellerTellMore' || routeName === 'homeownerTellMore' ||
				routeName === 'sellerHigherPrice' || routeName === 'homeownerHigherPrice')
				return 'completed';
			if(routeName === 'sellerAppraisal' || routeName === 'homeownerAppraisal')
				return 'active';
			if(routeName === 'sellerAccount' || routeName === 'homeownerAccount')
				return 'disabled';
			if(routeName === 'sellerRegister' || routeName === 'homeownerRegister' ||
				routeName === 'sellerHome' || routeName === 'homeownerHome')
				return 'disabled';
		}
		if(step === 'step4'){
			if(routeName === 'sellerTellMore' || routeName === 'homeownerTellMore' ||
				routeName === 'sellerHigherPrice' || routeName === 'homeownerHigherPrice')
				return 'active';
			if(routeName === 'sellerAppraisal' || routeName === 'homeownerAppraisal')
				return 'disabled';
			if(routeName === 'sellerAccount' || routeName === 'homeownerAccount')
				return 'disabled';
			if(routeName === 'sellerRegister' || routeName === 'homeownerRegister' ||
				routeName === 'sellerHome' || routeName === 'homeownerHome')
				return 'disabled';
		}
	}
});