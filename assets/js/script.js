const searchInput = document.getElementById("form1");

searchInput.addEventListener("change", requestAuthorization());


function requestAuthorization() {
    let url = "https://accounts.spotify.com/authorize";
    url += "?client_id=8236072fd7dd43feae4082949df88c1e";
    url += "&response_type=code";
    url += "&redirect_uri=" + encodeURI("https://hackpres.github.io/KnowYourMusic");
    url += "&show_dialog=true";
    url += "&scope=user-read-playback-position ugc-image-upload"
    window.location.href = url;
}