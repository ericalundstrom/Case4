"use strict";

let filter = [];

function filterFunction(target) {
    let newFilter = target.target.innerText;
    const index = filter.indexOf(newFilter);
    if (index !== -1) {
        filter.splice(index, 1);
    } else {
        filter.push(newFilter);
    }

    localStorager.set_item("filters", JSON.stringify(filter))
    console.log(filter);
    return filter;
}




let Themes = [

    "HORROR",
    "FAMILY",
    "FRIENDS",
    "IDENTITY",
    "SATIRÉ",
    "FANTASY",
    "LOVE",
    "EDUCATION"
];
let Materials = {
    "Pens and crayons": [

        "Color pencil",
        "Crayon",
        "Pastel",
        "Charcoal",
        "Pencil",
        "Ink",
        "Gel",
        "Fineline"
    ],

    "papers": [
        "Colored paper",
        "Copy paper",
        "Bond paper",
        "Cardstock",
        "Glossy paper",
        "Matte paper",
        "Newsprint",
        "Tissue paper",
        "Construction paper",
        "Watercolor paper",
        "Vellum",
        "Tracing paper",
        "Parchment paper"
    ],
    "color": [
        "Gouache",
        "Watercolor",
        "Acrylic",
        "Ink-wash",
        "Oil"
    ],
    "more": [
        "Digital",
        "Photograph",
        "Stop-motion",
        "Collage",
        "Mixed materials"
    ],
}
let Styles = [
    "Fable",
    "Manga",
    "Alternative",
    "Super-hero",
    "Non-fiction",
    "Slice of life",
];

let Format = [
    "One-frame",
    "Webcomic",
    "Story-telling",
    "Strip-comic",
    "Part of novel"
]

let Sort = [
    "A to Z",
    "Z to A",
    "Most recently added",
    "Oldest first"
];

let matchingComics = [];

async function createFilterDropdowns(container, value) {
    container.innerHTML = `
    <div class="strokeFilters"></div>
    <div id="contentFilter">
        <div id="themes"></div>
        <div id="rightHandSide">
        <input type="text" id="searchField" class="hiddenSearch" placeholder="SEARCH...">
            <img id="search" src="./images/searchIcon.svg"></img>
            <div id="filter">FILTERS</div>
            <div id=sortComicContainer>
                <div id="sortComics">SORT BY</div>
                <img src="./images/sortArrows.svg"></img>            
            </div>
        </div>
`;


    Themes.forEach(filter => {
        const divDom = document.createElement("div");
        divDom.textContent = filter;
        divDom.setAttribute("id", filter);
        divDom.addEventListener("click", async (event) => {
            event.target.classList.toggle("selected");

            if (value === true) {
                let filter = filterFunction(event);
                let response = await fetch("api/data/users.json");
                let resource = await response.json();
                let matchingComics = [];

                resource.forEach(user => {
                    if (user[0].comics.length >= 1) {
                        let comics = [...user[0].comics];

                        comics.forEach(comic => {
                            console.log(comic.filters);
                            //let filtersInComic = comic.filters.replace(/[\[\]"]+/g, ' ').trim();
                            //let filtersInComicArray = filtersInComic.split(',').map(filter => filter.trim());

                            if (filter.some(filterItem => comic.filters.some(comicFilter => comicFilter.toLowerCase().includes(filterItem.toLowerCase())))) {
                                // Found at least one similar filter
                                matchingComics.push(comic);
                                console.log(comics);
                            } else {
                                console.log("Filters not found");
                            }

                        });
                    }
                    console.log(matchingComics);
                });

                // console.log(matchingComics.length);
                let boxCards = document.querySelector("#cards");
                boxCards.innerHTML = ``;
                console.log(matchingComics);
                createCard(boxCards, matchingComics);
                // console.log("Matching Comics:", matchingComics);
            }
        });

        document.querySelector("#themes").append(divDom);
    });

    document.querySelector("#filter").addEventListener("click", () => {
        createFilterPage(value);
    })

    document.querySelector("#search").addEventListener("click", () => {
        renderSearchField();
    })


    // SORT COMICS 
    const sortDropdownDiv = document.createElement("div");
    sortDropdownDiv.classList.add("hidden");
    sortDropdownDiv.classList.add("filterContainerSort");

    document.querySelector("#sortComics").appendChild(sortDropdownDiv);

    document.querySelector("#sortComics").addEventListener("click", () => {
        sortDropdownDiv.classList.toggle("hidden");
        sortDropdownDiv.innerHTML = ``;
        sortComics(matchingComics);
    });

    async function sortComics(matchingComics) {

        const SortOptions = ["A to Z", "Z to A", "Most recently added", "Oldest first"];

        let comics = [];
        let response = await fetch("api/data/users.json");
        let resource = await response.json();
        for (let i = 0; i < resource.length; i++) {
            if (resource[i][0].comics.length !== 0) {
                let comic = resource[i][0].comics;
                comics.push(...comic); // Flatten the nested arrays
            }
        }

        SortOptions.forEach((sort, index) => {
            let div = document.createElement("div");
            div.textContent = sort;
            div.setAttribute("id", `sort-${index}`); // Unique ID for each option
            sortDropdownDiv.append(div);
            div.addEventListener("click", () => {
                // Call the appropriate sorting function based on the selected option
                switch (sort) {
                    case "A to Z":
                        sortComicsByTitle(comics, true);
                        break;
                    case "Z to A":
                        sortComicsByTitle(comics, false);
                        break;
                    case "Most recently added":
                        sortComicsByDate(comics, true);
                        break;
                    case "Oldest first":
                        sortComicsByDate(comics, false);
                        break;
                    // Add more cases for additional sorting options
                }
            });
        });
    }

    function sortComicsByTitle(comics, ascending) {
        // console.log(comics);
        // Assuming comics is an array of objects with a 'title' property
        let sortedComics = comics.slice().sort((a, b) => {
            const compareResult = a.title.localeCompare(b.title);
            return ascending ? compareResult : -compareResult;
        });
        displayComics(sortedComics, true);
    }

    function sortComicsByDate(comics, newestFirst) {
        // Assuming comics is an array of objects with a 'time' property in the format "MM/DD/YYYY"
        let sortedComics = comics.slice().sort((a, b) => {
            const dateA = parseDate(a.time);
            const dateB = parseDate(b.time);
            return newestFirst ? dateB - dateA : dateA - dateB;
        });
        displayComics(sortedComics, true);
    }

    function parseDate(dateString) {
        const [month, day, year] = dateString.split("/");
        return new Date(`${year}-${month}-${day}`);
    }
}

