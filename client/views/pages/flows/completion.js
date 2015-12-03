Template.completion.helpers({
	thanksText: function(){
		var routeName = Router.current().route.name;
		if(routeName === 'buyerCompletion')
			return "Thanks! We'll be in touch soon!";
		if(routeName === 'sellerComplete' || routeName === 'homeownerComplete')
			return "Thanks! We'll be in touch soon!";
		if(routeName === 'sellerCompletion' || routeName === 'homeownerCompletion')
			return "Thanks! We will be in touch as soon as we find a buyer at your target price"
	},
	thanksSubText: function() {
		var routeName = Router.current().route.name;
		if(routeName === 'buyerCompletion' || routeName === 'sellerComplete' || routeName === 'sellerCompletion'
			|| routeName === 'homeownerComplete' || routeName === 'homeownerCompletion')
			return "If you have any questions in the meantime, contact us at hello@offmarketsf.com";
	},
	isSellerFlow: function() {
		var routeName = Router.current().route.name;
		if(routeName === 'sellerComplete' || routeName === 'sellerCompletion'
			|| routeName === 'homeownerComplete' || routeName === 'homeownerCompletion')
			return true;
		else
			return false;
	}
});

Template.completion.events({
	'click #submit-button': function(e){
		e.preventDefault();
		var emailList = $('#email-addresses').val();
		Meteor.call('addEmailList', {
			emailList: emailList,
			actorID: Session.get("sellerID")
		}, function(error, result){
			if(error){
				sAlert.error(error.reason);
				return;
			}
			$('#email-form').form('reset');
			$('#email-form').addClass('success');
			return;
		});
	}
});