Template.registerHelper('isFlows', function() {
	var routeName = Router.current().route.name;
	return routeName != 'homepage' &&
		routeName != 'faqs' &&
		routeName != 'privacy' &&
		routeName != 'terms' &&
		routeName != 'contact' &&
		routeName != 'howitworks';
});