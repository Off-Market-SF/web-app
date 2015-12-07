/* ---------------------------------------------------- +/

## Client Router ##

Client-side Router.

This is where the routes for the application are setup. The routes
describe what templates, data, and other actions get loaded when a given
route name or path is invoked, whether through the browser's URL display or
via clicking some linked element

/+ ---------------------------------------------------- */

// Config
// Where 'global' templates are assigned

Router.configure({
  layoutTemplate: 'layoutFront',
  //is the below necessary?
  layoutFlowsTemplate: 'layoutFlows',
  loadingTemplate: 'loading',
  notFoundTemplate: 'notFound',
});

// Filters
// is below necessary?

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

//is below necessary?
Router.onBeforeAction(filters.myFilter, {only: ['items']});

//Provides the scrolling functionality to the respective 'benefits'
//section of the homepage
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
  // is this necessary?

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


  //end page for indication of 'price not attractive'
  this.route('sellerCompletion', {
    //browser URL path prefixed by 'http://myURL.com'
    path: '/sellerCompletion',
    //name of template to load for this route
    template: 'completion'
  });
  this.route('homeownerCompletion', {
    path: '/homeownerCompletion',
    template: 'completion'
  });

  //end page for indication of 'price attractive'
  this.route('sellerComplete', {
    path: '/sellerComplete',
    template: 'completion'
  });
  this.route('/homeownerComplete', {
    path: '/homeownerComplete',
    template: 'completion'
  });

  //end page for buyer form
  this.route('buyerCompletion',{
    path: '/buyerCompletion',
    template: 'completion'
  });

  //first page for seller registration
  this.route('sellerRegister', {
    path: '/sellerRegister',
    template: 'sellerRegister',

  });

  //first page for homeowner registration
  this.route('homeownerRegister', {
    path: '/homeownerRegister',
    template: 'sellerRegister'
  });

//second page for homeowner registration
  this.route('homeownerHome', {
    path: '/homeownerHome',
    template: 'sellerHome'
  });

//second page for seller registration
  this.route('sellerHome', {
    path: '/sellerHome',
    template: 'sellerHome'
  });

//third page for homeowner registration
  this.route('homeownerAccount', {
    path: '/homeownerAccount',
    template: 'sellerAccount'
  });

//third page for seller registration
  this.route('sellerAccount', {
    path: '/sellerAccount',
    template: 'sellerAccount'
  });

//fourth page for seller registration
  this.route('sellerAppraisal', {
    path: '/sellerAppraisal',
    template: 'sellerAppraisal',
    //template does not load until the following function returns
    //used to wait for the availability of data
    waitOn: function(){
      return [
      //one can subscribe to named publications of sets of data from the database
      //These publications of data are defined in the publications.js file
        Meteor.subscribe('currentHome', Session.get("homeID")),
        Meteor.subscribe('compGroup', Session.get("compGroup")),
        Meteor.subscribe('compCoefs')
      ];
    },
    //this sets the data context for a given route so that, with in the context of the 
    //route, fields of the data can be accessed via 'this.fieldName' statements
    data: function() { return Homes.findOne(Session.get("homeID")); }
  });

//fourth page for homeowner registration
  this.route('homeownerAppraisal', {
    path: '/homeownerAppraisal',
    template: 'sellerAppraisalt',
    waitOn: function(){
      return [
        Meteor.subscribe('currentHome', Session.get("homeID")),
        Meteor.subscribe('compGroup', Session.get("compGroup")),
        Meteor.subscribe('compCoefs')
      ];
    },
    data: function() { return Homes.findOne(Session.get("homeID")); }
  });

//fifth page for homeowner registration, if 'price is attractive'
//is indicated
  this.route('homeownerAttractive', {
    path: '/homeownerAttractive',
    template: 'sellerPrice'
  });

//fifth page for seller registration, if 'price is attractive'
//is indicated
  this.route('sellerAttractive', {
    path: '/sellerAttractive',
    template: 'sellerPrice'
  });

//fifth page for homeowner registration, if 'price is not attractive'
//is indicated
  this.route('homeownerHigher', {
    path: '/homeownerHigher',
    template: 'sellerPrice'
  });

//fifth page for seller registration, if 'price is not attractive'
//is indicated
  this.route('sellerHigher', {
    path: '/sellerHigher',
    template: 'sellerPrice'
  });

//controllers can be used to extend the definition of route behavior
//or to give different routes common behavioral aspects
  RegisterBuyerController = RouteController.extend({
    template: 'registerBuyer',
    //for routes that use this controller, we can 
    //use the name 'suburbs' to refer to items in in the Suburb db
    suburbs: function(){
      return Suburbs.find({}).fetch();
    },
    //makes the suburbs available in the data context
    data: function() {
      return {
        suburbs: this.suburbs()
      };
    }
  });

//the route for the buyer registration form
  this.route('registerBuyer', {
    path: '/registerBuyer',
    waitOn: function() {
      return Meteor.subscribe('suburbs');
    },
    controller: RegisterBuyerController
  });


  // Content Pages
  // These don't require setup beyond naming them,
  // as they don't require data to be loaded

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
  // Are these necessary routes?

  this.route('login');

  this.route('signup');

  this.route('forgot');

});
