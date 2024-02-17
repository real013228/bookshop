document.addEventListener("DOMContentLoaded", function () {
  function fetchData() {
    document.getElementById("preloader").style.display = "block";

    const apiUrl = `https://jsonplaceholder.typicode.com/users`;

    fetch(apiUrl)
      .then(response => {
        if (!response.ok) {
          throw new Error(`Network response was not ok: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        const shuffledUsers = shuffleArray(data);
        renderData(shuffledUsers.slice(0, 5));
      })
      .catch(error => {
        handleError(error.message);
      })
      .finally(() => {
        document.getElementById("preloader").style.display = "none";
      });
  }

  function renderData(data) {
    const contentElement = document.getElementById("content");

    contentElement.innerHTML = "";

    data.forEach(user => {
      const userContainer = document.createElement("div");
      userContainer.classList.add("user-container");

      const usernameElement = document.createElement("h2");
      usernameElement.textContent = user.name;

      const userDetailsList = document.createElement("ul");
      userDetailsList.classList.add("user-details");

      userDetailsList.innerHTML = `
        <li>Username: ${user.username}</li>
        <li>Email: ${user.email}</li>
        <li>Address: ${user.address.street}, ${user.address.suite}, ${user.address.city}</li>
        <li>Phone: ${user.phone}</li>
        <li>Website: ${user.website}</li>
      `;

      userContainer.appendChild(usernameElement);
      userContainer.appendChild(userDetailsList);

      contentElement.appendChild(userContainer);
    });
  }

  function handleError(errorMessage) {
    const contentElement = document.getElementById("content");
    const errorElement = document.createElement("p");
    errorElement.textContent = `⚠ Something went wrong: ${errorMessage}`;
    errorElement.style.color = "red";
    contentElement.appendChild(errorElement);
  }

  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  fetchData();
});
