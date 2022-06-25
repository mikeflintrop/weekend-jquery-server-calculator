$(onReady);

function onReady () {
    // Get Data
    getInventory();

    $('#addInput').on('click', handleClick);
}

function handleClick () {
    // collect inputs..
    const newItem = {
        name: $('#nameInput').val(),
        description: $('#descriptionInput').val(),
    }
    console.log(newItem);
    // ajax request to server
    // data should always be an object
    $.ajax({ // linked from server.js
        url: '/inventory',
        method: 'POST',
        data: newItem, // data here becomes req.body on server
    }).then(function (response){ // the quotes from server
        console.log(response);

        // trigger get()
        getInventory();
    })

}


function getInventory () {
    console.log('start of getInventory');
    // Get all quotes from server
    // AJAX
    $.ajax({ // linked from server.js
        url: '/inventory',
        method: 'GET'
    }).then(function (response) { // the quotes from server
        console.log(response);
        // response is whatever res.send() sent us
        render(response);
    }).catch(function (error) {
        // 404, 500, etc
        console.log(error);
        alert('Error in GET /inventory');
    })
    console.log('end of getInventory')
}

function render (inventoryList) {
    // empty - dont want doubles
    $('#outputInventory').empty();

    // append to the DOM
    for (let item of inventoryList) {
        $('#outputInventory').append(`<li> ${item.name}: ${item.description} </li>`);
    }
    $('#nameInput').val('');
    $('#descriptionInput').val('');
}