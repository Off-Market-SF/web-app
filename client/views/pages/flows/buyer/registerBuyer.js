//defines interactive behavior and dynamic variable assignment for the buyer
//registration form

//code to run when the template has been rendered
Template.registerBuyer.onRendered(function() {
	var semantic = {};

// ready event
// defines behavior for the button selection element in the buyer form
// such that only one button becomes selected at a time when clicked
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

  $buttons.on('click', handler.activate);


  $toggle.state({});

};

//defines validation rules for the various fields in the form
semantic.form = function() {
	$('.ui.form').form({
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
//when document is ready, initiate various interactive behavior using the 
//jQuery library -- i.e. $(...) stuff
	$(document).ready(function(){
		$('select.dropdown').dropdown();
		$('.ui.dropdown').dropdown();
		semantic.ready();
		semantic.form();
	});
});

//helpers for the template that yield values dynamic based on the surrounding
//context in which it was called
Template.registerBuyer.helpers({
	getSuburbName: function() {
		return this.name;
	},
	getSuburbID: function() {
		return this._id;
	},
	getRegionName: function() {
		return this.name;
	},
	suburbsForRegion: function(regionName){
		//_.filter filters items in a collection based on the supplied
		//function
		return _.filter(this.suburbs, function(suburb){
			return suburb.region === regionName;
		});
	},

	errorClass: function(element){
		if(element === 'locations'){
			//Session contains various values set for the context of the current User Session
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

//defines responses to events, like clicks or submits
Template.registerBuyer.events({
	//defines a function to be run when the form with the id 'buyer-form'
	//is submitted
	'submit #buyer-form': function(e){
		e.preventDefault();

		var isErrors = false;
		//get the selected preferred locations
		var sfLocations = $('#preferred-sf').data().moduleDropdown.get.values();
		var peninsulaLocations = $('#preferred-peninsula').data().moduleDropdown.get.values();
		//if no locations selected
		if(sfLocations.length == 0 && peninsulaLocations.length == 0){
			//set errors as true
			Session.set("locationErrors", true);
			isErrors = true;
		}else{
			//if not, set errors as false
			Session.set("locationErrors", false);
		}
		//get interest button selected
		var interestLevel = $('#interest-buttons').find('.active').attr('id');
		if(interestLevel == undefined){
			//if nothing selected
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
		//if errors exist, do not continue with form submission
		if(isErrors)
			return;

		//define the buyer object from collected information
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
		//call the API method with the name 'insertActor' to input the buyer
		Meteor.call('insertActor', buyer, function(error, result){
			//if the method returns an error
			if(error){
				sAlert.error(error.reason);
				return;
			}else {
				//if the user already exists
				if(result.userExists){
					sAlert.info("Your profile has been updated with your buyer information!");
				}
				//navigate to the 'buyerCompletion' route
				Router.go('buyerCompletion');
			}
		});
	},

	//for the event of one of the button groups being clicked
	'click .ui.buttons .button': function(e){
		e.preventDefault();

		//if a button in a given button group is clicked, then set the errors for that
		// group off
		if($('#interest-buttons').find('.active').attr('id') != undefined)
			Session.set("interestErrors", false);
		if($('#movein-buttons').find('.active').attr('id') != undefined)
			Session.set("moveinErrors", false);
	},

	//for the event of a dropdown being clicked
	'click .ui.dropdown': function(e){
		e.preventDefault();

		//if for either of the dropdowns, there are values selected, then set errors to false
		if($('#preferred-sf').data().moduleDropdown.get.values() != null || $('#preferred-peninsula').data().moduleDropdown.get.values() != null)
			Session.set("locationErrors", false);
	}
});

