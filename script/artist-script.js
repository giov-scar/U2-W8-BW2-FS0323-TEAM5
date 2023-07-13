console.log("hello world");

const artistUrl = "https://striveschool-api.herokuapp.com/api/deezer/artist/";
const albumUrl = "https://striveschool-api.herokuapp.com/api/deezer/album";
const searchUrl = "https://striveschool-api.herokuapp.com/api/deezer/search?q=";

const addressBarContent = new URLSearchParams(location.search);
const artistId = addressBarContent.get("id");
const playIconContainer = document.getElementById("play-fixed");

const timelineIndicator = document.querySelector(".timeline-indicator");

// crea un canvas con l'immagine e ne ritorno il context 2d
const draw = function (img) {
  let canvas = document.createElement("canvas");
  let c = canvas.getContext("2d");
  c.width = canvas.width = img.clientWidth;
  c.height = canvas.height = img.clientHeight;
  c.clearRect(0, 0, c.width, c.height);
  c.drawImage(img, 0, 0, img.clientWidth, img.clientHeight);
  return c;
};

// scompone pixel per pixel e ritorna un oggetto con una mappa della loro frequenza nell'immagine
const getColors = function (c) {
  let col,
    colors = {};
  let pixels, r, g, b, a;
  r = g = b = a = 0;
  pixels = c.getImageData(0, 0, c.width, c.height);
  for (let i = 0, data = pixels.data; i < data.length; i += 4) {
    r = data[i];
    g = data[i + 1];
    b = data[i + 2];
    a = data[i + 3];
    if (a < 255 / 2) continue;
    col = rgbToHex(r, g, b);
    if (!colors[col]) colors[col] = 0;
    colors[col]++;
  }
  return colors;
};

// trova il colore più ricorrente data una mappa di frequenza dei colori
const findMostRecurrentColor = function (colorMap) {
  let highestValue = 0;
  let mostRecurrent = null;
  for (const hexColor in colorMap) {
    if (colorMap[hexColor] > highestValue) {
      mostRecurrent = hexColor;
      highestValue = colorMap[hexColor];
    }
  }
  return mostRecurrent;
};

// converte un valore in rgb a un valore esadecimale
const rgbToHex = function (r, g, b) {
  if (r > 255 || g > 255 || b > 255) {
    throw "Invalid color component";
  } else {
    return ((r << 16) | (g << 8) | b).toString(16);
  }
};

// inserisce degli '0' se necessario davanti al colore in esadecimale per renderlo di 6 caratteri
const pad = function (hex) {
  return ("000000" + hex).slice(-6);
};

const start = function () {
  // prendo il riferimento all'immagine del dom
  let imgReference = document.querySelector("#img-album-color");
  console.log(imgReference);
  // creo il context 2d dell'immagine selezionata
  let context = draw(imgReference);

  // creo la mappa dei colori più ricorrenti nell'immagine
  let allColors = getColors(context);

  // trovo colore più ricorrente in esadecimale
  let mostRecurrent = findMostRecurrentColor(allColors);

  // se necessario, aggiunge degli '0' per rendere il risultato un valido colore esadecimale
  let mostRecurrentHex = pad(mostRecurrent);

  // console.log del risultato
  console.log(mostRecurrentHex);
  return mostRecurrentHex;

  //   let containerDiv = document.getElementById("mediumBg");
  //   containerDiv.style.background = `#${mostRecurrentHex}`;
};

const addPauseIcon = function (element) {
  element.innerHTML = `
  <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" 
  fill="currentColor" class="bi bi-pause" viewBox="0 0 16 16">
  <path d="M6 3.5a.5.5 0 0 1 .5.5v8a.5.5 0 0 1-1 0V4a.5.5 0 0 1 
  .5-.5zm4 0a.5.5 0 0 1 .5.5v8a.5.5 0 0 1-1 0V4a.5.5 0 0 1 .5-.5z"/>
  </svg>`;
};

const addPlayIcon = function (element) {
  element.innerHTML = `
  <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor"
  class="bi bi-play-fill" viewBox="0 0 16 16">
  <path d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z"/>
  </svg>
  `;
};

const resetAnimation = function (el) {
  el.style.animation = "none";
  el.offsetHeight; /* trigger reflow */
  el.style.animation = null;
};


const tracksContainer = document.getElementById("tracks-container");
const artistDataContainer = document.getElementById("artist-container");

