const userSearch = document.getElementById("textInput");

userSearch.addEventListener("change", nextDocument);

function initialize() {
    console.log("initialize")
    if (window.location.search.length > 0) {
        handleRedirect();
    }
}

function handleRedirect() {
    let code = retrieveCode();
    getToken(code);
    window.history.pushState("", "", "https://hackpres.github.io/KnowYourMusic/html/homePage.html"); //removes parameters from url
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
    request += "&redirect_uri=" + encodeURI("https://hackpres.github.io/KnowYourMusic/html/homePage.html");
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
    })
}

function nextDocument() {
    window.location.assign(`https://hackpres.github.io/KnowYourMusic/html/inputReturns.html?input=${userSearch.value}`)
}
