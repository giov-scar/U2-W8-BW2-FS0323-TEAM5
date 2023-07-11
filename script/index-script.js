console.log("hello world");

//  URL API
const artistUrl = "https://striveschool-api.herokuapp.com/api/deezer/artist";
const albumUrl = "https://striveschool-api.herokuapp.com/api/deezer/album";
const searchUrl = "https://striveschool-api.herokuapp.com/api/deezer/search?q=";

//DATA 

let now= new Date().getFullYear()
let data= document.getElementById("copy")
data.innerText=  now 