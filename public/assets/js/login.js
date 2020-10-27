// when user submits login form
$('.loginForm').on('submit', function(event) {
    event.preventDefault();

    // grab input from form
    const userEmail = $('#loginEmailInput').val();
    const userPassword = $('#loginPasswordInput').val();

    // make request to server to log in user
    $.ajax({
        url: 'login',
        method: "POST",
        data: {
            email: userEmail,
            password: userPassword
        },
        statusCode: {
            401: function() {
                // user entered incorrect email or password
                // show text alerting user
                $('#loginHelp').text("Incorrect email or password")
            }
        }
    }).done(response => {
        alert('logged in')
    })
})