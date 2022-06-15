const imageContainer = document.getElementById("artistImgContainer");
const infoContainer = document.getElementById("artistInfoContainer");
const nameContainer = document.getElementById("artistNameContainer");
const followers = document.getElementById("followers");
const popularity = document.getElementById("popularity");
const genre = document.getElementById("genre");

function init() {
    console.log("initialized")
    handleRedirect();
}

function handleRedirect() {
    let artist = retrieveInput();
    window.history.pushState("", "", "https://hackpres.github.io/KnowYourMusic/html/artistPage.html"); //removes parameters from url
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

    console.log(input)
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

    console.log(id)
    fetch(`https://api.spotify.com/v1/artists/${id}/albums`, requestOptions)
    .then(response => response.json())
    .then(result => {
        console.log(result);
        let albumsArray = result.items;
        console.log(albumsArray)
    })
    .catch(error => console.log('error', error));
}