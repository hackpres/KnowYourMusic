const btnsContainer = document.getElementById("optionBtnsContainer");

function init() {
    console.log("initialized")
    handleRedirect();
}

function handleRedirect() {
    let input = retrieveInput();
    window.history.pushState("", "", "https://hackpres.github.io/KnowYourMusic/html/inputReturns.html"); //removes parameters from url
    requestSearchAPI(input)
}

function retrieveInput() {
    let input = null;
    const queryString = window.location.search;
    if (queryString.length > 0) {
        const urlParams = new URLSearchParams(queryString);
        input = urlParams.get("input");
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

    fetch(`https://api.spotify.com/v1/search?q=${input}&type=album,artist&limit=5&market=ES`, requestOptions)
    .then(response => response.json())
    .then(result => {
        console.log(result);
        printArtistOptions(result);
    })
    .catch(error => console.log('error', error));
}

function printArtistOptions(data) {
    let artistOptions = data.artists.items;
    let albumOptions = data.albums.items;
        //checks to see if artists has any contents, if not it will print buttons from album data
    if (data.artists.items[1]) {
        createBtnElements(artistOptions)
            //checks to see if the artists printed 5 buttons, if not create the rest from album data
        if (btnsContainer.childElementCount < 5) {
                createAlbumBtnElements(albumOptions)
        }
    } else {
        createAlbumBtnElements(albumOptions)
    }
}

function createBtnElements(array) {
        //used for...of here so that we can break the loop once 5 buttons have been appended
    for (let option of array) {
        let artist = option.name;
        let container = document.createElement("button");
        container.addEventListener("click", (e) => {
            redirectToArtistPage(artist)
        });
        let nameEl = document.createElement("h3");
        nameEl.innerText = option.name
        let ImgEl = document.createElement("img");
            //checks to see if the data returned an img, if not print our default KYMnoImgFound.svg
        if (option.images[1]) {
            container.innerHTML = `
            <img src="${option.images[1].url}"></img>`         
        } else {
            container.innerHTML = `<img src="../assets/img/KYMnoImgFound.svg"></img>`;
        }
        container.appendChild(ImgEl);
        container.appendChild(nameEl);
        btnsContainer.appendChild(container);
            //breaks the loop once 5 buttons have been appended
        if (btnsContainer.childElementCount >= 5) {
            break
        }

        option++;
    }
}

function createAlbumBtnElements(array) {
    for (let option of array) {
        let artist = option.artists[0].name
        let container = document.createElement("button");
        container.addEventListener("click", (e) => {
            console.log(e.target)
            redirectToArtistPage(artist)
        });
        let nameEl = document.createElement("h3");
        nameEl.innerText = option.name
        let ImgEl = document.createElement("img");
        if (option.images[1]) {
            container.innerHTML = `
            <img src="${option.images[1].url}"></img>`         
        } else {
            container.innerHTML = `<img src="../assets/img/KYMnoImgFound.svg"></img>`;
        }
        container.appendChild(ImgEl);
        container.appendChild(nameEl);
        btnsContainer.appendChild(container);
        console.log(btnsContainer.childElementCount)
        if (btnsContainer.childElementCount >= 5) {
            break
        }

        option++;
    }
}

function redirectToArtistPage(artist) {
    window.location.assign(`https://hackpres.github.io/KnowYourMusic/html/artistPage.html?artist=${artist}`)
}
