function RenderRegisterPage() {
    console.log("register");

    let wrapper = document.querySelector("#wrapper");
    wrapper.innerHTML = `
         <img id="logo"> </img>

        <h2>Register</h2>
        <p id=message></p>
        <form>
            <input type=text id=email placeholder=email>
            <input type=text id=username placeholder=Username>
            <input type=password id=password placeholder=Password>
            <button id=register type=submit>Register</button>
        </form>
        <button id=loginPage>Already got an account?</br>Login here</button>
    `;


    //   <input type=password id=passwordConfirm placeholder=Confirm Password>

    document.querySelector("img").src = "images/logo.png";

    let ButtonForLogin = wrapper.querySelector("#loginPage");
    ButtonForLogin.addEventListener("click", RenderLoginPage);

    let RegisterButton = wrapper.querySelector("form");
    RegisterButton.addEventListener("submit", async function (event) {
        event.preventDefault();
        let emailInput = wrapper.querySelector("#email").value;
        let usernameInput = wrapper.querySelector("#username").value;
        let passwordInput = wrapper.querySelector("#password").value;
        let message = wrapper.querySelector("#message");

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
    });
}