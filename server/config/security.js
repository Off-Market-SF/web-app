//sets basic browser security policies for the application

BrowserPolicy.framing.disallow();
BrowserPolicy.content.disallowInlineScripts();
BrowserPolicy.content.disallowEval();
BrowserPolicy.content.allowInlineStyles();
BrowserPolicy.content.allowFontDataUrl();

var trusted = [
	'*.google-analytics.com',
	'*.mxpnl.com',
	'*.zendesk.com',
	'*.googleapis.com',
	'*.gstatic.com',
	'*.bootstrapcdn.com'
];

_.each(trusted, function(origin){
	origin = "https://" + origin;
	BrowserPolicy.content.allowOriginForAll(origin);
});