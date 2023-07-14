console.log("hello world");

//  URL API
const artistUrl = "https://striveschool-api.herokuapp.com/api/deezer/artist";
const albumUrl = "https://striveschool-api.herokuapp.com/api/deezer/album";
const searchUrl = "https://striveschool-api.herokuapp.com/api/deezer/search?q=";

//DATA

let now = new Date().getFullYear();
let data = document.getElementById("copy");
data.innerText = now;

// let minWidth = window.innerWidth
// console.log(minWidth)
//  if(minWidth>=768){

// function for click album
const albumClick = function (id) {
  const artistUrl = "https://striveschool-api.herokuapp.com/api/deezer/artist";
  const albumUrl = "https://striveschool-api.herokuapp.com/api/deezer/album/";
  const searchUrl =
    "https://striveschool-api.herokuapp.com/api/deezer/search?q=";

  const albumId = id;

  const playIconContainer = document.getElementById("play-fixed");

  const timelineIndicator = document.querySelector(".timeline-indicator");
  const playerImgContainer = document.getElementById("album");
  const playerTitleContainer = document.getElementById("player-track-title");
  let equalContainer;
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

    // creo il context 2d dell'immagine selezionata
    let context = draw(imgReference);

    // creo la mappa dei colori più ricorrenti nell'immagine
    let allColors = getColors(context);

    // trovo colore più ricorrente in esadecimale
    let mostRecurrent = findMostRecurrentColor(allColors);

    // se necessario, aggiunge degli '0' per rendere il risultato un valido colore esadecimale
    let mostRecurrentHex = pad(mostRecurrent);

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

  const addEqualizer = function (element) {
    let number = element.querySelector("p");
    let newDiv = element.querySelector("#equal");
    number.classList.add("d-none");
    newDiv.classList.remove("d-none");
  };
  const removeEqualizer = function (element) {
    let number = element.querySelector("p");

    number.classList.remove("d-none");
    let equalizer = element.querySelector("#equal");

    equalizer.classList.add("d-none");
  };

  const clearEqualizer = function () {
    const allEqualActive = document.querySelectorAll("#equal");
    const equalizerNumber = document.querySelectorAll("#equalizer-number");
    equalizerNumber.forEach((e) => {
      e.classList.remove("d-none");
    });
    allEqualActive.forEach((e) => {
      e.classList.add("d-none");
    });
  };

  fetch(albumUrl + albumId)
    .then((res) => {
      if (res.ok) {
        console.log(res);
        return res.json();
      } else {
        throw new error(error);
      }
    })
    .then((data) => {
      let tracklist = data.tracks.data;

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

        const bgContainer = document.getElementById("mediumBg");

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

      let minutes = date.toISOString().substr(14, 2);

      let seconds = date.toISOString().substr(17, 2);

      //   selected album container
      const albumInformationContainer =
        document.getElementById("album-information");
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
                <p id='equalizer-number' class="text-white align-middle">${index}</p>
                <div id='equal' class='d-none'>
    <svg
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="#1DB954"
  >
  <rect
    class="eq-bar eq-bar--1"
    x="4"
    y="4"
    width="3.7"
    height="8"
  />
  <rect
    class="eq-bar eq-bar--2"
    x="10.2"
    y="4"
    width="3.7"
    height="16"
  />
  <rect
    class="eq-bar eq-bar--3"
    x="16.3"
    y="4"
    width="3.7"
    height="11"
  />
  </svg>
  </div>
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
      // create a variable to set the audio active
      let audioSelected;
      // add play pause function on all tracks

      const playerBottom = document.getElementById("icon");
      const mainPlayButton = document.getElementById("play");

      // select all div of track and add an add event listner
      let allTracks = document.querySelectorAll(".play");

      allTracks.forEach((track) => {
        track.addEventListener("click", function () {
          let audio = this.querySelector("#audio");
          const allAudio = document.querySelectorAll("audio");
          equalContainer = this.querySelector("#position");

          if (audioSelected === audio) {
            if (audio.paused) {
              audio.play();
              addEqualizer(equalContainer);
              timelineIndicator.style.animationPlayState = "running";
              addPauseIcon(playIconContainer);
            } else {
              audio.pause();
              removeEqualizer(equalContainer);
              timelineIndicator.style.animationPlayState = "paused";
              addPlayIcon(playIconContainer);
            }
          } else {
            clearEqualizer();
            resetAnimation(timelineIndicator);
            let albumImgUrl = this.querySelector("#img-album-url").innerText;
            let trackTitle = this.querySelector("h6").innerText;

            playerImgContainer.innerHTML = `<img
              src=${albumImgUrl}
              alt="artist-photo"
              class="rounded-circle mb-3"
            />`;
            playerTitleContainer.innerHTML = `${trackTitle}`;

            let mediumColor = start();
            // add a background color to audio player
            playerBottom.style.background = `linear-gradient(0deg,#${mediumColor} 0%, #${mediumColor} 100%)`;

            playerBottom.classList.remove("d-none");

            // active audio tag selcted on click
            if (audio.paused) {
              allAudio.forEach((e) => {
                e.pause();
                e.currentTime = 0;
              });
              audio.play();
              addEqualizer(equalContainer);
              timelineIndicator.style.animationPlayState = "running";
              addPauseIcon(playIconContainer);
            } else {
              audio.pause();
              removeEqualizer(equalContainer);
              timelineIndicator.style.animationPlayState = "paused";
              addPlayIcon(playIconContainer);
            }

            return (audioSelected = audio);
          }
        });
      });

      //  function to play pause at main play button

      mainPlayButton.addEventListener("click", () => {
        // start fisrt track on-click

        if (audioSelected === undefined) {
          let firstAudio = document.querySelector("audio");
          let firstTrackInfo = firstAudio.parentElement.parentElement;

          equalContainer = firstTrackInfo.querySelector("#position");

          let firstalbumImgUrl =
            firstTrackInfo.querySelector("#img-album-url").innerText;
          let firstTitle = firstTrackInfo.querySelector("h6").innerText;
          playerImgContainer.innerHTML = `<img
            src=${firstalbumImgUrl}
            alt="artist-photo"
            class="rounded-circle mb-3"
          />`;
          playerTitleContainer.innerHTML = `${firstTitle}`;

          let mediumColor = start();

          playerBottom.style.background = `linear-gradient(0deg,#${mediumColor} 0%, #${mediumColor} 100%)`;

          playerBottom.classList.remove("d-none");

          // selecet icon play container

          if (firstAudio.paused) {
            firstAudio.play();
            addEqualizer(equalContainer);
            timelineIndicator.style.animationPlayState = "running";
            addPauseIcon(playIconContainer);
          } else {
            firstAudio.pause();
            timelineIndicator.style.animationPlayState = "paused";
            addPlayIcon(playIconContainer);
            removeEqualizer(equalContainer);
          }

          return (audioSelected = firstAudio);
        } else {
          if (audioSelected.paused) {
            audioSelected.play();
            addEqualizer(equalContainer);
            timelineIndicator.style.animationPlayState = "running";
            addPauseIcon(playIconContainer);
          } else {
            audioSelected.pause();
            timelineIndicator.style.animationPlayState = "paused";
            addPlayIcon(playIconContainer);
            removeEqualizer(equalContainer);
          }
        }
      });
      // selecet icon play container

      playIconContainer.addEventListener("click", () => {
        if (audioSelected.paused) {
          audioSelected.play();
          addEqualizer(equalContainer);
          timelineIndicator.style.animationPlayState = "running";
          addPauseIcon(playIconContainer);
        } else {
          audioSelected.pause();
          timelineIndicator.style.animationPlayState = "paused";
          addPlayIcon(playIconContainer);
          removeEqualizer(equalContainer);
        }
      });
    })
    .catch((err) => {
      console.log(err);
    });

  //DATA
  // let nowAlbum = new Date().getFullYear();
  // let data = document.getElementById("copy");
  // data.innerText = nowAlbum;
};

