"use strict";
async function fetching(URL, method, body) {
    console.log(method);
    let response = await fetch(URL, {
        method: method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
    });

    return response;
}


function swapStyleSheet(styleSheet) {
    document.getElementById("styles").setAttribute("href", styleSheet);
}


function BasicLayout(params) {
    document.querySelector("body").innerHTML = `
        <header>
            <p> Rita </p>
            <input type="text" id="search" name="search" placeholder="search for comics, authors etc.."/>
            <div id="profile"></div>
        </header>

        <nav>
            <p> Profile </p>
            <p> Home </p>
            <p> Comunity </p>
            <p> Trending </p>
        </nav>


    <main>
        <div id="wrapper"></div>
    </main>

    <footer>
        <div> About Rita </div>
        <div class="stroke"></div>
        <div> Change language </div>
        <div class="stroke"></div>
        <div> FAQ </div>
        <div class="stroke"></div>
        <div> Copyright </div>
        <div class="stroke"></div>
        <div> Contact us </div>
    </footer>
    `;
}
