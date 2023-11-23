
function RenderProfile(params) {
    console.log("profile");

    swapStyleSheet("css/profile.css");
    let wrapper = document.querySelector("#wrapper");

    BasicLayout();


    document.querySelector("#wrapper").innerHTML += `
    <div id="notifications">
        <img>
        <div class="noti">
         <p>Elin liked your comment</p> 
        </div>
        <div class="notiStroke"></div>
        <div class="noti">
        <p>Elin liked your comment</p> 
       </div>
        <div class="notiStroke"></div>
        <div class="noti">
         <p>Elin liked your comment</p> 
        </div>
    </div>

    <div id="user">
        <img>
        <div id="profileIcon"></div>
        <div id="edit">
            <img>
        </div>
        <div id="username">Username</div>
        <div id="date">Member since:</div>
        <div id="settings">settings</div>
        <div id="description">I am a comic artist based in Sweden, Malmö. My comics usually revolve around superheros and their adventures. The adventures takes place in the fantacy land of </div>
        <div id="insta">
            <div id="icon"></div>
            <div id="name">@Torkel</div>
        </div>
        <div id="follows">
            <div id="name">36 people follow</div>
            <div id="icon"></div>
        </div>
    </div>

    <div id"options">
        <div id="myComics"> My comics </div>
        <div id="Saved"> Saved comics </div>
    </div>
    <div id="BigStroke"></div>
    `;
}