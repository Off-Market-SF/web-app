Template.homepage.events({
	'click #seller-button': function(e){
		e.preventDefault();

		$('html,body').animate({
   			scrollTop: $("#seller-benefits").offset().top - 10
		});
	},

	'click #buyer-button': function(e){
		e.preventDefault();
		
		$('html,body').animate({
   			scrollTop: $("#buyer-benefits").offset().top - 10
		});
	},

	'click #homeowner-button': function(e) {
		e.preventDefault();
		
		$('html,body').animate({
   			scrollTop: $("#homeowner-benefits").offset().top - 100
		});
	},

	'click #register-seller-button': function(e) {
		e.preventDefault();
		
		Router.go('sellerRegister');
	},

	'click #register-buyer-button': function(e) {
		e.preventDefault();
		
		Router.go('registerBuyer');
	},

	'click #register-homeowner-button': function(e) {
		e.preventDefault();
		
		Router.go('homeownerRegister');
	}
});