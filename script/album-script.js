console.log("hello world");
console.log("hello world");
const artistUrl = "https://striveschool-api.herokuapp.com/api/deezer/artist";
const albumUrl = "https://striveschool-api.herokuapp.com/api/deezer/album/";
const searchUrl = "https://striveschool-api.herokuapp.com/api/deezer/search?q=";

const addressBarContent = new URLSearchParams(location.search);
const albumId = addressBarContent.get("id");
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
      <img id='img-album-color' src="${albumImg}" crossorigin='anonymous' alt="Album Cover">
      `;
      imgAlbumColor = document.getElementById("img-album-color");

      imgAlbumColor.addEventListener("load", () => {
        let mediumColor = start();
        console.log(mediumColor);
        const bgContainer = document.getElementById("mediumBg");
        console.log(bgContainer);

        bgContainer.style.background = `linear-gradient(0deg, rgba(0,0,0,1) 0%, #${mediumColor} 100%)`;
      });

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
      const playerBottom = document.getElementById("icon");
      let allTracks = document.querySelectorAll(".play");
      const mainPlayButton = document.getElementById("play");
      const playBottom = document.getElementById("play-fixed");
      console.log(mainPlayButton);
      allTracks.forEach((track) => {
        track.addEventListener("click", function () {
          let albumImgUrl = this.querySelector("#img-album-url").innerText;
          let title = this.querySelector("h6").innerText;
          let mediumColor = start();

          playerBottom.style.background = `linear-gradient(0deg,#${mediumColor} 0%, #${mediumColor} 100%)`;
          playerBottom.classList.remove("d-none");

          fixedPalyer.innerHTML = `
          <div id="album">
          <img src="${albumImgUrl}" alt="album-img" srcset="">
          </div>
          <div class="track-info">
            <div class="track-name">
              <div id="track-title">
              ${title}
              </div>
            </div>
          </div>
          <div></div>
          <div id="cmd">
            <button class="like">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="currentColor"
                class="bi bi-heart"
                viewBox="0 0 16 16"
              >
                <path
                  d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z"
                />
              </svg>
            </button>
            <button class="play-button" id="play-fixed">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="30"
                height="30"
                fill="currentColor"
                class="bi bi-play-fill"
                viewBox="0 0 16 16"
              >
                <path
                  d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z"
                />
              </svg>
            </button>
          </div>
          <div class="timeline">
            <div class="timeline-indicator"></div>
          </div>
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
        if (audioSelected === undefined) {
          let firstAudio = document.querySelector("audio");
          let firstTrackInfo = firstAudio.parentElement.parentElement;
          let firstalbumImgUrl =
            firstTrackInfo.querySelector("#img-album-url").innerText;
          let firstTitle = firstTrackInfo.querySelector("h6").innerText;

          let mediumColor = start();

          playerBottom.style.background = `linear-gradient(0deg,#${mediumColor} 0%, #${mediumColor} 100%)`;

          playerBottom.classList.remove("d-none");
          fixedPalyer.innerHTML = `
          <div id="album">
          <img src="${firstalbumImgUrl}" alt="album-img" srcset="">
          </div>
          <div class="track-info">
            <div class="track-name">
              <div id="track-title">
              ${firstTitle}
              </div>
            </div>
          </div>
          <div></div>
          <div id="cmd">
            <button class="like">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="currentColor"
                class="bi bi-heart"
                viewBox="0 0 16 16"
              >
                <path
                  d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z"
                />
              </svg>
            </button>
            <button class="play-button" id="play-fixed">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="30"
                height="30"
                fill="currentColor"
                class="bi bi-play-fill"
                viewBox="0 0 16 16"
              >
                <path
                  d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z"
                />
              </svg>
            </button>
          </div>
          <div class="timeline">
            <div class="timeline-indicator"></div>
          </div>
            `;
          if (firstAudio.paused) {
            firstAudio.play();
          } else {
            firstAudio.pause();
          }
          return (audioSelected = firstAudio);
        } else {
          if (audioSelected.paused) {
            audioSelected.play();
          } else {
            audioSelected.pause();
          }
        }
      });

      const timelineIndicator = document.querySelector(".timeline-indicator");

      playBottom.addEventListener("click", () => {
        const isRunning =
          timelineIndicator.style.animationPlayState !== "paused";
        console.log(isRunning);
        timelineIndicator.style.animationPlayState = isRunning
          ? "paused"
          : "running";
        // playButtonIcon.name = isRunning ? "play-sharp" : "pause-sharp";

        if (audioSelected.paused) {
          console.log(audioSelected);
          audioSelected.play();
          playBottom.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pause" viewBox="0 0 16 16">
           <path d="M6 3.5a.5.5 0 0 1 .5.5v8a.5.5 0 0 1-1 0V4a.5.5 0 0 1 .5-.5zm4 0a.5.5 0 0 1 .5.5v8a.5.5 0 0 1-1 0V4a.5.5 0 0 1 .5-.5z"/>
         </svg>`;
        } else {
          audioSelected.pause();
          playBottom.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-play-fill" viewBox="0 0 16 16">
          <path d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z"/>
        </svg>`;
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
