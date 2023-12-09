
"use strict";

function RenderRegisterPage() {
    swapStyleSheet("css/register.css");
    // console.log("register");

    let wrapper = document.querySelector("#wrapper");
    wrapper.innerHTML = `
        <div id="box">
            <h1> Rita </h1>
            <div id="LoginOrReg">
                <form>
                    <div id="login"> 
                        <label for="username">Username:</label>
                        <input type="text" id="username" name="username" />
                        <div class="underline"></div>
                    </div>

                    <div id="reg">
                        <label for="password">Password:</label>
                        <input type="password" id="password" name="password" />
                        <div class="underline"></div>
                    </div>

                    <div id="confirm">
                        <label for="confirm">Confirm password:</label>
                        <input type="password" id="confirmPassword" name="confirm" />
                        <div class="underline"></div>
                    </div>
                    
                    <div id="email">
                        <label for="email">Email:</label>
                        <input type="text" id="emailInput" name="Email" />
                        <div class="underline"></div>
                    </div>

                    <button id="register" type=submit> Sign Up </button>
                    <p id=message></p>

                    <h3>Got an account? <u>Login here</u></h3>
                </form>
            </div>
        </div>
    `;

    wrapper.querySelector("#box").style.backgroundImage = "url(/images/paper.png)";

    let RegisterButton = wrapper.querySelector("form");
    RegisterButton.addEventListener("submit", async function (event) {
        event.preventDefault();
        let emailInput = wrapper.querySelector("#emailInput").value;
        let usernameInput = wrapper.querySelector("#username").value;
        let passwordInput = wrapper.querySelector("#password").value;
        let message = wrapper.querySelector("#message");
        let confirmPassword = wrapper.querySelector("#confirmPassword").value;

        // console.log(passwordInput, confirmPassword, emailInput);

        if (passwordInput === confirmPassword) {
            try {
                let body = {
                    personal: {
                        email: emailInput,
                        username: usernameInput,
                        password: passwordInput,
                    },
                    comics: [
                        {
                            title: 0,
                            likes: 0,
                            filters: 0,
                        },
                    ],
                };

                let response = await fetching("/api/register.php", "POST", body);
                let data = await response.json();

                if (response.ok) {
                    message.innerHTML = `The user ${data.personal.username} was successfully added!`;
                } else {
                    message.innerHTML = `<span>${data.message}</span>.`;
                }
            } catch (error) {
                message.textContent = `${error.message}`;
            }
        } else {
            message.textContent = "Please write the same password";
        }
    });

    document.querySelector("h3").addEventListener("click", (event) => {
        event.preventDefault();
        RenderLoginPage();
    });
}
