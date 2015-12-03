Template.sellerRegister.onRendered(function(){
	var semantic = {};
	semantic.form = function() {
	$('.ui.form')
  .form({
    fields: {
      firstname: {
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
      address: {
        identifier: 'address',
        rules: [
          {
            type   : 'empty',
            prompt : 'Please enter your address'
          },
          {
          	type: 'address',
          	prompt: "Please enter a valid address"
          }
        ]
      },
      city: {
        identifier: 'city',
        rules: [
          {
            type   : 'empty',
            prompt : 'Please enter your city'
          },
          {
	      	type: 'city',
	      	prompt: 'Only letters, periods, and dashes are allowed in city names'
          }
        ]
      },
      state: {
        identifier: 'state',
        rules: [
          {
            type   : 'empty',
            prompt : 'Please select a state'
          }
        ]
      },
      zip: {
        identifier: 'zip',
        rules: [
          {
            type   : 'empty',
            prompt : 'Please enter your zip code'
          },
          {
	      	type: 'integer',
	      	prompt: 'Enter a five digit zip code'
          },
          {
          	type: 'exactLength[5]',
          	prompt: 'Enter a five digit zip code'
          }
        ]
      }
    }
  });
};

	$(document).ready(function() {
		$('.ui.dropdown').dropdown();
		semantic.form();
	});
});

Template.sellerRegister.events({
	'submit #register-form': function(e){
		e.preventDefault();
		var routeName = Router.current().route.name;
		var isHomeowner = false;
		if(routeName === 'homeownerRegister')
			isHomeowner = true;

		var sellerAttributes = {
			firstName: $('#firstname').val(),
			lastName: $('#lastname').val(),
			address: $('#address').val(),
			city: $('#city').val(),
			state: $('#state').val(),
			zip: $('#zip').val(),
			email: $('#email').val(),
			isSeller: true,
			isHomeowner: isHomeowner
		};
		console.log(sellerAttributes);
		Meteor.call('registerSeller', sellerAttributes, function(error, result){
			if(error){
				sAlert.error(error.reason);
				return
			}else{
				if(result.userExists){
					sAlert.info("Your profile has been updated with your information!");
				}
				Session.set("sellerID", result.sellerID);
				Session.set("homeID", result.homeID);
				Session.set("compGroup", result.compGroup);
				Session.set("sellerEmail", sellerAttributes.email);
				if(routeName === 'homeownerRegister')
					Router.go('homeownerHome');
				if(routeName === 'sellerRegister')
					Router.go('sellerHome');
			}
		});
	}
});