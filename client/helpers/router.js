/* ---------------------------------------------------- +/

## Client Router ##

Client-side Router.

/+ ---------------------------------------------------- */

// Config

Router.configure({
  layoutTemplate: 'layoutFront',
  layoutFlowsTemplate: 'layoutFlows',
  loadingTemplate: 'loading',
  notFoundTemplate: 'notFound',
});

// Filters

var filters = {

  myFilter: function () {
    // do something
  },

  isLoggedIn: function() {
    if (!(Meteor.loggingIn() || Meteor.user())) {
      alert('Please Log In First.')
      this.stop();
    }
  }

}

Router.onBeforeAction(filters.myFilter, {only: ['items']});

Router.onAfterAction(function(){
  var self = this;
  $(window).scrollTop(0);
  if(this.params.hash){
    Tracker.afterFlush(function() {
      if(typeof $("#" + self.params.hash).offset() != undefined){

        var scrollTop = $("#" + self.params.hash).offset().top;
        if(self.params.hash === "seller-benefits" || self.params.hash === "buyer-benefits")
          scrollTop = scrollTop - 10;
        if(self.params.hash === "homeowner-benefits")
          scrollTop = scrollTop - 100;
        $("html,body").animate({
          scrollTop: scrollTop
        });
      }
    });
  }
});

// Routes

Router.map(function() {

  // Items

  this.route('items', {
    waitOn: function () {
      return Meteor.subscribe('allItems');
    },
    data: function () {
      return {
        items: Items.find()
      }
    }
  });

  this.route('item', {
    path: '/items/:_id',
    waitOn: function () {
      return Meteor.subscribe('singleItem', this.params._id);
    },
    data: function () {
      return {
        item: Items.findOne(this.params._id)
      }
    }
  });

  //price not attractive
  this.route('sellerCompletion', {
    path: '/sellerCompletion',
    template: 'completion'
  });
  this.route('homeownerCompletion', {
    path: '/homeownerCompletion',
    template: 'completion'
  });

  //price attractive
  this.route('sellerComplete', {
    path: '/sellerComplete',
    template: 'completion'
  });
  this.route('/homeownerComplete', {
    path: '/homeownerComplete',
    template: 'completion'
  })

  this.route('buyerCompletion',{
    path: '/buyerCompletion',
    template: 'completion'
  });

  this.route('sellerRegister', {
    path: '/sellerRegister',
    template: 'sellerRegister',

  });

  this.route('homeownerRegister', {
    path: '/homeownerRegister',
    template: 'sellerRegister'
  });

  this.route('homeownerHome', {
    path: '/homeownerHome',
    template: 'sellerHome'
  });

  this.route('sellerHome', {
    path: '/sellerHome',
    template: 'sellerHome'
  })

  this.route('homeownerAccount', {
    path: '/homeownerAccount',
    template: 'sellerAccount'
  });

  this.route('sellerAccount', {
    path: '/sellerAccount',
    template: 'sellerAccount'
  });

  this.route('sellerAppraisal', {
    path: '/sellerAppraisal',
    template: 'sellerAppraisal',
    waitOn: function(){
      return [
        Meteor.subscribe('currentHome', Session.get("homeID")),
        Meteor.subscribe('compGroup', Session.get("compGroup")),
        Meteor.subscribe('compCoefs')
      ];
    },
    data: function() { return Homes.findOne(Session.get("homeID")); }
  });

  this.route('homeownerAppraisal', {
    path: '/homeownerAppraisal',
    template: 'sellerAppraisal',
    waitOn: function(){
      return [
        Meteor.subscribe('currentHome', Session.get("homeID")),
        Meteor.subscribe('compGroup', Session.get("compGroup")),
        Meteor.subscribe('compCoefs')
      ];
    },
    data: function() { return Homes.findOne(Session.get("homeID")); }
  });

  this.route('homeownerAttractive', {
    path: '/homeownerAttractive',
    template: 'sellerPrice'
  });

  this.route('sellerAttractive', {
    path: '/sellerAttractive',
    template: 'sellerPrice'
  });

  this.route('homeownerHigher', {
    path: '/homeownerHigher',
    template: 'sellerPrice'
  });

  this.route('sellerHigher', {
    path: '/sellerHigher',
    template: 'sellerPrice'
  });

  RegisterBuyerController = RouteController.extend({
    template: 'registerBuyer',
    suburbs: function(){
      return Suburbs.find({}).fetch();
    },
    data: function() {
      return {
        suburbs: this.suburbs()
      };
    }
  });

  this.route('registerBuyer', {
    path: '/registerBuyer',
    waitOn: function() {
      return Meteor.subscribe('suburbs');
    },
    controller: RegisterBuyerController
  });


  // Pages

  this.route('homepage', {
    path: '/'
  });

  this.route('faqs');

  this.route('contact');

  this.route('terms');

  this.route('privacy');

  this.route('howitworks');

  this.route('content');

  // Users

  this.route('login');

  this.route('signup');

  this.route('forgot');

});
