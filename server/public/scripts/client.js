$(onReady);

function onReady () {
    // Get Data
    getEquations();

    $('#equalBtn').on('click', handleEqualClick);
    $('#addBtn').on('click', handleAddClick);
    $('#subBtn').on('click', handleSubClick);
    $('#multBtn').on('click', handleMultClick);
    $('#divBtn').on('click', handleDivClick);
    $('#clearBtn').on('click', handleClearClick);
}

function handleEqualClick () {
    console.log('equal clicked');
    // collect inputs..
    const newEquation = {
        numOne: $('#numOneInput').val(),
        numTwo: $('#numTwoInput').val(),
    }
    console.log(newEquation);
    // ajax request to server
    // data should always be an object
    $.ajax({ // linked from server.js
        url: '/equations',
        method: 'POST',
        data: newEquation, // data here becomes req.body on server
    }).then(function (response){ // the quotes from server
        console.log(response);

        // trigger get()
        getEquations();
        // catch for error
    }).catch(function (error) {
        // 404, 500, etc
        console.log(error);
        alert('Error in POST /equations');
    })
}

function handleAddClick () {
    console.log('add clicked');
}

function handleSubClick () {
    console.log('sub clicked');
}

function handleMultClick () {
    console.log('mult clicked');
}

function handleDivClick () {
    console.log('div clicked');
}

function handleClearClick () {
    console.log('clear clicked');
}

function getEquations () {
    console.log('start of getEquations');
    // Get all quotes from server
    // AJAX
    $.ajax({ // linked from server.js
        url: '/equations',
        method: 'GET'
    }).then(function (response) { // the quotes from server
        console.log(response);
        // response is whatever res.send() sent us
        render(response);
    }).catch(function (error) {
        // 404, 500, etc
        console.log(error);
        alert('Error in GET /equations');
    })
    console.log('end of getEquations')
}

function render (equationsList) {
    // empty - dont want doubles
    $('#outputTotal').empty();
    $('#outputEquations').empty();

    // append to the DOM
    for (let equation of equationsList) {
        $('#outputEquations').append(`<li> ${equation.numOne} ${equation.numTwo} =  </li>`);
    }
    $('#numOneInput').val('');
    $('#numTwoInput').val('');
}