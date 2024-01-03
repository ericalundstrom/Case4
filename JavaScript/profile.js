"use strict";

async function RenderProfile(data, value) {

    swapStyleSheet("css/profile.css");

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

        document.querySelector("body").style.backgroundImage = "url(images/background2.png)";
        // document.querySelector("body").style.background = "url(images/background2.png)";
        document.querySelector("body").style.backgroundSize = "cover";
        document.querySelector("body").style.backgroundRepeat = "no-repeat";

        console.log(data);
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
                                    <div id="followers">${data[0].personal.followers.length} followers </div>
                                </div>
                            </div>   
                        </div>
                         </div>              
                <div id="instagram"></div>
                </div>
                <div id="topRightProfile"> 
                    <div id="description">${data[0].personal.description}</div>
                    <div id="backgroundPlusButton">
                    <div id="backgroundFollowing">
                        <button id="followButton">Follow</button>
                    </div>
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
            </div>

            <div id="cards"></div
        `;

        if (data[0].personal.instagram !== "") {
            document.querySelector("#instagram").innerHTML = `
            <img src="/images/insta.png">
            <div>@${data[0].personal.instagram}</div>`;
        }


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
            let popUpWindow = document.querySelector("#popUpWindow");
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

            console.log("på rad 112");
            createCard(card, data);

            toggleClass(event.target.id)
        })

        if (data[0].comics.length !== 0) {

            let comics = data[0].comics[0].title;
            if (comics !== 0) {

                let user = data[0].personal.username;

                let comics = data[0].comics;

                comics.forEach(comic => {
                    let cardBox = document.querySelector("#cards");
                    console.log("på rad 128");
                    createCard(cardBox, comic, user);
                })

            } else {
                console.log("Användaren har inga comics");
            }
        }
    } else {

        swapStyleSheet("css/profile.css");

        BasicLayout();

        document.querySelector("body").style.backgroundImage = "url(/images/profileBackground.png)";

        let user = localStorage.getItem("user");
        let response = await getUser(user);

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
                                            <div id="name">${response[0].personal.followers.length} followers </div>
                                        </div>
                                </div>   
                            </div>
                        </div>              
                <div id="instagram"> 
                </div>        
                </div>
                    <div id="topRightProfile">   
                        <div id="description">${response[0].personal.description}</div>  
                        <div id="settingsAndEdit">  
                            <img id="settings" src="/images/settings.png">
                            <img id="editPng" src="/images/editicon.svg">
                        </div>
                </div>
            </div>

            <div id="middleProfile">
            <div id="BigStroke"></div>
                <div class="options">
                    <div id="myComics" class="selected" onclick="toggleClass('myComics')">COMICS</div>
                    <div id="artist" onclick="toggleClass('Saved')">FOLLOWING</div>
                </div>
                <div id="BigStroke"></div>
                <div id="bottomMiddleMenu">
                <div id="background">
                    <button id="addNewComic">ADD +</button>
                </div>
                </div>
            </div>

            <div id="cards">
            </div
        `;


        // document.querySelector("#follows > #icon").style.backgroundImage 
        if (response[0].personal.followers.length === 1) {
            // console.log("en följare");
            document.querySelector(" #follows > #name").textContent = ` ${response[0].personal.followers.length} people follow`;
        }

        document.querySelector("#settings").addEventListener("click", () => {
            RenderSettings();
        })

        document.querySelector("#addNewComic").addEventListener("click", () => {
            renderUploadComic();
            // renderLayoutPage()
        })

        document.querySelector("#follows > #name").addEventListener("click", async (event) => {
            event.stopPropagation();
            let popUp = document.querySelector("#popUp");

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
            cards.innerHTML = ``;

            document.querySelector("#bottomMiddleMenu").innerHTML = `
            <div id="menuSearchFilter">
                <img src="../images/SearchIcon.svg">
                <div class="strokeFilter"></div>
                <div id="filterProfile">
                    <p> Filter By </p>
                    <img src="../images/sortArrows.svg">
                </div>
            </div>`;


            let user = localStorage.getItem("user");
            console.log(user);
            // userParse = JSON.parse(user);
            let resourse = await getUser(user);
            console.log(resourse[0].personal.following);

            let following = resourse[0].personal.following;
            for (const user of following) {
                let data = await getUser(user);
                console.log(data);
                // console.log(data);
                RenderFollowingArtist(data, false);
            }
            toggleClass(event.target.id)
            // console.log(resourse[0].personal.following[1]);

        })
        document.querySelector("#myComics").addEventListener("click", (event) => {
            event.stopPropagation();

            document.querySelector("#bottomMiddleMenu").innerHTML = `
            <button id="addNewComic">Add +</button>`;

            document.querySelector("#addNewComic").addEventListener("click", () => {
                renderUploadComic();
            })


            let card = document.querySelector("#cards");
            card.innerHTML = ``;

            if (response[0].comics.length === 0) {
                console.log("finns inga comics");
            } else {

                let comics = [];
                for (let i = 0; i < response[0].comics.length; i++) {
                    let comic = response[0].comics[i];
                    comics.push([comic]); // Wrap each comic in an array
                }
                console.log("på rad 276");
                createCard(card, comics);
            }
        })

        // let responseUser = await fetch("api/data/comics.json");
        // let resourceUser = await responseUser.json();
        // let cardBox = document.querySelector("#cards");
        // createCard(cardBox, resourceUsers);


        // let responsUsers = await fetch("api/data/users.json");
        // let resourceUsers = await responsUsers.json();
        // let comics = [];
        // resourceUsers.forEach(user => {
        //     let comicOfUser = user[0].comics;
        //     if (comicOfUser.length > 0) {

        //         comics.push(comicOfUser);
        //     }
        // });
        let cardBox = document.querySelector("#cards");
        // createCard(cardBox, comics);


        if (response[0].comics.length === 0) {
            console.log("finns inga comics");
        } else {

            let comics = [];
            for (let i = 0; i < response[0].comics.length; i++) {
                let comic = response[0].comics[i];
                comics.push([comic]); // Wrap each comic in an array

                // toggleClass(event.target.id)
            }

            console.log("på rad 310");
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
            let backgroundShadow = document.createElement("div");
            backgroundShadow.classList.add("background");
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
            // parent.append(divDom);

            backgroundShadow.append(divDom);
            parent.append(backgroundShadow);

            divDom.addEventListener("click", () => {
                RenderProfile([user], true);
            })
        })
    }


}


