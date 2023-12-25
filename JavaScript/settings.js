"use strict"

function RenderSettings(params) {
    let popUp = document.querySelector("#popUp");
    let popUpWindow = document.querySelector("#popUpWindow");
    popUpWindow.classList.add("settings");
    popUp.classList.remove("hidden");
    popUp.classList.add("settingPopUp");
    popUpWindow.innerHTML = `
        <h2> settings</h2>
        <div id="strokeSetting"> x </div>
        <div class="stroke"></div>
        <form>
            <div id="noti">
                <h3>Notifications</h3>
                <div>
                    <p> Notifications for likes </p>

                    <div>
                    <div style="width: 27px; height: 18px; color: #939393; font-size: 16px; font-family: Urbanist; font-weight: 400; word-wrap: break-word">Off</div>
                    <div style="width: 36px; height: 16px; position: relative">
                        <div style="width: 36px; height: 16px; left: 0px; top: 0px; position: absolute; background: #D9D9D9; border-radius: 20px"></div>
                        <div class="knapp"></div>
                    </div>
                    <div style="width: 27px; height: 18px; color: black; font-size: 16px; font-family: Urbanist; font-weight: 400; word-wrap: break-word">On</div>
                    </div>
                    </div>
                <div>
                    <p> Notifications from publication </p>
                    <div>
                    <div style="width: 27px; height: 18px; color: #939393; font-size: 16px; font-family: Urbanist; font-weight: 400; word-wrap: break-word">Off</div>
                    <div style="width: 36px; height: 16px; position: relative">
                        <div style="width: 36px; height: 16px; left: 0px; top: 0px; position: absolute; background: #D9D9D9; border-radius: 20px"></div>
                        <div class="knapp" ></div>
                    </div>
                    <div style="width: 27px; height: 18px; color: black; font-size: 16px; font-family: Urbanist; font-weight: 400; word-wrap: break-word">On</div>
                    </div>
                </div>
                <div>
                    <p> Notifications from comments </p>
                    <div>
                    <div style="width: 27px; height: 18px; color: #939393; font-size: 16px; font-family: Urbanist; font-weight: 400; word-wrap: break-word">Off</div>
                    <div style="width: 36px; height: 16px; position: relative">
                        <div style="width: 36px; height: 16px; left: 0px; top: 0px; position: absolute; background: #D9D9D9; border-radius: 20px"></div>
                        <div class="knapp"></div>
                    </div>
                    <div style="width: 27px; height: 18px; color: black; font-size: 16px; font-family: Urbanist; font-weight: 400; word-wrap: break-word">On</div>
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
                    <label for="email">Email:</label>
                    <input type="text" id="email" name="email" />
                    <div class="underline"></div>

                    <label for="username">Username:</label>
                    <input type="text" id="username" name="username" />
                    <div class="underline"></div>

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
        popUpWindow.classList.remove("settings");
    })


    let knappDivs = document.querySelectorAll('.knapp');

    knappDivs.forEach((knappDiv, index) => {
        knappDiv.addEventListener("click", (e) => {
            knappDiv.classList.toggle("moved");
            // console.log("truck på knapp");
        })
    });

    popUpWindow.querySelector("#save").addEventListener("click", (e) => {
        e.stopPropagation();
        e.preventDefault();
        let email = document.getElementById("email").value;
        let username = document.getElementById("username").value;
        let currentPassword = document.getElementById("currentPassword").value;
        let newPassword = document.getElementById("newPassword").value;
        let repeatPassword = document.getElementById("repeatPassword").value;

        let changesInForm = {
            "email": email,
            "username": username,
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
    let body = {
        "email": data.email,
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
