const userSearch = document.getElementById("textInput");
const historyBtn = document.getElementById("searchHistoryBtn");
const historyContainerEl = document.getElementById("artistHistory");

userSearch.addEventListener("change", nextDocument);

function initialize() {
    console.log("initialize")
    if (window.location.search.length > 0) {
        handleRedirect();
    }
    retrieveHistory();
}

function handleRedirect() {
    let code = retrieveCode();
    getToken(code);
    window.history.pushState("", "", "http://127.0.0.1:5500/html/homePage.html"); //removes parameters from url
}

function retrieveCode() {
    let code = null;
    const queryString = window.location.search;
    if (queryString.length > 0) {
        const urlParams = new URLSearchParams(queryString);
        code = urlParams.get("code");
    }
    console.log('code:', code)
    return code;
}

function getToken(code) {
    let request = "grant_type=authorization_code";
    request += "&code=" + code;
    request += "&redirect_uri=" + encodeURI("http://127.0.0.1:5500/html/homePage.html");
    request += "&client_id=8236072fd7dd43feae4082949df88c1e";
    request += "&client_secret=e1471c32cadc4f369fbb671e30827bca";
    authorizeTokenApi(request);
}

function retrieveHistory() {
    let storedArtists = Object.keys(localStorage);
    console.log(storedArtists)
    // let filteredArtists = storedArtists.filter(key => {
    // })
    let filteredArtists = [];
    for (let key of storedArtists) {
        if (key !== "access-token" && key !== "refresh-token" && key !== "client_secret" && key !== "client_id") {
            filteredArtists.push(key)
        }
    }
    console.log(filteredArtists)
    filteredArtists.forEach(savedArtist => {
        let artistBtn = document.createElement("button");
        artistBtn.type = "button";
        artistBtn.classList.add("w-100", "btn");
        artistBtn.innerText = savedArtist;
        artistBtn.addEventListener('click', (e) => {
            let name = e.target.innerText
            let artist = localStorage.getItem(name);
            window.location.assign(`http://127.0.0.1:5500//html/artistPage.html?artist=${artist}`)
        });
        historyContainerEl.appendChild(artistBtn);
    })
}

function authorizeTokenApi(request) {
    console.log('request', request)
    fetch(`https://accounts.spotify.com/api/token`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Basic ' + btoa(`8236072fd7dd43feae4082949df88c1e:e1471c32cadc4f369fbb671e30827bca`),
        },
        body: request
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
        if (data.access_token != undefined) {
            access_token = data.access_token;
            localStorage.setItem("access-token", access_token);
        }
        if (data.refresh_token != undefined) {
            refresh_token = data.refresh_token;
            localStorage.setItem("refresh-token", refresh_token);
        }
    })
}

function nextDocument() {
    window.location.assign(`http://127.0.0.1:5500/html/inputReturns.html?input=${userSearch.value}`)
}
