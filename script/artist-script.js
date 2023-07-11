console.log('hello world');

const artistUrl = "https://striveschool-api.herokuapp.com/api/deezer/artist/";
const albumUrl = "https://striveschool-api.herokuapp.com/api/deezer/album";
const searchUrl = "https://striveschool-api.herokuapp.com/api/deezer/search?q=";

const addressBarContent = new URLSearchParams(location.search);
const artistId = addressBarContent.get("id");

const tracksContainer = document.getElementById('tracks-container')


const hidePlaceholder=function (){
const tracksPlaceholder =document.getElementById('tracks-placeholder')
tracksPlaceholder.classList.add ('d-none')
}



if (artistId) {
    fetch(artistUrl + artistId)
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          throw new error(error);
        }
    })
    .then(data=>{
console.log(data);


// creare qui il codice per cmbiae i dti ell'artista



fetch(data.tracklist)
.then((response) => {
    if (response.ok) {
        return response.json();
      } else {
        throw new error(error);
      }
})
.then(tracks=>{

    hidePlaceholder()


let myTracks =tracks.data
console.log(myTracks);

myTracks.forEach(e => {  
let newCol = document.createElement ('div')
newCol.classList.add('row','mt-5','d-flex','flex-row','align-items-center','ps-5',)
newCol.innerHTML=`
<div class="col col-1" id="position">
            <p class="text-white align-middle">1</p>
          </div>

          <div class="col col-10" id="track-title">
            <h6 class="text-white mb-0">${e.title}</h6>
            <p class="text-secondary">${e.rank}</p>
          </div>

          <div class="col col-1 p-0">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="40"
              fill="white"
              class="bi bi-three-dots-vertical"
              viewBox="0 0 16 16"
              id="more-info"
            >
              <path
                d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"
              />
            </svg>
          </div> 
`
tracksContainer.appendChild(newCol)
});
})


    })



}