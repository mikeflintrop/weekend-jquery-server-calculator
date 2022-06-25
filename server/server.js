
const express = require('express');
const inventoryList = require('./modules/inventory.js');
const bodyParser = require('body-parser');

//Make an instance of a server
const app = express();
const PORT = 5000;

//Serve Static Files
app.use(express.static('server/public'));

// setup Middlewares
app.use(bodyParser.urlencoded({extended: true}));

//localhost:5000/quotes
app.get('/inventory', function(req, res) {
    console.log('In get Inventory');
    res.send(inventoryList);
})

app.get('/search', function(req, res) {
    console.log('In get Search');
    req.send(searchList);
})

app.post('/inventory', function(req, res) {
    // well, where is the quote..?
    console.log('POST /inventory', req.body);
    // save our quote...
    inventoryList.push(req.body);
    // send back response..
    res.sendStatus(201);
})

//run the server, on the port we want.
app.listen(PORT, function() {
    console.log('SERVER RUNNING ON PORT', PORT)
});