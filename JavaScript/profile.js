"use strict";

async function RenderProfile(data, value) {

    let user = localStorage.getItem("user");
    let response = await getUser(user);

    let followers = response[0].personal.following;

    let userPic = response[0].personal.picture;

    if (userPic === "") {
        document.querySelector("#profile").style.backgroundImage = "url(images/userpic.webp)";
    } else {
        document.querySelector("#profile").style.backgroundImage = `url(${userPic})`;
    };


    if (data) {

        console.log(data[0].personal.description);
        document.querySelector("#wrapper").innerHTML = `
        <div id="topProfile">
                <div id="userContainer">
                <img>
                    <div id="userContainerTop"> 
                        <div id="profileHeader">
                        <div id="profileIcon">
                        <img src="${data[0].personal.picture}">
                        </div>
                        <div id="edit"></div>
                            <div id="profileHeaderContent"> 
                                <div id="username">${data[0].personal.username}</div>
                                <div id="follows">
                                    <img id="followIcon" src="/images/follow.png">
                                    <div id="followers">${data[0].personal.followers.length} Followers </div>
                                </div>
                            </div>   
                        </div>
                         </div>              
                    <div id="description">${data[0].personal.description}</div>
                   
                </div>
                <div id="topRightProfile"> 
                    <button id="followButton">Follow artist+</button>
                    <h3> Most used tags </h3>
                    <div id="usedTags">
                        <div class="tags"> Graphic novel </div>
                        <div class="tags"> Love </div>
                        <div class="tags"> Collage </div>
                        <div class="tags"> Color pencils </div>
                        <div class="tags"> Friends </div>
                    </div>
                </div>         
                </div>
            </div>

            <div id="middleProfile">
            <div id="BigStroke"></div>
                <div class="options">
                    <div id="myComics" class="selected" onclick="toggleClass('myComics')">${data[0].personal.username}'s comics</div>
                </div>
                <div id="BigStroke"></div>
                <button> Grid </button>
            </div>

            <div id="cards"></div
        `;

        if (followers.includes(data[0].personal.username)) {
            // console.log("följer");
            document.querySelector("#followButton").textContent = "following";
            document.querySelector("#followButton").addEventListener("click", () => {
                document.querySelector("#followButton").textContent = "follow";
                unfollow(data);
            })
        } else {

            document.querySelector("#followButton").addEventListener("click", () => {
                document.querySelector("#followButton").textContent = "following";
                followUser(data);
            })
        }

        document.querySelector("#followers").addEventListener("click", async (event) => {
            event.stopPropagation();
            let popUp = document.querySelector("#popUp");
            let followers = data[0].personal.followers;
            let arrayOfFollowers = [];
            for (const user of followers) {
                let userInfo = await getUser(user);
                arrayOfFollowers.push(userInfo);
            }
            RenderFollowers(popUp, arrayOfFollowers);
        })



        document.querySelector("#myComics").addEventListener("click", (event) => {
            event.stopPropagation();
            let card = document.querySelector("#cards");
            card.innerHTML = ``;

            createCard(card, data);

            toggleClass(event.target.id)
        })

        // let deletebutton = document.querySelector
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

        // console.log(response[0].personal.description);

        document.querySelector("#wrapper").innerHTML = `
            <div id="topProfile">
                <div id="userContainer">
                <img>
                    <div id="userContainerTop"> 
                        <div id="profileHeader">
                        <div id="profileIcon">
                        <img src="${response[0].personal.picture}">
                        </div>
                        <div id="edit"></div>
                            <div id="profileHeaderContent"> 
                                <div id="username">${response[0].personal.username}</div>
                                <div id="follows">
                                    <img id="followIcon" src="/images/follow.png">
                                    <div id="name">${response[0].personal.followers.length} Followers </div>
                                </div>
                            </div>   
                        </div>
                        <img id="settings" src="/images/settings.png">
                        <img id="editPng" src="/images/edit.png">
                         </div>              
                    <div id="description">${response[0].personal.description}</div>
                   
                </div>
                <div id="topRightProfile"> 
                    <button id="addNewComic">Add new comic +</button>
                    <div id="notifications">
                    <img id="noti" src="/images/notis.png">
                    <div class="notification">
                    <p>Elin liked your comment</p> 
                    </div>
                    <div class="notiStroke"></div>
                    <div class="notification">
                    <p>Elin liked your comment</p> 
                     </div>
                    <div class="notiStroke"></div>
                    <div class="notification">
                    <p>Elin liked your comment</p> 
                     </div>
                    </div>         
                </div>
            </div>

            <div id="middleProfile">
            <div id="BigStroke"></div>
                <div class="options">
                    <div id="myComics" class="selected" onclick="toggleClass('myComics')">My comics</div>
                    <div id="artist" onclick="toggleClass('Saved')">Artists you follow</div>
                </div>
                <div id="BigStroke"></div>
                <button> Grid </button>
            </div>

            <div id="cards">
                <img id="arrowLeft" class="arrow" src="/images/arrowLeft.png">
                <img id="arrowRight" class="arrow"  src="/images/arrowRight.png">
            </div
        `;

        // document.querySelector("#follows > #icon").style.backgroundImage 
        if (response[0].personal.followers.length === 1) {
            // console.log("en följare");
            document.querySelector(" #follows > #name").textContent = ` ${response[0].personal.followers.length} Follower`;
        }
        document.querySelector("#addNewComic").addEventListener("click", () => {
            renderUploadComic();
            //renderLayoutPage()
        })

        document.querySelector("#settings").addEventListener("click", () => {
            RenderSettings();
        })

        document.querySelector("#follows > #name").addEventListener("click", async (event) => {
            event.stopPropagation();
            let popUp = document.querySelector("#popUp");
            // let respons = await fetch("api/data/users.json");
            // let resource = await respons.json();
            // response[0].personal.followers;
            let followers = response[0].personal.followers;
            let arrayOfFollowers = [];
            for (const user of followers) {
                let userInfo = await getUser(user);
                arrayOfFollowers.push(userInfo);
            }
            RenderFollowers(popUp, arrayOfFollowers);
        })

        document.querySelector("#artist").addEventListener("click", async (event) => {
            event.stopPropagation();
            let cards = document.querySelector("#cards")
            cards.innerHTML = `
                <img id="arrowLeft" class="arrow" src="/images/arrowLeft.png">
                <img id="arrowRight" class="arrow"  src="/images/arrowRight.png">
            `;

            document.querySelector("#arrowLeft").style.bottom = "170px";
            document.querySelector("#arrowRight").style.bottom = "170px";

            let user = localStorage.getItem("user");
            console.log(user);
            // userParse = JSON.parse(user);
            let resourse = await getUser(user);

            let following = resourse[0].personal.following;
            for (const user of following) {
                let data = await getUser(user);
                // console.log(data);
                RenderFollowingArtist(data, false);
            }
            toggleClass(event.target.id)
            // console.log(resourse[0].personal.following[1]);
        })

        document.querySelector("#myComics").addEventListener("click", (event) => {
            event.stopPropagation();
            let card = document.querySelector("#cards");
            card.innerHTML = `
                <img id="arrowLeft" class="arrow" src="/images/arrowLeft.png">
                <img id="arrowRight" class="arrow"  src="/images/arrowRight.png">
            `;

            if (response[0].comics.length === 0) {
                console.log("finns inga comics");
            } else {

                let comics = [];
                for (let i = 0; i < response[0].comics.length; i++) {
                    let comic = response[0].comics[i];
                    comics.push([comic]); // Wrap each comic in an array
                }

                createCard(cardBox, comics);
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
                let comic = response[0].comics[i];
                comics.push([comic]); // Wrap each comic in an array

                // toggleClass(event.target.id)
            }

            createCard(cardBox, comics);

        }
    }
}

function toggleClass(selectedId) {
    var options = document.querySelector('.options').children;



    for (var i = 0; i < options.length; i++) {
        var option = options[i];

        if (option.id === selectedId) {
            option.classList.add('selected');
        } else {
            option.classList.remove('selected');
        }
    }
}


async function RenderFollowingArtist(data, value) {
    // console.log(value);

    let cards = document.querySelector("#cards")
    // cards.innerHTML = ``;


    await RenderArtistCard(cards, data, value);

}


async function RenderArtistCard(parent, data, value) {

    if (value) {

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
                RenderProfile(user, false);
            })
        })
    } else {
        data.forEach(user => {
            let divDom = document.createElement("div");
            divDom.classList.add("artistBox");
            divDom.innerHTML = `
            <img id="artistIcon" src="${user.personal.picture}">
            <h3> ${user.personal.username} </h3>
            <div id="uploadedComicsBox">
                <div class="number"> ${user.comics.length} </div>
                <div id="text"> Uploaded comics </div>
            </div>
            <div id="folowingBox">
                <div class="number"> ${user.personal.following.length}</div>
                <div id="text"> Following </div>
            </div>
            <div id="folowerBox">
                <div class="number"> ${user.personal.followers.length}</div>
                <div id="text"> Followers </div>
            </div>
                    `;
            parent.append(divDom);

            divDom.addEventListener("click", () => {
                RenderProfile([user], true);
            })
        })
    }


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

        e.stopPropagation();
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
    RenderFollowersCard(parent, resourceUsers, true)

}

