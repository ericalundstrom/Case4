"user strict";

function RenderCopyRight(params) {
    console.log("copyright");
    swapStyleSheet("css/copyright.css");
    BasicLayout();

    document.querySelector("#wrapper").innerHTML = ``;
    let wrapper = document.querySelector("#wrapper")

    wrapper.innerHTML = `
    
    <div id="copyrightBox">
        <h2> Copyright </h2>
        <div id="bigbox">
            <div id="copyrightInfo">
                <p> © 2023 Rita, All rights reserved. The content, images, and materials on this website are protected by copyright law. <br> <br>
                    Any unauthorized use, reproduction, or distribution of the content without the express written permission of the comic published on Rita is strictly prohibited. For inquiries regarding the use or licensing of the artis's content, please contact each creator at their given contact info 
                </p>                
            </div>
        
            <div id="adress">
                <p>
                    Rita <br>
                    Listergatan 9B <br>
                    Malmö 214 35 <br>
                    Sweden 
                </p>
            </div>
        </div>
    </div>
    <div id="BigStroke"></div>
    `;
}