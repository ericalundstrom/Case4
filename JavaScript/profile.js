
async function RenderProfile(params) {
    console.log("profile");

    swapStyleSheet("css/profile.css");
    let wrapper = document.querySelector("#wrapper");

    BasicLayout();
    let response = await fetch("api/data/comics.json");
    let resource = await response.json();

    document.querySelector("#wrapper").innerHTML = `
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

    <div id="options">
        <div id="myComics" onclick="toggleClass('myComics')">My comics</div>
        <div id="artist" onclick="toggleClass('Saved')">Artists you follow</div>
    </div>

    <button id="addNewComic"> + Add new comic</button>
    <div id="BigStroke"></div>

    <div id="cards"></div
    `;

    document.querySelector("#addNewComic").addEventListener("click", () => {
        renderUploadComic();
    })

    document.querySelector("#settings").addEventListener("click", () => {
        let popUp = document.querySelector("#popUp")
        popUp.classList.remove("hidden");
        popUp.innerHTML = `
        <div> Do you want to log out? </div>
        <button> Log out</button>
        `;

        popUp.querySelector("button").addEventListener("click", (event) => {
            event.stopPropagation();
            logout();
        })
    })

    document.querySelector("#follows > #name").addEventListener("click", (event) => {
        event.stopPropagation();
        let popUp = document.querySelector("#popUp");
        console.log(popUp);
        RenderFollowers(popUp);
    })

    document.querySelector("#artist").addEventListener("click", (event) => {
        event.stopPropagation();

        RenderFollowingArtist();
        console.log(event.target.id);
        toggleClass(event.target.id)
    })

    document.querySelector("#myComics").addEventListener("click", (event) => {
        event.stopPropagation();
        let card = document.querySelector("#cards");
        card.innerHTML = ``;

        createCard(card, resource);

        console.log(event.target.id);
        toggleClass(event.target.id)
    })

    let cardBox = document.querySelector("#cards");
    createCard(cardBox, resource);

}

function toggleClass(selectedId) {
    var options = document.getElementById('options').children;

    for (var i = 0; i < options.length; i++) {
        var option = options[i];

        if (option.id === selectedId) {
            option.classList.add('selected');
        } else {
            option.classList.remove('selected');
        }
    }
}



function RenderFollowingArtist() {

    console.log("following");;
    let cards = document.querySelector("#cards")
    cards.innerHTML = ``;

    for (let i = 0; i < 3; i++) {
        RenderArtistCard(cards);
    }
}


function RenderArtistCard(parent) {
    let divDom = document.createElement("div");
    divDom.classList.add("artistBox");
    divDom.innerHTML = `
            <div id="artistIcon"></div>
            <h3> Username </h3>
            <div id="uploadedComicsBox">
                <div class="number"> 8 </div>
                <div id="text"> Uploaded comics </div>
            </div>
            <div id="folowerBox">
                <div class="number"> 1 </div>
                <div id="text"> Followers </div>
            </div>
    `;

    parent.append(divDom);
}



function RenderFollowers(popUp) {

    popUp.classList.remove("hidden");
    popUp.innerHTML = `
    <div id="popUpBox">
    <div id="close"> X </div>
    <h2> Followers </h2>
    <input type="text" id="searchFollower" name="searchFollower" placeholder="search follower.."/>
    <div id="followers"> </div>
    <button> Show more </button>
    </div>
    `;

    popUp.querySelector("#close").addEventListener("click", (event) => {
        event.stopPropagation();
        let popUp = document.querySelector("#popUp");
        popUp.classList.add("hidden");
    })
    for (let i = 0; i < 5; i++) {
        let parent = document.querySelector("#followers")
        RenderFollowersCard(parent)

    }
}

function RenderFollowersCard(parent) {

    let divDom = document.createElement("div");
    divDom.classList.add("artistBox");
    divDom.innerHTML = `
            <div id="artistIcon"></div>
            <h3> Username </h3>
            <button id="Remove">Remove</button>
    `;
    parent.append(divDom);
}

function logout() {
    localStorage.clear();
    localStorage.removeItem("user");
    RenderLoginPage();
    location.reload();
}