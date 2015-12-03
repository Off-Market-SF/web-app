Template.faqs.onRendered(function() {
	$(document).ready(function(){
		$('.ui.accordion').accordion();
	});
});

Template.faqs.events({
	'click #link-homeowner': function(e){
		e.preventDefault();
		
		Router.go('/#homeowner-benefits');
	},
	'click #link-seller': function(e) {
		e.preventDefault();
		
		Router.go('/#seller-benefits');
	},
	'click #link-buyer': function(e) {
		e.preventDefault();
		
		Router.go('/#buyer-benefits');
	},
	'click #homeowner-button': function(e) {
		e.preventDefault();
		
		$('html,body').animate({
   			scrollTop: $("#for-homeowners").offset().top - 10
		});
	},
	'click #buyer-button': function(e) {
		e.preventDefault();
		
		$('html,body').animate({
   			scrollTop: $("#for-buyers").offset().top - 10
		});
	},
	'click #seller-button': function(e) {
		e.preventDefault();
		
		$('html,body').animate({
   			scrollTop: $("#for-sellers").offset().top - 10
		});
	}
});