//This setsup custom form input validation rules for Semantic UI forms
//The first three utilize Regular Expressions

//for phone number validation
$.fn.form.settings.rules.phone = function(value) {
	var re = /(?:(?:\+?1\s*(?:[.-]\s*)?)?(?:(\s*([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9]‌​)\s*)|([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9]))\s*(?:[.-]\s*)?)([2-9]1[02-9]‌​|[2-9][02-9]1|[2-9][02-9]{2})\s*(?:[.-]\s*)?([0-9]{4})/;
	return re.test(value);
};

//for basic address validation - only evaluates that the street address is constructed
//from a limited character set
$.fn.form.settings.rules.address = function(value){
	var re = /^[A-Za-z0-9'\.\-\s\,\#]*$/;
	return re.test(value);
};

//for basic city name validation - only evaluates that the city name is constructed from
// a limited character set
$.fn.form.settings.rules.city = function(value){
	var re = /^[A-Za-z\.\s\-]*$/;
	return re.test(value);
}

//validates that the sqft value is a both a number and within an acceptable range of values
$.fn.form.settings.rules.sqft = function(value){
	if(isNaN(value))
		return false;
	var sqft = round(value);
	if(0 < sqft && sqft < 9999)
		return true;
	return false;
}