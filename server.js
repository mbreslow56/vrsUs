var express = require('express');

var app = express();
// app.set('view engine', 'html');


app.use(express.static('public'));
app.use(express.static('node_modules'));

app.listen('8000', function() {
  console.log("Hackaton baby");
});