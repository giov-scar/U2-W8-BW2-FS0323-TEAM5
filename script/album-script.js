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
      // add album img and detail
      let albumImg = data.cover_medium;

      const imgContainer = document.getElementById("album-img-container");
      const img = document.getElementById("img");
      img.classList.add("d-none");
      imgContainer.innerHTML = `
      <img src="${albumImg}" alt="Album Cover">
      `;

      let albumTitle = data.title;
      let artistImg = data.artist.picture_small;
      let artistName = data.artist.name;
      let year = data.release_date.substring(0, 4);
      let numberTracks = tracklist.length;

      const duration = data.duration;

      //   transform second in hours, minutes and seconds
      let date = new Date(null);
      date.setSeconds(duration);
      let hours = date.toISOString().substr(12, 1);
      console.log(hours);
      let minutes = date.toISOString().substr(14, 2);
      console.log(minutes);
      let seconds = date.toISOString().substr(17, 2);
      console.log(seconds);

      //   selected album container
      const albumInformationContainer =
        document.getElementById("album-information");
      console.log(albumInformationContainer);
      const arrayInformation = Array.from(albumInformationContainer.children);
      //   delete all placeholder
      arrayInformation.forEach((e) => {
        e.classList.add("d-none");
      });
      // create a dynamic html to API

      albumInformationContainer.innerHTML = `
                <h5 id="album-title" class="text-white">${albumTitle}</h5>
            
              <img
                src=${artistImg}
                alt="artist-photo"
                class="rounded-circle mb-3"
              />
              <span class="text-white mx-3">${artistName}</span>
              <p class="text-white">
               ${year} &centerdot; ${numberTracks} brani, circa ${hours} ora ${minutes} min
              </p>
`;

      //   add album track in html
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
<div id='track-info' class='d-none'>
<span id='img-album-url'>${e.album.cover_small}</span>

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
              id='play'
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

      const fixedPalyer = document.getElementById("album");

      let audioSelected;
      // add play pause function on all tracks
      let allTracks = document.querySelectorAll(".play");
      const mainPlayButton = document.getElementById("play");
      const playBottom = document.getElementById("play-fixed");
      console.log(mainPlayButton);
      allTracks.forEach((track) => {
        track.addEventListener("click", function () {
          let albumImgUrl = this.querySelector("#img-album-url").innerText;
          let title = this.querySelector("h6").innerText;
          fixedPalyer.innerHTML = `
            <div>
           <img src="${albumImgUrl}" alt="album-img" srcset="">
            </div>
            <div>
            <span class='text-white'>${title}</span>
            </div>
            <div id="bar"></div>
            `;

          let audio = this.querySelector("#audio");
          const allAudio = document.querySelectorAll("audio");
          if (audio.paused) {
            allAudio.forEach((e) => {
              e.pause();
              e.currentTime = 0;
            });
            audio.play();
          } else {
            audio.pause();
          }
          console.log(audioSelected);
          return (audioSelected = audio);
        });
      });
      mainPlayButton.addEventListener("click", () => {
        if (audioSelected.paused) {
          console.log(audioSelected);
          audioSelected.play();
        } else {
          audioSelected.pause();
        }
      });
      playBottom.addEventListener("click", () => {
        if (audioSelected.paused) {
          console.log(audioSelected);
          audioSelected.play();
        } else {
          audioSelected.pause();
        }
      });
    })
    .catch((err) => {
      console.log(err);
    });
}

//DATA
let now = new Date().getFullYear();
let data = document.getElementById("copy");
data.innerText = now;
