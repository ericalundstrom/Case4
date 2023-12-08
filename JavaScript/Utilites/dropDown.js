
// async function createFilterDropdowns(container, value) {
//     const response = await fetch("api/data/filters.json");
//     let filterData = await response.json();

//     // Create an array to store matching comics
//     let matchingComics = [];

//     for (const key in filterData) {
//         const dropDownDOM = document.createElement("div");
//         dropDownDOM.classList.add("dropDown");
//         dropDownDOM.classList.add("hidden");

//         let contentButtonDom = document.createElement("div");
//         contentButtonDom.textContent = key;
//         contentButtonDom.classList.add(key);
//         contentButtonDom.classList.add("filterButton");
//         container.append(contentButtonDom);

//         if (Array.isArray(filterData[key])) {
//             filterData[key].forEach(option => {
//                 const optionDOM = document.createElement("div");
//                 if (typeof option === "string") {
//                     optionDOM.textContent = option;
//                     optionDOM.addEventListener("click", async (event) => {
//                         event.target.classList.toggle("filter");
//                         // filterFunction(event);
//                         let filter = filterFunction(event);
//                         let respons = await fetch("api/data/users.json");
//                         let resourse = await respons.json();

//                         // Reset matchingComics array for each option click
//                         matchingComics = [];

//                         resourse.forEach(user => {
//                             if (user[0].comics.length >= 1) {
//                                 // Move the comics array outside the loop to avoid re-initialization
//                                 let comics = [];

//                                 for (let i = 0; i < user[0].comics.length; i++) {
//                                     comics.push(user[0].comics[i]);
//                                 }

//                                 for (let j = 0; j < comics.length; j++) {
//                                     let filtersInComic = comics[j].filters.replace(/[\[\]"]+/g, ' ').trim();
//                                     console.log("Filters in Comic:", filtersInComic);

//                                     // Split filtersInComic into an array of individual filters
//                                     let filtersInComicArray = filtersInComic.split(',').map(filter => filter.trim());

//                                     // Check if at least one filter in filter array is present in filtersInComicArray
//                                     if (filter.some(filterItem => filtersInComicArray.some(comicFilter => comicFilter.toLowerCase().indexOf(filterItem.toLowerCase()) !== -1))) {
//                                         console.log("Found at least one similar filter");
//                                         console.log(comics[j]); // Log the matching comic

//                                         // Push the matching comic into the array
//                                         matchingComics.push(comics[j]);
//                                     } else {
//                                         console.log("Filters not found");
//                                     }
//                                 }
//                             }
//                         });

//                         // Now, you can use the matchingComics array as needed
//                         console.log("Matching Comics:", matchingComics);
//                     });
//                 } else if (typeof option === "object" && option !== null) {
//                     for (const subCategory in option) {
//                         const subCategoryDOM = document.createElement("div");
//                         subCategoryDOM.textContent = subCategory;
//                         subCategoryDOM.addEventListener("click", async (event) => {
//                             event.target.classList.toggle("filter");
//                             // filterFunction(event);
//                             let filter = filterFunction(event);

//                             let respons = await fetch("api/data/users.json");
//                             let resourse = await respons.json();

//                             // Reset matchingComics array for each subcategory click
//                             matchingComics = [];

//                             resourse.forEach(user => {
//                                 if (user[0].comics.length >= 1) {
//                                     // Move the comics array outside the loop to avoid re-initialization
//                                     let comics = [];

//                                     for (let i = 0; i < user[0].comics.length; i++) {
//                                         comics.push(user[0].comics[i]);
//                                     }

//                                     for (let j = 0; j < comics.length; j++) {
//                                         let filtersInComic = comics[j].filters.replace(/[\[\]"]+/g, ' ').trim();
//                                         console.log("Filters in Comic:", filtersInComic);

//                                         // Split filtersInComic into an array of individual filters
//                                         let filtersInComicArray = filtersInComic.split(',').map(filter => filter.trim());

