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
    document.querySelector("header").innerHTML = `
            <div id="home">
                <h1>R</h1>
            </div>  
            <div id="leftSideHeader">
            <div id="community">COMMUNITY</div>
            <div class="stroke"></div>
            <div id="profile"> PROFILE</div>
            <div class="stroke"></div>
            <img id="notifications" src="../images/alertBell.svg"> </>
            </div>
            `



    document.querySelector("footer").innerHTML = `
    <div id="contentFooter">
        <div class="stroke"></div>
        <div class="boxFooterOne">
          <div id="contact"> CONTACT</div>
            <div id="about"> ABOUT RITA </div>
        </div>
        <div class="stroke"></div>
        <div class="boxFooter">
            <div id="faq"> FAQ </div>
            <div id="copy"> COPYRIGHT </div>
        </div>
        <div class="stroke"></div>
        <div class="boxFooterLast"> CHANGE LANGUAGE </div>
    </div>
       
        `;

    document.querySelector("#profile").addEventListener("click", (event) => {
        event.stopPropagation();
        RenderProfile();
    });

    document.querySelector("#notifications").addEventListener("click", () => {
        let notificationsContainer = document.createElement("div");
        notificationsContainer.innerHTML = `  
        <div class="notificationContainer"> 
        <div class="topNotification">
            <img src="../images/cross.png"></img> 
        </div>        
            <div class="notification">
                <p>Elin liked your comment</p> 
                <p> 12:03 </p>
            </div>
            <div class="notiStroke"></div>
            <div class="notification">
                <p>Elin liked your comment</p>
                <p> 12:21 </p> 
             </div>
                <div class="notiStroke"></div>
            <div class="notification">
                <p>Elin liked your comment</p> 
                <p> 13:01 </p>
             </div>
        </div>
    </div>`;

        document.querySelector("body").append(notificationsContainer);

        document.querySelector(".topNotification> img").addEventListener("click", () => {
            document.querySelector(".notificationContainer").classList.toggle("hidden");
        })

    })

    document.querySelector("#profile").addEventListener("click", (event) => {
        event.stopPropagation();
        // console.log("profile");
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

    document.querySelector("#faq").addEventListener("click", (event) => {
        event.stopPropagation();
        RenderFaq();
    })
    document.querySelector("#about").addEventListener("click", (event) => {
        event.preventDefault();
        RenderAboutUs();
    })
    document.querySelector("#contact").addEventListener("click", (event) => {
        event.stopPropagation();
        RenderContactUs();
    })
    document.querySelector("#copy").addEventListener("click", (event) => {
        event.stopPropagation();
        RenderCopyRight();
    })
}


async function createCard(parent, resource, user) {
    // let cardCounter = 0;

    if (resource.length === 0) {
        let response = await fetch("api/data/users.json");
        let resource = await response.json();
        let allComics = resource.flatMap(user => user[0].comics);
        let boxCards = document.querySelector("#cards");
        boxCards.innerHTML = ``;
        createCard(boxCards, allComics)
    }


    // console.log(resource.length);
    function createSingleCard(data) {
        // cardCounter++;
        console.log("näst högst upp");
        const cardBox = document.createElement("div");
        cardBox.classList.add("cardBox");

        cardBox.innerHTML = `
            <div class="imgDiv"></div>
        `;

        // cardBox.classList.add(`card-${cardCounter}`);

        // if ((cardCounter + 1) % 5 === 0 || (cardCounter + 1) % 5 === 1) {
        //     cardBox.classList.add('bigger-card');

        //     console.log('Intermediate Value:', (cardCounter + 1) % 5);
        //     if (cardCounter === 5) {
        //         console.log('Card Counter is 5:', cardCounter);
        //     }

        //     if (cardCounter === 6) {
        //         console.log('Card Counter is 6:', cardCounter);
        //     }
        // }

        cardBox.setAttribute("id", data.title);

        cardBox.addEventListener("mouseenter", () => {
            cardBox.classList.add("hoverEffect");
            let divDom = document.createElement("div");
            let tags = (data.filters);

            divDom.innerHTML = `
            <img id="delete" src="/images/delete.png">
            <div id="divDomTop">
                <div id="title">${data.title} </div>
                <div id="published"> Published: ${data.time} </div>
            </div>
            <div id="userinfo">
                <img>
                <div id="usernameAuthor"> ${data.author} </div>
            </div>
            <div class="filters"></div>
            `;

            cardBox.append(divDom);
            divDom.classList.add("description");
            let user = localStorage.getItem("user");
            let userPArsed = JSON.parse(user);

            cardBox.querySelector("#delete").addEventListener("click", () => {
                console.log("delete");
                deleteComic(data);
            })

            if (userPArsed !== data.author) {
                divDom.querySelector("#delete").remove();
            }

                document.querySelector("#usernameAuthor").addEventListener("click", () => {
                RenderProfile(user, true);
                })

            for(let i = 0; i < tags.length; i++){
                let tag = document.createElement("div");
                tag.classList.add("tags");
                let text = tags[i].toUpperCase()
                tag.textContent = text;
                divDom.querySelector(".filters").append(tag);
            }

        });

        cardBox.querySelector(".imgDiv").addEventListener("click", () => {
            ReadComic(data);
        });


        cardBox.addEventListener("mouseleave", () => {
            console.log("inne");
            cardBox.classList.remove("hoverEffect");
            cardBox.classList.remove("description");
            
        });

        if (data.frontPage !== "") {
            cardBox.querySelector(".imgDiv").style.backgroundImage = `url("api/${data.frontPage}")`;
        } else {
            cardBox.querySelector(".imgDiv").style.backgroundImage = `url("/images/unnamed.png")`;
        }

        parent.appendChild(cardBox);
    }

    if (user) {
        if (Array.isArray(resource)) {
            resource.forEach(item => {
                createSingleCard(item);
            });
        } else {
            createSingleCard(resource);
        }
    } else {
        if (Array.isArray(resource[0])) {
            resource.forEach(part => {
                part.forEach(comic => {
                    createSingleCard(comic);
                });
            });
        } else {
            resource.forEach(comic => {
                createSingleCard(comic);
            });
        }
    }

}


async function ReadComic(comic) {

    let user = await getUser(comic.author);
    let userPic = user[0].personal.picture;

    // console.log(comic);
    let readBox = document.createElement("div");
    document.querySelector("body").append(readBox);
    readBox.classList.add("readBox");
    readBox.innerHTML = `

        <div id="close"> X </div>
        <div id="left" class="comic"></div>
        <div id="right" class="comic"></div>
        <img id="leftArrow" src="images/downArrow.png"> 
        <img id="rightArrow" src="images/downArrow.png">
    `;

    readBox.querySelector("#rightArrow").style.transform = "rotate(270deg)";
    readBox.querySelector("#leftArrow").style.transform = "rotate(90deg)";


    readBox.querySelector("#left").innerHTML = `
        <div id="infoDiv">
            <div id="title">${comic.title}</div>
            <div id="description">${comic.description}</div>
            <div id="filter"></div>
            <div id="authorInfo">
                <img src="${userPic}">
                <div id="author">${comic.author}</div>
            </div>
        </div>
    `;

    for(let i = 0; i < filter.length; i++){
        let divDom = document.createElement("div");
        divDom.textContent = filter[i];
        divDom.classList.add("tags");
        readBox.querySelector("#filter").append(divDom);
    }

    readBox.querySelector("#author").addEventListener("click", () => {
        RenderProfile(user, true);
        readBox.remove();
    })
    
    document.querySelector("#author").addEventListener("click", () => {
        // Get user from hoover 
    })

    readBox.querySelector("#right").style.backgroundImage = `url("api/${comic.frontPage}")`;
    readBox.querySelector("#right").style.backgroundSize = "cover";
    readBox.querySelector("#right").style.backgroundRepeat = "no-repeat";
    readBox.querySelector("#left").style.backgroundImage = "";
    readBox.querySelector("#left").style.backgroundSize = "cover";
    readBox.querySelector("#left").style.backgroundRepeat = "no-repeat";

    readBox.querySelector("#close").addEventListener("click", () => {
        readBox.remove();
    });

    let content = comic.content;
    let currentIndex = -2;

    function updateImages() {
        readBox.querySelector("#left").innerHTML = "";
        readBox.querySelector("#left").style.backgroundImage = `url("api/${content[currentIndex]}")`;
        readBox.querySelector("#right").style.backgroundImage = `url("api/${content[currentIndex + 1]}")`;
    }

    // <div id="time">${comic.time}</div>
    function resetInfo() {
        readBox.querySelector("#left").style.backgroundImage = "";
        readBox.querySelector("#left").innerHTML = `
            <div id="infoDiv">
                <div id="title">${comic.title}</div>
                <div id="description">${comic.description}</div>
                <div id="filter"></div>
                <div id="authorInfo">
                    <img src="${userPic}">
                    <div id="author">${comic.author}</div>
                </div>
            </div>
        `;
        readBox.querySelector("#right").style.backgroundImage = `url("api/${comic.frontPage}")`;
        currentIndex = -2;

       for(let i = 0; i < filter.length; i++){
            let divDom = document.createElement("div");
            divDom.textContent = filter[i];
            divDom.classList.add("tags");
            readBox.querySelector("#filter").append(divDom);
        }

        readBox.querySelector("#author").addEventListener("click", () => {
            RenderProfile(user, true);
            readBox.remove();
        })
    }

    // Attach click event listeners after initial setup
    readBox.querySelector("#rightArrow").addEventListener("click", () => {
        if (currentIndex + 2 < content.length) {
            currentIndex += 2;
            updateImages();
        } else {
            console.log("Reached the end of the content array");
            // console.log(currentIndex);
            // Handle end of the array
            resetInfo();
        }
    });

    readBox.querySelector("#leftArrow").addEventListener("click", () => {
        if (currentIndex >= 2) {
            currentIndex -= 2;
            updateImages();
        } else {
            console.log("Reached the beginning of the content array");
            readBox.querySelector("#left").style.backgroundImage = "";
            currentIndex = -2;
            // Handle beginning of the array
            resetInfo();
        }
    });

    // Initial setup without calling updateImages
    resetInfo();
}


async function findComic(value) {
    // console.log(value);
    let request = new Request(`api/GetUser.php?comic=${value}`)
    let response = await fetch(request);
    let resourse = await response.json();

    // console.log(resourse);
    return resourse;
}