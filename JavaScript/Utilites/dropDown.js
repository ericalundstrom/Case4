// async function createFilterDropdowns(container, value) {

//     const response = await fetch("api/data/filters.json");
//     let filterData = await response.json();

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
//                         let comics = [];
//                         resourse.forEach(user => {
//                             if (user[0].comics.length >= 1) {

//                                 for (let i = 0; i < user[0].comics.length; i++) {

//                                     comics.push(user[0].comics[i]);
//                                     // console.log(comics);
//                                 }
//                                 // Create an array to store matching comics
//                                 let matchingComics = [];

//                                 for (let j = 0; j < comics.length; j++) {
//                                     let filtersInComic = comics[j].filters.replace(/[\[\]"]+/g, ' ').trim();
//                                     console.log("Filters in Comic:", filtersInComic);

//                                     // Split filtersInComic into an array of individual filters
//                                     let filtersInComicArray = filtersInComic.split(',').map(filter => filter.trim());

//                                     // Check if all filters in filter array are present in filtersInComicArray
//                                     if (filter.every(filterItem => filtersInComicArray.some(comicFilter => comicFilter.toLowerCase().indexOf(filterItem.toLowerCase()) !== -1))) {
//                                         console.log("Found the same filters");
//                                         console.log(comics[j]); // Log the matching comic

//                                         // Push the matching comic into the array
//                                         matchingComics.push(comics[j]);
//                                     } else {
//                                         console.log("Filters not found");
//                                     }
//                                 }
//                                 console.log(matchingComics);
//                             }
//                         });
//                         // console.log(filter);
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
//                             let comics = [];
//                             resourse.forEach(user => {
//                                 if (user[0].comics.length >= 1) {

//                                     for (let i = 0; i < user[0].comics.length; i++) {

//                                         comics.push(user[0].comics[i]);
//                                     }
//                                     // Create an array to store matching comics
//                                     let matchingComics = [];

//                                     for (let j = 0; j < comics.length; j++) {
//                                         let filtersInComic = comics[j].filters.replace(/[\[\]"]+/g, ' ').trim();
//                                         console.log("Filters in Comic:", filtersInComic);

//                                         // Split filtersInComic into an array of individual filters
//                                         let filtersInComicArray = filtersInComic.split(',').map(filter => filter.trim());

//                                         // Check if all filters in filter array are present in filtersInComicArray
//                                         if (filter.every(filterItem => filtersInComicArray.some(comicFilter => comicFilter.toLowerCase().indexOf(filterItem.toLowerCase()) !== -1))) {
//                                             console.log("Found the same filters");
//                                             console.log(comics[j]); // Log the matching comic

//                                             // Push the matching comic into the array
//                                             matchingComics.push(comics[j]);
//                                         } else {
//                                             console.log("Filters not found");
//                                         }
//                                     }

//                                     // Now, you can use the matchingComics array as an argument for another function
//                                     // Example: sendMatchingComicsToAnotherFunction(matchingComics);



//                                     console.log(matchingComics);
//                                 }
//                             });
//                             // console.log(resourse);
//                             // console.log(filter);
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
//                                         let comics = [];
//                                         resourse.forEach(user => {
//                                             if (user[0].comics.length >= 1) {

//                                                 for (let i = 0; i < user[0].comics.length; i++) {

//                                                     comics.push(user[0].comics[i]);
//                                                 }
//                                                 // Create an array to store matching comics
//                                                 let matchingComics = [];

//                                                 for (let j = 0; j < comics.length; j++) {
//                                                     let filtersInComic = comics[j].filters.replace(/[\[\]"]+/g, ' ').trim();
//                                                     console.log("Filters in Comic:", filtersInComic);

//                                                     // Split filtersInComic into an array of individual filters
//                                                     let filtersInComicArray = filtersInComic.split(',').map(filter => filter.trim());

//                                                     // Check if all filters in filter array are present in filtersInComicArray
//                                                     if (filter.every(filterItem => filtersInComicArray.some(comicFilter => comicFilter.toLowerCase().indexOf(filterItem.toLowerCase()) !== -1))) {
//                                                         console.log("Found the same filters");
//                                                         console.log(comics[j]); // Log the matching comic

//                                                         // Push the matching comic into the array
//                                                         matchingComics.push(comics[j]);
//                                                     } else {
//                                                         console.log("Filters not found");
//                                                     }
//                                                 }

//                                                 // Now, you can use the matchingComics array as an argument for another function
//                                                 // Example: sendMatchingComicsToAnotherFunction(matchingComics);


//                                                 console.log(matchingComics);
//                                             }
//                                         });
//                                         // console.log(resourse);
//                                         // console.log(filter);
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

// let filter = [];

// function filterFunction(target) {
//     let newFilter = target.target.innerText;
//     const index = filter.indexOf(newFilter);
//     if (index !== -1) {
//         filter.splice(index, 1);
//     } else {
//         filter.push(newFilter);
//     }


//     localStorager.set_item("filters", JSON.stringify(filter))
//     console.log(filter);
//     return filter;


//     //    for (let i = 0; i < filter.length; i++) {
//     //        if (filter[i] === newFilter) {
//     //            filter.splice(i, 1);
//     //            console.log(filter);
//     //            return;
//     //        }
//     //    }

// }




