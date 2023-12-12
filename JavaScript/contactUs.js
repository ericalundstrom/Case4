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
        <div id="stroke"></div>
        <div id="bigbox">
            <div id="contactFacts">
            
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

                <div id="social">
                    <p> Social media: </p>
                    <div id="facebook">
                        <img id="fb">   
                        <p> @RitaCommuity</p>
                    </div>
                    
                    <div id="instagram">
                        <img id="insta">
                        <p> @RitaComics</p>
                    </div>
                    </div>
            </div>
           
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
        </div>
    </div>
    `;
}