
async function RenderProfile(data) {


    let user = localStorage.getItem("user");
    let response = await getUser(user);

    console.log(response[0].personal.picture);
    let userPic = response[0].personal.picture;

    if (userPic === "") {

        document.querySelector("#profile").style.backgroundImage = "url(images/userpic.webp)";
    } else {
        document.querySelector("#profile").style.backgroundImage = `url(${userPic})`;
    };


    if (data) {

        // console.log(data[0].comics[0].likes);
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
                <div id="username">${data[0].personal.username}</div>
                <div id="date">Member since: ${data[0].personal.added}</div>
                <div id="settings">settings</div>
                <div id="description">${data[0].personal.description} </div>
                <div id="insta">
                    <div id="icon"></div>
                    <div id="name">@Torkel</div>
                </div>
                <div id="follows">
                    <div id="name">34people follow</div>
                    <div id="icon"></div>
                </div>
            </div>
        
            <div id="options">
                <div id="myComics" onclick="toggleClass('myComics')">${data[0].personal.username} comics</div>
            </div>
        
            <button id="addNewComic"> + Add new comic</button>
            <div id="BigStroke"></div>
        
            <div id="cards"></div
        `;

        // let popUp = document.querySelector("#popUp")
        // popUp.addEventListener("click", () => {

        //     popUp.classList.add("hidden");
        // })
        // popUp.querySelector("button").addEventListener("click", (event) => {
        //     event.stopPropagation();
        //     logout();
        // })
        // document.querySelector("#follows > #name").addEventListener("click", (event) => {
        //     event.stopPropagation();
        //     let popUp = document.querySelector("#popUp");
        //     console.log(popUp);
        //     // let respons = await fetch("api/data/users.json");
        //     // let resource = await respons.json();
        //     RenderFollowers(popUp, resourceUsers);
        // })

        // document.querySelector("#artist").addEventListener("click", (event) => {
        //     event.stopPropagation();

        //     RenderFollowingArtist();
        //     console.log(event.target.id);
        //     toggleClass(event.target.id)
        // })

        document.querySelector("#myComics").addEventListener("click", (event) => {
            event.stopPropagation();
            let card = document.querySelector("#cards");
            card.innerHTML = ``;

            createCard(card, data);

            console.log(event.target.id);
            toggleClass(event.target.id)
        })

        let comics = data[0].comics[0].title;
        if (comics !== 0) {

            // let responseUser = await fetch("api/data/users.json");
            // let resourceUser = await responseUser.json();

            let user = data[0].personal.username;

            let comics = data[0].comics;

            comics.forEach(comic => {
                console.log(comic);
                let cardBox = document.querySelector("#cards");
                createCard(cardBox, comic, user);
            })

            // console.log(resourceUser);
            console.log("Användaren har comics");
        } else {
            console.log("Användaren har inga comics");
        }
    } else {


        console.log("profile");

        swapStyleSheet("css/profile.css");
        let wrapper = document.querySelector("#wrapper");

        BasicLayout();

        let user = localStorage.getItem("user");
        let response = await getUser(user);


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
            <div id="username">${response[0].personal.username}</div>
            <div id="date">Member since:${response[0].personal.added}</div>
            <div id="settings">settings</div>
            <div id="description">${response[0].personal.description}</div>
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
            <div id="myComics" class="selected" onclick="toggleClass('myComics')">My comics</div>
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
            // console.log(card);
            card.innerHTML = ``;

            // createCard(card, resourceUsers);


            if (response[0].comics.length === 0) {
                console.log("finns inga comics");
            } else {

                let comics = [];
                for (let i = 0; i < response[0].comics.length; i++) {
                    console.log(response[0].comics[i]);
                    let comic = response[0].comics;
                    comics.push(comic);

                    toggleClass(event.target.id)
                    createCard(card, comics);
                }
            }
        })

        // let responseUser = await fetch("api/data/comics.json");
        // let resourceUser = await responseUser.json();
        // let cardBox = document.querySelector("#cards");
        // createCard(cardBox, resourceUsers);
        let responsUsers = await fetch("api/data/users.json");
        let resourceUsers = await responsUsers.json();
        // console.log(resourceUsers);
        let comics = [];
        resourceUsers.forEach(user => {
            let comicOfUser = user[0].comics;
            console.log(comicOfUser.length);
            if (comicOfUser.length > 0) {

                comics.push(comicOfUser);
            }
        });
        console.log(comics);
        let cardBox = document.querySelector("#cards");


        if (response[0].comics.length === 0) {
            console.log("finns inga comics");
        } else {

            let comics = [];
            for (let i = 0; i < response[0].comics.length; i++) {
                console.log(response[0].comics[i]);
                let comic = response[0].comics;
                comics.push(comic);

                // toggleClass(event.target.id)
                createCard(cardBox, comics);
            }
        }
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



async function RenderFollowingArtist() {

    console.log("following");;
    let cards = document.querySelector("#cards")
    cards.innerHTML = ``;


    await RenderArtistCard(cards);

}


async function RenderArtistCard(parent) {

    let respons = await fetch("api/data/users.json");
    let resourse = await respons.json();
    console.log(resourse);

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
    localStorager.reset();
    //localStorage.removeItem("user");
    RenderLoginPage();
    location.reload();
}

async function RenderProfileArtist(user) {


    let popUp = document.querySelector("#popUp")
    popUp.addEventListener("click", () => {

        popUp.classList.add("hidden");
    })
    console.log(user.id);

    let request = new Request(`api/GetUser.php?user=${user.id}`)
    let response = await fetch(request);
    let resourse = await response.json();
    console.log(resourse);

    RenderProfile(resourse);
}


async function getUser(user) {
    let request = new Request(`api/GetUser.php?user=${user}`)
    let response = await fetch(request);
    let resourse = await response.json();

    return resourse;
}