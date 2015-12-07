//Interaction and dynamic value assignment code for the main footer
Template.footerFront.helpers({

});

//These define behaviors that respond to the click events
//for various menu items
Template.footerFront.events({
	//basically: if the html element with the id 'footer-faqs'
	//is clicked then run a function that suppresses the default click behavior
	//and the routes the application to the route named 'faqs'
	'click #footer-faqs': function(e){
		e.preventDefault();
		
		Router.go('faqs');
	},
	'click #footer-about-us': function(e){
		e.preventDefault();
		
		Router.go('homepage');
	},
	'click #footer-howitworks': function(e){
		e.preventDefault();

		Router.go('howitworks');
	},
	'click #footer-contact': function(e){
		e.preventDefault();
		
		Router.go('contact');
	},
	'click #footer-privacy': function(e){
		e.preventDefault();
		
		Router.go('privacy');
	},
	'click #footer-terms': function(e) {
		e.preventDefault();
		
		Router.go('terms');
	}
});