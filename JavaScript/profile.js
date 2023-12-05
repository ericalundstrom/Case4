
async function RenderProfile(data) {

    let user = localStorage.getItem("user");
    let response = await getUser(user);

    let userPic = response[0].personal.picture;

    if (userPic === "") {


        document.querySelector("#profile").style.backgroundImage = "url(images/userpic.webp)";
    } else {
        document.querySelector("#profile").style.backgroundImage = `url(${userPic})`;
    };


    if (data) {
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
                <div id="profileIcon">
                    <img src="${data[0].personal.picture}">
                </div>
                <div id="edit"></div>
                <div id="username">${data[0].personal.username}</div>
                <div id="date">Member since: ${data[0].personal.added}</div>
                <div id="settings">settings</div>
                <div id="description">${data[0].personal.description} </div>
                <div id="insta">
                    <div id="icon"></div>
                    <div id="name">@Torkel</div>
                </div>
                <div id="follows">
                    <div id="name"></div>
                    <div id="icon"></div>
                </div>
            </div>
        
            <div id="options">
                <div id="myComics" onclick="toggleClass('myComics')">${data[0].personal.username} comics</div>
            </div>
        
            <button id="followers">Followers</button>
            <div id="BigStroke"></div>
        
            <div id="cards"></div
        `;

        document.querySelector("#followers").addEventListener("click", (event) => {
            event.stopPropagation();
            let popUp = document.querySelector("#popUp");
            RenderFollowers(popUp, resourceUsers);
        })


        document.querySelector("#myComics").addEventListener("click", (event) => {
            event.stopPropagation();
            let card = document.querySelector("#cards");
            card.innerHTML = ``;

            createCard(card, data);

            toggleClass(event.target.id)
        })

        document.querySelector("#follows > #name").addEventListener("click", (event) => {
            event.stopPropagation();
            let popUp = document.querySelector("#popUp");
            RenderFollowers(popUp, resourceUsers);
        })


        if (data[0].comics.length !== 0) {

            let comics = data[0].comics[0].title;
            if (comics !== 0) {

                // let responseUser = await fetch("api/data/users.json");
                // let resourceUser = await responseUser.json();

                let user = data[0].personal.username;

                let comics = data[0].comics;

                comics.forEach(comic => {
                    let cardBox = document.querySelector("#cards");
                    createCard(cardBox, comic, user);
                })

            } else {
                console.log("Användaren har inga comics");
            }
        }
    } else {

        swapStyleSheet("css/profile.css");

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
            <div id="profileIcon">
                    <img src="${response[0].personal.picture}">
                </div>
            <div id="edit"></div>
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
            RenderSettings();
            // let popUp = document.querySelector("#popUp")
            // popUp.classList.remove("hidden");
            // popUp.innerHTML = `
            // <div> Do you want to log out? </div>
            // <button> Log out</button>
            // <div id="close"> x </div>
            // `;

            // popUp.querySelector("button").addEventListener("click", (event) => {
            //     event.stopPropagation();
            //     logout();
            // })

            // popUp.querySelector("#close").addEventListener("click", () => {
            //     popUp.classList.add("hidden");
            // })
        })

        document.querySelector("#follows > #name").addEventListener("click", (event) => {
            event.stopPropagation();
            let popUp = document.querySelector("#popUp");
            // let respons = await fetch("api/data/users.json");
            // let resource = await respons.json();
            RenderFollowers(popUp, resourceUsers);
        })

        document.querySelector("#artist").addEventListener("click", (event) => {
            event.stopPropagation();

            RenderFollowingArtist();
            toggleClass(event.target.id)
        })

        document.querySelector("#myComics").addEventListener("click", (event) => {
            event.stopPropagation();
            let card = document.querySelector("#cards");
            card.innerHTML = ``;

            if (response[0].comics.length === 0) {
                console.log("finns inga comics");
            } else {

                let comics = [];
                for (let i = 0; i < response[0].comics.length; i++) {
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
        let comics = [];
        resourceUsers.forEach(user => {
            let comicOfUser = user[0].comics;
            if (comicOfUser.length > 0) {

                comics.push(comicOfUser);
            }
        });
        let cardBox = document.querySelector("#cards");


        if (response[0].comics.length === 0) {
            console.log("finns inga comics");
        } else {

            let comics = [];
            for (let i = 0; i < response[0].comics.length; i++) {
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

    let cards = document.querySelector("#cards")
    cards.innerHTML = ``;


    await RenderArtistCard(cards);

}


async function RenderArtistCard(parent) {

    let respons = await fetch("api/data/users.json");
    let resourse = await respons.json();

    resourse.forEach(user => {
        let divDom = document.createElement("div");
        divDom.classList.add("artistBox");
        divDom.innerHTML = `
                <img id="artistIcon" src="${user[0].personal.picture}">
                <h3> ${user[0].personal.username} </h3>
                <div id="uploadedComicsBox">
                    <div class="number"> ${user[0].comics.length} </div>
                    <div id="text"> Uploaded comics </div>
                </div>
                <div id="folowerBox">
                    <div class="number"> </div>
                    <div id="text"> Followers </div>
                </div>
        `;
        parent.append(divDom);

        divDom.addEventListener("click", () => {
            RenderProfile(user);
        })
    })


}



async function RenderFollowers(popUp, resourceUsers) {

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

    let searchField = popUp.querySelector("input");
    searchField.addEventListener("keyup", e => {

        if (e.key == "Enter") {
            findUser(e.target.value);
        }
    });

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

    for (let i = 0; i < resourceUsers.length; i++) {
        let user = resourceUsers[i];

        // Check if user is an array, if not, convert it to an array
        if (!Array.isArray(user)) {
            user = [user];
        }

        user.forEach(part => {
            console.log(part);
            let divDom = document.createElement("div");
            divDom.classList.add("artistBox");
            divDom.innerHTML = `
                    <img id="artistIcon" src="${part.personal.picture}">
                    <h3> ${part.personal.username} </h3>
                    <button id="Remove">Remove</button>
            `;

            // divDom.querySelector("#artistIcon").style.backgroundImage = `url('${part.personal.picture}')`;
            // divDom.querySelector("#artistIcon").style.backgroundSize = "cover";
            // divDom.querySelector("#artistIcon").style.backgroundRepeat = "no-repeat";
            divDom.setAttribute("id", part.personal.username);
            divDom.querySelector("h3").setAttribute("id", part.personal.username);
            divDom.addEventListener("click", (event) => {
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

    let request = new Request(`api/GetUser.php?user=${user.id}`)
    let response = await fetch(request);
    let resourse = await response.json();

    RenderProfile(resourse);
}


async function getUser(user) {
    let request = new Request(`api/GetUser.php?user=${user}`)
    let response = await fetch(request);
    let resourse = await response.json();

    return resourse;
}



async function findUser(value) {

    let parent = document.querySelector("#followers")
    parent.innerHTML = ``;

    let request = new Request(`api/GetUser.php?userSearch=${value}`)
    let searchUser = await fetch(request);
    let searchUserRespons = await searchUser.json();

    if (searchUserRespons) {
        RenderFollowersCard(parent, searchUserRespons)
    }

}


function RenderSettings(params) {
    let popUp = document.querySelector("#popUp")
    popUp.classList.remove("hidden");
    popUp.innerHTML = `
        <div> settings</div>
        <div class="stroke"></div>
        <form>
            <div id="notifications">
                <h3>Notifications</h3>
                <div></div>
                <div></div>
                <div></div>
            
            </div>
            <div id="general"> 
                <h3>General</h3>
                <label for="email">Email:</label>
                <input type="text" id="email" name="email" />

                <label for="username">Username:</label>
                <input type="text" id="username" name="username" />

            </div>
            <div id="password">
                <h3>Password</h3>
                <label for="currentPassword">Current password:</label>
                <input type="password" id="currentPassword" name="currentPassword" />
                
                <label for="newPassword">New password:</label>
                <input type="password" id="newPassword" name="newPassword" />
                
                <label for="repeatPassword">Repeat password:</label>
                <input type="password" id="repeatPassword" name="repeatPassword" />
            </div>
                <button> Log out</button>
                <div id="close"> x </div>
        </form>
        `;

    popUp.querySelector("button").addEventListener("click", (event) => {
        event.stopPropagation();
        logout();
    })

    popUp.querySelector("#close").addEventListener("click", () => {
        popUp.classList.add("hidden");
    })
};
