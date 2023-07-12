console.log("hello world");

const artistUrl = "https://striveschool-api.herokuapp.com/api/deezer/artist/";
const albumUrl = "https://striveschool-api.herokuapp.com/api/deezer/album";
const searchUrl = "https://striveschool-api.herokuapp.com/api/deezer/search?q=";

const addressBarContent = new URLSearchParams(location.search);
const artistId = addressBarContent.get("id");

const tracksContainer = document.getElementById("tracks-container");
const artistDataContainer = document.getElementById("artist-container");

const hidePlaceholder = function () {
  const tracksPlaceholder = document.getElementById("tracks-placeholder");
  const artistPlaceholder = document.getElementById("mediumBg");
  tracksPlaceholder.classList.add("d-none");
  artistPlaceholder.classList.add("d-none");
};

if (artistId) {
  fetch(artistUrl + artistId)
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        throw new error(error);
      }
    })
    .then((data) => {
      console.log(data);

      // add artist data in HTML
      let newRow = document.createElement("div");
      newRow.classList.add("row");
      newRow.setAttribute("id", "mediumBg");
      newRow.innerHTML = `  
      <div class="col col-12 d-flex flex-row justify-content-center my-4">
        <!--  ARTIST IMAGE -->
        <img
          src="${data.picture_medium}  "
              
          alt="Artist Cover"
          id="img"
          class="rounded-circle"
        />
      </div>
      
      <div class="col col-10 ps-5">
        <!--  ARTIST INFORMATION  -->
        <h5 class="text-white">${data.name}</h5>
        <p class="text-secondary">${data.nb_fan} ascoltatori mensili</p>
      </div>
      
      <div class="col col-12 ps-5">
        <!--  FOLLOWING SHARING AND PLAY ICONS  -->
        <div
          class="row d-flex flex-row justify-content-between align-items-center"
        >
          <div class="col">
            <button
              type="button"
              class="btn btn-outline-light rounded-pill py-1 px-3"
            >
              Segui
            </button>
      
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="35"
              fill="grey"
              class="bi bi-share mx-2"
              viewBox="0 0 16 16"
              id="share"
            >
              <path
                d="M13.5 1a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zM11 2.5a2.5 2.5 0 1 1 .603 1.628l-6.718 3.12a2.499 2.499 0 0 1 0 1.504l6.718 3.12a2.5 2.5 0 1 1-.488.876l-6.718-3.12a2.5 2.5 0 1 1 0-3.256l6.718-3.12A2.5 2.5 0 0 1 11 2.5zm-8.5 4a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zm11 5.5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3z"
              />
            </svg>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="35"
              fill="grey"
              class="bi bi-three-dots-vertical"
              viewBox="0 0 16 16"
              id="more-info"
            >
              <path
                d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"
              />
            </svg>
          </div>
      
          <div class="col text-end">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="50"
              height="65"
              fill="#1DB954"
              class="bi bi-play-circle-fill"
              viewBox="0 0 16 16"
              id="play"
            >
              <path
                d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM6.79 5.093A.5.5 0 0 0 6 5.5v5a.5.5 0 0 0 .79.407l3.5-2.5a.5.5 0 0 0 0-.814l-3.5-2.5z"
              />
            </svg>
          </div>
        </div>
      </div>
      `;
      artistDataContainer.appendChild(newRow);

      fetch(data.tracklist)
        .then((response) => {
          if (response.ok) {
            return response.json();
          } else {
            throw new error(error);
          }
        })
        .then((tracks) => {
          hidePlaceholder();

          let myTracks = tracks.data;
          console.log(myTracks);
          let index = 1;
          myTracks.forEach((e) => {
            let newCol = document.createElement("div");
            newCol.classList.add(
              "row",
              "mt-5",
              "d-flex",
              "flex-row",
              "align-items-center",
              "ps-5"
            );
            newCol.innerHTML = `
            <div class='d-none'>
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
`;
            index += 1;
            tracksContainer.appendChild(newCol);
          });
          const fixedPalyer = document.getElementById("album");

          let audioSelected;
          // add play pause function on all tracks
          const playerBottom = document.getElementById("icon");
          let allTracks = document.querySelectorAll(".play");
          const mainPlayButton = document.getElementById("play");
          const playBottom = document.getElementById("play-fixed");
          console.log(mainPlayButton);
          allTracks.forEach((track) => {
            track.addEventListener("click", function () {
              let albumImgUrl = this.querySelector("#img-album-url").innerText;
              let title = this.querySelector("h6").innerText;
              playerBottom.classList.remove("d-none");
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
        });
    });
}
