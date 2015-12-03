Template.sellerHome.onRendered(function(){
	var semantic = {};
	semantic.ready = function() {

		  // selector cache
		  var
		    $buttons = $('.ui.buttons .button'),
		    $toggle  = $('.main .ui.toggle.button'),
		    $button  = $('.ui.button').not($buttons).not($toggle),
		    // alias
		    handler = {

		      activate: function() {
		        $(this)
		          .addClass('active')
		          .siblings()
		          .removeClass('active')
		        ;
		      }

		    };

		  $buttons
		    .on('click', handler.activate);


		  $toggle
		    .state({
		      
		    });

		};
	semantic.form = function(){
		$('.ui.form').form({
			fields: {
				name: {
		        identifier: 'sqft',
		        rules: [
		          {
		            type   : 'empty',
		            prompt : 'Please enter a value for SqFt'
		          },
		          {
		          	type: 'sqft',
		          	prompt: 'Please enter a realistic number for SqFt'
		          }
		        ]
		      }
			}
		});
	};
	$(document).ready(function() {
		semantic.form();
		semantic.ready();
	});
});

Template.sellerHome.helpers({
	errorClass: function(element){
		if(element === 'bedrooms'){
			if(Session.equals("bedroomErrors", true)){
				return 'errorRed';
			}
		}
		if(element === 'fullBathrooms'){
			if(Session.equals("fullBathroomErrors", true)){
				return 'errorRed';
			}
		}
		if(element === 'halfBathrooms'){
			if(Session.equals("halfBathroomErrors", true)){
				return 'errorRed';
			}
		}
		if(element === 'garages'){
			if(Session.equals("garageErrors", true)){
				return 'errorRed';
			}
		}
		if(element === 'quality'){
			if(Session.equals("qualityErrors", true)){
				return 'errorRed';
			}
		}
	},
	isError: function(element){
		if(element === 'bedrooms'){
			if(Session.equals("bedroomErrors", true)){
				return true;
			}
		}
		if(element === 'fullBathrooms'){
			if(Session.equals("fullBathroomErrors", true)){
				return true;
			}
		}
		if(element === 'halfBathrooms'){
			if(Session.equals("halfBathroomErrors", true)){
				return true;
			}
		}
		if(element === 'garages'){
			if(Session.equals("garageErrors", true)){
				return true;
			}
		}
		if(element === 'quality'){
			if(Session.equals("qualityErrors", true)){
				return 'errorRed';
			}
		}
		return false;
	}
});

Template.sellerHome.events({
	'click .ui.buttons .button': function(e){
		e.preventDefault();

		if($('#quality-buttons').find('.active').attr('id') != undefined)
			Session.set("qualityErrors", false);
		if($('#garage-buttons').find('.active').attr('id') != undefined)
			Session.set("garageErrors", false);
		if($('#half-bathroom-buttons').find('.active').attr('id') != undefined)
			Session.set("halfBathroomErrors", false);
		if($('#full-bathroom-buttons').find('.active').attr('id') != undefined)
			Session.set("fullBathroomErrors", false);
		if($('#bedroom-buttons').find('.active').attr('id') != undefined)
			Session.set("bedroomErrors", false);
	},
	'submit #account-form': function(e){
		e.preventDefault();

		var isErrors = false;

		var qualityVal = $('#quality-buttons').find('.active').attr('id');
		if(qualityVal == undefined){
			Session.set("qualityErrors", true);
			isErrors = true;
		}else{
			Session.set("qualityErrors", false);
		}
		var garagesVal = $('#garage-buttons').find('.active').attr('id');
		if(garagesVal == undefined){
			Session.set("garageErrors", true);
			isErrors = true;
		}else{
			Session.set("garageErrors", false);
		}
		var halfBathroomVal = $('#half-bathroom-buttons').find('.active').attr('id');
		if(halfBathroomVal == undefined){
			Session.set("halfBathroomErrors", true);
			isErrors = true;
		}else{
			Session.set("halfBathroomErrors", false);
		}
		var fullBathroomVal = $('#full-bathroom-buttons').find('.active').attr('id');
		if(fullBathroomVal == undefined){
			Session.set("fullBathroomErrors", true);
			isErrors = true;
		}else{
			Session.set("fullBathroomErrors", false);
		}
		var bedroomVal = $('#bedroom-buttons').find('.active').attr('id');
		if(bedroomVal == undefined){
			Session.set("bedroomErrors", true);
			isErrors = true;
		}else{
			Session.set("bedroomErrors", false);
		}
		if(isErrors)
			return;

		var homeAttributes = {
			bedrooms: bedroomVal,
			garages: garagesVal,
			halfBathrooms: halfBathroomVal,
			fullBathrooms: fullBathroomVal,
			quality: qualityVal,
			sqft: $('#sqft').val(),
			additionalInfo: $('#love-reasons').val(),
			homeID: Session.get("homeID"),
			sellerID: Session.get("sellerID")
		}
		console.log(homeAttributes);
		Meteor.call('registerSellerHome', homeAttributes, function(error, result){
			if(error){
				sAlert.error(error.reason);
				return
			}else{
				console.log(result);
				Session.set("homeCustomerID", result.homeCustomerID);
				var routeName = Router.current().route.name;
				if(routeName === 'homeownerHome')
					Router.go('homeownerAccount');
				if(routeName === 'sellerHome')
					Router.go('sellerAccount');
			}
		});
	}
});