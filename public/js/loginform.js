function loginUser() {
  const email = document.getElementById('loginEmail').value;
  const password = document.getElementById('loginPassword').value;

  const url = '/Auth/login';

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
      return response.text(); // Assuming non-JSON response for simplicity
    })
    .then(() => {
      alert('Login successful!');
      window.location.href = '/'; // Redirect to user dashboard or other appropriate page
    })
    .catch((error) => {
      console.error('Login failed:', error);
      alert('Login failed');
    });
}