async function renderSearchField() {
    let searchfeildDOM = document.querySelector("#searchField");
    searchfeildDOM.classList.toggle("hiddenSearch");
    searchfeildDOM.classList.toggle("visible-search");
}
async function displayComics(comics, value) {
    if (value === false) {
        // Fetch all comics
        let response = await fetch("api/data/users.json");
        let resource = await response.json();
        let allComics = resource.flatMap(user => user[0].comics);
        let boxCards = document.querySelector("#cards");
        boxCards.innerHTML = ``;

        createCard(boxCards, allComics)
    } else {
        // Display matching comics
        let boxCards = document.querySelector("#cards");
        boxCards.innerHTML = ``;
        createCard(boxCards, comics)
        // comics.forEach(comic => createCard(boxCards, comic));
    }
}

function toggleDropdown(event) {
    const dropdownDiv = event.currentTarget.lastElementChild;
    dropdownDiv.classList.toggle("hiddenFilters");
    const rotateIcon = event.currentTarget.querySelector('.rotate-icon');
    rotateIcon.classList.toggle("rotate");
}

function createFilterPage(value, container) {

    let count = 0;

    document.querySelector("body").style.overflow = "hidden";

    let containerFilter = document.createElement("div");
    containerFilter.classList.add("containerFilterBig")
    document.querySelector("body").append(containerFilter);

    containerFilter.offsetWidth;
    containerFilter.offsetWidth;
    setTimeout(() => {
        containerFilter.classList.add("open");
    }, 200)



    containerFilter.innerHTML = `
    <div id="containerFilterBigTop">
        <p> Clear filters </p> 
        <img src="./images/cross.svg" class="close">
    </div>
    <div id="allFilters">
    <h1>Format</h1>
            <div id="formatContainer">
             </div>
             <h1>Material</h1>
             <div id="materialContainer">
            </div>
            <h1>Style</h1>
             <div id="styleContainer">
             </div>
        </div>
    </div>
    `;

    for (const key in Materials) {
        const mainCategoryDiv = document.createElement("div");
        const mainCategoryDivContent = document.createElement("div");
        mainCategoryDivContent.classList.add("headerMaterial");
        const mainTextDOM = document.createElement("p");
        mainTextDOM.textContent = `${key}`;
        const mainImgDOM = document.createElement("img");
        mainImgDOM.src = "./images/Arrow.svg";
        mainImgDOM.classList.add("rotate-icon")
        mainCategoryDivContent.append(mainTextDOM);
        mainCategoryDivContent.append(mainImgDOM);
        mainCategoryDiv.append(mainCategoryDivContent);
        mainCategoryDiv.setAttribute("id", key);
        mainCategoryDiv.classList.add("material");
        mainCategoryDiv.addEventListener("click", toggleDropdown);
        let mainComponent = document.querySelector("#materialContainer");
        mainComponent.append(mainCategoryDiv);

        const dropdownDiv = document.createElement("div");
        dropdownDiv.classList.add("hiddenFilters");
        dropdownDiv.classList.add("filterContainer");

        Materials[key].forEach(filter => {
            const div = document.createElement("div");
            div.setAttribute("id", filter);
            div.textContent = filter;
            dropdownDiv.append(div);

            div.addEventListener("click", async (event) => {
                // event.target.classList.toggle("hiddenFilters");
                event.target.classList.add("selected");
                if (container) {
                    createFilterDOM(event.target.innerText, container);
                }


                if (value === true) {
                    let filter = filterFunction(event);

                    let response = await fetch("api/data/users.json");
                    let resource = await response.json();

                    let matchingComics = [];

                    resource.forEach(user => {
                        if (user[0].comics.length >= 1) {
                            let comics = [...user[0].comics];

                            comics.forEach(comic => {
                                console.log(comic.filters);
                                let filtersInComicArray = comic.filters.map(filter => filter.trim().toLowerCase());

                                console.log(filtersInComicArray);

                                // Check if there's an intersection between filtersInComicArray and the selected filters
                                if (filter.some(filterItem => filtersInComicArray.includes(filterItem.toLowerCase()))) {
                                    // At least one similar filter found
                                    matchingComics.push(comic);
                                } else {
                                    console.log("Filters not found");
                                }
                            });
                        }
                    });
                    let localFilter = localStorage.getItem("filters");
                    let parse = JSON.parse(localFilter)

                    let filtersInComic = parse.replace(/[\[\]"]+/g, ' ').trim();
                    let filtersInComicCorrectArray = filtersInComic.split(',').map(filter => filter.trim());

                    if (filtersInComicCorrectArray.length >= 1) {
                        document.querySelector("#filter").textContent = "FILTERS";

                        for (let i = 0; i < filtersInComicCorrectArray.length; i++) {

                            count++
                        }
                    }

                    console.log(filtersInComicCorrectArray);
                    document.querySelector("#filter").textContent = `FILTERS (${filtersInComicCorrectArray.length})`;


                    // document.querySelector("#filter").textContent += `(${matchingComics.length})`;

                    let boxCards = document.querySelector("#cards");
                    boxCards.innerHTML = ``;
                    createCard(boxCards, matchingComics);

                    // let localFilter = localStorage.getItem("filters");
                    // let parse = JSON.parse(localFilter)
                    // // console.log(JSON.parse(localFilter));

                    // let filtersInComic = parse.replace(/[\[\]"]+/g, ' ').trim();
                    // let filtersInComicArray = filtersInComic.split(',').map(filter => filter.trim());
                    // console.log(filtersInComicArray);


                    // if (filtersInComicArray.length >= 1) {
                    //     document.querySelector("#filter").textContent = "FILTERS";

                    //     for (let i = 0; i < filtersInComicArray.length; i++) {

                    //         count++
                    //     }
                    // }




                }
            });
        });
        mainCategoryDiv.appendChild(dropdownDiv);
    }

    document.querySelector("#containerFilterBigTop > p").addEventListener("click", async () => {

        let response = await fetch("api/data/users.json");
        let resource = await response.json();

        let allComics = [];

        resource.forEach(user => {
            if (user[0].comics.length >= 1) {
                let comics = [...user[0].comics];

                comics.forEach(comic => {
                    allComics.push(comic);
                });
            }
        })

        let selected = document.querySelectorAll(".selected");
        console.log(selected);
        selected.forEach(filter => {
            filter.classList.remove("selected");
        })

        document.querySelector("#filter").textContent = "FILTERS";

        let boxCards = document.querySelector("#cards");
        boxCards.innerHTML = ``;
        createCard(boxCards, allComics);

    });


    //
    Styles.forEach(filter => {
        const divDom = document.createElement("div");
        divDom.textContent = filter;
        divDom.setAttribute("id", filter);
        divDom.addEventListener("click", async (event) => {
            event.target.classList.toggle("selected");
            if (container) {
                createFilterDOM(event.target.innerText, container);
            }

            if (value === true) {
                let filter = filterFunction(event);
                let response = await fetch("api/data/users.json");
                let resource = await response.json();
                let matchingComics = [];


                resource.forEach(user => {
                    if (user[0].comics.length >= 1) {
                        let comics = [...user[0].comics];

                        comics.forEach(comic => {
                            console.log(comic.filters);
                            let filtersInComicArray = comic.filters.map(filter => filter.trim().toLowerCase());

                            console.log(filtersInComicArray);

                            // Check if there's an intersection between filtersInComicArray and the selected filters
                            if (filter.some(filterItem => filtersInComicArray.includes(filterItem.toLowerCase()))) {
                                // At least one similar filter found
                                matchingComics.push(comic);
                            } else {
                                console.log("Filters not found");
                            }
                        });
                    }
                });


                let localFilter = localStorage.getItem("filters");
                let parse = JSON.parse(localFilter)

                let filtersInComic = parse.replace(/[\[\]"]+/g, ' ').trim();
                let filtersInComicCorrectArray = filtersInComic.split(',').map(filter => filter.trim());

                if (filtersInComicCorrectArray.length >= 1) {
                    document.querySelector("#filter").textContent = "FILTERS";

                    for (let i = 0; i < filtersInComicCorrectArray.length; i++) {

                        count++
                    }
                }

                document.querySelector("#filter").textContent = `FILTERS (${filtersInComicCorrectArray.length})`;

                // document.querySelector("#filter").textContent += `(${matchingComics.length})`;
                // console.log(matchingComics.length);
                let boxCards = document.querySelector("#cards");
                boxCards.innerHTML = ``;
                createCard(boxCards, matchingComics);
                // console.log("Matching Comics:", matchingComics);
            }
        });

        document.querySelector("#styleContainer").append(divDom);
    });

    Format.forEach(filter => {
        const divDom = document.createElement("div");
        divDom.textContent = filter;
        divDom.setAttribute("id", filter);
        divDom.addEventListener("click", async (event) => {
            event.target.classList.toggle("selected");
            if (container) {
                createFilterDOM(event.target.innerText, container);
            }

            if (value === true) {
                let filter = filterFunction(event);
                let response = await fetch("api/data/users.json");
                let resource = await response.json();
                let matchingComics = [];

                // resource.forEach(user => {
                //     if (user[0].comics.length >= 1) {
                //         let comics = [...user[0].comics];

                //         comics.forEach(comic => {
                //             let filtersInComic = comic.filters.replace(/[\[\]"]+/g, ' ').trim();
                //             let filtersInComicArray = filtersInComic.split(',').map(filter => filter.trim());

                //             if (filter.some(filterItem => filtersInComicArray.some(comicFilter => comicFilter.toLowerCase().indexOf(filterItem.toLowerCase()) !== -1))) {
                //                 // console.log("Found at least one similar filter");
                //                 // console.log(comic);
                //                 matchingComics.push(comic);
                //             } else {
                //                 // console.log("Filters not found");
                //             }
                //         });
                //     }
                // });

                resource.forEach(user => {
                    if (user[0].comics.length >= 1) {
                        let comics = [...user[0].comics];

                        comics.forEach(comic => {
                            let filtersInComicArray = comic.filters.map(filter => filter.trim().toLowerCase());

                            // Check if there's an intersection between filtersInComicArray and the selected filters
                            if (filter.some(filterItem => filtersInComicArray.includes(filterItem.toLowerCase()))) {
                                // At least one similar filter found
                                matchingComics.push(comic);
                            } else {
                                console.log("Filters not found");
                            }
                        });
                    }
                });

                let localFilter = localStorage.getItem("filters");
                let parse = JSON.parse(localFilter)

                let filtersInComic = parse.replace(/[\[\]"]+/g, ' ').trim();
                let filtersInComicCorrectArray = filtersInComic.split(',').map(filter => filter.trim());

                if (filtersInComicCorrectArray.length >= 1) {
                    document.querySelector("#filter").textContent = "FILTERS";

                    for (let i = 0; i < filtersInComicCorrectArray.length; i++) {

                        count++
                    }
                }

                document.querySelector("#filter").textContent = `FILTERS (${filtersInComicCorrectArray.length})`;

                let boxCards = document.querySelector("#cards");
                boxCards.innerHTML = ``;
                createCard(boxCards, matchingComics);

            }
        });

        document.querySelector("#formatContainer").append(divDom);
    });


    document.querySelector(".close").addEventListener("click", () => {
        let nodeList = document.querySelectorAll(".selected");
        let idNames = [];
        nodeList.forEach(element => {
            idNames.push(element.id);

            localStorager.set_item("newComicFilters", idNames)
        });
        containerFilter.remove();

        document.querySelector("body").style.overflow = "scroll";


    })
}

function createFilterDOM(target, container) {
    let chosenFilter = document.createElement("div");
    let filterP = document.createElement("p");
    let cross = document.createElement("img");
    cross.src = "./images/cross.svg";
    chosenFilter.classList.add("selectedDOM");
    let uppercaseStr = target.toUpperCase();
    filterP.textContent = uppercaseStr;
    chosenFilter.append(filterP)
    chosenFilter.append(cross);
    document.querySelector("#filterContainerDOM").append(chosenFilter);
    // container.append(chosenFilter);

    cross.addEventListener("click", () => {
        chosenFilter.remove();
    })

}

