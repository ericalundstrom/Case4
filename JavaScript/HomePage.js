"use strict";

async function RenderHomePage() {
  swapStyleSheet("css/landingPage.css");

  document.querySelector("body").style.backgroundImage = `url(images/mainBackground.png)`;
  document.querySelector("body").style.backgroundSize = "cover";
  document.querySelector("body").style.backgroundRepeat = "no-repeat";

  BasicLayout();

  let user = localStorage.getItem("user");
  let response = await getUser(user);

  // console.log(response[0].personal.picture);
  let userPic = response[0].personal.picture;

 document.querySelector("#wrapper").innerHTML = `

    <div id="welcome">
      <div id="text">
        <h1>Welcome to Rita! </h1>
        <h2> Explore and upload comics </h2>
      </div>
      <img src="/images/welcomeLogo.png">
    </div>

    <div id="filters"> </div>
    <div id="cards"></div>
  `;

  let parentCards = document.querySelector("#cards");
  const container = document.querySelector("#filters");

  createFilterDropdowns(container, true);


  let responseComics = await fetch("api/data/users.json");
  let resource = await responseComics.json();

  let boxCards = document.querySelector("#cards");
  let comics = [];
  resource.forEach(user => {
    let comicOfUser = user[0].comics;
    // console.log(comicOfUser.length);
    if (comicOfUser.length > 0) {

      comics.push(comicOfUser);
    }
    // console.log(comics);
  });
  // console.log(comics);

  createCard(boxCards, comics);


  let searchField = document.querySelector("input");
  searchField.addEventListener("keyup", async (e) => {

    // let popUp = document.querySelector("#popUp");
    e.stopPropagation();
    if (e.key == "Enter") {

      if (e.target.value === "") {
        parentCards.innerHTML = ``;
        createCard(boxCards, comics);
      } else {


        // // console.log(e.target.value);
        let comics = await findComic(e.target.value);

        if (comics) {

          parentCards.innerHTML = ``;
          createCard(parentCards, [comics])
        }
        // console.log(comics);
        // RenderFollowers(popUp, resourceUsers);
        // findUser(e.target.value);
      }
    }
  });
}

