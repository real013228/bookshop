document.addEventListener('DOMContentLoaded', function () {
  function fetchBooks() {
    document.getElementById('preloader').style.display = 'block';
    fetch('Book', {
      method: 'GET',
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Network response was not ok: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        const booksArray = Object.values(data).filter(
          (item) => item && typeof item === 'object' && item.title,
        );
        console.log('Received data:', booksArray);
        renderBooks(booksArray);
      })
      .catch((error) => {
        handleError(error.message);
      })
      .finally(() => {
        document.getElementById('preloader').style.display = 'none';
      });
  }

  function renderBooks(books) {
    const contentElement = document.getElementById('content');
    contentElement.innerHTML = '';

    books.forEach((book) => {
      const bookContainer = document.createElement('div');
      bookContainer.classList.add('book-container');

      const bookTitleElement = document.createElement('h2');
      bookTitleElement.textContent = book.title;

      const bookDetailsList = document.createElement('ul');
      bookDetailsList.classList.add('book-details');

      bookDetailsList.innerHTML = `
            <li>ID: ${book.id}</li>
            <li>Title: ${book.title}</li>
            <li>Description: ${book.description}</li>
            <li>Author ID: ${book.author}</li>
            <li>Price: $${book.price.toFixed(2)}</li>
            <li>Genres: ${book.genres && book.genres.length > 0 ? book.genres.join(', ') : 'No genres'}</li>
        `;

      bookContainer.appendChild(bookTitleElement);
      bookContainer.appendChild(bookDetailsList);

      contentElement.appendChild(bookContainer);
    });
  }

  function handleError(errorMessage) {
    const contentElement = document.getElementById('content');
    const errorElement = document.createElement('p');
    errorElement.textContent = `⚠ Something went wrong: ${errorMessage}`;
    errorElement.style.color = 'red';
    contentElement.appendChild(errorElement);
  }
  function searchBooks() {
    const searchInput = document.getElementById('searchInput');
    const searchTerm = searchInput.value.trim();
    localStorage.setItem('searchTerm', searchTerm);

    // Fetch books, filter by title, and render output
    fetch(apiUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((books) => {
        const booksArray = books.filter(
          (item) => item && typeof item === 'object' && item.title,
        );
        const filteredBooks = filterBooksByTitle(booksArray, searchTerm);
        renderBooks(filteredBooks);
      })
      .catch((error) => {
        console.error('Failed to fetch or process books:', error);
        renderError(error.message);
      });
  }
  window.location.href = 'results.hbs';
  function filterBooksByTitle(bookList, searchTerm) {
    return bookList.filter((book) =>
      book.title.toLowerCase().includes(searchTerm.toLowerCase()),
    );
  }
  fetchBooks();
});
