$(onReady);

function onReady () {
    // Get Data
    getEquations();

    $('#equalBtn').on('click', handleEqualClick);
}

function handleEqualClick () {
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
    })

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
        $('#outputEquations').append(`<li> ${equation.numOne}: ${equation.numTwo} </li>`);
    }
    $('#numOneInput').val('');
    $('#numTwoInput').val('');
}