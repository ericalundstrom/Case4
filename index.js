"use strict";

renderFirstPage();


function renderFirstPage() {
    let body = document.querySelector("body");
    console.log("hej");

    wrapper.innerHTML = `
        <img id="logo"> </img>

        <div id="login"> 
            <div id="text" onclick="RenderLoginPage()"> Login </div>
        </div>
        <div id="reg">
            <div onclick="RenderRegisterPage()"> Register </div>
        </div>
    `;

    document.querySelector("img").src = "images/logo.png";
    document.querySelector("#login").addEventListener("click", () => {
        RenderLoginPage();
    });


}
