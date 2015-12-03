/* ---------------------------------------------------- +/

## Helpers ##

Functions that need to be available both on the server and client. 

/+ ---------------------------------------------------- */

var stateHash = {
	'washington': true,
	'wa': true,
	'california': true,
	'ca': true,
	'new york': true,
	'ny': true,
	'florida': true,
	'fl': true
};
var streetAbrvHash = {
	'alley': 'aly',
	'street': 'str',
	'apartment': 'apt',
	'avenue': 'ave',
	'bend': 'bnd',
	'boulevard': 'blvd',
	'bridge': 'brg',
	'building': 'bldg',
	'camp': 'cp',
	'canyon': 'cyn',
	'causeway': 'cswy',
	'center': 'ctr',
	'circle': 'cir',
	'corner': 'cor',
	'court': 'ct',
	'courts': 'cts',
	'cove': 'cv',
	'creek': 'crk',
	'department': 'dept',
	'drive': 'dr',
	'estate': 'est',
	'expressway': 'expy',
	'extension': 'ext',
	'falls': 'fls',
	'ferry': 'fry',
	'field': 'fld',
	'fields': 'flds',
	'flat': 'flt',
	'floor': 'flr',
	'ford': 'frd',
	'forest': 'frst',
	'fork': 'frk',
	'forks': 'frks',
	'fort': 'ft',
	'front': 'frnt',
	'garden': 'gdns',
	'gardens': 'gdns',
	'gateway': 'gtwy',
	'glen': 'gln',
	'green': 'grn',
	'grove': 'grv',
	'harbor': 'hbr',
	'haven': 'hvn',
	'heights': 'hts',
	'highway': 'hwy',
	'hill': 'hl',
	'hills': 'hls',
	'junction': 'jct',
	'lake': 'lk',
	'lakes': 'lks',
	'landing': 'lndg',
	'lane': 'ln',
	'lobby': 'lbby',
	'lodge': 'ldg',
	'manor': 'mnr',
	'meadow': 'mdws',
	'meadows': 'mdws',
	'mission': 'msn',
	'mount': 'mt',
	'mountain': 'mtn',
	'office': 'ofc',
	'orchard': 'orch',
	'parkway': 'pkwy',
	'place': 'pl',
	'point': 'pt',
	'port': 'prt',
	'ranch': 'rnch',
	'rest': 'rst',
	'ridge': 'rdg',
	'river': 'riv',
	'road': 'rd',
	'room': 'rm',
	'shore': 'shr',
	'shores': 'shrs',
	'space': 'spc',
	'square': 'sq',
	'suite': 'ste',
	'terrace': 'ter',
	'trail': 'trl',
	'valley': 'vly',
	'view': 'vw',
	'village': 'vlg',
	'vista': 'vis'
};
isValidState = function(state){
	state = state.toLowerCase();
	if(stateHash[state])
		return true;
	return false;
};

sanitizeCity = function(city){
	city = city.toLowerCase();
	return city.replace(/\.|-/,'');
};

sanitizeAddress = function(address){
	address = address.toLowerCase();
	var keys = Object.keys(streetAbrvHash);
	keys.forEach(function(value, index, array){
		address.replace(value, streetAbrvHash[value]);
	});
	return address.replace(/[^a-zA-Z0-9_\#\s]/, '');
};

getCompSize = function(sqft){
	var numSqFt = round(sqft);
	if(sqft < 2000)
		return '2';
	return '1';
};

round = Math.round;