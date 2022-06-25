$(onReady);

let newEquation = {
    numOne: '', 
    numTwo: '', 
    function: ''
}

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
        function: $(function)
    };

    console.log(newEquation);
    // ajax request to server
    // data should always be an object
    $.ajax({ // linked from server.js
        url: '/equations',
        method: 'POST',
        data: newEquation, // data here becomes req.body on server
    }).then(function (response){ // the quotes from server
        console.log(response);
        handleAddClick();
        handleSubClick();
        handleMultClick();
        handleDivClick();

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
    newEquation.function = '+';
}

function handleSubClick () {
    console.log('sub clicked');
    newEquation.function = '-';
}

function handleMultClick () {
    console.log('mult clicked');
    newEquation.function = '*';
}

function handleDivClick () {
    console.log('div clicked');
    newEquation.function = '/';
}

function handleClearClick () {
    console.log('clear clicked');
    $('#numOneInput').val('');
    $('#numTwoInput').val('');
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