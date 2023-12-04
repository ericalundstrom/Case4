"use strict";
async function fetching(URL, method, body) {
    console.log(method);
    let response = await fetch(URL, {
        method: method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
    });

    return response;
}


function swapStyleSheet(styleSheet) {
    document.getElementById("styles").setAttribute("href", styleSheet);
}


function BasicLayout() {
    document.querySelector("header").innerHTML = `
                <p> Rita </p>
            <input type="text" id="search" name="search" placeholder="search for comics, authors etc.."/>
            <div id="profile"></div>`

    document.querySelector("nav").innerHTML = `
            <p id="userprofile"> Profile </p>
            <p id="home"> Home </p>
            <p id="community"> Comunity </p>
            <p id="trending"> Trending </p>`

    document.querySelector("footer").innerHTML = `
        <div> About Rita </div>
        <div class="stroke"></div>
        <div> Change language </div>
        <div class="stroke"></div>
        <div> FAQ </div>
        <div class="stroke"></div>
        <div> Copyright </div>
        <div class="stroke"></div>
        <div> Contact us </div>`;

    document.querySelector("#profile").addEventListener("click", (event) => {
        event.stopPropagation();
        RenderProfile();
    });

    document.querySelector("#userprofile").addEventListener("click", (event) => {
        event.stopPropagation();
        console.log("profile");
        RenderProfile();
    });
    document.querySelector("#home").addEventListener("click", (event) => {
        event.stopPropagation();
        RenderHomePage();
    });
    document.querySelector("#community").addEventListener("click", (event) => {
        event.stopPropagation();
        RenderCommunity();
    });
    document.querySelector("#trending").addEventListener("click", (event) => {
        event.stopPropagation();
        RenderTrending();
    });
}



function createCard(parent, resource, user) {

    // console.log(resource[0]);
    // console.log(user);
    if (user) {
        //console.log("hej");
        const cardBox = document.createElement("div");
        cardBox.classList.add("cardBox");

        cardBox.innerHTML = `
                <h2>${resource.title}</h2>
                <div class="imgDiv"></div>
                <div class="userImg"></div>
                <div class="userName">${user}</div>
                <div class="likesBox">
                    <div class="likeImg"></div>    
                    <div>likes</div>
                </div>
            `;

        if (resource.frontPage !== "") {
            //console.log("finns bild");
            cardBox.querySelector(".imgDiv").style.backgroundImage = `url("api/${resource.frontPage}")`;
        } else {
            cardBox.querySelector(".imgDiv").style.backgroundImage = `url("/images/unnamed.png")`;
            console.log("fungerar ej");
        }

        parent.appendChild(cardBox);
    } else {

        if (resource[0].lenght == 1) {
            console.log("inne här");
        }

        console.log(resource[0]);
        resource.forEach(part => {
            //console.log("hej");
            console.log(part);
            const cardBox = document.createElement("div");
            cardBox.classList.add("cardBox");

            cardBox.innerHTML = `
                <h2>${part[0].title}</h2>
                <div class="imgDiv"></div>
                <div class="userImg"></div>
                <div class="userName">${part[0].author}</div>
                <div class="likesBox">
                    <div class="likeImg"></div>    
                    <div>${part[0].likes}</div>
                </div>
            `;

            if (part.cover !== "") {
                //console.log("finns bild");
                cardBox.querySelector(".imgDiv").style.backgroundImage = `url("api/${part[0].frontPage}")`;
            } else {
                cardBox.querySelector(".imgDiv").style.backgroundImage = `url("/images/unnamed.png")`;
                console.log("fungerar ej");
            }

            console.log(cardBox);
            parent.appendChild(cardBox);
        });
    }

}
