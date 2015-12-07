//Defines behaviors and dynamic value assignment for the main header template

//is below necessary?
Template.headerFront.helpers({
  messages: function () {
    return Messages.find();
  },
  isLoggedIn: function () {
    return !!Meteor.user();
  }
});

//define responses to interaction events. In this template's case,
//responses to menu items being clicked are each defined
Template.headerFront.events({
  //is below necessary?
  'click .log-out': function () {
    Meteor.logout();
  },

//if the menu item with the id 'menu-home' is clicked,
//prevent the default behavior and then go to the route with the
// path '/''
  'click #menu-home': function(e) {
    e.preventDefault();
    
  	Router.go('/');
  },

  'click #menu-sellers': function(e) {
    e.preventDefault();
    
    //conditional response so that if the 'sellers' menu item is clicked
    //from within the 'homepage' route, there will be an animated scroll
    //as opposed to a page reload and then scroll
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

//The onRendered function runs the function given to it as an argument when the 
//calling template is rendered -
//in this case, it initiates the dropdown interactvity when the html document is ready
//the $(...) marking indicate calls to the jQuery library
Template.headerFront.onRendered(function (){
	$(document).ready(function() {
		$('.ui.dropdown').dropdown();
	});
});