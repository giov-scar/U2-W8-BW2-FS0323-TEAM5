console.log("hello world");

const searchButton = document.getElementById("search-button");

const artistUrl = "https://striveschool-api.herokuapp.com/api/deezer/artist";
const albumUrl = "https://striveschool-api.herokuapp.com/api/deezer/album";
const searchUrl = "https://striveschool-api.herokuapp.com/api/deezer/search?q=";

const searchInput = document.getElementById("search-input");

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
        let artistid = e.id;
        console.log(artistid);
        console.log(e);
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
        newAlbum.classList.add("col-12", "col-md-4", "col-lg-3", "col-xl-2");
        newAlbum.innerHTML = `
        <a href="./album.html?id=${albumId}">
        <div id="album" class="row bg-black">
          <div class="col d-none d-md-block p-2">
            <div class="card h-100">
              <img src="${imageAlbumUrl}" class="card-img-top " alt="${nameAlbum}"  />
              <div class="card-body ">
                <h5 class="card-title" style="object-fit: cover; height: 60px;">${nameAlbum}</h5>
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
        // <div class="card h-100">
  {/* <img src="${item.imageUrl}" class="card-img-top" alt="concert placeholder image" style="object-fit: cover; height: 200px;">
  <div class="card-body d-flex flex-column">
    <h5 class="card-title">${item.name}</h5>
    <p class="card-text">${item.description}</p>
    <div class="mt-auto d-flex justify-content-between align-items-end">
      <p class="card-text fst-italic">${item.brand}</p>
      <p class="card-text fw-bold">&#36;${item.price}</p>
    </div>
    <a href="./detail.html?id=${item._id}" class="btn btn-primary mt-2">Scopri di più</a>
  </div>
</div> */}

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
