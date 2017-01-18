function signUp() {
  getConfig('js/config.json', (err, config) => {
    if (err) return;

    var result = document.getElementById('result');
    var email = document.getElementById('email');
    var password = document.getElementById('password');
    var firstname = document.getElementById('firstname');
    var lastname = document.getElementById('lastname');
    result.innerHTML = 'Signing up...';

    // validate input
    if (!email.value) {
      result.innerHTML = 'Please specify your email address.'
    } else if (!firstname.value) {
      result.innerHTML = 'Please specify your first name.'
    } else if (!lastname.value) {
      result.innerHTML = 'Please specify your last name.'
    } else if (!password.value) {
      result.innerHTML = 'Please specify your password.'
    } else {
      var input = {
        email: email.value,
        firstname: firstname.value,
        lastname: lastname.value,
        password: password.value
      };

      fetch(`${config.apiUrl}/create`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(input)
        })
        .then(blob => blob.json())
        .then(output => {
          if (output.created) {
            result.innerHTML = `User ${input.email} created. Please check your email to enable login.`;
          } else {
            result.innerHTML = `User ${input.email} <b>not</b> created.`;
          }
        })
        .catch(err => console.error(err));
    }
  });
}

var form = document.getElementById('signup-form');
form.addEventListener('submit', function (evt) {
  evt.preventDefault();
  signUp();
});
