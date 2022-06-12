
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

    fetch(`https://api.spotify.com/v1/search?q=${input}&type=artist,track,album&limit=5&market=ES`, requestOptions)
    .then(response => response.json())
    .then(result => {
        console.log(result);
        gatherData(result)
    })
    .catch(error => console.log('error', error));
}

function gatherData(data) {
            //Artist 1
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
            //Artist 2
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
            //Artist 3
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
            //Artist 4
        //  Artist Name
    let artists3 = data.tracks.items[3].artists;
    let artistName3 = []
    artists3.forEach(position => {
        let moniker = position.name;
        artistName3.push(`${moniker}`)
    });
        //  Track Name
    let trackName3 = data.tracks.items[3].name
        //  Album Img
    let albumImgURL3 = data.tracks.items[3].album.images[1].url
        //  Album Title (only used with track return)
    let albumTitle3 = data.tracks.items[3].album.name
            //Artist 5
        //  Artist Name
    let artists4 = data.tracks.items[4].artists;
    let artistName4 = []
    artists4.forEach(position => {
        let moniker = position.name;
        artistName4.push(`${moniker}`)
    });
        //  Track Name
    let trackName4 = data.tracks.items[4].name
        //  Album Img
    let albumImgURL4 = data.tracks.items[4].album.images[1].url
        //  Album Title (only used with track return)
    let albumTitle4 = data.tracks.items[4].album.name
        
    // let artist1 = [`[${artistName0}], ${trackName0}, ${albumImgURL0}, ${albumTitle0}`];
    // let artist2 = [`${artistName1}, ${trackName1}, ${albumImgURL1}, ${albumTitle1}`];
    // let artist3 = [`${artistName2}, ${trackName2}, ${albumImgURL2}, ${albumTitle2}`];
    // let artist4 = [`${artistName3}, ${trackName3}, ${albumImgURL3}, ${albumTitle3}`];
    // let artist5 = [`${artistName4}, ${trackName4}, ${albumImgURL4}, ${albumTitle4}`];

    // console.log(artistName0);
    // console.log(artistName1);
    // console.log(artistName2);
    // console.log(artistName3);
    // console.log(artistName4);
    // console.log(trackName0);
    // console.log(trackName1);
    // console.log(trackName2);
    // console.log(trackName3);
    // console.log(trackName4);
    // console.log(albumImgURL0);
    // console.log(albumImgURL1);
    // console.log(albumImgURL2);
    // console.log(albumImgURL3);
    // console.log(albumImgURL4);
    // console.log(albumTitle0);
    // console.log(albumTitle1);
    // console.log(albumTitle2);
    // console.log(albumTitle3);
    // console.log(albumTitle4);

}