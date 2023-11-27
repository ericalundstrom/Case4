
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

    <div id="options">
        <div id="myComics" onclick="toggleClass('myComics')">My comics</div>
        <div id="artist" onclick="toggleClass('Saved')">Artists you follow</div>
    </div>

    <button id="addNewComic"> + Add new comic</button>
    <div id="BigStroke"></div>

    <div id="cards"></div
    `;

    document.querySelector("#addNewComic").addEventListener("click",() => {
        renderCreateComic();
    })

    document.querySelector("#settings").addEventListener("click", () => {
        let popUp = document.querySelector("#popUp")
        popUp.classList.remove("hidden");
        popUp.innerHTML = `
        <div> </div>`
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

        for (let i = 0; i < 6; i++) {

            createCard(card);
        }
        console.log(event.target.id);
        toggleClass(event.target.id)
    })

    let cardBox = document.querySelector("#cards");

    for (let i = 0; i < 6; i++) {

        createCard(cardBox);
    }
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


function createCard(parent) {
    let card = document.createElement("div");
    card.classList.add("card");
    card.innerHTML = `
    <div style="width: 100%; height: 100%; position: relative">
        <div style="width: 243px; height: 351px; left: 0px; top: 44px; position: absolute">
            <div style="width: 243px; height: 351px; left: 0px; top: 0px; position: absolute; background: #D9D9D9"></div>
            <div style="width: 425.19px; height: 0px; left: 0px; top: 1.30px; position: absolute; transform: rotate(55.33deg); transform-origin: 0 0; border: 1px black solid"></div>
            <div style="width: 424.55px; height: 0px; left: 241.86px; top: 0px; position: absolute; transform: rotate(124.54deg); transform-origin: 0 0; border: 1px black solid"></div>
        </div>

        <div style="width: 51px; left: 1px; top: 13px; position: absolute; color: black; font-size: 20px; font-family: Inter; font-weight: 400; word-wrap: break-word">Title</div>
        <div style="width: 108px; height: 20px; left: 1px; top: 401px; position: absolute">
            <div style="width: 20px; height: 20px; left: 0px; top: 0px; position: absolute; background: #D9D9D9; border-radius: 9999px"></div>
            <div style="width: 80px; height: 19px; left: 28px; top: 1px; position: absolute; color: black; font-size: 16px; font-family: Inter; font-weight: 400; word-wrap: break-word">Username</div>
        </div>
        <div style="width: 41px; left: 202px; top: 12px; position: absolute">
            <div style="width: 22px; height: 22px; left: 0px; top: 0px; position: absolute">
                <div style="width: 22px; height: 22px; left: 0px; top: 0px; position: absolute; background: white; border-radius: 9999px"></div>
                <div style="width: 14.67px; height: 14.67px; left: 3.67px; top: 3.67px; position: absolute">
                    <div style="width: 12.81px; height: 13.98px; left: 1.49px; top: 390px; position: absolute; background: black"></div>
                </div>
            </div>
        <div style="width: 19px; height: 17px; left: 22px; top: 395px; position: absolute; color: black; font-size: 14px; font-family: Inter; font-weight: 400; word-wrap: break-word">34</div>
        </div>
    </div>
    `;

    parent.append(card);
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