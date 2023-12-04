"use strict";

async function RenderCommunity() {

    swapStyleSheet("css/community.css");
    let wrapper = document.querySelector("#wrapper");

    BasicLayout();
    wrapper.innerHTML = `
        <div id="comunityBox"> 
            <h2> Community </h2>
            <div id="stroke"></div>
            <div id="commentBox"></div>
        </div>

            <button onclick="RenderNewCommentPage()"> Add a post + </button>
            <div id="tipsbox">
                <div id="tips">
                    <h3> Sale on light tables in pennstore </h3>
                    <div id="SmallStroke"></div>
                    <p> Models ****** and **** are half price off right now. Sale will be on untill december first </p>
                    <p id="date">2023-09-11</p>
                </div>
                <div id="dots">
                    <div class="dot"></div>
                    <div class="dot"></div>
                    <div class="dot"></div>
                    <div class="dot"></div>
                </div>
            </div>
            <div id="calender"></div>
    `;

    let calender = document.querySelector("#calender");
    let comments = document.querySelector("#commentBox");

    let response = await fetch("api/data/community.json");
    let resourse = await response.json();

    RenderComment(comments, resourse, true);


    // wrapper.querySelector("button").addEventListener("click", (event) => {
    //     event.stopPropagation();
    //     RenderNewCommentPage();
    // })


    RenderCalender(calender);

}

function RenderCalender(parent) {

    parent.innerHTML = `
    <h2> Galagos deadline </h2>
    <div id="SmallStroke"></div>
    <div id="month">
        <div class="arrow"> < </div>
        <div>December</div>
        <div class="arrow"> > </div>
    </div>

        <div id="days">
            <div>S</div>
            <div>L</div>
            <div>F</div>
            <div>T</div>
            <div>W</div>
            <div>T</div>
            <div>M</div>
        </div>

        <div id="dates"></div>
    `;

    for (let i = 1; i < 32; i++) {
        let divDom = document.createElement("div");
        divDom.classList.add("date");
        divDom.textContent = i;
        document.querySelector("#dates").append(divDom);

    }
}


async function RenderComment(parent, resourse, value) {

    if (value) {

        resourse.forEach(comment => {
            console.log(comment);
            let commentBox = document.createElement("div");
            let numberOfComments = comment.comments.length;
            console.log(numberOfComments);

            commentBox.innerHTML = `
                <div id="box">
                        <div id="userAndProfile">
                            <div id="profilePic"></div>
                            <p id="username">${comment.author}</p>
                        </div>
                        <div id="date">${comment.date}</div>
            
                        <h2>${comment.title}</h2>
                        <p>${comment.description}</p>
            
                        <div id="comments">
                            <div id="icon">icon</div>
                            <div id="count">${numberOfComments}</div>
                        </div>
                </div>
                <div id="stroke"></div>
                `;

            commentBox.addEventListener("click", (event) => {
                RenderPostLayout(comment);
            })


            parent.append(commentBox);
        });
    } else {
        document.querySelector("#commentBox").innerHTML += `
        <div id="goBack"> Go Back </div>
    `;

        document.querySelector("#goBack").addEventListener("click", RenderCommunity);
        console.log("inne på en post");
        console.log(resourse);
        // resourse.forEach(user => {
        //     console.log(user);
        let commentBox = document.createElement("div");
        let numberOfComments = resourse.comments.length;

        commentBox.innerHTML = `
                <div id="box">
                        <div id="userAndProfile">
                            <div id="profilePic"></div>
                            <p id="username">${resourse.author}</p>
                        </div>
                        <div id="date">${resourse.date}</div>

                        <h2>${resourse.title}</h2>
                        <p>${resourse.description}</p>

                        <div id="comments">
                            <div id="icon">icon</div>
                            <div id="count">${numberOfComments}</div>
                        </div>
                </div>
                <div id="stroke"></div>
                `;

        parent.append(commentBox);

        document.querySelector("#commentBox").innerHTML += `
            <div id="divForComments"></div>
            <form id="addComment" action="api/community.php" method="POST">
                <input type="text" id="comment" name="comment"placeholder="Skriv en kommentar här..."/>
                <div id="submitIcon"></div>
            </form>
        `;
        document.querySelector("#goBack").addEventListener("click", RenderCommunity);

        if (resourse.comments.length !== 0) {

            for (let i = 0; i < resourse.comments.length; i++) {

                let divDom = document.createElement("div");
                divDom.innerHTML = `
                <div id="userAndProfile">
                    <div id="profilePic"></div>
                    <p id="username">${resourse.comments[i].author}</p>
                </div>
                <div id="date">${resourse.comments[i].date}</div>
                <div id="stroke"></div>
                <p>${resourse.comments[i].comment}</p>
                `;
                document.querySelector("#divForComments").append(divDom);

            }
        } else {
            console.log("finns inga kommentarer");
        }
        document.querySelector("#submitIcon").addEventListener("click", (event) => {
            event.stopPropagation();


            addComment(resourse);
        })
    }
}


