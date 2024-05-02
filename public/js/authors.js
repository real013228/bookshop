document.addEventListener('DOMContentLoaded', function () {
  const apiUrl = `http://localhost:8080/Author`;

  function fetchAuthors() {
    document.getElementById('preloader').style.display = 'block';
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
        const authorsArray = Object.values(data).filter(
          (item) => item && typeof item === 'object' && item.firstName,
        );
        console.log('Received data:', authorsArray);
        renderAuthors(authorsArray);
      })
      .catch((error) => {
        handleError(error.message);
      })
      .finally(() => {
        document.getElementById('preloader').style.display = 'none';
      });
  }

  // Function to render authors into the DOM
  function renderAuthors(authors) {
    const contentElement = document.getElementById('content');
    contentElement.innerHTML = '';  // Clear existing content

    authors.forEach((author) => {
      const authorContainer = document.createElement('div');
      authorContainer.classList.add('author-container');

      const authorNameElement = document.createElement('h2');
      authorNameElement.textContent = `${author.firstName} ${author.secondName}`;

      const authorDetailsList = document.createElement('ul');
      authorDetailsList.classList.add('author-details');

      // Building detail list for each author
      authorDetailsList.innerHTML = `
            <li>ID: ${author.id}</li>
            <li>First Name: ${author.firstName}</li>
            <li>Second Name: ${author.secondName}</li>
            <li>Books: ${author.books && author.books.length > 0 ? author.books.join(', ') : 'No books'}</li>
        `; // Conditional rendering of books, checking if the array exists and has elements

      authorContainer.appendChild(authorNameElement);
      authorContainer.appendChild(authorDetailsList);

      contentElement.appendChild(authorContainer);
    });
  }

  function handleError(errorMessage) {
    const contentElement = document.getElementById('content');
    const errorElement = document.createElement('p');
    errorElement.textContent = `⚠ Something went wrong: ${errorMessage}`;
    errorElement.style.color = 'red';
    contentElement.appendChild(errorElement);
  }
  fetchAuthors();
});
