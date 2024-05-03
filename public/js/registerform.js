function showRegistrationForm() {
  window.location.href = 'pages/loginform.html';
}
function registerUser() {
  const email = document.getElementById('registerEmail').value;
  const password = document.getElementById('registerPassword').value;

  const url = '/Auth/register';

  fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.text(); // Using response.text() if we're not returning JSON data
    })
    .then(() => {
      alert('Registration successful!');
      window.location.href = '/'; // Redirect or handle next steps
    })
    .catch((error) => {
      console.error('Registration failed:', error);
      alert('Registration failed'); // Improve error handling based on actual server responses
    });
}
