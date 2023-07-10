console.log("hello world");

const searchButton = document.getElementById("search-button");

const artistUrl = "https://striveschool-api.herokuapp.com/api/deezer/artist";
const albumUrl = "https://striveschool-api.herokuapp.com/api/deezer/album";
const searchUrl = "https://striveschool-api.herokuapp.com/api/deezer/search?q=";

const searchInput = document.getElementById("search-input");

const hiddenContainer = document.getElementById("hidden");
const containerSearchResult = document.getElementById("images-grid");

// function for hide default content
const hideDefault = function () {
  hiddenContainer.classList.add("d-none");
};

// function for fetch

const mysearch = function () {
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
      // dtransform data in array
      let myData = data.data;

      //   create a array for album and artist
      const resultAlbum = [];
      const resultArtist = [];

      //   foreach for push album and artist in a different array
      myData.forEach((e) => {
        resultAlbum.push(e.album);
        resultArtist.push(e.artist);
      });
      console.log(resultAlbum);

      searchInput.value = "";

      resultArtist.forEach((e) => {
        let imageArtistUrl = e.picture;
        let nameArtist = e.name;
      });
      resultAlbum.forEach((e) => {
        let imageAlbumUrl = e.cover_big;
        let nameAlbum = e.title;
        console.log(imageAlbumUrl);
        console.log(nameAlbum);
      });
      hideDefault();
    })

    .catch((err) => {
      console.log(err);
    });
};

searchButton.addEventListener("click", function (e) {
  e.preventDefault();
  mysearch();
});
