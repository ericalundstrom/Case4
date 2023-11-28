"use strict";

async function RenderHomePage() {
    swapStyleSheet("css/landingPage.css");

    BasicLayout();

    document.querySelector("#wrapper").innerHTML = `
    <div id="navi"> </div>
    <div id="cards"></div>
  `;

    const response = await fetch("api/data/filters.json");
    let filterData = await response.json();
    const container = document.querySelector("#navi");

    createFilterDropdowns(container, filterData);

    function createFilterDropdowns(container, filterData) {
        for (const key in filterData) {
            const dropDownDOM = document.createElement("div");
            dropDownDOM.classList.add("dropDown");
            dropDownDOM.classList.add("hidden");

            let contentButtonDom = document.createElement("div");
            contentButtonDom.textContent = key;
            contentButtonDom.classList.add(key);
            contentButtonDom.classList.add("filterButton");
            container.append(contentButtonDom);

            if (Array.isArray(filterData[key])) {
                filterData[key].forEach(option => {
                    const optionDOM = document.createElement("div");
                    if (typeof option === "string") {
                        optionDOM.textContent = option;
                        optionDOM.addEventListener("click", (event) => {
                            event.target.classList.toggle("filter");
                            filterFunction(event);
                        });
                    } else if (typeof option === "object" && option !== null) {
                        for (const subCategory in option) {
                            const subCategoryDOM = document.createElement("div");
                            subCategoryDOM.textContent = subCategory;
                            subCategoryDOM.addEventListener("click", (event) => {
                                event.target.classList.toggle("filter");
                                filterFunction(event);
                            });
                            dropDownDOM.append(subCategoryDOM);

                            const subOptions = option[subCategory];
                            if (Array.isArray(subOptions)) {
                                subOptions.forEach(subOption => {
                                    const subOptionDOM = document.createElement("div");
                                    subOptionDOM.textContent = subOption;
                                    subOptionDOM.addEventListener("click", (event) => {
                                        event.target.classList.toggle("filter");
                                        filterFunction(event);
                                    });
                                    dropDownDOM.append(subOptionDOM);
                                });
                            }
                        }
                    }

                    dropDownDOM.append(optionDOM);
                });
            }

            contentButtonDom.addEventListener("click", () => {
                contentButtonDom.classList.toggle("selected");
                dropDownDOM.classList.toggle("hidden");
            });

            contentButtonDom.append(dropDownDOM);
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



let filter = [];

function filterFunction(target) {
    let newFilter = target.target.innerText;

    for (let i = 0; i < filter.length; i++) {
        if (filter[i] === newFilter) {
            filter.splice(i, 1);
            console.log(filter);
            return;
        }
    }

    filter.push(newFilter);
    console.log(filter);
}