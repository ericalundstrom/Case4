async function RenderHomePage(params) {

    swapStyleSheet("css/landingPage.css");
    let wrapper = document.querySelector("#wrapper");

    wrapper.innerHTML = `

        <header>
            <p> rita </p>
            <p> profile </p>
            <p> settings </p>
        </header>

        <nav>
            <div> trending now </div>
            <img id="right" src="../images/32213.png">
            <img id="left" src="../images/32213.png">
        </nav>

        <div id="cards"></div>

    `;

    let response = await fetch("api/data/comics.json");
    let resource = await response.json();

    console.log(resource);


    let trend = document.createElement("div");
    wrapper.querySelector("nav > div").append(trend);
    resource.forEach(part => {
        trend.innerHTML = `
            <div id="cover"></div>
            <div id="title"> ${part.title} </div>
            <div id="author"> ${part.author} </div>
            <div id="time"> ${part.publish} </div>
            <div id="description"> ${part.description} </div>
            <div id="likes"> Likes: ${part.likes} </div>
        `;
        trend.querySelector("#cover").style.backgroundImage = "url(../images/unnamed.png)";
    });


    let card = document.createElement("div");
    wrapper.querySelector("#cards").append(card);
    resource.forEach(part => {
        card.innerHTML = `
        <div id="top">
            <div id="title"> ${part.title} </div>
            <div id="author"> ${part.author} </div>
            <div id="time"> ${part.publish} </div>
        </div>
            <div id="pic"></div>
        <div id="bottom">
            <div id="description"> ${part.description} </div>
            <div id="likes"> Likes: ${part.likes} </div>
        </div>
        `;
        card.querySelector("#pic").style.backgroundImage = "url(../images/unnamed.png)";
    });
}

