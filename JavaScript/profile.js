
function RenderProfile(params) {
    console.log("profile");

    swapStyleSheet("css/profile.css");
    let wrapper = document.querySelector("#wrapper");

    BasicLayout();


    document.querySelector("#wrapper").innerHTML += `
    <div id="notifications">
        <img>
        <div class="noti">
         <p>Elin liked your comment</p> 
        </div>
        <div class="notiStroke"></div>
        <div class="noti">
        <p>Elin liked your comment</p> 
       </div>
        <div class="notiStroke"></div>
        <div class="noti">
         <p>Elin liked your comment</p> 
        </div>
    </div>

    <div id="user">
        <img>
        <div id="profileIcon"></div>
        <div id="edit">
            <img>
        </div>
        <div id="username">Username</div>
        <div id="date">Member since:</div>
        <div id="settings">settings</div>
        <div id="description">I am a comic artist based in Sweden, Malmö. My comics usually revolve around superheros and their adventures. The adventures takes place in the fantacy land of </div>
        <div id="insta">
            <div id="icon"></div>
            <div id="name">@Torkel</div>
        </div>
        <div id="follows">
            <div id="name">36 people follow</div>
            <div id="icon"></div>
        </div>
    </div>

    <div id="options">
        <div id="myComics"> My comics </div>
        <div id="Saved"> Saved comics </div>
    </div>
    <button> + Add new comic</button>
    <div id="BigStroke"></div>

    <div id="cards"></div
    `;

    let cardBox = document.querySelector("#cards");

    for (let i = 0; i < 6; i++) {

        createCard(cardBox);
    }
}


function createCard(parent) {
    let card = document.createElement("div");
    card.classList.add("card");
    card.innerHTML = `
    <div style="width: 100%; height: 100%; position: relative">
        <div style="width: 243px; height: 351px; left: 0px; top: 44px; position: absolute">
            <div style="width: 243px; height: 351px; left: 0px; top: 0px; position: absolute; background: #D9D9D9"></div>
            <div style="width: 425.19px; height: 0px; left: 0px; top: 1.30px; position: absolute; transform: rotate(55.33deg); transform-origin: 0 0; border: 1px black solid"></div>
            <div style="width: 424.55px; height: 0px; left: 241.86px; top: 0px; position: absolute; transform: rotate(124.54deg); transform-origin: 0 0; border: 1px black solid"></div>
        </div>

        <div style="width: 51px; left: 1px; top: 13px; position: absolute; color: black; font-size: 20px; font-family: Inter; font-weight: 400; word-wrap: break-word">Title</div>
        <div style="width: 108px; height: 20px; left: 1px; top: 401px; position: absolute">
            <div style="width: 20px; height: 20px; left: 0px; top: 0px; position: absolute; background: #D9D9D9; border-radius: 9999px"></div>
            <div style="width: 80px; height: 19px; left: 28px; top: 1px; position: absolute; color: black; font-size: 16px; font-family: Inter; font-weight: 400; word-wrap: break-word">Username</div>
        </div>
        <div style="width: 41px; left: 202px; top: 12px; position: absolute">
            <div style="width: 22px; height: 22px; left: 0px; top: 0px; position: absolute">
                <div style="width: 22px; height: 22px; left: 0px; top: 0px; position: absolute; background: white; border-radius: 9999px"></div>
                <div style="width: 14.67px; height: 14.67px; left: 3.67px; top: 3.67px; position: absolute">
                    <div style="width: 12.81px; height: 13.98px; left: 1.49px; top: 390px; position: absolute; background: black"></div>
                </div>
            </div>
        <div style="width: 19px; height: 17px; left: 22px; top: 395px; position: absolute; color: black; font-size: 14px; font-family: Inter; font-weight: 400; word-wrap: break-word">34</div>
        </div>
    </div>
    `;

    parent.append(card);
}