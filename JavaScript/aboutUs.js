"use strict";


function RenderAboutUs(params) {
    console.log(" about us");
    swapStyleSheet("css/aboutUs.css");
    BasicLayout();

    document.querySelector("#wrapper").innerHTML = ``;
    let wrapper = document.querySelector("#wrapper")

    wrapper.innerHTML = `

        <div id="aboutUsBox">
            <h2> About Rita </h2>
            <div id="stroke"></div>
            <div id="facts">
               <p> Rita is web-magazine based in Malmö, Sweden. The idea to create the page came from a lack of web-based sites for comics, and a lack of plattforms for comic artists to display their art. Instead of using other plattform and reform the format of the comic to fit other platform (cough instagram), we wanted to give artist a platform that allows full A4-A1 format to be uploaded and not cropped. <br> <br>
               The plattform is based on a swedish and danish market. </p>
            </div>
            <h2> We work with Rita </h2>
            <div id="peopleWorking">
                <div class="people" style=" justify-content: center; align-items: center; gap: 10px; display: inline-flex">
                    <img style="border-radius: 80px; width: 117px; height: 117px" src="https://via.placeholder.com/117x117" />
                    <div style="padding-left: 7px; flex-direction: column; justify-content: flex-start; align-items: flex-start; gap: 10px; display: inline-flex">
                        <div style="width: 124.62px; height: 27.47px; color: black; font-size: 25px; font-family: Urbanist; font-weight: 400; word-wrap: break-word">Lo</div>
                        <div style="justify-content: flex-start; align-items: flex-start; gap: 10px; display: inline-flex">
                            <div style="width: 184.31px; height: 25.18px; color: black; font-size: 14px; font-family: Urbanist; font-weight: 400; word-wrap: break-word">Design and code</div>
                        </div>
                    </div>
                </div>
                <div class="people" style=" justify-content: center; align-items: center; gap: 10px; display: inline-flex">
                    <img style="border-radius: 80px; width: 117px; height: 117px" src="https://via.placeholder.com/117x117" />
                    <div style="padding-left: 7px; flex-direction: column; justify-content: flex-start; align-items: flex-start; gap: 10px; display: inline-flex">
                        <div style="width: 124.62px; height: 27.47px; color: black; font-size: 25px; font-family: Urbanist; font-weight: 400; word-wrap: break-word">Erica</div>
                        <div style="justify-content: flex-start; align-items: flex-start; gap: 10px; display: inline-flex">
                            <div style="width: 184.31px; height: 25.18px; color: black; font-size: 14px; font-family: Urbanist; font-weight: 400; word-wrap: break-word">Design and code</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}