var express = require("express");
var path = require("path");
var page = require("./page.generated.js");
var page2 = require("./page2.generated.js");

var app = express();

app.use(express.static(path.join(__dirname, "..", "public")));

var stats = require("./stats.generated.json");

app.get("/", function(req, res) {
	res.end(page(req, stats.assetsByChunkName.entry));
});
app.get("/2", function(req, res) {
    res.end(page2(req, stats.assetsByChunkName.entry2));
});

var server = app.listen(3000, function() {
	console.log('Listening on port %d', server.address().port);
});