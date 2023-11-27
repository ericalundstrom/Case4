"use strict";

function RenderLoginPage() {
    console.log("login");
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
                    <p>Forgot password?</p>
                </div>

                <button> Sign In </button>
                <p id=message></p>

                <h3>New to this? <u> Create an account <u></h3>

        </form>
        </div>

     </div>
`;
    wrapper.querySelector("#box").style.backgroundImage = "url(/images/paper.png)";

    //     // go to register
    document.querySelector("h3").addEventListener("click", () => {
        RenderRegisterPage();
    })

    let loginForm = wrapper.querySelector("form");
    let username = wrapper.querySelector("#username");
    let password = wrapper.querySelector("#password");

    loginForm.addEventListener("submit", async function (event) {
        event.preventDefault();
        let errorMessage = wrapper.querySelector("#message");

        let body = {
            username: username.value,
            password: password.value,
        };
        console.log(body);

        // trying to log in...
        try {
            let response = await fetching("api/login.php", "POST", body);
            let data = await response.json();

            data.password = password.value; // add password

            if (!response.ok) {
                errorMessage.innerHTML = `<span>${data.message}</span>.`; // error message
                console.log(data.message);
            } else {
                // add to local storage
                // window.localStorage.setItem("user", JSON.stringify(data));
                window.localStorage.setItem("user", JSON.stringify(data.personal.username));

                let user = data;
                console.log(user.personal.username);

                // logged in! (adding function later)
                // renderCategoriesPage()
                console.log("logged in");

                RenderHomePage();

            }
        } catch (error) { // if something went wrong
            errorMessage.textContent = `Error: ${error.message}`;
            console.log(error.message);
        }
    });
}


