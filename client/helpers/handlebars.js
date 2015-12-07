/* ---------------------------------------------------- +/

## Handlebars Helpers ##

Custom Handlebars helpers. For global application across files

/+ ---------------------------------------------------- */

Handlebars.registerHelper('myHelper', function(myArgument){
  return "Hello, " + myArgument;
});

Handlebars.registerHelper('constants', function(key){
	return Meteor.App[key.toUpperCase()];
});