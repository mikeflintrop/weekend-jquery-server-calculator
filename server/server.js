
const express = require('express');
const equationsList = require('./modules/equations.js');
const bodyParser = require('body-parser');

//Make an instance of a server
const app = express();
const PORT = 5000;

//Serve Static Files
app.use(express.static('server/public'));

// setup Middlewares
app.use(bodyParser.urlencoded({extended: true}));

//localhost:5000/quotes
app.get('/equations', function(req, res) {
    console.log('In GET /equations');
    res.send(equationsList);
})

app.post('/equations', function(req, res) {
    // well, where is the quote..?
    console.log('In POST /equations', req.body);
    // set variables
    const equation = req.body;
    const numOne = Number(equation.numOne);
    const numTwo = Number(equation.numTwo);
    const operator = equation.function; // couldn't call it function :(
    // switch statement
    let result = 0;
    switch (operator) {
        case '+':
            result = numOne + numTwo;
            break;
        case '-':
            result = numOne - numTwo;
            break;
        case '*':
            result = numOne * numTwo;
            break;
        case '/':
            result = numOne / numTwo;
            break;
    };
    equation.result = result; // add result property
    equationsList.push(equation); // push data to equationsList
    console.log(equation)
    // save our quote...
    // equationsList.push(req.body);
    // console.log(req.body)
    // send back response..
    res.sendStatus(201);
})

//run the server, on the port we want.
app.listen(PORT, function() {
    console.log('SERVER RUNNING ON PORT', PORT)
});