async function createFilterDropdowns(container, value) {
    const response = await fetch("api/data/filters.json");
    let filterData = await response.json();

    // Create an array to store matching comics
    let matchingComics = [];

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
                    optionDOM.addEventListener("click", async (event) => {
                        event.target.classList.toggle("filter");
                        // filterFunction(event);
                        let filter = filterFunction(event);
                        let respons = await fetch("api/data/users.json");
                        let resourse = await respons.json();

                        // Reset matchingComics array for each option click
                        matchingComics = [];

                        resourse.forEach(user => {
                            if (user[0].comics.length >= 1) {
                                // Move the comics array outside the loop to avoid re-initialization
                                let comics = [];

                                for (let i = 0; i < user[0].comics.length; i++) {
                                    comics.push(user[0].comics[i]);
                                }

                                for (let j = 0; j < comics.length; j++) {
                                    let filtersInComic = comics[j].filters.replace(/[\[\]"]+/g, ' ').trim();
                                    console.log("Filters in Comic:", filtersInComic);

                                    // Split filtersInComic into an array of individual filters
                                    let filtersInComicArray = filtersInComic.split(',').map(filter => filter.trim());

                                    // Check if at least one filter in filter array is present in filtersInComicArray
                                    if (filter.some(filterItem => filtersInComicArray.some(comicFilter => comicFilter.toLowerCase().indexOf(filterItem.toLowerCase()) !== -1))) {
                                        console.log("Found at least one similar filter");
                                        console.log(comics[j]); // Log the matching comic

                                        // Push the matching comic into the array
                                        matchingComics.push(comics[j]);
                                    } else {
                                        console.log("Filters not found");
                                    }
                                }
                            }
                        });

                        // Now, you can use the matchingComics array as needed
                        console.log("Matching Comics:", matchingComics);
                    });
                } else if (typeof option === "object" && option !== null) {
                    for (const subCategory in option) {
                        const subCategoryDOM = document.createElement("div");
                        subCategoryDOM.textContent = subCategory;
                        subCategoryDOM.addEventListener("click", async (event) => {
                            event.target.classList.toggle("filter");
                            // filterFunction(event);
                            let filter = filterFunction(event);

                            let respons = await fetch("api/data/users.json");
                            let resourse = await respons.json();

                            // Reset matchingComics array for each subcategory click
                            matchingComics = [];

                            resourse.forEach(user => {
                                if (user[0].comics.length >= 1) {
                                    // Move the comics array outside the loop to avoid re-initialization
                                    let comics = [];

                                    for (let i = 0; i < user[0].comics.length; i++) {
                                        comics.push(user[0].comics[i]);
                                    }

                                    for (let j = 0; j < comics.length; j++) {
                                        let filtersInComic = comics[j].filters.replace(/[\[\]"]+/g, ' ').trim();
                                        console.log("Filters in Comic:", filtersInComic);

                                        // Split filtersInComic into an array of individual filters
                                        let filtersInComicArray = filtersInComic.split(',').map(filter => filter.trim());

                                        // Check if at least one filter in filter array is present in filtersInComicArray
                                        if (filter.some(filterItem => filtersInComicArray.some(comicFilter => comicFilter.toLowerCase().indexOf(filterItem.toLowerCase()) !== -1))) {
                                            console.log("Found at least one similar filter");
                                            console.log(comics[j]); // Log the matching comic

                                            // Push the matching comic into the array
                                            matchingComics.push(comics[j]);
                                        } else {
                                            console.log("Filters not found");
                                        }
                                    }
                                }
                            });

                            // Now, you can use the matchingComics array as needed
                            console.log("Matching Comics:", matchingComics);
                        });
                        dropDownDOM.append(subCategoryDOM);

                        const subOptions = option[subCategory];
                        if (Array.isArray(subOptions)) {
                            subOptions.forEach(subOption => {
                                const subOptionDOM = document.createElement("div");
                                subOptionDOM.textContent = subOption;
                                subOptionDOM.addEventListener("click", async (event) => {
                                    event.target.classList.toggle("filter");
                                    if (value === true) {
                                        // filterFunction(event);
                                        let filter = filterFunction(event);

                                        let respons = await fetch("api/data/users.json");
                                        let resourse = await respons.json();

                                        // Reset matchingComics array for each suboption click
                                        matchingComics = [];

                                        resourse.forEach(user => {
                                            if (user[0].comics.length >= 1) {
                                                // Move the comics array outside the loop to avoid re-initialization
                                                let comics = [];

                                                for (let i = 0; i < user[0].comics.length; i++) {
                                                    comics.push(user[0].comics[i]);
                                                }

                                                for (let j = 0; j < comics.length; j++) {
                                                    let filtersInComic = comics[j].filters.replace(/[\[\]"]+/g, ' ').trim();
                                                    console.log("Filters in Comic:", filtersInComic);

                                                    // Split filtersInComic into an array of individual filters
                                                    let filtersInComicArray = filtersInComic.split(',').map(filter => filter.trim());

                                                    // Check if at least one filter in filter array is present in filtersInComicArray
                                                    if (filter.some(filterItem => filtersInComicArray.some(comicFilter => comicFilter.toLowerCase().indexOf(filterItem.toLowerCase()) !== -1))) {
                                                        console.log("Found at least one similar filter");
                                                        console.log(comics[j]); // Log the matching comic

                                                        // Push the matching comic into the array
                                                        matchingComics.push(comics[j]);
                                                    } else {
                                                        console.log("Filters not found");
                                                    }
                                                }
                                            }
                                        });

                                        // Now, you can use the matchingComics array as needed
                                        console.log("Matching Comics:", matchingComics);
                                    }
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
