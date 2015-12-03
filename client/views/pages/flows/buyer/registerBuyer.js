Template.registerBuyer.onRendered(function() {
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

semantic.form = function() {
	$('.ui.form')
  .form({
    fields: {
      name: {
        identifier: 'firstname',
        rules: [
          {
            type   : 'empty',
            prompt : 'Please enter your first name'
          }
        ]
      },
      lastname: {
        identifier: 'lastname',
        rules: [
          {
            type   : 'empty',
            prompt : 'Please enter your last name'
          }
        ]
      },
      email: {
        identifier: 'email',
        rules: [
          {
            type   : 'empty',
            prompt : 'Please enter an email address'
          },
          {
          	type : 'email',
          	prompt : 'Your email address must be a valid email'
          }
        ]
      },
      phone: {
        identifier: 'phone',
        optional: true,
        rules: [
          {
            type   : 'phone',
            prompt : 'Please enter a valid 10 digit phone number, or leave the field empty'
          }
        ]
      },
      locations: {
        identifier: 'locations',
        rules: [
          {
            type   : 'empty',
            prompt : 'Please enter at least one preferred location'
          }
        ]
      }
    }
  })
;
};
	$(document).ready(function(){
		$('select.dropdown').dropdown();
		$('.ui.dropdown').dropdown();
		semantic.ready();
		semantic.form();
	});
});

Template.registerBuyer.helpers({
	getSuburbName: function() {
		return this.name;
	},
	getSuburbID: function() {
		return this._id;
	},
	getRegionName: function() {
		console.log(this.name);
		return this.name;
	},
	suburbsForRegion: function(regionName){
		return _.filter(this.suburbs, function(suburb){
			return suburb.region === regionName;
		});
	},

	errorClass: function(element){
		if(element === 'locations'){
			if(Session.equals("locationErrors", true)){
				return 'error';
			}
		}
		if(element === 'interest'){
			if(Session.equals("interestErrors", true)){
				return 'errorRed';
			}
		}
		if(element === 'movein'){
			if(Session.equals("moveinErrors", true)){
				return 'errorRed';
			}
		}
	},
	isError: function(element){
		if(element === 'locations'){
			if(Session.equals("locationErrors", true)){
				return true;
			}
		}
		if(element === 'interest'){
			if(Session.equals("interestErrors", true)){
				return true;
			}
		}
		if(element === 'movein'){
			if(Session.equals("moveinErrors", true)){
				return true;
			}
		}
		return false;
	}
});

Template.registerBuyer.events({
	'submit #buyer-form': function(e){
		e.preventDefault();

		var isErrors = false;
		var sfLocations = $('#preferred-sf').data().moduleDropdown.get.values();
		var peninsulaLocations = $('#preferred-peninsula').data().moduleDropdown.get.values();
		if(sfLocations.length == 0 && peninsulaLocations.length == 0){
			Session.set("locationErrors", true);
			isErrors = true;
		}else{
			Session.set("locationErrors", false);
		}
		var interestLevel = $('#interest-buttons').find('.active').attr('id');
		if(interestLevel == undefined){
			Session.set("interestErrors", true);
			isErrors = true;
		}else{
			Session.set("interestErrors", false);
		}
		var moveinTiming = $('#movein-buttons').find('.active').attr('id');
		if(moveinTiming == undefined){
			Session.set("moveinErrors", true);
			isErrors = true;
		}else{
			Session.set("moveinErrors", false);
		}
		if(isErrors)
			return;

		var buyer = {
			firstName: $("#firstname").val(),
			lastName: $("#lastname").val(),
			email: $("#email").val(),
			phone: $("#phone").val(),
			isBuyer: true,
			buyerStats: {
				interestLevel: interestLevel,
				moveinTiming: moveinTiming,
				preferredLocations: sfLocations.concat(peninsulaLocations)
			},
			referredBy: $("#hear-about").val()
		};
		Meteor.call('insertActor', buyer, function(error, result){
			if(error){
				sAlert.error(error.reason);
				return;
			}else {
				if(result.userExists){
					sAlert.info("Your profile has been updated with your buyer information!");
				}
				Router.go('buyerCompletion');
			}
		});
	},

	'click .ui.buttons .button': function(e){
		e.preventDefault();

		if($('#interest-buttons').find('.active').attr('id') != undefined)
			Session.set("interestErrors", false);
		if($('#movein-buttons').find('.active').attr('id') != undefined)
			Session.set("moveinErrors", false);
	},

	'click .ui.dropdown': function(e){
		e.preventDefault();

		if($('#preferred-sf').data().moduleDropdown.get.values() != null || $('#preferred-peninsula').data().moduleDropdown.get.values() != null)
			Session.set("locationErrors", false);
	}
});

