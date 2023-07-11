console.log("hello world");

const artistUrl = "https://striveschool-api.herokuapp.com/api/deezer/artist";
const albumUrl = "https://striveschool-api.herokuapp.com/api/deezer/album/";
const searchUrl = "https://striveschool-api.herokuapp.com/api/deezer/search?q=";

const addressBarContent = new URLSearchParams(location.search);
const albumId = addressBarContent.get("id");

console.log(albumId);

if (albumId) {
  fetch(albumUrl + albumId)
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        throw new error(error);
      }
    })
    .then((data) => {
      let tracklist = data.tracks.data;
      console.log(data);
      console.log("url tracklist", tracklist);

      let index = 1;
      const trackContainer = document.getElementById("track-container");
      const placeholdertrack = document.getElementById("placeholder-track");
      placeholdertrack.classList.add("d-none");
      tracklist.forEach((e) => {
        let newTrack = document.createElement("div");
        newTrack.classList.add(
          "row",
          "mt-5",
          "d-flex",
          "flex-row",
          "align-items-center",
          "ps-5",
          "play"
        );
        newTrack.innerHTML = `
        <div class='visually-hidden'>
        <audio
       id='audio'
        controls
          src="${e.preview}"
        >
         
        </audio>
        </div>
            <div class="col col-1" id="position">
              <p class="text-white align-middle">${index}</p>
            </div>

            <div class="col col-10" id="track-title">
              <h6 class="text-white mb-0">${e.title}</h6>
              <p class="text-secondary">${e.artist.name}</p>
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
          `;
        trackContainer.appendChild(newTrack);
        index += 1;
      });

      let allTracks = document.querySelectorAll(".play");

      allTracks.forEach((track) => {
        track.addEventListener("click", function () {
          let audio = this.querySelector("#audio");
          if (audio.paused) {
            audio.play();
          } else {
            audio.pause();
          }
        });
      });
    })
    .catch((err) => {
      console.log(err);
    });
}

//DATA 
let now= new Date().getFullYear()
let data= document.getElementById("copy")
data.innerText=  now 
