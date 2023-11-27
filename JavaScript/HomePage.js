"use strict";
async function RenderHomePage() {


    swapStyleSheet("css/landingPage.css");
    let wrapper = document.querySelector("#wrapper");

    BasicLayout();


    document.querySelector("#wrapper").innerHTML = `
    <div id="navi">
        <div id="theme"> Theme </div>
        <div id="material"> Material </div>
        <div id="style"> Style </div>
    </div>
    <div id="cards"></div>
    `;

    let response = await fetch("api/data/comics.json");
    let resource = await response.json();

    console.log(resource);
    // document.querySelector("#wrapper").textContent = "Hej"
    let boxCards = document.querySelector("#cards");
    // boxCards.append(card);


    createCard(boxCards, resource);
}


function RenderTrending(params) {
    console.log("trending");
}