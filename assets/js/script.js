const searchInput = document.getElementById("textInput");

searchInput.addEventListener("change", requestAuthorization);

function initialize() {
    console.log("initialize")
    if (window.location.search.length > 0) {
        handleRedirect();
    }
}

function handleRedirect() {
    let code = retrieveCode();
    getToken(code);
    window.history.pushState("", "", "http://127.0.0.1:5500/"); //removes parameters from url
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

function requestAuthorization() {
    localStorage.setItem("client_id", "8236072fd7dd43feae4082949df88c1e");
    localStorage.setItem("client_secret", "e1471c32cadc4f369fbb671e30827bca");

    let url = "https://accounts.spotify.com/authorize";
    url += "?client_id=8236072fd7dd43feae4082949df88c1e";
    url += "&response_type=code";
    url += "&redirect_uri=" + encodeURI("http://127.0.0.1:5500/");
    url += "&show_dialog=true";
    url += "&scope=user-read-playback-position ugc-image-upload"
    window.location.href = url;
}

function getToken(code) {
    let request = "grant_type=authorization_code";
    request += "&code=" + code;
    request += "&redirect_uri=" + encodeURI("http://127.0.0.1:5500/");
    request += "&client_id=8236072fd7dd43feae4082949df88c1e";
    request += "&client_secret=e1471c32cadc4f369fbb671e30827bca";
    authorizeTokenApi(request);
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
        initialize();
    })
}


