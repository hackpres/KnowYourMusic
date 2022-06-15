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
    //removes parameters from url
    window.history.pushState("", "", "https://hackpres.github.io/KnowYourMusic/html/artistPage.html");
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

    fetch(`	https://api.spotify.com/v1/artists/${id}/albums&include_groups=album,single&limit=10`, requestOptions)
    .then(response => response.json())
    .then(result => {
        console.log(result)
        let albumArray = result.items;
        for (let position of albumArray) {
            // let artist = position.artists[0].name
            // let container = document.createElement("div");
            // container.addEventListener("click", (e) => {
            //     console.log(e.target)
            //     redirectToArtistPage(artist)
            // });
            // let nameEl = document.createElement("h3");
            // nameEl.innerText = position.name
            // let ImgEl = document.createElement("img");
            // if (position.images[1]) {
            //     container.innerHTML = `
            //     <img src="${position.images[1].url}"></img>`         
            // } else {
            //     container.innerHTML = `<img src="../assets/img/KYMnoImgFound.svg"></img>`;
            // }
            // container.appendChild(ImgEl);
            // container.appendChild(nameEl);
            // btnsContainer.appendChild(container);
            // console.log(btnsContainer.childElementCount)
            // if (btnsContainer.childElementCount >= 5) {
            //     break
            // }
    
            position++;
        }
    })
}