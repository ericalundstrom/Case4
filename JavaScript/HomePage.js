"use strict";

async function RenderHomePage() {
    swapStyleSheet("css/landingPage.css");

    BasicLayout();

    document.querySelector("#wrapper").innerHTML = `
    <div id="navi"> </div>
    <div id="cards"></div>
  `;

    const container = document.querySelector("#navi");

    createFilterDropdowns(container, true);


    let responseComics = await fetch("api/data/comics.json");
    let resource = await responseComics.json();

    let boxCards = document.querySelector("#cards");
    createCard(boxCards, resource);
}

function RenderTrending(params) {
    console.log("trending");
}

