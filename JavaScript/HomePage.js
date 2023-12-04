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


  let responseComics = await fetch("api/data/users.json");
  let resource = await responseComics.json();

  let boxCards = document.querySelector("#cards");
  let comics = [];
  resource.forEach(user => {
    let comicOfUser = user[0].comics;
    console.log(comicOfUser.length);
    if (comicOfUser.length > 0) {

      comics.push(comicOfUser);
    }
    // console.log(comics);
  });
  // console.log(comics);
  createCard(boxCards, comics);
}

function RenderTrending(params) {
  console.log("trending");
}

