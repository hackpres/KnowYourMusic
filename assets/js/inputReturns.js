
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
    console.log('input:', input)
    return input;
}

function requestSearchAPI(input) {
    console.log("we're in!")
    
    var accessToken = localStorage.getItem("access-token"); //Key will be access-Token
    console.log(input)
    var myHeaders = new Headers();

    myHeaders.append("Authorization", `Bearer ${accessToken}`);
    var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
    };

    fetch(`https://api.spotify.com/v1/search?q=${input}&type=track&limit=3&market=ES`, requestOptions)
    .then(response => response.text())
    .then(result => {
        console.log(result);
    })
    .catch(error => console.log('error', error));
}
