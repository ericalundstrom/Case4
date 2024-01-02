"use strict";

function RenderContactUs(params) {
    console.log(" about us");
    swapStyleSheet("css/contactUs.css");
    BasicLayout();

    document.querySelector("#wrapper").innerHTML = ``;
    let wrapper = document.querySelector("#wrapper")

    wrapper.innerHTML = `
    
    <div id="contactUsBox">
        <h2> Contact Us </h2>
            
                <p> Physical adress: </p>
                <div id="adressBox">
                    <p> Listergatan 9B <br>
                    214 34 Malmö <br>
                    Sweden </p>
                </div>

                <p> Email: </p>
                <div id="email">
                    <p>ContactUs@Rita.com</p>
                </div>

                <p> Social media: </p>
                <div id="social">
                    <div id="facebook">
                        <img id="fb" src="/images/fbIcon.png">   
                        <p> @RitaCommuity</p>
                    </div>
                    
                    <div id="instagram">
                        <img id="insta" src="/images/instaIcon.png">
                        <p> @RitaComics</p>
                    </div>
                    </div>
           
            </div>
            <div id="BigStroke"></div>

            <div id="formBox">
                <h3> Form for users: </h3>
                <div id="custom">
                    <p> Customer Support </p>
                    <button> Go > </button>
                </div>
                <div id="feedback">
                    <p> Feedback </p>
                    <button> Go > </button>
                </div>
                <div id="surveys">
                    <p> Surveys </p>
                    <button> Go > </button>
                </div>
    `;
}