function RenderNewCommentPage() {
    console.log("add");

    // BasicLayout();
    document.querySelector("body").innerHTML += `
    <div id="BackgroundColor" class="hidden">
        <div id="bigBoxCommunity">
            <h3> Add a new post</h3>

            <form action="api/community.php" method="POST">
                <div id="titleBox"> 
                    <label for="title">Title:</label>
                    <input type="text" id="title" name="title" />
                </div>

                <div id="descriptionBox">
                    <label for="description">Description:</label>
                    <input type="text" id="description" name="description"/>
                </div>

                <button type="submit"> Upload to community</button>
            </form>

            <div id="message"></div>
            
            <div id="x"> Close </div>
        </div>
    </div>
    `;

    document.querySelector("#BackgroundColor").classList.remove("hidden");
    document.querySelector("#x").addEventListener("click", () => {
        // document.querySelector("#BackgroundColor").classList.add("hidden");
        document.querySelector("#BackgroundColor").remove();

    });

    // document.querySelector("");
    let form = document.querySelector("form");
    form.addEventListener("submit", async (event) => {
        event.preventDefault();

        let title = document.querySelector("#title").value;;
        let description = document.querySelector("#description").value;

        let user = localStorage.getItem("user");
        let userParse = JSON.parse(user);
        console.log(user);
        let body = {
            "title": title,
            "description": description,
            "author": userParse
        };

        try {

            let respons = await fetching("api/community.php", "POST", body);
            let resourse = await respons.json();

            if (!resourse.message) {
                console.log(resourse);
                document.querySelector("#message").textContent = "Successfully added post!";
            } else {
                console.log(resourse.message);
                document.querySelector("#message").textContent = resourse.message;
            }
        } catch (e) {
            console.log(e);
            document.querySelector("#message").textContent = e;
        }
    });

}


function RenderPostLayout(data) {
    // console.log(data);

    BasicLayout();
    let wrapper = document.querySelector("#wrapper");
    wrapper.innerHTML = `
        <div id="comunityBox"> 
            <h2> Community </h2>
            <div id="stroke"></div>
            <div id="commentBox"></div>
        </div>

            <button onclick="RenderNewCommentPage()"> Add a post + </button>
            <div id="tipsbox">
                <div id="tips">
                    <h3> Sale on light tables in pennstore </h3>
                    <div id="SmallStroke"></div>
                    <p> Models ****** and **** are half price off right now. Sale will be on untill december first </p>
                    <p id="date">2023-09-11</p>
                </div>
                <div id="dots">
                    <div class="dot"></div>
                    <div class="dot"></div>
                    <div class="dot"></div>
                    <div class="dot"></div>
                </div>
            </div>
            <div id="calender"></div>
    `;

    let calender = document.querySelector("#calender");
    let comments = document.querySelector("#commentBox");

    RenderCalender(calender);
    RenderComment(comments, data, false);
}


async function addComment(resourse) {
    let form = document.querySelector("form");
    let comment = form.querySelector("#comment").value;
    let user = localStorage.getItem("user");
    let userParse = JSON.parse(user);
    let id = resourse.id;

    console.log(comment, userParse, id);

    let body = {
        "author": userParse,
        "comment": comment,
        "id": id
    };

    let respons = await fetching("api/community.php", "POST", body);
    let resourseComment = await respons.json();

    if (resourseComment) {

        console.log(resourseComment);
        RenderCommunity();

    }
}