const hidePlaceholder = function () {
  const tracksPlaceholder = document.getElementById("tracks-placeholder");
  const artistPlaceholder = document.getElementById("artist-placeholder");
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
      hidePlaceholder();
      // add artist data in HTML
      let newRow = document.createElement("div");
      newRow.classList.add("row");
      newRow.setAttribute("id", "mediumBg");
      newRow.innerHTML = `  
      <div class="col col-12 d-flex flex-row justify-content-center my-4">
        <!--  ARTIST IMAGE -->
        <img
        id='img-album-color'
          src="${data.picture_medium}  "  
          alt="Artist Cover"
          crossorigin='anonymous'
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
              id="play"
              xmlns="http://www.w3.org/2000/svg"
              width="50"
              height="65"
              fill="#1DB954"
              class="bi bi-play-circle-fill"
              viewBox="0 0 16 16"
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

      imgAlbumColor = document.getElementById("img-album-color");

      imgAlbumColor.addEventListener("load", () => {
        let mediumColor = start();

        const bgContainer = document.getElementById("mediumBg");

        bgContainer.style.background = `linear-gradient(0deg, rgba(0,0,0,1) 0%, #${mediumColor} 100%)`;
      });

      fetch(data.tracklist)
        .then((response) => {
          if (response.ok) {
            return response.json();
          } else {
            throw new error(error);
          }
        })
        .then((tracks) => {
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
              "ps-5",
              "play-tracks"
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
          // select play button

          const mainPlayButton = document.getElementById("play");
          let allTracks = document.querySelectorAll(".play-tracks");
          const playerBottom = document.getElementById("icon");
    
          
         
    
          // select all div of track and add an add event listner
          let audioSelected;
          console.log("audioselected", audioSelected);
          
         
          allTracks.forEach((track) => {
            track.addEventListener("click", function () {
              resetAnimation(timelineIndicator);
              let albumImgUrl = this.querySelector("#img-album-url").innerText;
              let trackTitle = this.querySelector("h6").innerText;
              let mediumColor = start();
              // add a background color to audio player
              playerBottom.style.background = `linear-gradient(0deg,#${mediumColor} 0%, #${mediumColor} 100%)`;
    
              playerBottom.classList.remove("d-none");
    
              // active audio tag selcted on click
              let audio = this.querySelector("#audio");
              const allAudio = document.querySelectorAll("audio");
              if (audio.paused) {
                allAudio.forEach((e) => {
                  e.pause();
                  e.currentTime = 0;
                });
                audio.play();
                timelineIndicator.style.animationPlayState = "running";
                addPauseIcon(playIconContainer);
              } else {
                audio.pause();
                timelineIndicator.style.animationPlayState = "paused";
                addPlayIcon(playIconContainer);
              }
    
              return (audioSelected = audio);
            });
          });
    
          //  function to play pause at main play button
          console.log("audioselected", audioSelected);

          mainPlayButton.addEventListener("click", () => {
            // start fisrt track on-click
    
            if (audioSelected === undefined) {
              let firstAudio = document.querySelector("audio");
              let firstTrackInfo = firstAudio.parentElement.parentElement;
              let firstalbumImgUrl =
                firstTrackInfo.querySelector("#img-album-url").innerText;
              let firstTitle = firstTrackInfo.querySelector("h6").innerText;
    
              let mediumColor = start();
    
              playerBottom.style.background = `linear-gradient(0deg,#${mediumColor} 0%, #${mediumColor} 100%)`;
    
              playerBottom.classList.remove("d-none");
    
              // selecet icon play container
    
              if (firstAudio.paused) {
                firstAudio.play();
                timelineIndicator.style.animationPlayState = "running";
                addPauseIcon(playIconContainer);
              } else {
                firstAudio.pause();
                timelineIndicator.style.animationPlayState = "paused";
                addPlayIcon(playIconContainer);
              }
    
              return (audioSelected = firstAudio);
            } else {
              if (audioSelected.paused) {
                audioSelected.play();
                timelineIndicator.style.animationPlayState = "running";
                addPauseIcon(playIconContainer);
              } else {
                audioSelected.pause();
                timelineIndicator.style.animationPlayState = "paused";
                addPlayIcon(playIconContainer);
              }
            }
          });
          // selecet icon play container

          playIconContainer.addEventListener("click", () => {
            if (audioSelected.paused) {
              console.log(audioSelected);
              audioSelected.play();
              timelineIndicator.style.animationPlayState = "running";
              addPauseIcon(playIconContainer);
            } else {
              audioSelected.pause();
              timelineIndicator.style.animationPlayState = "paused";
              addPlayIcon(playIconContainer);
            }
          });
        })
        .catch((err) => {
          console.log(err);
        });
    })
    .catch((err) => {
      console.log(err);
    });
}
