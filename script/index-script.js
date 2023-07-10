console.log("hello world");

//  URL API
const artistUrl = "https://striveschool-api.herokuapp.com/api/deezer/artist";
const albumUrl = "https://striveschool-api.herokuapp.com/api/deezer/album";
const searchUrl = "https://striveschool-api.herokuapp.com/api/deezer/search?q=";
//function to hide main
const hideMain = function () {
  const main = document.getElementsByTagName("main");
  main.classlist.add("d-none");
};

// function for fetch

const mysearch = function () {
  const searchInput = document.getElementById("search");
  let serchValue = searchInput.value;
  fetch(`${searchUrl}${serchValue}`)
    .then((res) => {
      if (res.ok) {
        console.log(res);
        return res.json();
      } else {
        throw new error("error");
      }
    })
    .then((data) => {
      console.log(data);
    })
    .catch((err) => {
      console.log(err);
    });
};

const searchbutton = document.getElementById("search-button");
searchbutton.addEventListener("click", function (e) {
  e.preventDefault();
  mysearch();
});
