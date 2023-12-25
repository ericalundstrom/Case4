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
        <div id="about"> About Rita </div>
        <div class="stroke"></div>
        <div> Change language </div>
        <div class="stroke"></div>
        <div id="faq"> FAQ </div>
        <div class="stroke"></div>
        <div id="copy"> Copyright </div>
        <div class="stroke"></div>
        <div id="contact"> Contact us </div>`;

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

    if (resource.length === 0) {
        let response = await fetch("api/data/users.json");
        let resource = await response.json();
        let allComics = resource.flatMap(user => user[0].comics);
        let boxCards = document.querySelector("#cards");
        boxCards.innerHTML = ``;
        console.log("högst upp");
        createCard(boxCards, allComics)
    }


    // console.log(resource.length);
    function createSingleCard(data) {
        console.log("näst högst upp");
        const cardBox = document.createElement("div");
        cardBox.classList.add("cardBox");

        cardBox.innerHTML = `
            <div class="imgDiv"></div>
        `;

        cardBox.setAttribute("id", data.title);

        cardBox.addEventListener("mouseenter", () => {
            cardBox.classList.add("hoverEffect");
            let divDom = document.createElement("div");
            // console.log(JSON.parse(data.filters));
            let tags = JSON.parse(data.filters);
            console.log(data.filters);
            let filters = data.filters.replace(/[\[\]"]+/g, ' ');
            divDom.innerHTML = `
            <img id="delete" src="/images/delete.png">
            <div id="title">
            ${data.title}
            </div>
            <div id="puplished"> Published ${data.time} </div>
            <div id="userinfo">
                <img>
                <div id="username"> ${data.author} </div>
            </div>
            <div id="desc">
                ${data.description}
            </div>
            <div id="filters"></div>
            `;

            cardBox.append(divDom);
            divDom.classList.add("description");
            let user = localStorage.getItem("user");
            let userPArsed = JSON.parse(user);

            cardBox.querySelector("#delete").addEventListener("click", (event) => {
                console.log("delete");
                deleteComic(data);
            })

            if (userPArsed !== data.author) {
                divDom.querySelector("#delete").remove();
            }

            tags.forEach(filter => {
                let tag = document.createElement("div");
                tag.classList.add("tags");
                tag.textContent = filter;
                divDom.querySelector("#filters").append(tag);
            })
        });

        cardBox.querySelector(".imgDiv").addEventListener("click", () => {
            ReadComic(data);
        });


        cardBox.addEventListener("mouseleave", () => {
            cardBox.classList.remove("hoverEffect");
            document.querySelector(".description").remove();
        });

        if (data.frontPage !== "") {
            cardBox.querySelector(".imgDiv").style.backgroundImage = `url("api/${data.frontPage}")`;
        } else {
            cardBox.querySelector(".imgDiv").style.backgroundImage = `url("/images/unnamed.png")`;
            console.log("fungerar ej");
        }

        parent.appendChild(cardBox);
    }

    if (user) {
        if (Array.isArray(resource)) {
            console.log("array i array");
            resource.forEach(item => {
                createSingleCard(item);
            });
        } else {
            console.log("bara array");
            createSingleCard(resource);
        }
    } else {
        if (Array.isArray(resource[0])) {
            console.log("array i array [0]");
            resource.forEach(part => {
                part.forEach(comic => {
                    createSingleCard(comic);
                });
            });
        } else {
            resource.forEach(comic => {
                console.log("array i array oklart varför");
                createSingleCard(comic);
            });
        }
    }

}


function ReadComic(comic) {
    // console.log(comic);
    let readBox = document.createElement("div");
    document.querySelector("body").append(readBox);
    readBox.classList.add("readBox");
    readBox.innerHTML = `
        <div id="close"> X </div>
        <div id="leftArrow"> < </div>
        <div id="left" class="comic"></div>
        <div id="right" class="comic"></div>
        <div id="rightArrow"> > </div>
    `;

    let filters = comic.filters.replace(/[\[\]"]+/g, ' ');
    readBox.querySelector("#left").innerHTML = `
        <div id="title">${comic.title}</div>
        <div id="time">${comic.time}</div>
        <div id="description">${comic.description}</div>
        <div id="filter">${filters}</div>
        <div id="author">${comic.author}</div>
    `;

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

    function resetInfo() {
        let filters = comic.filters.replace(/[\[\]"]+/g, ' ');
        readBox.querySelector("#left").style.backgroundImage = "";
        readBox.querySelector("#left").innerHTML = `
            <div id="title">${comic.title}</div>
            <div id="time">${comic.time}</div>
            <div id="description">${comic.description}</div>
            <div id="filter">${filters}</div>
            <div id="author">${comic.author}</div>
        `;
        readBox.querySelector("#right").style.backgroundImage = `url("api/${comic.frontPage}")`;
        currentIndex = -2;
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