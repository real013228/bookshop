function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
}
function decodeJWT(token) {
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  const jsonPayload = decodeURIComponent(
    window
      .atob(base64)
      .split('')
      .map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join(''),
  );

  return JSON.parse(jsonPayload);
}
const token = getCookie('access_token');
const decoded = decodeJWT(token);
const email = decoded.email;

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
  bookContainer.innerHTML = ''; // Clear any previous content

  bookList.forEach((book, index) => {
    // add index here
    const bookElement = document.createElement('div');
    bookElement.classList.add('book');

    bookElement.innerHTML = `
      <h2>${book.title}</h2>
      <p>Автор: ${book.author}</p>
      <p>Год выпуска: ${book.year}</p>
      <p>${book.description}</p>
    `;
    const selectButton = document.createElement('button');
    selectButton.textContent = 'Выбрать';
    selectButton.onclick = () => toggleBookSelection(book, index); // pass index to function
    bookContainer.appendChild(bookElement);
    bookElement.appendChild(selectButton);
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
let selectedBooks = [];

function toggleBookSelection(book) {
  const isSelectedIndex = selectedBooks.indexOf(book);
  if (isSelectedIndex !== -1) {
    selectedBooks.splice(isSelectedIndex, 1);
    console.log('Book deselected:', book.title);
  } else {
    selectedBooks.push(book);
    console.log('Book selected:', book.title);
  }
}

function createOrder() {
  if (selectedBooks.length === 0) {
    alert('Пожалуйста, выберите хотя бы одну книгу для создания заказа.');
    return;
  }

  const orderData = {
    bookIds: selectedBooks.map(book => book.id),
    userId: email,
  };
  console.log(orderData);

  const url = '/Order';

  fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(orderData),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      console.log('Order created successfully:', data);
      alert('Заказ был создан успешно!');
      selectedBooks = [];
    })
    .catch((err) => {
      console.error('Error creating order:', err);

      alert('Ошибка при создании заказа.');
    });
}
