var express = require('express');
var app = express();

app.use(express.static('public'));
app.use(express.static('node_modules'));

app.listen(8000, function() {
    console.log("Server up and running on port 8000")
})
