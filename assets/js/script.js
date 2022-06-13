const authorizeBtn = document.getElementById("authorizeBtn");

authorizeBtn.addEventListener("click", requestAuthorization);


function requestAuthorization() {
    localStorage.setItem("client_id", "8236072fd7dd43feae4082949df88c1e");
    localStorage.setItem("client_secret", "e1471c32cadc4f369fbb671e30827bca");

    let url = "https://accounts.spotify.com/authorize";
    url += "?client_id=8236072fd7dd43feae4082949df88c1e";
    url += "&response_type=code";
    url += "&redirect_uri=" + encodeURI("https://hackpres.github.io/KnowYourMusic/html/homePage.html");
    url += "&show_dialog=true";
    url += "&scope=user-read-playback-position ugc-image-upload"
    window.location.href = url;
}
