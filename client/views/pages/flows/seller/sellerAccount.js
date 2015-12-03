Template.sellerAccount.onRendered(function(){
	var semantic = {};

	// ready event
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
	          .removeClass('active');
	      }
	    };
	  $buttons
	    .on('click', handler.activate);
	  $toggle
	    .state({});
	};

	semantic.form = function() {
		$('.ui.form').form({
		    fields: {
		      password: {
		        identifier: 'password',
		        rules: [
		          {
		            type   : 'empty',
		            prompt : 'You must provide a password'
		          },
		          {
		          	type: 'minLength[8]',
		          	prompt: 'Your password must be at least 8 characters long'
		          }
		        ]
		      },
		      lastname: {
		        identifier: 'confirm-password',
		        rules: [
		          {
		            type   : 'empty',
		            prompt : 'Please confirm your password'
		          },
		          {
		          	type: 'match[password]',
		          	prompt: 'The passwords did not match'
		          }
		        ]
		      }
		    }
		});
	};
	$(document).ready(function(){
		$('select.dropdown').dropdown();
		$('.ui.dropdown').dropdown();
		semantic.ready();
		semantic.form();
	});
});

Template.sellerAccount.helpers({
	username: function(){
		return Session.get("sellerEmail");
	},
	errorClass: function(element) {
		if(element === 'duration'){
			if(Session.equals("durationErrors", true)){
				return 'errorRed';
			}
		}
		if(element === 'interest'){
			if(Session.equals("interestErrors", true)){
				return 'errorRed';
			}
		}
	},
	isError: function(element){
		if(element === 'duration'){
			if(Session.equals("durationErrors", true)){
				return true;
			}
		}
		if(element === 'interest'){
			if(Session.equals("interestErrors", true)){
				return true;
			}
		}
	}
});

Template.sellerAccount.events({
	'click .ui.buttons .button': function(e){
		e.preventDefault();

		if($('#duration-buttons').find('.active').attr('id') != undefined)
			Session.set("durationErrors", false);
		if($('#interest-buttons').find('.active').attr('id') != undefined)
			Session.set("interestErrors", false);
	},
	'submit #account-form': function(e){
		e.preventDefault();

		var isErrors = false;

		var durationVal = $('#duration-buttons').find('.active').attr('id');
		if(durationVal == undefined){
			Session.set("durationErrors", true);
			isErrors = true;
		}else{
			Session.set("durationErrors", false);
		}
		var interestVal = $('#interest-buttons').find('.active').attr('id');
		if(interestVal == undefined){
			Session.set("interestErrors", true);
			isErrors = true;
		}else{
			Session.set("interestErrors", false);
		}
		if(isErrors)
			return;

		var accountAttributes = {
			password: $('#password').val(),
			duration: durationVal,
			interest: interestVal,
			sellerID: Session.get("sellerID"),
			homeCustomerID: Session.get("homeCustomerID")
		};
		Meteor.call('addSellerAccountInfo', accountAttributes, function(error, result){
			if(error){
				sAlert.error(error.reason);
				return;
			}
			var routeName = Router.current().route.name;
				if(routeName === 'homeownerAccount')
					Router.go('homeownerAppraisal');
				if(routeName === 'sellerAccount')
					Router.go('sellerAppraisal');
		});
	}
});