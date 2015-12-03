Template.headerFront.helpers({
  messages: function () {
    return Messages.find();
  },
  isLoggedIn: function () {
    return !!Meteor.user();
  }
});

Template.headerFront.events({
  'click .log-out': function () {
    Meteor.logout();
  },
  'click #menu-home': function(e) {
    e.preventDefault();
    
  	Router.go('/');
  },
  'click #menu-sellers': function(e) {
    e.preventDefault();
    
  	if(Router.current().route.name === 'homepage'){
  		$('html,body').animate({
   			scrollTop: $("#seller-benefits").offset().top - 10
		});
  	} else {
  		Router.go('/#seller-benefits');
  	}
  },
  'click #menu-buyers': function(e) {
    e.preventDefault();
    
  	if(Router.current().route.name === 'homepage'){
  		$('html,body').animate({
   			scrollTop: $("#buyer-benefits").offset().top - 10
		});
  	} else {
  		Router.go('/#buyer-benefits');
  	}
  },
  'click #menu-homeowners': function(e) {
    e.preventDefault();
    
  	if(Router.current().route.name === 'homepage'){
  		$('html,body').animate({
   			scrollTop: $("#homeowner-benefits").offset().top - 100
		});
  	}else{
  		Router.go('/#homeowner-benefits');
  	}
  },
  'click #menu-faqs': function(e) {
    e.preventDefault();
    
  	Router.go('faqs');
  },
  'click #menu-contact': function (e) {
    e.preventDefault();
    
  	Router.go('contact');
  },
  'click #menu-howitworks': function(e){
    e.preventDefault();

    Router.go('howitworks');
  },
  'click #menu-right-offmarket': function(e) {
    e.preventDefault();
    
  	Router.go('homepage');
  }
});

Template.headerFront.onRendered(function (){
	$(document).ready(function() {
		$('.ui.dropdown').dropdown();
	});
});