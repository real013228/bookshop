const titles = [
  {
    title: 'Steins;Gate',
    author: 'WHITE FOX',
    year: 2011,
    description: 'some description',
  },
  {
    title: 'Vinland Saga',
    author: 'Makoto Yukimura',
    year: 2005,
    description: 'some description',
  },
];

function fetchBooks() {
  return fetch('Book', {
    method: 'GET',
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error, status = ${response.status}`);
      }
      return response.json(); // Ensure to return the promise
    })
    .then((data) => {
      const booksArray = Object.values(data).filter(
        (item) => item && typeof item === 'object' && item.title,
      );
      console.log('Books array:', booksArray);
      return booksArray;
    })
    .catch((error) => {
      console.error('Failed to load books:', error);
    });
}

function renderBooks(bookList) {
  const bookContainer = document.getElementById('bookContainer');
  bookContainer.innerHTML = '';

  bookList.forEach((book) => {
    const bookElement = document.createElement('div');
    bookElement.classList.add('book');

    bookElement.innerHTML = `
            <h2>${book.title}</h2>
            <p>Автор: ${book.author}</p>
            <p>Год выпуска: ${book.year}</p>
            <p>${book.description}</p>
        `;

    bookContainer.appendChild(bookElement);
  });
}

function filterBooksByTitle(bookList, searchTerm) {
  return bookList.filter((book) =>
    book.title.toLowerCase().includes(searchTerm.toLowerCase()),
  );
}

function searchBooks() {
  const searchInput = document.getElementById('searchInput');
  const searchTerm = searchInput.value.trim();

  localStorage.setItem('searchTerm', searchTerm);

  window.location.href = 'results.hbs';
}
