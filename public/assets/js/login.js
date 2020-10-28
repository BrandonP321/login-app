// default variables signalling whether password criteria is met
let hasUpperChars = false;
let hasLowerChars = false;
let hasNumbers = false;
let hasSpecialChars = false;
let isGoodLength = false;

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
        // if user enters valid credentials, redirect to profile page
        window.location.href='/profile'
    })
})

// when user submits sign up form
$('.signUpForm').on('submit', function (event) {
    event.preventDefault();

    // check password criteria before making ajax request
    if (
        !hasLowerChars ||
        !hasUpperChars ||
        !hasNumbers ||
        !hasSpecialChars ||
        !isGoodLength
    ) {
        return alert('all criteria must be met')
    }

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
        // user is created in db, redirect to user's profile page
        window.location.href = '/profile'
    })
})

// when user clicks button to change to login or sign up form
$('.formToggleBtn').on('click', function (event) {
    // grab forms to hide and show
    const formToShow = $(this).attr('data-show')
    const formToHide = $(this).attr('data-hide')

    // hide/show forms
    $(`.${formToShow}`).css('display', 'block')
    $(`.${formToHide}`).css('display', 'none')

})

// on each letter entered in new password input, check password strength
$('#signUpPasswordInput').on('input', function (event) {
    // grab password input value
    let password = $('#signUpPasswordInput').val()

    // check if most recently entered character is not acceptable
    const isBadChar = /[^\w!@#$%^&*]/.test(password[password.length - 1])
    if (isBadChar) {
        // store bad char and tell user it can't be used
        const badChar = password[password.length - 1]
        // tell user that the entered char is not valid
        $('#signUpPasswordHelp').text(`'${badChar}' not valid`)
        // remove recent char from input value
        password = password.slice(0, password.length - 1)
        // reset input value without most recent char and return to break function
        return $('#signUpPasswordInput').val(password)
    }

    // make regex tests for password conditions

    // must contain atleast one uppercase character
    hasUpperChars = /[A-Z]{1,}/.test(password)
    // must contain at least one lowercase character
    hasLowerChars = /[a-z]{1,}/.test(password)
    // must contain at least one number
    hasNumbers = /[0-9]{1,}/.test(password)
    // must contain at least one special character
    hasSpecialChars = /[!@#$%^&*]{1,}/.test(password)
    // must be 8-15 characters long
    isGoodLength = password.length >= 8 && password.length <= 15

    if (hasLowerChars) {
        // if password contains atleast one lowercase character, show check mark
        $('#lowerReq').attr('class', 'fas fa-check')
    } else {
        // otherwise show 'x'
        $('#lowerReq').attr('class', 'fas fa-times')
    }

    if (hasUpperChars) {
        // if password contains atleast one uppercase character, show check mark
        $('#upperReq').attr('class', 'fas fa-check')
    } else {
        // otherwise show 'x'
        $('#upperReq').attr('class', 'fas fa-times')
    }

    if (hasNumbers) {
        // if password contains atleast one number, show check mark
        $('#numberReq').attr('class', 'fas fa-check')
    } else {
        // otherwise show 'x'
        $('#numberReq').attr('class', 'fas fa-times')
    }
    
    if (hasSpecialChars) {
        // if password contains atleast one special character, show check mark
        $('#specialReq').attr('class', 'fas fa-check')
    } else {
        // otherwise show 'x'
        $('#specialReq').attr('class', 'fas fa-times')
    }

    if (isGoodLength) {
        // if password is 8-15 characters long, show check mark
        $('#lengthReq').attr('class', 'fas fa-check')
    } else {
        // otherwise show 'x'
        $('#lengthReq').attr('class', 'fas fa-times')
    }
})

// when user focuses on password input on sign up form
$('#signUpPasswordInput').on('focus', function(event) {
    $('.passwordRequirementsContainer').animate({opacity: 1}, 500)
})