//                                         // Check if at least one filter in filter array is present in filtersInComicArray
//                                         if (filter.some(filterItem => filtersInComicArray.some(comicFilter => comicFilter.toLowerCase().indexOf(filterItem.toLowerCase()) !== -1))) {
//                                             console.log("Found at least one similar filter");
//                                             console.log(comics[j]); // Log the matching comic

//                                             // Push the matching comic into the array
//                                             matchingComics.push(comics[j]);
//                                         } else {
//                                             console.log("Filters not found");
//                                         }
//                                     }
//                                 }
//                             });

//                             // Now, you can use the matchingComics array as needed
//                             console.log("Matching Comics:", matchingComics);
//                         });
//                         dropDownDOM.append(subCategoryDOM);

//                         const subOptions = option[subCategory];
//                         if (Array.isArray(subOptions)) {
//                             subOptions.forEach(subOption => {
//                                 const subOptionDOM = document.createElement("div");
//                                 subOptionDOM.textContent = subOption;
//                                 subOptionDOM.addEventListener("click", async (event) => {
//                                     event.target.classList.toggle("filter");
//                                     if (value === true) {
//                                         // filterFunction(event);
//                                         let filter = filterFunction(event);

//                                         let respons = await fetch("api/data/users.json");
//                                         let resourse = await respons.json();

//                                         // Reset matchingComics array for each suboption click
//                                         matchingComics = [];

//                                         resourse.forEach(user => {
//                                             if (user[0].comics.length >= 1) {
//                                                 // Move the comics array outside the loop to avoid re-initialization
//                                                 let comics = [];

//                                                 for (let i = 0; i < user[0].comics.length; i++) {
//                                                     comics.push(user[0].comics[i]);
//                                                 }

//                                                 for (let j = 0; j < comics.length; j++) {
//                                                     let filtersInComic = comics[j].filters.replace(/[\[\]"]+/g, ' ').trim();
//                                                     console.log("Filters in Comic:", filtersInComic);

//                                                     // Split filtersInComic into an array of individual filters
//                                                     let filtersInComicArray = filtersInComic.split(',').map(filter => filter.trim());

//                                                     // Check if at least one filter in filter array is present in filtersInComicArray
//                                                     if (filter.some(filterItem => filtersInComicArray.some(comicFilter => comicFilter.toLowerCase().indexOf(filterItem.toLowerCase()) !== -1))) {
//                                                         console.log("Found at least one similar filter");
//                                                         console.log(comics[j]); // Log the matching comic

//                                                         // Push the matching comic into the array
//                                                         matchingComics.push(comics[j]);
//                                                     } else {
//                                                         console.log("Filters not found");
//                                                     }
//                                                 }
//                                             }
//                                         });

//                                         // Now, you can use the matchingComics array as needed
//                                         console.log("Matching Comics:", matchingComics);
//                                     }
//                                 });
//                                 dropDownDOM.append(subOptionDOM);
//                             });
//                         }
//                     }
//                 }

//                 dropDownDOM.append(optionDOM);
//             });
//         }

//         contentButtonDom.addEventListener("click", () => {
//             contentButtonDom.classList.toggle("selected");
//             dropDownDOM.classList.toggle("hidden");
//         });

