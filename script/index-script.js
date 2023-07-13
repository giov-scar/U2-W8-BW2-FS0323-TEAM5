console.log("hello world");

//  URL API
const artistUrl = "https://striveschool-api.herokuapp.com/api/deezer/artist";
const albumUrl = "https://striveschool-api.herokuapp.com/api/deezer/album";
const searchUrl = "https://striveschool-api.herokuapp.com/api/deezer/search?q=";

//DATA 

let now= new Date().getFullYear()
let data= document.getElementById("copy")
data.innerText= now 


// let minWidth = window.innerWidth
// console.log(minWidth)
//  if(minWidth>=768){
    let searchButton1= document.getElementById("search")
    searchButton1.addEventListener("click", function(){
    let container= document.getElementById("cerca")

    container.innerHTML=`   <div id="cerca" class="bg-dark">
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
  </div>`
     
//   let arrow = document.getElementById("arrow")
// arrow.addEventListener("click", function(){
    
// })



  const searchButton = document.getElementById("search-button");
  
console.log(searchButton)

const searchInput = document.getElementById("search-input");
console.log(searchInput)

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
      console.log(data);
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

      console.log(resultAlbum);
      console.log(resultArtist);
      searchInput.value = "";

      // function for retun unique value of array by key value
      function getUniqueListBy(arr, key) {
        return [...new Map(arr.map((item) => [item[key], item])).values()];
      }

      const uniqueArtist = getUniqueListBy(resultArtist, "id");
      console.log(uniqueArtist);

      uniqueArtist.forEach((e) => {
        let imageArtistUrl = e.picture;
        let nameArtist = e.name;
        let artistid=e.id
        console.log(artistid);
        console.log(e);
        const artistContainer = document.getElementById("artist-container");
let newCol =document.createElement ('div')
newCol.classList.add ('col')

        newCol.innerHTML = 
          `<a href="./artist.html?id=${artistid}">
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
         artistContainer.appendChild(newCol)
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
        newAlbum.classList.add("col-12","col-md-6", "col-lg-4", "col-xl-3","col-xxl-2");
        newAlbum.innerHTML = `
        <a href="./album.html?id=${albumId}">
        <div id="album-result" class="row">
          <div class="col d-none d-md-block">
            <div class="card">
              <img src="${imageAlbumUrl}" class="card-img-top " alt="${nameAlbum}" />
              <div class="card-body ">
                <h5 class="card-title">${nameAlbum}</h5>
              </div>
            </div>
          </div>
        </div>
        
        <div class="card mb-3 d-md-none bg-dark text-light">
  <div class="row g-0">
    <div class="col-md-3">
      <img src="${imageAlbumUrl}" class="img-fluid rounded-start" width="100px" alt="${nameAlbum}">
              <h5 class="card-title d-inline">${nameAlbum}</h5>
    </div>
      </div>
    </div>
  </div>
</div>
        </div>
      </div>
        </a>
        `;

        
        albumResultContainer.appendChild(newAlbum);
      });

      console.log(resultAlbum);
      console.log(resultArtist);
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


searchInput.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    e.preventDefault();
    mysearch();
  }
});
})





//  }









