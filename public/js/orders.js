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

document.addEventListener('DOMContentLoaded', function () {
  function fetchorders() {
    const token = getCookie('access_token');
    const decoded = decodeJWT(token);
    const userEmail = decoded.email;

    document.getElementById('preloader').style.display = 'block';

    fetch(`Order/user/${encodeURIComponent(userEmail)}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Network response was not ok: ${response.status}`);
        }
        const respJSON = response.json();
        console.log(respJSON);
        return respJSON;
      })
      .then((data) => {
        const ordersArray = Object.values(data)
          .filter((item) => item && typeof item === 'object' && item.totalPrice)
          .map((order) => {
            order.books = Array.isArray(order.books)
              ? order.books.filter((book) => book && typeof book === 'object').map((book) => book.title)
              : [];
            console.log(order.books);
            return order;
          });

        console.log('Received data:', ordersArray);
        renderorders(ordersArray);
      })
      .catch((error) => {
        handleError(error.message);
      })
      .finally(() => {
        document.getElementById('preloader').style.display = 'none';
      });
  }
  function renderorders(orders) {
    const contentElement = document.getElementById('content');
    contentElement.innerHTML = '';

    orders.forEach((order) => {
      const orderContainer = document.createElement('div');
      orderContainer.classList.add('order-container');

      const orderTitleElement = document.createElement('h2');
      orderTitleElement.textContent = order.id;

      const orderDetailsList = document.createElement('ul');
      orderDetailsList.classList.add('order-details');

      orderDetailsList.innerHTML = `
            <li>ID: ${order.id}</li>
            <li>TotalPrice: ${order.totalPrice}</li>
            <li>Books: ${order.books && order.books.length > 0 ? order.books.join(', ') : 'No books'}</li>
        `;

      orderContainer.appendChild(orderTitleElement);
      orderContainer.appendChild(orderDetailsList);

      contentElement.appendChild(orderContainer);
    });
  }

  function handleError(errorMessage) {
    const contentElement = document.getElementById('content');
    const errorElement = document.createElement('p');
    errorElement.textContent = `⚠ Something went wrong: ${errorMessage}`;
    errorElement.style.color = 'red';
    contentElement.appendChild(errorElement);
  }

  fetchorders();
});
