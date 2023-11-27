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




function createCard(parent, resource) {
    resource.forEach(part => {

        parent.innerHTML += `
        <div id="cardBox">
            <h2> ${part.title}</h2>
            <div id="img"></div>
            <div id="userImg"></div>
            <div id="userName">${part.author}</div>
            <div id="likesBox">
                <div id="likeImg"</div>    
                <div>${part.likes}</div>
            </div>
        </div>
        `;


    });
}