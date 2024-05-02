document.addEventListener('DOMContentLoaded', function () {
  function fetchData() {
    document.getElementById('preloader').style.display = 'block';

    const apiUrl = `http://localhost:8080/User`;

    fetch(apiUrl, {
      method: 'GET',
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Network response was not ok: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        const usersArray = Object.values(data).filter(
          (item) => item && typeof item === 'object' && item.email,
        );
        console.log('Received data:', usersArray);
        renderData(usersArray);
      })
      .catch((error) => {
        handleError(error.message);
      })
      .finally(() => {
        document.getElementById('preloader').style.display = 'none';
      });
  }

  function renderData(users) {
    const contentElement = document.getElementById('content');
    contentElement.innerHTML = '';

    users.forEach((user) => {
      const userContainer = document.createElement('div');
      userContainer.classList.add('user-container');

      const usernameElement = document.createElement('h2');
      usernameElement.textContent = user.name;

      const userDetailsList = document.createElement('ul');
      userDetailsList.classList.add('user-details');

      userDetailsList.innerHTML = `
            <li>ID: ${user.id}</li>
            <li>Name: ${user.name}</li>
            <li>Email: ${user.email}</li>
            <li>Orders: ${user.orders.join(', ') || 'No orders'}</li>
        `;

      userContainer.appendChild(usernameElement);
      userContainer.appendChild(userDetailsList);

      contentElement.appendChild(userContainer);
    });
  }

  function handleError(errorMessage) {
    const contentElement = document.getElementById('content');
    const errorElement = document.createElement('p');
    errorElement.textContent = `⚠ Something went wrong: ${errorMessage}`;
    errorElement.style.color = 'red';
    contentElement.appendChild(errorElement);
  }

  fetchData();
});
