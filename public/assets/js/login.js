// when user submits login form
$('.loginForm').on('submit', function (event) {
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
            401: function () {
                // user entered incorrect email or password
                // show text alerting user
                $('#loginHelp').text("Incorrect email or password")
            }
        }
    }).done(response => {
        alert('logged in')
    })
})

// when user submits sign up form
$('.signUpForm').on('submit', function (event) {
    event.preventDefault();

    // grab input from form
    const userEmail = $('#signUpEmailInput').val();
    const userName = $('#signUpNameInput').val();
    const userPassword = $('#signUpPasswordInput').val();

    // make request to server to create new account
    $.ajax({
        url: '/signup',
        method: "POST",
        data: {
            email: userEmail,
            name: userName,
            password: userPassword
        },
        statusCode: {
            403: function () {
                // alert user that email is already taken
                $('#signUpHelp').text('Email taken')
            }
        }
    }).done(response => {
        alert('New account created')
    })
})

// when user clicks button to change to login or sign up form
$('.formToggleBtn').on('click', function(event) {
    // grab forms to hide and show
    const formToShow = $(this).attr('data-show')
    const formToHide = $(this).attr('data-hide')

    // hide/show forms
    $(`.${formToShow}`).css('display', 'block')
    $(`.${formToHide}`).css('display', 'none')

})
