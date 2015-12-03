Template.footerFront.helpers({

});

Template.footerFront.events({
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