const imageContainer = document.getElementById("artistImgContainer");
const infoContainer = document.getElementById("artistInfoContainer");
const nameContainer = document.getElementById("artistNameContainer");
const followers = document.getElementById("followers");
const popularity = document.getElementById("popularity");
const genre = document.getElementById("genre");
const albumsElContainer = document.getElementById("albumsElContainer");

function init() {
    handleRedirect();
}

function handleRedirect() {
    let artist = retrieveInput();
    //removes parameters from url
    window.history.pushState("", "", "http://127.0.0.1:5500/html/artistPage.html");
    requestSearchAPI(artist)
}

function retrieveInput() {
    let input = null;
    const queryString = window.location.search;
    if (queryString.length > 0) {
        const urlParams = new URLSearchParams(queryString);
        input = urlParams.get("artist");
    }
    return input;
}

function requestSearchAPI(input) {
    var accessToken = localStorage.getItem("access-token");
    var myHeaders = new Headers();

    myHeaders.append("Authorization", `Bearer ${accessToken}`);
    var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
    };

    fetch(`https://api.spotify.com/v1/artists/${input}`, requestOptions)
    .then(response => response.json())
    .then(result => {
        console.log(result);
        printArtistData(result);
        printAlbumData(input);
    })
    .catch(error => console.log('error', error));
}

function printArtistData(data) {
    let artistImgURL = data.images[1].url;
    imageContainer.innerHTML =`
    <img src="${artistImgURL}"></img>`

    let artistFollowers = data.followers.total;
    followers.innerText = `${artistFollowers}`
    let artistPopularity = data.popularity;
    popularity.innerText = `${artistPopularity}`
    let artistGenre = data.genres[0];
    genre.innerText = `${artistGenre}`

    let artistName = data.name;
    nameContainer.innerHTML = `
    <h1>${artistName}`;
}

function printAlbumData(id) {
    var accessToken = localStorage.getItem("access-token");
    var myHeaders = new Headers();

    myHeaders.append("Authorization", `Bearer ${accessToken}`);
    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    fetch(`https://api.spotify.com/v1/artists/${id}/albums`, requestOptions)
    .then(response => response.json())
    .then(result => {
        let albumsArray = result.items;
        renderAlbumEl(albumsArray)
    })
    .catch(error => console.log('error', error));
}

function renderAlbumEl(array) {
    for (let album of array) {
        let container = document.createElement("div")
        let imageEl = document.createElement("img");
        if (album.images[1]) {
            imageEl.src = `${album.images[1].url}`
        } else {
            imageEl.src = "../assets/img/KYMnoImgFound.svg"
        }
        let nameEl = document.createElement("h2");
        nameEl.innerText = `title:${album.name}`
        let releaseEl = document.createElement("p");
        releaseEl.innerText = `release date:${album.release_date}`
        let tracksNumberEl = document.createElement("p"); 
        tracksNumberEl.innerText = `total tracks:${album.total_tracks}`

        container.appendChild(imageEl)
        container.appendChild(nameEl)
        container.appendChild(releaseEl)
        container.appendChild(tracksNumberEl)
        albumsElContainer.appendChild(container)
        if (albumsElContainer.childElementCount >= 10) {
            break
        }   
    }
}