function RenderFollowersCard(parent, resourceUsers, value) {
    // console.log(resourceUsers);

    for (let i = 0; i < resourceUsers.length; i++) {
        let user = resourceUsers[i];

        // Check if user is an array, if not, convert it to an array
        if (!Array.isArray(user)) {
            user = [user];
        }

        user.forEach(part => {
            // console.log(part);
            let divDom = document.createElement("div");
            divDom.classList.add("artistBox");
            divDom.innerHTML = `
                <img id="artistIcon" src="${part.personal.picture}">
                <h3> ${part.personal.username} </h3>
                `;

            // divDom.querySelector("#artistIcon").style.backgroundImage = `url('${part.personal.picture}')`;
            // divDom.querySelector("#artistIcon").style.backgroundSize = "cover";
            // divDom.querySelector("#artistIcon").style.backgroundRepeat = "no-repeat";
            // if (value === false) {
            //     let button = document.createElement("button");
            //     divDom.append(button);
            //     divDom.querySelector("button").remove();
            // }
            divDom.setAttribute("id", part.personal.username);
            divDom.querySelector("h3").setAttribute("id", part.personal.username);
            divDom.addEventListener("click", (event) => {
                RenderProfileArtist(event.target);
            })

            // divDom.querySelector("button").addEventListener("click", (e) => {
            //     e.target.textContent = "Follow";
            //     console.log(part.personal.username);
            //     unfollow([part]);
            // })
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
    popUp.addEventListener("click", (e) => {
        e.stopPropagation();

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
        RenderFollowersCard(parent, searchUserRespons, false)
    }

}



async function followUser(user) {
    // console.log(user[0].personal.username);
    let usersUsername = user[0].personal.username;
    let currentUser = localStorage.getItem("user");
    parseUser = JSON.parse(currentUser);
    // console.log(currentUser);

    let body = {
        "user": usersUsername,
        "currentUser": parseUser
    };

    let response = await fetching("api/following.php", "POST", body);
    let resourse = await response.json();

    console.log(resourse);
}


async function unfollow(user) {
    // console.log(user);

    // console.log(user[0].personal.username);
    let usersUsername = user[0].personal.username;
    let currentUser = localStorage.getItem("user");
    let parseUser = JSON.parse(currentUser);
    // console.log(currentUser);

    let body = {
        "user": usersUsername,
        "currentUser": parseUser
    };

    let response = await fetching("api/following.php", "DELETE", body);
    let resourse = await response.json();
    console.log(resourse);
}

async function deleteComic(comic) {
    console.log(comic);
    let currentUser = localStorage.getItem("user");
    let parseUser = JSON.parse(currentUser);

    let body = {
        "title": comic.title,
        "author": comic.author,
        "user": parseUser
    };

    let response = await fetching("api/unfollowComic.php", "DELETE", body);
    let resourse = await response.json();
    console.log(resourse);
    console.log(body);
}