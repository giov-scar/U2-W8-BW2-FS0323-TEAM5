console.log("hello world");

const artistUrl = "https://striveschool-api.herokuapp.com/api/deezer/artist";
const albumUrl = "https://striveschool-api.herokuapp.com/api/deezer/album/";
const searchUrl = "https://striveschool-api.herokuapp.com/api/deezer/search?q=";

const addressBarContent = new URLSearchParams(location.search);
const albumId = addressBarContent.get("id");

console.log(albumId);

if (albumId) {
  fetch(url + albumId);
}
