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

console.log("ji");
console.log(data);

const myContentContainer = document.getElementById("content");

for (let i = 0; i < data.length; i++) {
  const title = data[i].title;
  const titleElement = document.createElement("p");
  titleElement.textContent = title;
  myContentContainer.appendChild(titleElement);
  console.log("title :", title);
}


