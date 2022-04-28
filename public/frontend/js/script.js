var baseUrl = 'http://localhost:5000';

$(function() { //shorthand document.ready function
    $('#register-form').on('submit', function(e) { //use on if jQuery 1.7+
        e.preventDefault();  //prevent form from submitting
        var data = $("#register-form :input").serializeArray();

        $.ajax({
            url: baseUrl + '/auth/register',
            data: data,
            cors: true,
            type: 'POST',
            dataType: 'json',
            beforeSend: function(request) {
                request.setRequestHeader("Access-Control-Allow-Origin", '*');
            },
            jsonpCallback: 'callback', // this is not relevant to the POST anymore
            success: function (data) {
                window.location.href = '/login';
            },
            error: function (err) {
                var error = err.responseJSON;
                console.log('Error: ' + error.message);
            },
        });


    });


    $('#login-form').on('submit', function(e) { //use on if jQuery 1.7+
        e.preventDefault();  //prevent form from submitting
        var data = $("#login-form :input").serializeArray();

        $.ajax({
            url: baseUrl + '/auth/login',
            data: data,
            cors: true,
            type: 'POST',
            dataType: 'json',
            beforeSend: function(request) {
                request.setRequestHeader("Access-Control-Allow-Origin", '*');
            },
            jsonpCallback: 'callback', // this is not relevant to the POST anymore
            success: function (data) {
                window.location.href = '/';
            },
            error: function (err) {
                var error = err.responseJSON;
                console.log('Error: ' + error.message);
            },
        });


    });
});