async function RenderFollowers(popUp, resourceUsers) {

    document.querySelector("#popUp").style.zIndex = "3";
    popUp.classList.remove("hidden");
    popUp.innerHTML = `
    <div id="popUpBackground"></div>
        <div id="popUpBox">
        <div id="close"> X </div>
        <h2> FOLLOW <br> ERS </h2>
        <div id="searchAndSort">
            <input type="text" id="searchFollower" name="searchFollower" </input>
            <img id="search" src="../images/searchIcon.svg">
            <div id="stroke"> </div>
            <p> Sort By </p>
            <img src="../images/downArrow.png">
        </div>
        <div id="followers"> </div>
        <div id="background">
            <button> Show more </button>
        </div>
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
        let popUpMain = document.querySelector("#popUp");
        popUpMain.style.zIndex = "0";
        popUpMain.classList.add("hidden");
        popUp.innerHTML = `
        <div id="popUpBackground"></div>
        <div id="popUpWindow">
            <p id="prompt"></p>
        </div>
        `;
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
            let background = document.createElement("div");
            background.classList.add("background");
            divDom.classList.add("artistBox");
            divDom.innerHTML = `
                <img id="artistIcon" src="${part.personal.picture}">
                <h3> ${part.personal.username} </h3>
                <div id="backgroundButton">
                    <button> Remove </button>
                </div>
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
            divDom.addEventListener("click", () => {
                console.log(part.personal);
                RenderProfileArtist(part.personal);
            })

            // divDom.querySelector("button").addEventListener("click", (e) => {
            //     e.target.textContent = "Follow";
            //     console.log(part.personal.username);
            //     unfollow([part]);
            // })
            background.append(divDom);

            parent.append(background);
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
    console.log(user);

    let popUp = document.querySelector("#popUp")
    popUp.addEventListener("click", (e) => {
        e.stopPropagation();

        popUp.classList.add("hidden");
    })

    let request = new Request(`api/GetUser.php?user=${user.username}`)
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
    console.log(currentUser);
    let parseUser = JSON.parse(currentUser);
    console.log(parseUser);

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

    let popUp = document.querySelector("#popUp");
    let popUpWindow = document.querySelector("#popUpWindow");

    document.querySelector("#popUp").style.width = "50%";
    document.querySelector("#popUp").style.marginLeft = "25%";
    document.querySelector("#popUp").style.marginRight = "25%";
    document.querySelector("#popUp").style.zIndex = "3";
    popUp.classList.remove("hidden");
    popUpWindow.innerHTML = `
    <div id="popUpBackground"></div>
        <div id="popUpBox">
        <div id="close"> X </div>
        <div id="popUpWindow">
            <h1> HOLD ON!</h1>
            <h2>You are about to delete “${comic.title}” premanently form library. </h2>
            <img id="comicFrontPage" src="api/${comic.frontPage}">
            <h3> Are you sure? </h3>
            <div id="DeleteOrKeep">
            <div class="backgroundButton">
                <button id="yes"> DELETE</button>
            </div>
            <div class="backgroundButton">
                <button id="no"> KEEP</button>
            </div>
            </div>
        </div>
    </div>
    `;

    popUpWindow.querySelector("#close").addEventListener("click", () => {
        popUp.classList.add("hidden");
        document.querySelector("#popUp").style.width = "60%";
        document.querySelector("#popUp").style.marginLeft = "20%";
        document.querySelector("#popUp").style.marginRight = "20%";
        document.querySelector("#popUp").style.zIndex = "0";
        // popUp.querySelector("#popUpBox").removeAttribute("id", "deleteReq");
    })
    popUpWindow.querySelector("#no").addEventListener("click", () => {
        popUp.classList.add("hidden");
        document.querySelector("#popUp").style.width = "60%";
        document.querySelector("#popUp").style.marginLeft = "20%";
        document.querySelector("#popUp").style.marginRight = "20%";
        document.querySelector("#popUp").style.zIndex = "0";
        // popUp.querySelector("#popUpBox").removeAttribute("id", "deleteReq");
    })

    popUpWindow.querySelector("#popUpBox").setAttribute("id", "deleteReq");
    popUpWindow.querySelector("#yes").addEventListener("click", async () => {

        console.log(comic);
        let currentUser = localStorage.getItem("user");
        let parseUser = JSON.parse(currentUser);

        let body = {
            "title": comic.title,
            "author": comic.author,
            "user": parseUser
        };

        let response = await fetching("api/deleteComic.php", "DELETE", body);
        let resourse = await response.json();
        console.log(resourse);
        console.log(body);

        if (resourse) {
            document.querySelector("#popUp").style.height = "auto";


            popUpWindow.innerHTML = `
                <div id="DeleteCross"> X </div>
                        <h3> Your comic ${comic.title} is now deleted</h3>
                </div>
            `;
            popUpWindow.querySelector("#DeleteCross").addEventListener("click", () => {
                popUp.classList.add("hidden");
                document.querySelector("#popUp").style.height = "600px";
                document.querySelector("#popUp").style.width = "60%";
                document.querySelector("#popUp").style.marginLeft = "20%";
                document.querySelector("#popUp").style.marginRight = "20%";
                document.querySelector("#popUp").style.top = "40%";
                // popUp.querySelector("#popUpBox").removeAttribute("id", "deleteReq");
                // popUp.querySelector("#popUpBox").removeAttribute("id", "info");
                // popUp.classList.remove("deleteReq");
            })
        }
    })

}