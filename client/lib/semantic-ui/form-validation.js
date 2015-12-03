$.fn.form.settings.rules.phone = function(value) {
	var re = /(?:(?:\+?1\s*(?:[.-]\s*)?)?(?:(\s*([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9]‌​)\s*)|([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9]))\s*(?:[.-]\s*)?)([2-9]1[02-9]‌​|[2-9][02-9]1|[2-9][02-9]{2})\s*(?:[.-]\s*)?([0-9]{4})/;
	return re.test(value);
};

$.fn.form.settings.rules.address = function(value){
	var re = /^[A-Za-z0-9'\.\-\s\,\#]*$/;
	return re.test(value);
};

$.fn.form.settings.rules.city = function(value){
	var re = /^[A-Za-z\.\s\-]*$/;
	return re.test(value);
}

$.fn.form.settings.rules.sqft = function(value){
	if(isNaN(value))
		return false;
	var sqft = round(value);
	if(0 < sqft && sqft < 9999)
		return true;
	return false;
}