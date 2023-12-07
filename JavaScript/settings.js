"use strict"

function RenderSettings(params) {
    let popUp = document.querySelector("#popUp")
    popUp.classList.remove("hidden");
    popUp.innerHTML = `
        <div> settings</div>
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
            <div id="general"> 
                <h3>General</h3>
                <label for="email">Email:</label>
                <input type="text" id="email" name="email" />

                <label for="username">Username:</label>
                <input type="text" id="username" name="username" />

            </div>
            <div id="password">
                <h3>Password</h3>
                <label for="currentPassword">Current password:</label>
                <input type="password" id="currentPassword" name="currentPassword" />
                
                <label for="newPassword">New password:</label>
                <input type="password" id="newPassword" name="newPassword" />
                
                <label for="repeatPassword">Repeat password:</label>
                <input type="password" id="repeatPassword" name="repeatPassword" />
            </div>
            </form>
            <button id="save"> Save settings </button>
            <div class="stroke"></div>
        <button id="logout"> Log out</button>
        <div id="close"> x </div>
        <div id="message"></div>
        `;

    popUp.querySelector("#logout").addEventListener("click", (event) => {
        event.stopPropagation();
        logout();
    })

    popUp.querySelector("#close").addEventListener("click", (e) => {
        e.stopPropagation();
        popUp.classList.add("hidden");
    })


    let knappDivs = document.querySelectorAll('.knapp');

    knappDivs.forEach((knappDiv, index) => {
        knappDiv.addEventListener("click", (e) => {
            knappDiv.classList.toggle("moved");
            console.log("truck på knapp");
        })
    });

    popUp.querySelector("#save").addEventListener("click", (e) => {
        e.stopPropagation();
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

        ChangeSettings(changesInForm);
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
    console.log(resourse);

    if (resourse.ok) {
        document.querySelector("#message").textContent = "Changes has been made and saved!";
    }
}
