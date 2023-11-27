
"use strict";

async function RenderHomePage() {
    swapStyleSheet("css/landingPage.css");
    let wrapper = document.querySelector("#wrapper");

    BasicLayout();

    document.querySelector("#wrapper").innerHTML = `
    <div id="navi"> </div>
    <div id="cards"></div>
  `;

    const response = await fetch("api/data/filters.json");
    let filterData = await response.json();
    const container = document.querySelector("#navi");

    for (const key in filterData) {
        const dropDownDOM = document.createElement("div");
        let contentButtonDom = document.createElement("div");
        contentButtonDom.textContent = key;
        contentButtonDom.addEventListener("click", () => {
            contentButtonDom.classList.toggle("selected");
            if (contentButtonDom.classList.contains("selected")) {
                renderOptions(key, filterData[key], dropDownDOM, true);
            } else {
                renderOptions(key, filterData[key], dropDownDOM, false);
            }
        });
        dropDownDOM.classList.add("dropDown");
        container.append(contentButtonDom);
        contentButtonDom.append(dropDownDOM);

        function renderOptions(category, options, container, worth) {
            if (worth) {
                container.innerHTML = ""; // Clear previous content

                const categoryDOM = document.createElement("div");
                categoryDOM.textContent = category;
                container.append(categoryDOM);

                if (Array.isArray(options)) {
                    options.forEach(option => {
                        const optionDOM = document.createElement("div");
                        if (typeof option === "string") {
                            optionDOM.textContent = option;
                        } else if (typeof option === "object" && option !== null) {
                            // Handle the case where the option is an object
                            for (const subCategory in option) {
                                const subCategoryDOM = document.createElement("div");
                                subCategoryDOM.textContent = subCategory;
                                container.append(subCategoryDOM);

                                const subOptions = option[subCategory];
                                if (Array.isArray(subOptions)) {
                                    // Recursively render nested options
                                    renderOptions(subCategory, subOptions, subCategoryDOM, true);
                                }
                            }
                        }

                        container.append(optionDOM);
                    });
                }
            } else {
                container.textContent = ``;
            }
        }
    }

    let responseComics = await fetch("api/data/comics.json");
    let resource = await responseComics.json();

    let boxCards = document.querySelector("#cards");
    createCard(boxCards, resource);
}

function RenderTrending(params) {
    console.log("trending");
}
