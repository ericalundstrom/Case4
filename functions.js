"use strict";
async function fetching(URL, method, body) {
    // console.log(method);
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
    // console.log("hej");
    let profile = localStorage.getItem("#profilePic");
    // console.log(profile);
    document.querySelector("header").innerHTML = `
            <p> Rita </p>
            <input type="text" id="search" name="search" placeholder="search for comics, authors etc.."/>
            <img id="profile" src="${profile}">
            `
        ;

    document.querySelector("nav").innerHTML = `
            <p id="userprofile"> Profile </p>
            <p id="home"> Home </p>
            <p id="community"> Comunity </p>
            `

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



    document.querySelector("#profile").style.backgroundImage = profile;
    document.querySelector("#profile").addEventListener("click", (event) => {
        event.stopPropagation();
        RenderProfile();
    });

    document.querySelector("#userprofile").addEventListener("click", (event) => {
        event.stopPropagation();
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

    document.querySelector("#search").addEventListener("keyup", (e) => {
        e.stopPropagation();
        if (e.key == "Enter") {
            findComic(e.target.value);
        }
    });
}