let searchButton1 = document.getElementById("search");
searchButton1.addEventListener("click", function () {
  let container = document.getElementById("cerca");

  // Verifica la larghezza dello schermo
  if (window.innerWidth < 768) {
    // Apri una nuova finestra su schermi mobili
    window.open("search.html", "_blank");
  } else {
    // Rimani nella stessa pagina su schermi medium e desktop
    container.classList.add("overflow-y-auto");
    container.innerHTML = `   <div id="cerca" class="bg-dark">
    <h1>Cerca</h1>
  </div>
  <div class="container bg-dark">
    <div class="row my-5 justify-content-center bg-dark">
      <div class="col-lg-6 d-flex align-items-center">
        <div id="buttons-search-container">
          <div class="buttons-search col mx-2">
            <a
              href="javascript:history.go(-1)"
              onMouseOver="self.status=document.referrer;return true"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="1em"
                viewBox="0 0 320 512"
                à
              >
                <style>
                  svg {
                    fill: #ffffff;
                  }
                </style>
                <path
                  d="M34.52 239.03L228.87 44.69c9.37-9.37 24.57-9.37 33.94 0l22.67 22.67c9.36 9.36 9.37 24.52.04 33.9L131.49 256l154.02 154.75c9.34 9.38 9.32 24.54-.04 33.9l-22.67 22.67c-9.37 9.37-24.57 9.37-33.94 0L34.52 272.97c-9.37-9.37-9.37-24.57 0-33.94z"
                />
              </svg>
            </a>
          </div>
          <div class="buttons-search col mx-2">
            <a
              href="javascript:history.go(+1)"
              onMouseOver="self.status=document.referrer;return true"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="1em"
                viewBox="0 0 320 512"
              >
                <style>
                  svg {
                    fill: #ffffff;
                  }
                </style>
                <path
                  d="M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z"
                />
              </svg>
            </a>
          </div>
        </div>

        <form class="input-group ms-3">
          <input
            id="search-input"
            type="search"
            class="form-control bg-dark text-white"
            placeholder=" Cosa vuoi ascoltare?"
          />
        </form>
        <div class="p-2" id="search-button-container">
          <button id="search-button" type="button" class="btn bg-dark">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-search"
              viewBox="0 0 16 16"
            >
              <path
                d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  </div>
  <div class="ms-3">
    <div id="sub-title">
      <h2 class="my-4">Ascolta i tuoi contenuti preferiti</h2>
      <p>Cerca artisti, brani, podcast, audiolibri e altro.</p>
    </div>
    <h2 id="sfoglia" class="my-5 text-light">Sfoglia tutto</h2>
  </div>
  <div>
    <div class="container-fluid bg-dark">
      <div id="images-grid">
        <div
          id="hidden"
          class="row row-cols-12 row-cols-sm-2 row-cols-md-2 row-cols-lg-3 row-cols-xl-auto justify-content-center g-3"
        >
          <div class="col" id="card-col">
            <a href="https://youtu.be/dQw4w9WgXcQ"
              ><div class="card overflow-hidden" id="card1">
                <div class="card-body text-white">
                  <h5 class="card-title fs-4 fw-bold">Podcast</h5>
                </div>

                <img
                  src="./assets/imgs/search/image-1.jpeg"
                  class="card-img-top"
                  id="card-imgs"
                  alt="Immagine 2"
                /></div
            ></a>
          </div>

          <div class="col" id="card-col">
            <a href="https://youtu.be/dQw4w9WgXcQ">
              <div class="card overflow-hidden" id="card2">
                <div class="card-body text-white">
                  <h5 class="card-title fs-4 fw-bold">Eventi dal vivo</h5>
                </div>
                <img
                  src="./assets/imgs/search/image-2.jpg"
                  class="card-img-top"
                  id="card-imgs"
                  alt="Immagine 2"
                /></div
            ></a>
          </div>
          <div class="col" id="card-col">
            <a href="https://youtu.be/dQw4w9WgXcQ">
              <div class="card overflow-hidden" id="card3">
                <div class="card-body text-white">
                  <h5 class="card-title fs-4 fw-bold">Create per te</h5>
                </div>
                <img
                  src="./assets/imgs/search/image-3.jpg"
                  class="card-img-top"
                  id="card-imgs"
                  alt="Immagine 1"
                /></div
            ></a>
          </div>
          <div class="col" id="card-col">
            <a href="https://youtu.be/dQw4w9WgXcQ">
              <div class="card overflow-hidden" id="card4">
                <div class="card-body text-white">
                  <h5 class="card-title fs-4 fw-bold">Nuove uscite</h5>
                </div>
                <img
                  src="./assets/imgs/search/image-4.jpg"
                  class="card-img-top"
                  id="card-imgs"
                  alt="Immagine 1"
                /></div
            ></a>
          </div>
          <div class="col" id="card-col">
            <a href="https://youtu.be/dQw4w9WgXcQ">
              <div class="card overflow-hidden" id="card5">
                <div class="card-body text-white">
                  <h5 class="card-title fs-4 fw-bold">Estate</h5>
                </div>
                <img
                  src="./assets/imgs/search/image-5.jpg"
                  class="card-img-top"
                  id="card-imgs"
                  alt="Immagine 1"
                /></div
            ></a>
          </div>
          <div class="col" id="card-col">
            <a href="https://youtu.be/dQw4w9WgXcQ">
              <div class="card overflow-hidden" id="card6">
                <div class="card-body text-white">
                  <h5 class="card-title fs-4 fw-bold">Pop</h5>
                </div>
                <img
                  src="./assets/imgs/search/image-6.jpg"
                  class="card-img-top"
                  id="card-imgs"
                  alt="Immagine 1"
                /></div
            ></a>
          </div>
          <div class="col" id="card-col">
            <a href="https://youtu.be/dQw4w9WgXcQ">
              <div class="card overflow-hidden" id="card7">
                <div class="card-body text-white">
                  <h5 class="card-title fs-4 fw-bold">Hip Hop</h5>
                </div>
                <img
                  src="./assets/imgs/search/image-7.jpg"
                  class="card-img-top"
                  id="card-imgs"
                  alt="Immagine 1"
                /></div
            ></a>
          </div>
          <div class="col" id="card-col">
            <a href="https://youtu.be/dQw4w9WgXcQ">
              <div class="card overflow-hidden" id="card8">
                <div class="card-body text-white">
                  <h5 class="card-title fs-4 fw-bold">Dance/Elettronica</h5>
                </div>
                <img
                  src="./assets/imgs/search/image-8.jpg"
                  class="card-img-top"
                  id="card-imgs"
                  alt="Immagine 1"
                /></div
            ></a>
          </div>
          <div class="col" id="card-col">
            <a href="https://youtu.be/dQw4w9WgXcQ">
              <div class="card overflow-hidden" id="card9">
                <div class="card-body text-white">
                  <h5 class="card-title fs-4 fw-bold">Classifiche</h5>
                </div>
                <img
                  src="./assets/imgs/search/image-9.jpg"
                  class="card-img-top"
                  id="card-imgs"
                  alt="Immagine 1"
                /></div
            ></a>
          </div>
          <div class="col" id="card-col">
            <a href="https://youtu.be/dQw4w9WgXcQ">
              <div class="card overflow-hidden" id="card10">
                <div class="card-body text-white">
                  <h5 class="card-title fs-4 fw-bold">Latina</h5>
                </div>
                <img
                  src="./assets/imgs/search/image-10.jpg"
                  class="card-img-top"
                  id="card-imgs"
                  alt="Immagine 1"
                /></div
            ></a>
          </div>
          <div class="col" id="card-col">
            <a href="https://youtu.be/dQw4w9WgXcQ">
              <div class="card overflow-hidden" id="card11">
                <div class="card-body text-white">
                  <h5 class="card-title fs-4 fw-bold">Rock</h5>
                </div>
                <img
                  src="./assets/imgs/search/image-11.jpg"
                  class="card-img-top"
                  id="card-imgs"
                  alt="Immagine 2"
                /></div
            ></a>
          </div>

          <div class="col" id="card-col">
            <a href="https://youtu.be/dQw4w9WgXcQ">
              <div class="card overflow-hidden" id="card12">
                <div class="card-body text-white">
                  <h5 class="card-title fs-4 fw-bold">Indie</h5>
                </div>
                <img
                  src="./assets/imgs/search/image-12.jpg"
                  class="card-img-top"
                  id="card-imgs"
                  alt="Immagine 2"
                /></div
            ></a>
          </div>
          <div class="col" id="card-col">
            <a href="https://youtu.be/dQw4w9WgXcQ">
              <div class="card overflow-hidden" id="card13">
                <div class="card-body text-white">
                  <h5 class="card-title fs-4 fw-bold">In auto</h5>
                </div>
                <img
                  src="./assets/imgs/search/image-13.jpeg"
                  class="card-img-top"
                  id="card-imgs"
                  alt="Immagine 1"
                /></div
            ></a>
          </div>
          <div class="col" id="card-col">
            <a href="https://youtu.be/dQw4w9WgXcQ">
              <div class="card overflow-hidden" id="card14">
                <div class="card-body text-white">
                  <h5 class="card-title fs-4 fw-bold">Scopri</h5>
                </div>
                <img
                  src="./assets/imgs/search/image-14.jpg"
                  class="card-img-top"
                  id="card-imgs"
                  alt="Immagine 1"
                /></div
            ></a>
          </div>
          <div class="col" id="card-col">
            <a href="https://youtu.be/dQw4w9WgXcQ">
              <div class="card overflow-hidden" id="card15">
                <div class="card-body text-white">
                  <h5 class="card-title fs-4 fw-bold">Sanremo</h5>
                </div>
                <img
                  src="./assets/imgs/search/image-15.jpg"
                  class="card-img-top"
                  id="card-imgs"
                  alt="Immagine 1"
                /></div
            ></a>
          </div>
          <div class="col" id="card-col">
            <a href="https://youtu.be/dQw4w9WgXcQ">
              <div class="card overflow-hidden" id="card16">
                <div class="card-body text-white">
                  <h5 class="card-title fs-4 fw-bold">Mood</h5>
                </div>
                <img
                  src="./assets/imgs/search/image-16.jpg"
                  class="card-img-top"
                  id="card-imgs"
                  alt="Immagine 1"
                /></div
            ></a>
          </div>
          <div class="col" id="card-col">
            <a href="https://youtu.be/dQw4w9WgXcQ">
              <div class="card overflow-hidden" id="card17">
                <div class="card-body text-white">
                  <h5 class="card-title fs-4 fw-bold">Di tendenza</h5>
                </div>
                <img
                  src="./assets/imgs/search/image-17.jpg"
                  class="card-img-top"
                  id="card-imgs"
                  alt="Immagine 1"
                /></div
            ></a>
          </div>
          <div class="col" id="card-col">
            <a href="https://youtu.be/dQw4w9WgXcQ">
              <div class="card overflow-hidden" id="card18">
                <div class="card-body text-white">
                  <h5 class="card-title fs-4 fw-bold">EQUAL</h5>
                </div>
                <img
                  src="./assets/imgs/search/image-18.jpg"
                  class="card-img-top"
                  id="card-imgs"
                  alt="Immagine 1"
                /></div
            ></a>
          </div>
          <div class="col" id="card-col">
            <a href="https://youtu.be/dQw4w9WgXcQ">
              <div class="card overflow-hidden" id="card19">
                <div class="card-body text-white">
                  <h5 class="card-title fs-4 fw-bold">RADAR</h5>
                </div>
                <img
                  src="./assets/imgs/search/image-19.jpg"
                  class="card-img-top"
                  id="card-imgs"
                  alt="Immagine 1"
                /></div
            ></a>
          </div>
          <div class="col" id="card-col">
            <a href="https://youtu.be/dQw4w9WgXcQ">
              <div class="card overflow-hidden" id="card20">
                <div class="card-body text-white">
                  <h5 class="card-title fs-4 fw-bold">Allenamento</h5>
                </div>
                <img
                  src="./assets/imgs/search/image-20.jpg"
                  class="card-img-top"
                  id="card-imgs"
                  alt="Immagine 1"
                /></div
            ></a>
          </div>
          <div class="col" id="card-col">
            <a href="https://youtu.be/dQw4w9WgXcQ">
              <div class="card overflow-hidden" id="card21">
                <div class="card-body text-white">
                  <h5 class="card-title fs-4 fw-bold">Party</h5>
                </div>
                <img
                  src="./assets/imgs/search/image-21.jpg"
                  class="card-img-top"
                  id="card-imgs"
                  alt="Immagine 2"
                /></div
            ></a>
          </div>

          <div class="col" id="card-col">
            <a href="https://youtu.be/dQw4w9WgXcQ">
              <div class="card overflow-hidden" id="card22">
                <div class="card-body text-white">
                  <h5 class="card-title fs-4 fw-bold">Gaming</h5>
                </div>
                <img
                  src="./assets/imgs/search/image-22.jpg"
                  class="card-img-top"
                  id="card-imgs"
                  alt="Immagine 2"
                /></div
            ></a>
          </div>
          <div class="col" id="card-col">
            <a href="https://youtu.be/dQw4w9WgXcQ">
              <div class="card overflow-hidden" id="card23">
                <div class="card-body text-white">
                  <h5 class="card-title fs-4 fw-bold">R&B</h5>
                </div>
                <img
                  src="./assets/imgs/search/image-23.jpg"
                  class="card-img-top"
                  id="card-imgs"
                  alt="Immagine 1"
                /></div
            ></a>
          </div>
          <div class="col" id="card-col">
            <a href="https://youtu.be/dQw4w9WgXcQ">
              <div class="card overflow-hidden" id="card24">
                <div class="card-body text-white">
                  <h5 class="card-title fs-4 fw-bold">Anni</h5>
                </div>
                <img
                  src="./assets/imgs/search/image-24.jpg"
                  class="card-img-top"
                  id="card-imgs"
                  alt="Immagine 1"
                /></div
            ></a>
          </div>
          <div class="col" id="card-col">
            <a href="https://youtu.be/dQw4w9WgXcQ">
              <div class="card overflow-hidden" id="card25">
                <div class="card-body text-white">
                  <h5 class="card-title fs-4 fw-bold">Relax</h5>
                </div>
                <img
                  src="./assets/imgs/search/image-25.jpeg"
                  class="card-img-top"
                  id="card-imgs"
                  alt="Immagine 1"
                /></div
            ></a>
          </div>
          <div class="col" id="card-col">
            <a href="https://youtu.be/dQw4w9WgXcQ">
              <div class="card overflow-hidden" id="card26">
                <div class="card-body text-white">
                  <h5 class="card-title fs-4 fw-bold">Amore</h5>
                </div>
                <img
                  src="./assets/imgs/search/image-26.jpg"
                  class="card-img-top"
                  id="card-imgs"
                  alt="Immagine 1"
                /></div
            ></a>
          </div>
          <div class="col" id="card-col">
            <a href="https://youtu.be/dQw4w9WgXcQ">
              <div class="card overflow-hidden" id="card27">
                <div class="card-body text-white">
                  <h5 class="card-title fs-4 fw-bold">Autori</h5>
                </div>
                <img
                  src="./assets/imgs/search/image-27.jpg"
                  class="card-img-top"
                  id="card-imgs"
                  alt="Immagine 1"
                /></div
            ></a>
          </div>
          <div class="col" id="card-col">
            <a href="https://youtu.be/dQw4w9WgXcQ">
              <div class="card overflow-hidden" id="card28">
                <div class="card-body text-white">
                  <h5 class="card-title fs-4 fw-bold">K-pop</h5>
                </div>
                <img
                  src="./assets/imgs/search/image-28.jpg"
                  class="card-img-top"
                  id="card-imgs"
                  alt="Immagine 1"
                /></div
            ></a>
          </div>
          <div class="col" id="card-col">
            <a href="https://youtu.be/dQw4w9WgXcQ">
              <div class="card overflow-hidden" id="card29">
                <div class="card-body text-white">
                  <h5 class="card-title fs-4 fw-bold">Jazz</h5>
                </div>
                <img
                  src="./assets/imgs/search/image-29.jpg"
                  class="card-img-top"
                  id="card-imgs"
                  alt="Immagine 1"
                /></div
            ></a>
          </div>
          <div class="col" id="card-col">
            <a href="https://youtu.be/dQw4w9WgXcQ">
              <div class="card overflow-hidden" id="card30">
                <div class="card-body text-white">
                  <h5 class="card-title fs-4 fw-bold">Studenti</h5>
                </div>
                <img
                  src="./assets/imgs/search/image-30.jpg"
                  class="card-img-top"
                  id="card-imgs"
                  alt="Immagine 1"
                /></div
            ></a>
          </div>
          <div class="col" id="card-col">
            <a href="https://youtu.be/dQw4w9WgXcQ">
              <div class="card overflow-hidden" id="card31">
                <div class="card-body text-white">
                  <h5 class="card-title fs-4 fw-bold">Concentrazione</h5>
                </div>
                <img
                  src="./assets/imgs/search/image-31.jpg"
                  class="card-img-top"
                  id="card-imgs"
                  alt="Immagine 2"
                /></div
            ></a>
          </div>

          <div class="col" id="card-col">
            <a href="https://youtu.be/dQw4w9WgXcQ">
              <div class="card overflow-hidden" id="card32">
                <div class="card-body text-white">
                  <h5 class="card-title fs-4 fw-bold">Anime</h5>
                </div>
                <img
                  src="./assets/imgs/search/image-32.jpg"
                  class="card-img-top"
                  id="card-imgs"
                  alt="Immagine 2"
                /></div
            ></a>
          </div>
          <div class="col" id="card-col">
            <a href="https://youtu.be/dQw4w9WgXcQ">
              <div class="card overflow-hidden" id="card33">
                <div class="card-body text-white">
                  <h5 class="card-title fs-4 fw-bold">A casa</h5>
                </div>
                <img
                  src="./assets/imgs/search/image-33.jpg"
                  class="card-img-top"
                  id="card-imgs"
                  alt="Immagine 1"
                /></div
            ></a>
          </div>
          <div class="col" id="card-col">
            <a href="https://youtu.be/dQw4w9WgXcQ">
              <div class="card overflow-hidden" id="card34">
                <div class="card-body text-white">
                  <h5 class="card-title fs-4 fw-bold">Dormire</h5>
                </div>
                <img
                  src="./assets/imgs/search/image-34.jpg"
                  class="card-img-top"
                  id="card-imgs"
                  alt="Immagine 1"
                /></div
            ></a>
          </div>
          <div class="col" id="card-col">
            <a href="https://youtu.be/dQw4w9WgXcQ">
              <div class="card overflow-hidden" id="card35">
                <div class="card-body text-white">
                  <h5 class="card-title fs-4 fw-bold">Classica</h5>
                </div>
                <img
                  src="./assets/imgs/search/image-35.jpg"
                  class="card-img-top"
                  id="card-imgs"
                  alt="Immagine 1"
                /></div
            ></a>
          </div>
          <div class="col" id="card-col">
            <a href="https://youtu.be/dQw4w9WgXcQ">
              <div class="card overflow-hidden" id="card36">
                <div class="card-body text-white">
                  <h5 class="card-title fs-4 fw-bold">Folk & Acustica</h5>
                </div>
                <img
                  src="./assets/imgs/search/image-36.jpg"
                  class="card-img-top"
                  id="card-imgs"
                  alt="Immagine 1"
                /></div
            ></a>
          </div>
          <div class="col" id="card-col">
            <a href="https://youtu.be/dQw4w9WgXcQ">
              <div class="card overflow-hidden" id="card37">
                <div class="card-body text-white">
                  <h5 class="card-title fs-4 fw-bold">Soul</h5>
                </div>
                <img
                  src="./assets/imgs/search/image-37.jpeg"
                  class="card-img-top"
                  id="card-imgs"
                  alt="Immagine 1"
                /></div
            ></a>
          </div>
          <div class="col" id="card-col">
            <a href="https://youtu.be/dQw4w9WgXcQ">
              <div class="card overflow-hidden" id="card38">
                <div class="card-body text-white">
                  <h5 class="card-title fs-4 fw-bold">Country</h5>
                </div>
                <img
                  src="./assets/imgs/search/image-38.jpg"
                  class="card-img-top"
                  id="card-imgs"
                  alt="Immagine 1"
                /></div
            ></a>
          </div>
          <div class="col" id="card-col">
            <a href="https://youtu.be/dQw4w9WgXcQ">
              <div class="card overflow-hidden" id="card39">
                <div class="card-body text-white">
                  <h5 class="card-title fs-4 fw-bold">TV e film</h5>
                </div>
                <img
                  src="./assets/imgs/search/image-39.jpg"
                  class="card-img-top"
                  id="card-imgs"
                  alt="Immagine 1"
                /></div
            ></a>
          </div>
          <div class="col" id="card-col">
            <a href="https://youtu.be/dQw4w9WgXcQ">
              <div class="card overflow-hidden" id="card40">
                <div class="card-body text-white">
                  <h5 class="card-title fs-4 fw-bold">Netflix</h5>
                </div>
                <img
                  src="./assets/imgs/search/image-40.jpg"
                  class="card-img-top"
                  id="card-imgs"
                  alt="Immagine 1"
                /></div
            ></a>
          </div>
          <div class="col" id="card-col">
            <a href="https://youtu.be/dQw4w9WgXcQ">
              <div class="card overflow-hidden" id="card41">
                <div class="card-body text-white">
                  <h5 class="card-title fs-4 fw-bold">League of Legendst</h5>
                </div>
                <img
                  src="./assets/imgs/search/image-41.jpg"
                  class="card-img-top"
                  id="card-imgs"
                  alt="Immagine 2"
                /></div
            ></a>
          </div>

          <div class="col" id="card-col">
            <a href="https://youtu.be/dQw4w9WgXcQ">
              <div class="card overflow-hidden" id="card42">
                <div class="card-body text-white">
                  <h5 class="card-title fs-4 fw-bold">Cucina & Cena</h5>
                </div>
                <img
                  src="./assets/imgs/search/image-42.png"
                  class="card-img-top"
                  id="card-imgs"
                  alt="Immagine 2"
                /></div
            ></a>
          </div>
          <div class="col" id="card-col">
            <a href="https://youtu.be/dQw4w9WgXcQ">
              <div class="card overflow-hidden" id="card43">
                <div class="card-body text-white">
                  <h5 class="card-title fs-4 fw-bold">Relax</h5>
                </div>
                <img
                  src="./assets/imgs/search/image-43.png"
                  class="card-img-top"
                  id="card-imgs"
                  alt="Immagine 1"
                /></div
            ></a>
          </div>
          <div class="col" id="card-col">
            <a href="https://youtu.be/dQw4w9WgXcQ">
              <div class="card overflow-hidden" id="card44">
                <div class="card-body text-white">
                  <h5 class="card-title fs-4 fw-bold">Viaggi</h5>
                </div>
                <img
                  src="./assets/imgs/search/image-44.png"
                  class="card-img-top"
                  id="card-imgs"
                  alt="Immagine 1"
                /></div
            ></a>
          </div>
          <div class="col" id="card-col">
            <a href="https://youtu.be/dQw4w9WgXcQ">
              <div class="card overflow-hidden" id="card45">
                <div class="card-body text-white">
                  <h5 class="card-title fs-4 fw-bold">Punk</h5>
                </div>
                <img
                  src="./assets/imgs/search/image-45.png"
                  class="card-img-top"
                  id="card-imgs"
                  alt="Immagine 1"
                /></div
            ></a>
          </div>
          <div class="col" id="card-col">
            <a href="https://youtu.be/dQw4w9WgXcQ">
              <div class="card overflow-hidden" id="card46">
                <div class="card-body text-white">
                  <h5 class="card-title fs-4 fw-bold">Metal</h5>
                </div>
                <img
                  src="./assets/imgs/search/image-46.jpeg"
                  class="card-img-top"
                  id="card-imgs"
                  alt="Immagine 1"
                /></div
            ></a>
          </div>
          <div class="col" id="card-col">
            <a href="https://youtu.be/dQw4w9WgXcQ">
              <div class="card overflow-hidden" id="card47">
                <div class="card-body text-white">
                  <h5 class="card-title fs-4 fw-bold">Alternative</h5>
                </div>
                <img
                  src="./assets/imgs/search/image-47.jpg"
                  class="card-img-top"
                  id="card-imgs"
                  alt="Immagine 1"
                /></div
            ></a>
          </div>
          <div class="col" id="card-col">
            <a href="https://youtu.be/dQw4w9WgXcQ">
              <div class="card overflow-hidden" id="card48">
                <div class="card-body text-white">
                  <h5 class="card-title fs-4 fw-bold">Strumentale</h5>
                </div>
                <img
                  src="./assets/imgs/search/image-48.jpeg"
                  class="card-img-top"
                  id="card-imgs"
                  alt="Immagine 1"
                /></div
            ></a>
          </div>
          <div class="col" id="card-col">
            <a href="https://youtu.be/dQw4w9WgXcQ">
              <div class="card overflow-hidden" id="card49">
                <div class="card-body text-white">
                  <h5 class="card-title fs-4 fw-bold">Ambient</h5>
                </div>
                <img
                  src="./assets/imgs/search/image-49.jpg"
                  class="card-img-top"
                  id="card-imgs"
                  alt="Immagine 1"
                /></div
            ></a>
          </div>
          <div class="col" id="card-col">
            <a href="https://youtu.be/dQw4w9WgXcQ">
              <div class="card overflow-hidden" id="card50">
                <div class="card-body text-white">
                  <h5 class="card-title fs-4 fw-bold">Blues</h5>
                </div>
                <img
                  src="./assets/imgs/search/image-50.jpg"
                  class="card-img-top"
                  id="card-imgs"
                  alt="Immagine 1"
                /></div
            ></a>
          </div>
          <div class="col" id="card-col">
            <a href="https://youtu.be/dQw4w9WgXcQ">
              <div class="card overflow-hidden" id="card51">
                <div class="card-body text-white">
                  <h5 class="card-title fs-4 fw-bold">Caraibi</h5>
                </div>
                <img
                  src="./assets/imgs/search/image-51.jpg"
                  class="card-img-top"
                  id="card-imgs"
                  alt="Immagine 1"
                /></div
            ></a>
          </div>
          <div class="col" id="card-col">
            <a href="https://youtu.be/dQw4w9WgXcQ">
              <div class="card overflow-hidden" id="card52">
                <div class="card-body text-white">
                  <h5 class="card-title fs-4 fw-bold">Suoni e natura</h5>
                </div>
                <img
                  src="./assets/imgs/search/image-52.jpg"
                  class="card-img-top"
                  id="card-imgs"
                  alt="Immagine 1"
                /></div
            ></a>
          </div>
        </div>
      </div>
    </div>
  </div>`;
  }

  //   let arrow = document.getElementById("arrow")
  // arrow.addEventListener("click", function(){

  // })

  const searchButton = document.getElementById("search-button");
  const searchInput = document.getElementById("search-input");
  const hiddenContainer = document.getElementById("hidden");
  const containerSearchResult = document.getElementById("images-grid");

  // function for hide default content
  const hideDefault = function () {
    hiddenContainer.classList.add("d-none");
  };

  // function for fetch search-bar

  const mysearch = function () {
    let serchValue = searchInput.value;
    fetch(`${searchUrl}${serchValue}`)
      .then((res) => {
        if (res.ok) {
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
          containerSearchResult.innerHTML = `
        <div class="container">
        <div id='artist-container' class="row">
          
        </div>
      </div>
      <div class="container-fluid">
        <div id="album-result" class="row">
        </div>
      </div>
      `;
        });

        searchInput.value = "";

        // function for retun unique value of array by key value
        function getUniqueListBy(arr, key) {
          return [...new Map(arr.map((item) => [item[key], item])).values()];
        }

        const uniqueArtist = getUniqueListBy(resultArtist, "id");

        uniqueArtist.forEach((e) => {
          let imageArtistUrl = e.picture;
          let nameArtist = e.name;
          let artistid = e.id;

          const artistContainer = document.getElementById("artist-container");
          let newCol = document.createElement("div");
          newCol.classList.add("col");

          newCol.innerHTML = `<a href="./artist.html?id=${artistid}">
            <div>
              <img
                id="artist-img"
                class="rounded-circle"
                src="${imageArtistUrl}"
                alt="${nameArtist}"
              />
              <span id="artist-name" class='text-white'>${nameArtist}</span>
            </div>
            </a>
         `;
          artistContainer.appendChild(newCol);
          localStorage.clear();
          localStorage.setItem("artist-img", imageArtistUrl);
          localStorage.setItem("artist-name", nameArtist);
        });
        resultAlbum.forEach((e) => {
          let imageAlbumUrl = e.cover_medium;
          let nameAlbum = e.title;
          let albumId = e.id;
          const albumResultContainer = document.getElementById("album-result");
          let newAlbum = document.createElement("div");
          newAlbum.classList.add(
            "col-12",
            "col-md-6",
            "col-lg-4",
            "col-xl-3",
            "col-xxl-2"
          );
          newAlbum.innerHTML = `
        
        <div id="album-result" class="row my-album">
          <div class="col d-none d-md-block">
            <div class="card  mt-4">
              <img src="${imageAlbumUrl}" class="card-img-top " alt="${nameAlbum}" />
              <div class="card-body ">
                <h5 class="card-title" style="object-fit: cover; height: 60px;">${nameAlbum}</h5>
              <p id='album-id' class='d-none'>${albumId}</p>
                </div>
            </div>
          </div>
        </div>
        
        <div class="card mb-3 d-md-none bg-dark text-light my-album">
  <div class="row g-0">
    <div class="col-md-3">
      <img src="${imageAlbumUrl}" class="img-fluid rounded-start" width="100px" alt="${nameAlbum}">
              <h5 class="card-title d-inline">${nameAlbum}</h5>
              <p id='album-id' class='d-none'>${albumId}</p>
    </div>
      </div>
    </div>
  </div>
</div>
        </div>
      </div>
        
        `;

          albumResultContainer.appendChild(newAlbum);
        });

        const allAlbum = document.querySelectorAll(".my-album");
        console.log(allAlbum);
        allAlbum.forEach((e) => {
          e.addEventListener("click", function () {
            const informationContainer = e.querySelector("#album-id");
            const albumId = informationContainer.innerText;
            container.innerHTML = `
            <main>
            <div class="container-fluid">
              <div class="row" id="mediumBg">
                <div
                  class="col col-12 mt-2 d-flex align-content-center justify-content-between"
                >
                  <div id="buttons-search-container" class="d-flex col col-2">
                    <div class="buttons-search ms-0 me-1">
                      <a
                        href="javascript:history.go(-1)"
                        onMouseOver="self.status=document.referrer;return true"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          height="1em"
                          viewBox="0 0 320 512"
                          fill="white"
                          width="30"
                          height="30"
                        >
                          <path
                            d="M34.52 239.03L228.87 44.69c9.37-9.37 24.57-9.37 33.94 0l22.67 22.67c9.36 9.36 9.37 24.52.04 33.9L131.49 256l154.02 154.75c9.34 9.38 9.32 24.54-.04 33.9l-22.67 22.67c-9.37 9.37-24.57 9.37-33.94 0L34.52 272.97c-9.37-9.37-9.37-24.57 0-33.94z"
                          />
                        </svg>
                      </a>
                    </div>
                    <div class="buttons-search ms-0 me-1">
                      <a
                        href="javascript:history.go(+1)"
                        onMouseOver="self.status=document.referrer;return true"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          height="1em"
                          viewBox="0 0 320 512"
                          fill="white"
                          width="30"
                          height="30"
                        >
                          <path
                            d="M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z"
                          />
                        </svg>
                      </a>
                    </div>
                  </div>
                  <div id="explore">
                    <button class="bg-white text-dark rounded-pill py-2 px-3 me-1">
                      Esplora Premium
                    </button>
                    <button class="bg-dark text-light rounded-pill py-2 px-3 me-1">
                      <i class="bi bi-arrow-down-circle"></i> Installa App
                    </button>
                    <button class="bg-dark text-light rounded-circle py-2 px-3">
                      <svg
                        fill="white"
                        viewBox="0 0 16 16"
                        height="20px"
                        width="20px"
                      >
                        <path
                          d="M6.233.371a4.388 4.388 0 0 1 5.002 1.052c.421.459.713.992.904 1.554.143.421.263 1.173.22 1.894-.078 1.322-.638 2.408-1.399 3.316l-.127.152a.75.75 0 0 0 .201 1.13l2.209 1.275a4.75 4.75 0 0 1 2.375 4.114V16H.382v-1.143a4.75 4.75 0 0 1 2.375-4.113l2.209-1.275a.75.75 0 0 0 .201-1.13l-.126-.152c-.761-.908-1.322-1.994-1.4-3.316-.043-.721.077-1.473.22-1.894a4.346 4.346 0 0 1 .904-1.554c.411-.448.91-.807 1.468-1.052zM8 1.5a2.888 2.888 0 0 0-2.13.937 2.85 2.85 0 0 0-.588 1.022c-.077.226-.175.783-.143 1.323.054.921.44 1.712 1.051 2.442l.002.001.127.153a2.25 2.25 0 0 1-.603 3.39l-2.209 1.275A3.25 3.25 0 0 0 1.902 14.5h12.196a3.25 3.25 0 0 0-1.605-2.457l-2.209-1.275a2.25 2.25 0 0 1-.603-3.39l.127-.153.002-.001c.612-.73.997-1.52 1.052-2.442.032-.54-.067-1.097-.144-1.323a2.85 2.85 0 0 0-.588-1.022A2.888 2.888 0 0 0 8 1.5z"
                        ></path>
                      </svg>
                    </button>
                  </div>
                </div>
                <div
                  id="album-img-container"
                  class="col col-12 d-flex flex-row justify-content-center my-4"
                >
                  <!--  ALBUM IMAGE -->
                  <img
                    src="assets/imgs/search/image-1.jpeg"
                    alt="Album Cover"
                    id="img"
                  />
                </div>
    
                <div id="album-information" class="col col-10 ps-5">
                  <!--  ALBUM INFORMATION  -->
                  <h5 id="album-title" class="text-white">Discover Weekly</h5>
                  <p id="album-description" class="text-white">
                    A playlist made by
                  </p>
                  <img
                    id="logo-placeholder"
                    src="https://i.scdn.co/image/ab67757000003b8255c25988a6ac314394d3fbf5"
                    alt="Spotify logo"
                    width="24px"
                    class="rounded-circle"
                  />
                  <span class="text-white">Spotify</span>
                  <p class="text-white">
                    3.967.418 Mi piace &centerdot; 1 ora 15 min
                  </p>
                </div>
    
                <div class="col col-12 ps-5 pb-3">
                  <!--  SHARING AND PLAY ICONS  -->
                  <div
                    class="row d-flex flex-row justify-content-between align-items-center"
                  >
                    <div class="col d-flex">
                      <div>
                        <input type="checkbox" id="like" name="like" />
                        <label for="like">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 189.2 87.507"
                            style="overflow: visible"
                          >
                            <g id="hearts" transform="translate(-787.902 -454.998)">
                              <g id="right-hearts">
                                <g id="Group_4" data-name="Group 4" opacity="0.484">
                                  <path
                                    id="Path_8"
                                    data-name="Path 8"
                                    d="M36.508,16.436c-3.141,6.041-11.545,14.257-16.3,18.634a1.342,1.342,0,0,1-1.8,0C13.633,30.693,5.229,22.477,2.087,16.436c-6.9-13.29,10.5-22.151,17.21-8.86C26.01-5.715,43.409,3.146,36.508,16.436Z"
                                    transform="translate(936.502 486.145)"
                                    fill="#fff"
                                  />
                                  <path
                                    id="Path_9"
                                    data-name="Path 9"
                                    d="M19.311,37.916a3.836,3.836,0,0,1-2.575-.99l-.013-.012C11.871,32.47,3.229,24.051-.131,17.589A15.428,15.428,0,0,1-2,10.374,12.021,12.021,0,0,1-.282,4.2,11.848,11.848,0,0,1,16.364.456a13.647,13.647,0,0,1,2.934,2.6,13.649,13.649,0,0,1,2.934-2.6A11.848,11.848,0,0,1,38.879,4.2,12.02,12.02,0,0,1,40.6,10.374a15.428,15.428,0,0,1-1.87,7.214A52.812,52.812,0,0,1,30.8,28.07c-3.2,3.482-6.607,6.728-8.9,8.839l-.018.017a3.836,3.836,0,0,1-2.571.99ZM9.864,3.5A6.907,6.907,0,0,0,3.991,6.8c-1.423,2.342-1.311,5.357.315,8.489,1.013,1.948,4.482,7.467,15,17.213,2.172-2.025,5.076-4.836,7.815-7.813a48.2,48.2,0,0,0,7.166-9.4c1.626-3.131,1.738-6.146.315-8.488a6.848,6.848,0,0,0-9.644-2.149A10.185,10.185,0,0,0,21.529,8.7L19.3,13.121,17.066,8.7a10.185,10.185,0,0,0-3.432-4.057A6.906,6.906,0,0,0,9.864,3.5Z"
                                    transform="translate(936.502 486.145)"
                                    fill="#fff"
                                  />
                                </g>
                                <g id="Group_5" data-name="Group 5" opacity="0.484">
                                  <path
                                    id="Path_10"
                                    data-name="Path 10"
                                    d="M36.508,16.436c-3.141,6.041-11.545,14.257-16.3,18.634a1.342,1.342,0,0,1-1.8,0C13.633,30.693,5.229,22.477,2.087,16.436c-6.9-13.29,10.5-22.151,17.21-8.86C26.01-5.715,43.409,3.146,36.508,16.436Z"
                                    transform="translate(906.04 497.584)"
                                    fill="#64d26d"
                                  />
                                  <path
                                    id="Path_11"
                                    data-name="Path 11"
                                    d="M19.311,37.916a3.836,3.836,0,0,1-2.575-.99l-.013-.012C11.871,32.47,3.229,24.051-.131,17.589A15.428,15.428,0,0,1-2,10.374,12.021,12.021,0,0,1-.282,4.2,11.848,11.848,0,0,1,16.364.456a13.647,13.647,0,0,1,2.934,2.6,13.649,13.649,0,0,1,2.934-2.6A11.848,11.848,0,0,1,38.879,4.2,12.02,12.02,0,0,1,40.6,10.374a15.428,15.428,0,0,1-1.87,7.214A52.812,52.812,0,0,1,30.8,28.07c-3.2,3.482-6.607,6.728-8.9,8.839l-.018.017a3.836,3.836,0,0,1-2.571.99ZM9.864,3.5A6.907,6.907,0,0,0,3.991,6.8c-1.423,2.342-1.311,5.357.315,8.489,1.013,1.948,4.482,7.467,15,17.213,2.172-2.025,5.076-4.836,7.815-7.813a48.2,48.2,0,0,0,7.166-9.4c1.626-3.131,1.738-6.146.315-8.488a6.848,6.848,0,0,0-9.644-2.149A10.185,10.185,0,0,0,21.529,8.7L19.3,13.121,17.066,8.7a10.185,10.185,0,0,0-3.432-4.057A6.906,6.906,0,0,0,9.864,3.5Z"
                                    transform="translate(906.04 497.584)"
                                    fill="#64d26d"
                                  />
                                </g>
                              </g>
                              <g id="left-hearts">
                                <g id="Group_6" data-name="Group 6" opacity="0.484">
                                  <path
                                    id="Path_12"
                                    data-name="Path 12"
                                    d="M36.508,16.436c-3.141,6.041-11.545,14.257-16.3,18.634a1.342,1.342,0,0,1-1.8,0C13.633,30.693,5.229,22.477,2.087,16.436c-6.9-13.29,10.5-22.151,17.21-8.86C26.01-5.715,43.409,3.146,36.508,16.436Z"
                                    transform="translate(827.502 483.705)"
                                    fill="#fff"
                                  />
                                  <path
                                    id="Path_13"
                                    data-name="Path 13"
                                    d="M19.311,37.916a3.836,3.836,0,0,1-2.575-.99l-.013-.012C11.871,32.47,3.229,24.051-.131,17.589A15.428,15.428,0,0,1-2,10.374,12.021,12.021,0,0,1-.282,4.2,11.848,11.848,0,0,1,16.364.456a13.647,13.647,0,0,1,2.934,2.6,13.649,13.649,0,0,1,2.934-2.6A11.848,11.848,0,0,1,38.879,4.2,12.02,12.02,0,0,1,40.6,10.374a15.428,15.428,0,0,1-1.87,7.214A52.812,52.812,0,0,1,30.8,28.07c-3.2,3.482-6.607,6.728-8.9,8.839l-.018.017a3.836,3.836,0,0,1-2.571.99ZM9.864,3.5A6.907,6.907,0,0,0,3.991,6.8c-1.423,2.342-1.311,5.357.315,8.489,1.013,1.948,4.482,7.467,15,17.213,2.172-2.025,5.076-4.836,7.815-7.813a48.2,48.2,0,0,0,7.166-9.4c1.626-3.131,1.738-6.146.315-8.488a6.848,6.848,0,0,0-9.644-2.149A10.185,10.185,0,0,0,21.529,8.7L19.3,13.121,17.066,8.7a10.185,10.185,0,0,0-3.432-4.057A6.906,6.906,0,0,0,9.864,3.5Z"
                                    transform="translate(827.502 483.705)"
                                    fill="#fff"
                                  />
                                </g>
                                <g id="Group_7" data-name="Group 7" opacity="0.484">
                                  <path
                                    id="Path_14"
                                    data-name="Path 14"
                                    d="M36.508,16.436c-3.141,6.041-11.545,14.257-16.3,18.634a1.342,1.342,0,0,1-1.8,0C13.633,30.693,5.229,22.477,2.087,16.436c-6.9-13.29,10.5-22.151,17.21-8.86C26.01-5.715,43.409,3.146,36.508,16.436Z"
                                    transform="translate(789.902 456.497)"
                                    fill="#64d26d"
                                  />
                                  <path
                                    id="Path_15"
                                    data-name="Path 15"
                                    d="M19.311,37.916a3.836,3.836,0,0,1-2.575-.99l-.013-.012C11.871,32.47,3.229,24.051-.131,17.589A15.428,15.428,0,0,1-2,10.374,12.021,12.021,0,0,1-.282,4.2,11.848,11.848,0,0,1,16.364.456a13.647,13.647,0,0,1,2.934,2.6,13.649,13.649,0,0,1,2.934-2.6A11.848,11.848,0,0,1,38.879,4.2,12.02,12.02,0,0,1,40.6,10.374a15.428,15.428,0,0,1-1.87,7.214A52.812,52.812,0,0,1,30.8,28.07c-3.2,3.482-6.607,6.728-8.9,8.839l-.018.017a3.836,3.836,0,0,1-2.571.99ZM9.864,3.5A6.907,6.907,0,0,0,3.991,6.8c-1.423,2.342-1.311,5.357.315,8.489,1.013,1.948,4.482,7.467,15,17.213,2.172-2.025,5.076-4.836,7.815-7.813a48.2,48.2,0,0,0,7.166-9.4c1.626-3.131,1.738-6.146.315-8.488a6.848,6.848,0,0,0-9.644-2.149A10.185,10.185,0,0,0,21.529,8.7L19.3,13.121,17.066,8.7a10.185,10.185,0,0,0-3.432-4.057A6.906,6.906,0,0,0,9.864,3.5Z"
                                    transform="translate(789.902 456.497)"
                                    fill="#64d26d"
                                  />
                                </g>
                              </g>
                              <g id="center-heart">
                                <path
                                  id="inner"
                                  data-name="Path 16"
                                  d="M68.82,30.286C62.86,41.748,46.92,57.336,37.9,65.639a2.547,2.547,0,0,1-3.413,0c-9.068-8.3-25.012-23.892-30.972-35.353C-9.578,5.07,23.432-11.741,36.167,13.475,48.9-11.741,81.912,5.07,68.82,30.286Z"
                                  transform="translate(853.502 473.705)"
                                  fill="#64d26d"
                                />
                                <path
                                  id="outer"
                                  data-name="Path 17"
                                  d="M36.192,68.8a5.038,5.038,0,0,1-3.382-1.3l-.013-.012C28.5,63.55,22.1,57.47,16,50.84,8.968,43.21,4.022,36.682,1.3,31.439A27.058,27.058,0,0,1-2,18.8,20.564,20.564,0,0,1,.934,8.233,20.236,20.236,0,0,1,29.375,1.847a24.62,24.62,0,0,1,6.792,6.728,24.623,24.623,0,0,1,6.791-6.728A20.236,20.236,0,0,1,71.4,8.233,20.562,20.562,0,0,1,74.336,18.8a27.059,27.059,0,0,1-3.3,12.641c-2.723,5.236-7.666,11.763-14.693,19.4C50.32,57.389,43.909,63.5,39.592,67.478l-.018.017A5.038,5.038,0,0,1,36.192,68.8Zm-.029-5.01a.047.047,0,0,0,.057,0c4.247-3.912,10.543-9.916,16.446-16.332C59.4,40.14,64.084,33.976,66.6,29.132a22.135,22.135,0,0,0,2.734-10.306A15.233,15.233,0,0,0,45.688,6.037,21.52,21.52,0,0,0,38.4,14.6l-2.232,4.418L33.935,14.6a21.521,21.521,0,0,0-7.289-8.566A15.231,15.231,0,0,0,3,18.827,22.133,22.133,0,0,0,5.732,29.134c2.522,4.85,7.213,11.014,13.941,18.319,5.982,6.495,12.268,12.465,16.491,16.333Z"
                                  transform="translate(853.502 473.705)"
                                  fill="#64d26d"
                                />
                              </g>
                            </g>
                          </svg>
                        </label>
                      </div>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="28"
                        height="30"
                        fill="grey"
                        class="bi bi-share mx-5"
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
              </div>
    
              <!-- TRACKLIST------------------------------------------------------------------------------------------- -->
              <div id="track-container" class="container">
                <div id="placeholder-track">
                  <div class="row mt-5 d-flex flex-row align-items-center ps-5">
                    <div class="col col-1" id="position">
                      <p class="text-white align-middle">1</p>
                    </div>
    
                    <div class="col col-10" id="track-title">
                      <h6 class="text-white mb-0">So Far So Good</h6>
                      <p class="text-secondary">Sun Of They</p>
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
                  </div>
    
                  <div class="row mt-1 d-flex flex-row align-items-center ps-5">
                    <div class="col col-1" id="position">
                      <p class="text-white align-middle">22</p>
                    </div>
    
                    <div class="col col-10" id="track-title">
                      <h6 class="text-white mb-0">Apricity</h6>
                      <p class="text-secondary">Imala Zir</p>
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
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
        <!-- ASIDE -->
        <div class="d-flex flex-column">
          <aside
            class="container-fluid my-5 d-flex w-100 justify-content-between w-100"
          >
            <div class="row text-secondary w-100">
              <div class="col d-md-flex mx-5">
                <div id="azienda" class="mx-4">
                  <h6 class="text-light">Azienda</h6>
                  <ul class="p-0 mt-2">
                    <li>Chi siamo</li>
                    <li>Opportunità di lavoro</li>
                    <li>For the Record</li>
                  </ul>
                </div>
                <div id="comunity" class="mx-4">
                  <h6 class="text-light">Community</h6>
                  <ul class="p-0 mt-2">
                    <li>Per artisti</li>
                    <li>Sviluppatori</li>
                    <li>Pubblicità</li>
                    <li>Investitori</li>
                    <li>Venditori</li>
                    <li>Spotify for Work</li>
                  </ul>
                </div>
    
                <div id="link-utily" class="mx-4">
                  <h6 class="text-light">Link utili</h6>
                  <ul class="p-0 mt-2">
                    <li>Assistenza</li>
                    <li>App per cellulare gratuita</li>
                    <li>Diritti del consumatore</li>
                  </ul>
                </div>
              </div>
              <div
                id="social-link-icon"
                class="col d-flex justify-content-center justify-content-md-end text-light"
              >
                <div class="mx-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="30"
                    height="30"
                    fill="currentColor"
                    class="bi bi-instagram"
                    viewBox="0 0 16 16"
                  >
                    <path
                      d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.917 3.917 0 0 0-1.417.923A3.927 3.927 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.916 3.916 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.926 3.926 0 0 0-.923-1.417A3.911 3.911 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0h.003zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599.28.28.453.546.598.92.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.47 2.47 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.478 2.478 0 0 1-.92-.598 2.48 2.48 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233 0-2.136.008-2.388.046-3.231.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92.28-.28.546-.453.92-.598.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045v.002zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92zm-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217zm0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334z"
                    />
                  </svg>
                </div>
                <div class="mx-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="30"
                    height="30"
                    fill="currentColor"
                    class="bi bi-twitter"
                    viewBox="0 0 16 16"
                  >
                    <path
                      d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334 0-.14 0-.282-.006-.422A6.685 6.685 0 0 0 16 3.542a6.658 6.658 0 0 1-1.889.518 3.301 3.301 0 0 0 1.447-1.817 6.533 6.533 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.325 9.325 0 0 1-6.767-3.429 3.289 3.289 0 0 0 1.018 4.382A3.323 3.323 0 0 1 .64 6.575v.045a3.288 3.288 0 0 0 2.632 3.218 3.203 3.203 0 0 1-.865.115 3.23 3.23 0 0 1-.614-.057 3.283 3.283 0 0 0 3.067 2.277A6.588 6.588 0 0 1 .78 13.58a6.32 6.32 0 0 1-.78-.045A9.344 9.344 0 0 0 5.026 15z"
                    />
                  </svg>
                </div>
                <div class="mx-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="30"
                    height="30"
                    fill="currentColor"
                    class="bi bi-facebook"
                    viewBox="0 0 16 16"
                  >
                    <path
                      d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </aside>
          <!-- FOOTER -->
          <footer class="mt-5">
            <div class="container-fluid d-flex justify-content-between">
              <div class="mx-5 mb-5">
                <span class="mx-2 text-white">Informazioni legali</span>
                <span class="mx-2 text-white">Centro sulla privacy</span>
                <span class="mx-2 text-white">Informazioni sulla privacy</span>
                <span class="mx-2 text-white">Impostazioni cookie</span>
                <span class="mx-2 text-white">Info annunci</span>
                <span class="mx-2 text-white">Accessibilità</span>
              </div>
              <div>
                <p class="text-light">
                  &copy; <span id="copy" class="text-white"></span> Spotify AB
                </p>
              </div>
            </div>
          </footer>
          </div>
            
            
            `;
            albumClick(albumId);
          });
        });

        hideDefault();

        // funzione per caricare album nel main
      })

      .catch((err) => {
        console.log(err);
      });
  };

  searchButton.addEventListener("click", function (e) {
    e.preventDefault();
    mysearch();
  });

  searchInput.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
      e.preventDefault();
      mysearch();
    }
  });
});
