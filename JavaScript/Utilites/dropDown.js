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
    // console.log(filter);
    return filter;
}




let Themes = [

    "Identity",
    "Fantasy",
    "Love",
    "Mystery",
    "Education",
    "Horror",
    "Science fiction",
    "Satire"
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
let Styles =  [
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
    <div id="themes"></div>
    <div id="rightHandSide">
        <img id="search" src="../images/search.png"></img>
        <div id=rightBottom>
            <div id="filter">Filters</div>
            <div id="sortComics">Sort by</div>
        </div>
        <div class="strokeFilters"></div>
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
                            let filtersInComic = comic.filters.replace(/[\[\]"]+/g, ' ').trim();
                            let filtersInComicArray = filtersInComic.split(',').map(filter => filter.trim());

                            if (filter.some(filterItem => filtersInComicArray.some(comicFilter => comicFilter.toLowerCase().indexOf(filterItem.toLowerCase()) !== -1))) {
                                // console.log("Found at least one similar filter");
                                // console.log(comic);
                                matchingComics.push(comic);
                            } else {
                                // console.log("Filters not found");
                            }
                        });
                    }
                });

                // console.log(matchingComics.length);
                let boxCards = document.querySelector("#cards");
                boxCards.innerHTML = ``;
                createCard(boxCards, matchingComics);
                // console.log("Matching Comics:", matchingComics);
            }
        });

        document.querySelector("#themes").append(divDom);
    });

    document.querySelector("#filter").addEventListener("click", () => {
        createFilterPage(value);
    })


    // SORT COMICS 
    const sortDropdownDiv = document.createElement("div");
    sortDropdownDiv.classList.add("hidden");
    sortDropdownDiv.classList.add("filterContainer");

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
        // console.log(matchingComics);

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
    dropdownDiv.classList.toggle("hidden");
}

function createFilterPage (value){

    let containerFilter = document.createElement("div");
    containerFilter.classList.add("containerFilter")
    document.querySelector("body").append(containerFilter);

       containerFilter.offsetWidth;
               containerFilter.offsetWidth;
    setTimeout(() => {
        containerFilter.classList.add("open");
    }, 200)

    
  


    containerFilter.innerHTML = `
    <p> Clear filters </p>
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
    <div class="close">close</div>
    `;

        for (const key in Materials) {
        const mainCategoryDiv = document.createElement("div");
        mainCategoryDiv.textContent = `${key} v`;
        mainCategoryDiv.setAttribute("id", key);
        mainCategoryDiv.classList.add("material");
        mainCategoryDiv.addEventListener("click", toggleDropdown);
        document.querySelector("#materialContainer").append(mainCategoryDiv);

        const dropdownDiv = document.createElement("div");
        dropdownDiv.classList.add("hidden");
        dropdownDiv.classList.add("filterContainer");

        Materials[key].forEach(filter => {
            const div = document.createElement("div");
            div.textContent = filter;
            dropdownDiv.append(div);

            div.addEventListener("click", async (event) => {
                // event.target.classList.toggle("filter");
                event.target.classList.add("selected");

                if (value === true) {
                    let filter = filterFunction(event);

                    let response = await fetch("api/data/users.json");
                    let resource = await response.json();

                    let matchingComics = [];

                    resource.forEach(user => {
                        if (user[0].comics.length >= 1) {
                            let comics = [...user[0].comics];

                            comics.forEach(comic => {
                                let filtersInComic = comic.filters.replace(/[\[\]"]+/g, ' ').trim();
                                let filtersInComicArray = filtersInComic.split(',').map(filter => filter.trim());

                                if (filter.some(filterItem => filtersInComicArray.some(comicFilter => comicFilter.toLowerCase().indexOf(filterItem.toLowerCase()) !== -1))) {
                                    // console.log("Found at least one similar filter");
                                    // console.log(comic);
                                    matchingComics.push(comic);
                                } else {
                                    console.log("Filters not found");
                                }
                            });
                        }
                    });


                    // console.log(matchingComics.length);
                    let boxCards = document.querySelector("#cards");
                    boxCards.innerHTML = ``;
                    createCard(boxCards, matchingComics);
                    // console.log("Matching Comics:", matchingComics);
                }
            });
        });
        mainCategoryDiv.appendChild(dropdownDiv);
    }
//
     Styles.forEach(filter => {
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
                            let filtersInComic = comic.filters.replace(/[\[\]"]+/g, ' ').trim();
                            let filtersInComicArray = filtersInComic.split(',').map(filter => filter.trim());

                            if (filter.some(filterItem => filtersInComicArray.some(comicFilter => comicFilter.toLowerCase().indexOf(filterItem.toLowerCase()) !== -1))) {
                                // console.log("Found at least one similar filter");
                                // console.log(comic);
                                matchingComics.push(comic);
                            } else {
                                // console.log("Filters not found");
                            }
                        });
                    }
                });

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

            if (value === true) {
                let filter = filterFunction(event);
                let response = await fetch("api/data/users.json");
                let resource = await response.json();
                let matchingComics = [];

                resource.forEach(user => {
                    if (user[0].comics.length >= 1) {
                        let comics = [...user[0].comics];

                        comics.forEach(comic => {
                            let filtersInComic = comic.filters.replace(/[\[\]"]+/g, ' ').trim();
                            let filtersInComicArray = filtersInComic.split(',').map(filter => filter.trim());

                            if (filter.some(filterItem => filtersInComicArray.some(comicFilter => comicFilter.toLowerCase().indexOf(filterItem.toLowerCase()) !== -1))) {
                                // console.log("Found at least one similar filter");
                                // console.log(comic);
                                matchingComics.push(comic);
                            } else {
                                // console.log("Filters not found");
                            }
                        });
                    }
                });

                // console.log(matchingComics.length);
                let boxCards = document.querySelector("#cards");
                boxCards.innerHTML = ``;
                createCard(boxCards, matchingComics);
                // console.log("Matching Comics:", matchingComics);
            }
        });

        document.querySelector("#formatContainer").append(divDom);
    });


    document.querySelector(".close").addEventListener("click", () => {
        containerFilter.classList.add("removeFilter");
    })
}

