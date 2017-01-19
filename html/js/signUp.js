function signUp() {
  // eslint-disable-next-line no-undef
  getConfig('js/config.json', (err, config) => {
    if (err) return;

    const result = document.getElementById('result');
    const email = document.getElementById('email');
    const password = document.getElementById('password');
    const firstname = document.getElementById('firstname');
    const lastname = document.getElementById('lastname');
    result.innerHTML = 'Signing up...';

    // validate input
    if (!email.value) {
      result.innerHTML = 'Please specify your email address.';
    } else if (!firstname.value) {
      result.innerHTML = 'Please specify your first name.';
    } else if (!lastname.value) {
      result.innerHTML = 'Please specify your last name.';
    } else if (!password.value) {
      result.innerHTML = 'Please specify your password.';
    } else {
      const input = {
        email: email.value,
        firstname: firstname.value,
        lastname: lastname.value,
        password: password.value,
      };

      fetch(`${config.apiUrl}/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(input),
      })
        .then(blob => blob.json())
        .then((output) => {
          if (output.created) {
            result.innerHTML = `User ${input.email} created. Please check your email to enable login.`;
          } else {
            result.innerHTML = `User ${input.email} <b>not</b> created.`;
          }
        })
        .catch(err1 => console.error(err1));
    }
  });
}

const form = document.getElementById('signup-form');
form.addEventListener('submit', (evt) => {
  evt.preventDefault();
  signUp();
});
