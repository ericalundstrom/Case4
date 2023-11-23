"use strict";

function RenderCommunity() {

    swapStyleSheet("css/community.css");
    let wrapper = document.querySelector("#wrapper");

    BasicLayout();
    document.querySelector("#wrapper").innerHTML += `
        <div id="comunityBox"> 
            <h2> Community </h2>
            <div id="stroke"></div>
            <div id="commentBox"></div>
        </div>

            <button> Add a post + </button>
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
    for (let i = 0; i < 2; i++) {
        RenderComment(comments);
    }


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


function RenderComment(parent) {
    let comment = document.createElement("div");

    comment.innerHTML = `
    <div id="box">
            <div id="userAndProfile">
                <div id="profilePic"></div>
                <p id="username">Username</p>
            </div>
            <div id="date">2023/09/11</div>

            <h2>Vad använder ni för metod när ni bläcklaverar?</h2>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum</p>

            <div id="comments">
                <div id="icon">icon</div>
                <div id="count">37</div>
            </div>
    </div>
    <div id="stroke"></div>
    `;


    parent.append(comment);
}