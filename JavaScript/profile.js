
async function RenderProfile() {

    console.log("profile");

    swapStyleSheet("css/profile.css");
    let wrapper = document.querySelector("#wrapper");

    BasicLayout();
    let response = await fetch("api/data/comics.json");
    let resource = await response.json();

    let responsUsers = await fetch("api/data/users.json");
    let resourceUsers = await responsUsers.json();
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
        //renderLayoutPage()
    })

    document.querySelector("#settings").addEventListener("click", () => {
        let popUp = document.querySelector("#popUp")
        popUp.classList.remove("hidden");
        popUp.innerHTML = `
        <div> Do you want to log out? </div>
        <button> Log out</button>
        <div id="close"> x </div>
        `;

        popUp.querySelector("button").addEventListener("click", (event) => {
            event.stopPropagation();
            logout();
        })

        popUp.querySelector("#close").addEventListener("click", () => {
            popUp.classList.add("hidden");
        })
    })

    document.querySelector("#follows > #name").addEventListener("click", (event) => {
        event.stopPropagation();
        let popUp = document.querySelector("#popUp");
        console.log(popUp);
        // let respons = await fetch("api/data/users.json");
        // let resource = await respons.json();
        RenderFollowers(popUp, resourceUsers);
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

    let responseUser = await fetch("api/data/comics.json");
    let resourceUser = await responseUser.json();
    let cardBox = document.querySelector("#cards");
    createCard(cardBox, resourceUser);

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



async function RenderFollowingArtist() {

    console.log("following");;
    let cards = document.querySelector("#cards")
    cards.innerHTML = ``;


    await RenderArtistCard(cards);

}


async function RenderArtistCard(parent) {

    let respons = await fetch("api/data/users.json");
    let resourse = await respons.json();

    resourse.forEach(user => {
        console.log(user[0].comics[0].title);
        let divDom = document.createElement("div");
        divDom.classList.add("artistBox");
        divDom.innerHTML = `
                <div id="artistIcon"></div>
                <h3> ${user[0].personal.username} </h3>
                <div id="uploadedComicsBox">
                    <div class="number"> ${user[0].comics[0].title} </div>
                    <div id="text"> Uploaded comics </div>
                </div>
                <div id="folowerBox">
                    <div class="number"> ${user[0].comics[0].likes} </div>
                    <div id="text"> Followers </div>
                </div>
        `;
        parent.append(divDom);
    })


}



async function RenderFollowers(popUp, resourceUsers) {

    console.log(resourceUsers);
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
    let parent = document.querySelector("#followers")
    RenderFollowersCard(parent, resourceUsers)

}

function RenderFollowersCard(parent, resourceUsers) {
    // console.log(resourceUsers);

    // console.log(resource);
    for (let i = 0; i < resourceUsers.length; i++) {

        let user = resourceUsers[i];
        user.forEach(part => {
            console.log(part.personal);
            let divDom = document.createElement("div");
            divDom.classList.add("artistBox");
            divDom.innerHTML = `
                    <div id="artistIcon"></div>
                    <h3> ${part.personal.username} </h3>
                    <button id="Remove">Remove</button>
            `;

            divDom.setAttribute("id", part.personal.username);
            divDom.querySelector("h3").setAttribute("id", part.personal.username);
            divDom.addEventListener("click", (event) => {
                // console.log(event.target);
                RenderProfileArtist(event.target);
            })
            parent.append(divDom);
        })
    }
}

function logout() {
    localStorager.clear();
    //localStorage.removeItem("user");
    RenderLoginPage();
    location.reload();
}

async function RenderProfileArtist(user) {

    console.log(user.id);

    let request = new Request(`api/GetUser.php?user=${user.id}`)
    let response = await fetch(request);
    let resourse = await response.json();
    console.log(resourse);
}
