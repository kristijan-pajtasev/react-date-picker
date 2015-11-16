var express = require("express");
var app = express();

app.use(express.static(__dirname + '/demo'));

app.get("/", function(req, res) {
	res.send("test")
})

app.listen(3001);