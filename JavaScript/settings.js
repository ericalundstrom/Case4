"use strict"

function RenderSettings(params) {
    let username = localStorage.getItem("user");
    let userParse = JSON.parse(username);
    let popUp = document.querySelector("#popUp");
    document.querySelector("#popUp").style.height = "500px";
    document.querySelector("#popUp").style.width = "45%";
    // document.querySelector("#popUp").style.marginLeft = "25%";
    // document.querySelector("#popUp").style.marginRight = "25%";
    popUp.style.zIndex = "3";
    let popUpWindow = document.querySelector("#popUpWindow");
    popUpWindow.style.height = "700px";
    popUpWindow.classList.add("settings");
    popUp.classList.remove("hidden");
    popUp.classList.add("settingPopUp");
    popUpWindow.innerHTML = `
        <h2> SETTINGS</h2>
        <div id="strokeSetting"> <img src="../images/cross.svg"> </div>
        <div class="stroke"></div>
        <form>
            <div id="noti">
                <h3>Notifications</h3>
                <div>
                    <p> Comments </p>

                    <div>
                    <div style="width: 27px; height: 18px; color: black; font-size: 16px; font-weight: 400; word-wrap: break-word">Off</div>
                    <div style="width: 36px; height: 16px; position: relative">
                        <div  class="bkg" style="width: 36px; height: 16px; left: 0px; top: 0px; position: absolute; background: #B7323E; border-radius: 20px"></div>
                        <div class="knapp moved"></div>
                    </div>
                    <div style="width: 27px; height: 18px; color: #464545; font-size: 16px; font-weight: 400; word-wrap: break-word">On</div>
                    </div>
                    </div>
                <div>
                    <p> Followers </p>
                    <div>
                    <div style="width: 27px; height: 18px; color: #464545; font-size: 16px; font-weight: 400; word-wrap: break-word">Off</div>
                    <div style="width: 36px; height: 16px; position: relative">
                        <div class="bkg" style="width: 36px; height: 16px; left: 0px; top: 0px; position: absolute; background: #8EC6C1; border-radius: 20px"></div>
                        <div class="knapp" ></div>
                    </div>
                    <div style="width: 27px; height: 18px; color: black; font-size: 16px; font-weight: 400; word-wrap: break-word">On</div>
                    </div>
                </div>
                <div>
                    <p> Followers publications </p>
                    <div>
                    <div style="width: 27px; height: 18px; color: black; font-size: 16px; font-weight: 400; word-wrap: break-word">Off</div>
                    <div style="width: 36px; height: 16px; position: relative">
                        <div class="bkg" style="width: 36px; height: 16px; left: 0px; top: 0px; position: absolute; background: #B7323E; border-radius: 20px"></div>
                        <div class="knapp moved"></div>
                    </div>
                    <div style="width: 27px; height: 18px; color: #464545; font-size: 16px; font-weight: 400; word-wrap: break-word">On</div>
                    </div>
                </div>
            
            </div>

            <div class="stroke"></div>

            <div id="nedreDel">
                <div id="password">
                    <h3>Password</h3>
                    <label for="currentPassword">Current password:</label>
                    <input type="password" id="currentPassword" name="currentPassword" />
                    <div class="underline"></div>
                    
                    <label for="newPassword">New password:</label>
                    <input type="password" id="newPassword" name="newPassword" />
                    <div class="underline"></div>
                    
                    <label for="repeatPassword">Repeat password:</label>
                    <input type="password" id="repeatPassword" name="repeatPassword" />
                    <div class="underline"></div>
                </div>
                <div id="general"> 
                    <h3>General</h3>

                    <div id="usernameLabel"> Username: ${userParse} </div> 
                    <div id="emailLabel"> Email: ${userParse}@outlook.com </div> 

                </div>
                </div>
                <div id="buttonsSettings">
                    <button id="logout"> Log out</button>
                    <button id="Remove"> Remove account </button>
                </div>
            </form>
            <div id="backgroundButton">
                <button id="save"> Save settings </button>
            </div>
        <div id="message"></div>
        `;

    popUpWindow.querySelector("#logout").addEventListener("click", (event) => {
        event.stopPropagation();
        logout();
    })

    popUpWindow.querySelector("#strokeSetting").addEventListener("click", (e) => {
        // popUp.innerHTML = `
        //     <div id="popUpBackground"></div>
        //     <div id="popUpWindow">
        //         <p id="prompt"></p>
        //     </div>
        // `;
        e.stopPropagation();
        popUp.classList.add("hidden");
        popUp.style.zIndex = "0";
        popUpWindow.classList.remove("settings");
        document.querySelector("#popUp").style.height = "500px";
        document.querySelector("#popUp").style.width = "60%";
        document.querySelector("#popUp").style.marginLeft = "20%";
        document.querySelector("#popUp").style.marginRight = "20%";
        document.querySelector("#popUp").style.height = "80%";

    })


    let knappDivs = document.querySelectorAll('.knapp');

    knappDivs.forEach((knappDiv, index) => {
        knappDiv.addEventListener("click", (e) => {
            knappDiv.classList.toggle("moved");
            let parent = knappDiv.parentNode;
            let selected = parent.querySelector(".bkg")
            if (knappDiv.classList.contains("moved")) {
                selected.style.backgroundColor = "#B7323E";
            } else {
                selected.style.backgroundColor = "#8EC6C1";
            }
            // console.log("truck på knapp");
        })
    });

    popUpWindow.querySelector("#save").addEventListener("click", (e) => {
        e.stopPropagation();
        e.preventDefault();
        // let email = document.getElementById("email").value;
        let username = document.getElementById("usernameLabel").value;
        // let username = localStorage.getItem("user");
        // let userParse = JSON.parse(username);
        let currentPassword = document.getElementById("currentPassword").value;
        let newPassword = document.getElementById("newPassword").value;
        let repeatPassword = document.getElementById("repeatPassword").value;

        // "email": email,
        let changesInForm = {
            "username": userParse,
            "currentPassword": currentPassword,
            "newPassword": newPassword,
            "repeatPassword": repeatPassword
        };

        console.log(changesInForm);
        // ChangeSettings(changesInForm);
    })

};

async function ChangeSettings(data) {

    let user = localStorage.getItem("user");
    let userParse = JSON.parse(user);
    // "email": data.email,
    let body = {
        "username": data.username,
        "currentPassword": data.currentPassword,
        "newPassword": data.newPassword,
        "repeatPassword": data.repeatPassword,
        "user": userParse
    };

    // console.log(body);
    let response = await fetching("api/settings.php", "PATCH", body);
    let resourse = await response.json();
    // console.log(resourse.personal.username);
    localStorager.set_item("user", resourse.personal.username);

    if (resourse) {
        document.querySelector("#message").innerHTML = `Changes has been made and saved!`;
        // RenderProfile([resourse]);
        // location.reload();
    }
}
