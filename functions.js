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
    let profile = localStorage.getItem("#profilePic");
    // console.log(profile);
    document.querySelector("header").innerHTML = `
            <img src="../images/loggo.png"/>
            <div id="leftSide">
            <div id="community">COMMUNITY</div>
            <div class="stroke"></div>
            <div id="profile"> PROFILE</div>
            <div class="stroke"></div>
            <img id="notifications" src="../images/notifcationbell.png"> </>
            </div>
            `
        ;

    // document.querySelect or("nav").innerHTML = `
    //         <p id="userprofile"> Profile </p>
    //         <p id="home"> Home </p>
    //         <p id="community"> Comunity </p>
    //         `

    document.querySelector("footer").innerHTML = `
        <div> About Rita </div>
        <div class="stroke"></div>
        <div> Change language </div>
        <div class="stroke"></div>
        <div id="faq"> FAQ </div>
        <div class="stroke"></div>
        <div> Copyright </div>
        <div class="stroke"></div>
        <div> Contact us </div>`;



    document.querySelector("#profile").style.backgroundImage = profile;
    document.querySelector("#profile").addEventListener("click", (event) => {
        event.stopPropagation();
        RenderProfile();
    });

    // document.querySelector("#userprofile").addEventListener("click", (event) => {
    //     event.stopPropagation();
    //     RenderProfile();
    // });
    // document.querySelector("#home").addEventListener("click", (event) => {
    //     event.stopPropagation();
    //     RenderHomePage();
    // });
    // document.querySelector("#community").addEventListener("click", (event) => {
    //     event.stopPropagation();
    //     RenderCommunity();
    // });

    document.querySelector("#search").addEventListener("keyup", (e) => {
        e.stopPropagation();
        if (e.key == "Enter") {
            findComic(e.target.value);
        }
    });

    document.querySelector("#faq").addEventListener("click", (event) => {
        event.stopPropagation();
        RenderFaq();
    })
}


