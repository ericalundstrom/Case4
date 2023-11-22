"use strict";
function RenderRegisterPage() {


    swapStyleSheet("css/register.css");
    console.log("register");

    let wrapper = document.querySelector("#wrapper");
    wrapper.innerHTML = `

    <div id="box">
    <h1> Rita </h1>

        <div id="LoginOrReg">

        <form>
                <div id="login"> 
                    <label for="username">Username:</label>
                    <input type="text" id="username" name="username" required minlength="4" maxlength="8" size="10" />
                    <div class="underline"></div>
                </div>

                <div id="reg">
                    <label for="password">Password:</label>
                    <input type="password" id="password" name="password" required minlength="4" maxlength="8" size="10" />
                    <div class="underline"></div>
                </div>

                <div id="confirm">
                    <label for="confirm">Confirm password:</label>
                    <input type="password" id="confirmPassword" name="confirm" required minlength="4" maxlength="8" size="10" />
                    <div class="underline"></div>
                </div>
                
                <div id="email">
                    <label for="email">Email:</label>
                    <input type="text" id="emailInput" name="Email" required minlength="4" size="10" />
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
    let ButtonForLogin = wrapper.querySelector("button");
    // ButtonForLogin.addEventListener("click", RenderLoginPage);

    document.querySelector("h3").addEventListener("click", (event) => {
        event.preventDefault();
        RenderLoginPage();
    })

    let RegisterButton = wrapper.querySelector("form");
    RegisterButton.addEventListener("submit", async function (event) {
        event.preventDefault();
        let emailInput = wrapper.querySelector("#emailInput").value;
        let usernameInput = wrapper.querySelector("#username").value;
        let passwordInput = wrapper.querySelector("#password").value;
        let message = wrapper.querySelector("#message");
        let confirmPassword = wrapper.querySelector("#confirmPassword").value

        console.log(passwordInput, confirmPassword, emailInput);

        if (passwordInput === confirmPassword) {


            //Try to register
            try {
                let body = {
                    //The value is from the two inputs
                    email: emailInput,
                    username: usernameInput,
                    password: passwordInput,

                };

                let response = await fetching("/api/register.php", "POST", body);
                let data = await response.json();

                //if the response is ok and the user is added
                if (response.ok) {
                    message.innerHTML = `The user ${data.username} was successfully added!`;
                    //if it's not ok
                } else {
                    message.innerHTML = `<span>${data.message}</span>.`;
                }
                //if something went wrong, we print out the error message we got from the database
            } catch (error) {
                message.textContent = `${error.message}`;
            }
        } else {
            message.textContent = "Please write the same password";
        }
    });
}