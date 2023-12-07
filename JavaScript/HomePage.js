"use strict";

async function RenderHomePage() {
  swapStyleSheet("css/landingPage.css");

  BasicLayout();

  let user = localStorage.getItem("user");
  let response = await getUser(user);

  console.log(response[0].personal.picture);
  let userPic = response[0].personal.picture;

  if (userPic === "") {

    document.querySelector("#profile").style.backgroundImage = "url(images/userpic.webp)";
  } else {
    document.querySelector("#profile").style.backgroundImage = `url(api/${userPic})`;
  }

  let profilePic = localStorage.getItem("profilePic");
  document.querySelector("#profile").style.backgroundImage = `url(api/${profilePic})`;

  document.querySelector("#wrapper").innerHTML = `
    <div id="navi"> </div>
    <div id="cards"></div>
  `;

  const container = document.querySelector("#navi");

  createFilterDropdowns(container, true);

  let searchField = document.querySelector("input");
  searchField.addEventListener("keyup", e => {

    // let popUp = document.querySelector("#popUp");
    e.stopPropagation();
    if (e.key == "Enter") {

      console.log(e.target.value);
      // RenderFollowers(popUp, resourceUsers);
      // findUser(e.target.value);
    }
  });



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

