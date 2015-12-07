//used to define universal template helpers

//this helper is used to define route types for the purpose
//of differentially assigning headers and footers
Template.registerHelper('isFlows', function() {
	var routeName = Router.current().route.name;
	return routeName != 'homepage' &&
		routeName != 'faqs' &&
		routeName != 'privacy' &&
		routeName != 'terms' &&
		routeName != 'contact' &&
		routeName != 'howitworks';
});