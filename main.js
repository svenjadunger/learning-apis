//SHOW MORE OR LESS BUTTON
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

// TO ADD BOOKS TO THE TABLE
function handleResponse(response) {
  const tbody = document.getElementById("content");

  for (var i = 0; i < 3; i++) {
    var item = response.items[i];
    var title = item.volumeInfo.title;
    var author = item.volumeInfo.authors.join(", ");
    var publisher = item.volumeInfo.publisher;
    var image = item.volumeInfo.imageLinks.thumbnail;
    var newRow =
      "</td><td>" +
      title +
      "</td><td>" +
      author +
      "</td><td>" +
      publisher +
      "</td><td><img src='" +
      image +
      "' alt='Cover'></td></tr>";

    tbody.insertAdjacentHTML("beforeend", newRow);
  }
}

fetch("https://www.googleapis.com/books/v1/volumes?q=Bestseller")
  .then((response) => response.json())
  .then(handleResponse)
  .catch((error) => console.error(error));

//TO FILTER DATA (BESTSELLER)
function handleResponseBestsellers(response) {
  const container = document.getElementById("bestseller-books");

  response.items.forEach((item, index) => {
    console.log("item :>> ", item);
    const image = item.volumeInfo.imageLinks.thumbnail;
    const title = item.volumeInfo.title;
    const description = item.volumeInfo.description;
    const price = item.saleInfo.listPrice?.amount;

    const galleryDiv = document.createElement("div");
    galleryDiv.className = "gallery";

    const imageElement = document.createElement("img");
    imageElement.src = image;
    imageElement.alt = title;
    imageElement.setAttribute("data-bs-toggle", "modal");
    imageElement.setAttribute("data-bs-target", "#exampleModalCenter");
    imageElement.setAttribute("data-title", title);
    imageElement.setAttribute("data-description", description);
    imageElement.setAttribute("data-price", price);

    imageElement.style.width = "100%";
    imageElement.style.height = "auto";
  
    galleryDiv.appendChild(imageElement);
    container.appendChild(galleryDiv);
  });
}

fetch("https://www.googleapis.com/books/v1/volumes?q=Bestseller")
  .then((response) => response.json())
  .then(handleResponseBestsellers)
  .catch((error) => console.error(error));

//TO ADD DATA TO SEARCHBAR
document
  .getElementById("searchForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    const query = document.getElementById("searchQuery").value;
    fetchBooks(query);
  });

function fetchBooks(query) {
  fetch(`https://www.googleapis.com/books/v1/volumes?q=${query}`)
    .then((response) => response.json())
    .then((data) => displayResults(data))
    .catch((error) => console.error("Error:", error));
}

function displayResults(data) {
  const resultsContainer = document.getElementById("searchResults");
  resultsContainer.innerHTML = "";
  resultsContainer.classList.add("d-flex", "flex-wrap"); // Flex-Container

  data.items.forEach((book) => {
    const title = book.volumeInfo.title;
    const author = book.volumeInfo.authors
      ? book.volumeInfo.authors.join(", ")
      : "Unknown";
    const thumbnail = book.volumeInfo.imageLinks
      ? book.volumeInfo.imageLinks.thumbnail
      : "";

    resultsContainer.innerHTML += `
       <div class="card mb-3" style="max-width: 540px;">
        <div class="row g-0">
          <div class="col-md-4">
            <img src="${thumbnail}" class="img-fluid rounded-start" alt="${title}">
          </div>
          <div class="col-md-8">
            <div class="card-body">
              <h5 class="card-title">${title}</h5>
              <p class="card-text">${author}</p>
            </div>
    `;
  });
}

//TO FILTER DATA (SEBASTIAN FITZEK BOOKS)

function displayFitzekBooks(books) {
  const container = document.getElementById("fitzek-books");

  books.forEach((book) => {
    const image = book.volumeInfo.imageLinks.thumbnail;
    const title = book.volumeInfo.title;

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

const myFetch = async () => {
  fetch(
    "https://www.googleapis.com/books/v1/volumes?q=inauthor:Sebastian+Fitzek"
  )
    .then((response) => response.json())
    .then((result) => {
      const booksOfFitzek = result.items.filter(
        (book) =>
          book.volumeInfo.authors &&
          book.volumeInfo.authors.includes("Sebastian Fitzek")
      );
      displayFitzekBooks(booksOfFitzek);
    })
    .catch((err) => console.log(err));
};

myFetch();

//FILTERING BASED ON CHECKBOX
document.querySelectorAll(".checkbox").forEach((item) => {
  item.addEventListener("change", handleCheckboxChange);
});

function handleCheckboxChange() {
  let query = "";
  document.querySelectorAll(".checkbox:checked").forEach((checkbox) => {
    query += `subject:${checkbox.value}+`;
  });
  query = query.slice(0, -1);
  fetchBooks(query);
}

//FIlTER BY LANGUAGE

document
  .getElementById("languageSelect")
  .addEventListener("change", function () {
    let query = document.getElementById("searchQuery").value;
    fetchBooks(query);
  });

function fetchBooks(query) {
  let language = document.getElementById("languageSelect").value;
  let searchUrl = `https://www.googleapis.com/books/v1/volumes?q=${query}`;
  if (language) {
    searchUrl += `&langRestrict=${language}`;
  }
  fetch(searchUrl)
    .then((response) => response.json())
    .then((data) => displayResults(data))
    .catch((error) => console.error("Error:", error));
}


//MODAL FOR BESTSELLER GALLERY
document.addEventListener('DOMContentLoaded', (event) => {
  const myModal = document.getElementById("exampleModalCenter");
  myModal.addEventListener("show.bs.modal", function (event) {
    const triggerElement = event.relatedTarget;
    
    const bookTitle = triggerElement.getAttribute("data-title");
    const bookDescription = triggerElement.getAttribute("data-description");
    const bookPrice = triggerElement.getAttribute("data-price");
    
    myModal.querySelector("#exampleModalLongTitle").textContent = bookTitle;
    myModal.querySelector(".modal-body").textContent = bookDescription;
    
    myModal.querySelector(
      "#modalPriceElement"
    ).textContent = `Price: ${bookPrice}`;

  });
});
