"use strict";

function RenderLoginPage() {

    swapStyleSheet("css/register.css");
    // console.log("login");
    wrapper.innerHTML = `

    <div id="box">
        <h1 id="loggo"> R </h1>
    </div>
        <div id="LoginOrReg">

        <form>
                <div id="login"> 
                    <label for="username">USERNAME</label>
                    <input type="text" id="username" name="username" />
                    <div class="underline"></div>
                </div>

                <div id="reg">
                    <label for="password">PASSWORD</label>
                    <input type="password" id="password" name="password" />
                    <div class="underline"></div>
                    <p>Forgot password?</p>
                </div>

                <button> LOGIN </button>
                <p id=message></p>

                <h3>New to this? <u> Create an account <u></h3>

        </form>
        </div>

`;

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
        // console.log(body);

        // trying to log in...
        try {
            let response = await fetching("api/login.php", "POST", body);
            let data = await response.json();

            data.password = password.value; // add password

            if (!response.ok) {
                errorMessage.innerHTML = `<span>${data.message}</span>.`; // error message
                // console.log(data.message);
            } else {
                // add to local storage
                // window.localStorage.setItem("user", JSON.stringify(data));
                localStorager.set_item("user", data.personal.username);
                localStorage.setItem("profilePic", data.personal.picture);
                localStorage.setItem("email", data.personal.email);
                let user = data;
                console.log(user.personal.username);

                // logged in! (adding function later)
                // renderCategoriesPage()
                // console.log("logged in");

                RenderHomePage();

            }
        } catch (error) { // if something went wrong
            errorMessage.textContent = `Error: ${error.message}`;
            console.log(error.message);
        }
    });
}


