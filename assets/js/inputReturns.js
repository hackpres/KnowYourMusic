
function init() {
    console.log("initialized")
    handleRedirect();
}

function handleRedirect() {
    let input = retrieveInput();
    window.history.pushState("", "", "http://127.0.0.1:5500/html/inputReturns.html"); //removes parameters from url
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
    .then(response => response.json())
    .then(result => {
        console.log(result);
        gatherData(result)
    })
    .catch(error => console.log('error', error));
}

function gatherData(data) {

        //  Artist Name
    let artists0 = data.tracks.items[0].artists;
    let artistName0 = []
    artists0.forEach(position => {
        let moniker = position.name;
        artistName0.push(`${moniker}`)
    });
        //  Track Name
    let trackName0 = data.tracks.items[0].name
        //  Album Img
    let albumImgURL0 = data.tracks.items[0].album.images[1].url
        //  Album Title (only used with track return)
    let albumTitle0 = data.tracks.items[0].album.name

        //  Artist Name
    let artists1 = data.tracks.items[1].artists;
    let artistName1 = []
    artists1.forEach(position => {
        let moniker = position.name;
        artistName1.push(`${moniker}`)
    });
        //  Track Name
    let trackName1 = data.tracks.items[1].name
        //  Album Img
    let albumImgURL1 = data.tracks.items[1].album.images[1].url
        //  Album Title (only used with track return)
    let albumTitle1 = data.tracks.items[1].album.name

    //  Artist Name
    let artists2 = data.tracks.items[2].artists;
    let artistName2 = []
    artists2.forEach(position => {
        let moniker = position.name;
        artistName2.push(`${moniker}`)
    });
        //  Track Name
    let trackName2 = data.tracks.items[2].name
        //  Album Img
    let albumImgURL2 = data.tracks.items[2].album.images[1].url
        //  Album Title (only used with track return)
    let albumTitle2 = data.tracks.items[2].album.name

    console.log(artistName0);
    console.log(artistName1);
    console.log(artistName2);
    console.log(trackName0);
    console.log(trackName1);
    console.log(trackName2);
    console.log(albumImgURL0);
    console.log(albumImgURL1);
    console.log(albumImgURL2);
    console.log(albumTitle0);
    console.log(albumTitle1);
    console.log(albumTitle2);
}