//         contentButtonDom.append(dropDownDOM);
//     }
// }

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

    "Identity",
    "Fantasy",
    "Love",
    "Friends",
    "Mystery",
    "Education",
    "Horror",
    "Science fiction",
    "Satire"
];
let filterLeft = {
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

let filterRight = {
    "Styles": [
        "Fable",
        "Manga",
        "Alternative",
        "Super-hero",
        "Non-fiction",
        "Slice of life",
    ],

    "formats": [
        "One-frame",
        "Webcomic",
        "Story-telling",
        "Strip-comic",
        "Part of novel"
    ]
}



async function createFilterDropdowns(container, value) {
    container.innerHTML = `
        <div class="stroke"></div>
        <div id="themes"></div>
        <div class="stroke"></div>
        <div id="filterLeft"></div>
        <div id="filterRight"></div>
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
                                console.log("Found at least one similar filter");
                                console.log(comic);
                                matchingComics.push(comic);
                            } else {
                                console.log("Filters not found");
                            }
                        });
                    }
                });

                console.log(matchingComics.length);
                let boxCards = document.querySelector("#cards");
                boxCards.innerHTML = ``;
                createCard(boxCards, matchingComics);
                console.log("Matching Comics:", matchingComics);
            }
            // }
        });

        document.querySelector("#themes").append(divDom);
    });

    for (const key in filterLeft) {
        const mainCategoryDiv = document.createElement("div");
        mainCategoryDiv.textContent = `${key} v`;
        mainCategoryDiv.setAttribute("id", key);
        mainCategoryDiv.addEventListener("click", toggleDropdown);
        document.querySelector("#filterLeft").append(mainCategoryDiv);

        const dropdownDiv = document.createElement("div");
        dropdownDiv.classList.add("hidden");
        dropdownDiv.classList.add("filterContainer");

        filterLeft[key].forEach(filter => {
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
                                    console.log("Found at least one similar filter");
                                    console.log(comic);
                                    matchingComics.push(comic);
                                } else {
                                    console.log("Filters not found");
                                }
                            });
                        }
                    });


                    console.log(matchingComics.length);
                    let boxCards = document.querySelector("#cards");
                    boxCards.innerHTML = ``;
                    createCard(boxCards, matchingComics);
                    console.log("Matching Comics:", matchingComics);
                }
            });
        });

        mainCategoryDiv.appendChild(dropdownDiv);
    }

    for (const key in filterRight) {
        const mainCategoryDiv = document.createElement("div");
        mainCategoryDiv.textContent = `${key} v`;
        mainCategoryDiv.setAttribute("id", key);
        mainCategoryDiv.addEventListener("click", toggleDropdown);
        document.querySelector("#filterRight").append(mainCategoryDiv);

        const dropdownDiv = document.createElement("div");
        dropdownDiv.classList.add("hidden");
        dropdownDiv.classList.add("filterContainer");

        filterRight[key].forEach(filter => {
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
                                    console.log("Found at least one similar filter");
                                    console.log(comic);
                                    matchingComics.push(comic);
                                } else {
                                    console.log("Filters not found");
                                }
                            });
                        }
                    });

                    console.log(matchingComics.length);
                    let boxCards = document.querySelector("#cards");
                    boxCards.innerHTML = ``;
                    createCard(boxCards, matchingComics);
                    console.log("Matching Comics:", matchingComics);
                }
            });
        });
        mainCategoryDiv.appendChild(dropdownDiv);
    }
}

async function createFilterDropdowns(container, value) {
    let n = 0;

    container.innerHTML = `
        <div class="stroke"></div>
        <div id="themes"></div>
        <div class="stroke"></div>
        <div id="filterLeft"></div>
        <div id="filterRight"></div>
    `;

    let filtersSelected = false;

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

                filtersSelected = true;  // Filters are selected

                resource.forEach(user => {
                    if (user[0].comics.length >= 1) {
                        let comics = [...user[0].comics];

                        comics.forEach(comic => {
                            let filtersInComic = comic.filters.replace(/[\[\]"]+/g, ' ').trim();
                            let filtersInComicArray = filtersInComic.split(',').map(filter => filter.trim());

                            if (filter.some(filterItem => filtersInComicArray.some(comicFilter => comicFilter.toLowerCase().indexOf(filterItem.toLowerCase()) !== -1))) {
                                console.log("Found at least one similar filter");
                                console.log(comic);
                                matchingComics.push(comic);
                            } else {
                                console.log("Filters not found");
                                n++;
                                console.log(n);
                            }
                        });
                    }
                });

                console.log(matchingComics.length);
                let boxCards = document.querySelector("#cards");
                boxCards.innerHTML = ``;
                createCard(boxCards, matchingComics);
                console.log("Matching Comics:", matchingComics);
            } else {
                // No filter chosen, send all existing comics
                filtersSelected = false;  // No filters are selected
                n++;
                console.log(n);
            }
        });

        document.querySelector("#themes").append(divDom);
    });

    // Add filters for filterLeft
    for (const key in filterLeft) {
        const mainCategoryDiv = document.createElement("div");
        mainCategoryDiv.textContent = `${key} v`;
        mainCategoryDiv.setAttribute("id", key);
        mainCategoryDiv.addEventListener("click", toggleDropdown);
        document.querySelector("#filterLeft").append(mainCategoryDiv);

        const dropdownDiv = document.createElement("div");
        dropdownDiv.classList.add("hidden");
        dropdownDiv.classList.add("filterContainer");

        filterLeft[key].forEach(filter => {
            const div = document.createElement("div");
            div.textContent = filter;
            dropdownDiv.append(div);

            div.addEventListener("click", async (event) => {
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
                                    console.log("Found at least one similar filter");
                                    console.log(comic);
                                    matchingComics.push(comic);
                                } else {
                                    console.log("Filters not found");
                                    n++;
                                    console.log(n);
                                }
                            });
                        }
                    });

                    console.log(matchingComics.length);
                    let boxCards = document.querySelector("#cards");
                    boxCards.innerHTML = ``;
                    createCard(boxCards, matchingComics);
                    console.log("Matching Comics:", matchingComics);
                }
            });
        });

        // Append dropdown directly to the main category
        mainCategoryDiv.appendChild(dropdownDiv);
    }

    // Add filters for filterRight
    for (const key in filterRight) {
        const mainCategoryDiv = document.createElement("div");
        mainCategoryDiv.textContent = `${key} v`;
        mainCategoryDiv.setAttribute("id", key);
        mainCategoryDiv.addEventListener("click", toggleDropdown);
        document.querySelector("#filterRight").append(mainCategoryDiv);

        const dropdownDiv = document.createElement("div");
        dropdownDiv.classList.add("hidden");
        dropdownDiv.classList.add("filterContainer");

        filterRight[key].forEach(filter => {
            const div = document.createElement("div");
            div.textContent = filter;
            dropdownDiv.append(div);

            div.addEventListener("click", async (event) => {
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
                                    console.log("Found at least one similar filter");
                                    console.log(comic);
                                    matchingComics.push(comic);
                                } else {
                                    console.log("Filters not found");
                                    n++;
                                    console.log(n);
                                }
                            });
                        }
                    });

                    if (n === 3) {
                        let response = await fetch("api/data/users.json");
                        let resource = await response.json();
                        let allComics = resource.flatMap(user => user[0].comics);
                        let boxCards = document.querySelector("#cards");
                        boxCards.innerHTML = ``;
                        createCard(boxCards, allComics);
                    }
                    console.log(matchingComics.length);
                    let boxCards = document.querySelector("#cards");
                    boxCards.innerHTML = ``;
                    createCard(boxCards, matchingComics);
                    console.log("Matching Comics:", matchingComics);
                }
            });
        });

        // Append dropdown directly to the main category
        mainCategoryDiv.appendChild(dropdownDiv);
    }

    console.log(filtersSelected);
    // If no filters are selected, fetch all comics
    // if (!filtersSelected) {
    //     let response = await fetch("api/data/users.json");
    //     let resource = await response.json();
    //     let allComics = resource.flatMap(user => user[0].comics);
    //     let boxCards = document.querySelector("#cards");
    //     boxCards.innerHTML = ``;
    //     createCard(boxCards, allComics);
    // }

    if (n === 3) {
        let response = await fetch("api/data/users.json");
        let resource = await response.json();
        let allComics = resource.flatMap(user => user[0].comics);
        let boxCards = document.querySelector("#cards");
        boxCards.innerHTML = ``;
        createCard(boxCards, allComics);
    }
}


function toggleDropdown(event) {
    const dropdownDiv = event.currentTarget.lastElementChild;
    dropdownDiv.classList.toggle("hidden");
}

