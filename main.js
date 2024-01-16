

//Show more or less button
function myFunction() {
  var dots = document.getElementById("dots");
  var moreText = document.getElementById("more");
  var btnText = document.getElementById("myBtn");

  if (dots.style.display === "none") {
    dots.style.display = "inline";
    btnText.innerHTML = "Show more";
    moreText.style.display = "none";
  } else {
    dots.style.display = "none";
    btnText.innerHTML = "Show less";
    moreText.style.display = "inline";
  }
}

// to add books to the table or just showing
function handleResponse(response) {
  const tbody = document.getElementById('content');

  for (var i = 0; i < 3; i++) {
    var item = response.items[i];
    var title = item.volumeInfo.title;
    var author = item.volumeInfo.authors.join(', ');
    var publisher = item.volumeInfo.publisher;
    var image= item.volumeInfo.imageLinks.thumbnail;
    var newRow =
      "<tr><td>" +
      (i + 1) +
      "</td><td>" +
      title +
      "</td><td>" +
      author +
      "</td><td>" +
      publisher +
      "</td><td><img src='" +
      image +
      "' alt='Cover'></td></tr>";
 
    

    tbody.insertAdjacentHTML('beforeend', newRow);

  }
}

fetch(
  "https://www.googleapis.com/books/v1/volumes?q=Bestseller"
)
  .then((response) => response.json())
  .then(handleResponse)
  .catch((error) => console.error(error));



//adding API DATA to the page in the cards
function handleResp(response) {
  const container = document.querySelector(".data-container");

  response.items.forEach((item, index) => {
    const image = item.volumeInfo.imageLinks.thumbnail;
    const title = item.volumeInfo.title;

    const galleryDiv = document.createElement("div");
    galleryDiv.className = "gallery";

    const imageElement = document.createElement("img");
    imageElement.src = image;
    imageElement.alt = title;
    imageElement.style.width = "100%";
    imageElement.style.height = "auto";

    galleryDiv.appendChild(imageElement);
    container.appendChild(galleryDiv);
  });
}

fetch("https://www.googleapis.com/books/v1/volumes?q=Bestseller")
  .then((response) => response.json())
  .then(handleResp)
  .catch((error) => console.error(error));






//adding book data to searchbar
  document.getElementById('searchForm').addEventListener('submit', function(event) {
  event.preventDefault();
  const query = document.getElementById('searchQuery').value;
  fetchBooks(query);
});

function fetchBooks(query) {
  fetch(`https://www.googleapis.com/books/v1/volumes?q=${query}`)
    .then(response => response.json())
    .then(data => displayResults(data))
    .catch(error => console.error('Error:', error));
}

function displayResults(data) {
  const resultsContainer = document.getElementById("searchResults");
  resultsContainer.innerHTML = "";
  data.items.forEach((book) => {
    const title = book.volumeInfo.title;
    const author = book.volumeInfo.authors
      ? book.volumeInfo.authors.join(", ")
      : "Unknown";
    const thumbnail = book.volumeInfo.imageLinks
      ? book.volumeInfo.imageLinks.thumbnail
      : "";
    resultsContainer.innerHTML += `
      <div class="search-card">
        <img src="${thumbnail}" alt="${title}">
<div class="card-body">
<h5 class="card-title">${title}</h5>
<p class="card-text">${author}</p>
</div>
</div>
`;
  });
}




