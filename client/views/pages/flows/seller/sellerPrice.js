Template.sellerPrice.onRendered(function(){
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
				noContact: {
		        identifier: 'not-contact',
		        rules: [
		          {
		            type   : 'empty',
		            prompt : 'Please enter a "Do Not Contact" price'
		          },
		          {
		          	type: 'integer',
		          	prompt: 'please enter a number for your "Do Not Contact" price'
		          }
		        ]
		      },
		      phone: {
		      	identifier: 'phone-num',
		      	optional: true,
		      	rules: [
		      		{
		      			type: 'phone',
		      			prompt: 'If you choose to enter a number, make it a 10-digit phone number'
		      		}
		      	]
		      }
			}
		});
	};
	$(document).ready(function(){
		semantic.ready();
		semantic.form();
		$('select.dropdown').dropdown();
	});
});

Template.sellerPrice.helpers({
	errorClass: function(element){
		if(element === 'price'){
			if(Session.equals("priceErrors", true)){
				return 'errorRed';
			}
		}
	},
	isError: function(element){
		if(element === 'price'){
			if(Session.equals("priceErrors", true)){
				return true;
			}
		}
	},
	secondHeader: function(){
		var routeName = Router.current().route.name;
		if(routeName === 'sellerHigher' || routeName === 'homeownerHigher')
			return 'Tell us how to contact you once we get your price';
		if(routeName === 'sellerAttractive' || routeName === 'homeownerAttractive')
			return 'Tell us how to contact you and we will reach out within 48 hours';
	}
});

Template.sellerPrice.events({
	'click .ui.buttons .button': function(e){
		e.preventDefault();

		if($('#price-buttons').find('.active').attr('id') != undefined)
			Session.set("priceErrors", false);
	},
	'submit #price-form': function(e){
		e.preventDefault()

		var isErrors = false;

		var priceVal = $('#price-buttons').find('.active').attr('id');
		if(priceVal == undefined){
			Session.set("priceErrors", true);
			isErrors = true;
		}else{
			Session.set("priceErrors", false);
		}

		if(isErrors)
			return;

		var homeCustomerAttributes = {
			desiredTiming: priceVal,
			floorPrice: $('#not-contact').val(),
			contactPref: $('#contact-method').val(),
			actorID: Session.get("sellerID"),
			homeCustomerID: Session.get("homeCustomerID")
		};
		var phone = $('#phone-num').val();
		if(phone){
			_.extend(homeCustomerAttributes, {
				phone: phone
			});
		}
		Meteor.call('addDesiredPricing', homeCustomerAttributes, function(error, result){
			if(error){
				sAlert.error(error.reason);
				return;
			}
			var routeName = Router.current().route.name;
			if(routeName === 'homeownerAttractive')
				Router.go('homeownerComplete');
			if(routeName === 'sellerAttractive')
				Router.go('sellerComplete');
			if(routeName === 'homeownerHigher')
				Router.go('homeownerCompletion');
			if(routeName === 'sellerHigher')
				Router.go('sellerCompletion');

		});
	}
});