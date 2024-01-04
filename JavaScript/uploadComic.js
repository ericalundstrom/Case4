"use strict";

let dataToPublish = {};

async function renderUploadComic() {
    BasicLayout()
    swapStyleSheet("css/uploadComic.css");
    document.querySelector("body").style.backgroundImage = "url(/images/bkg/bkg/upload.svg)";

    document.querySelector("#wrapper").innerHTML = `
    <div id="headerUpload">
        <h1> UPLOAD </h1>
    </div>
    <div id="container">
        <div id="leftSide">
            <div id="frontPage">
                <div id="placeholderUpload">
                <img src="../images/UploadIcon.svg">
                    <p> Drag and drop to upload</p>   
                </div>    
            </div> 
        </div>
    <div id="rightSide"> 

        <input name="title" placeholder="Add title">
        <button id="filters"> Tags + </button>
        
        <div id="filterContainerDOM"></div>
        <label for="description"> Add description </label>
        <textarea name="description" required="required" id="description"></textarea>
        <div id="wordCounter">0/250</div>   
        </div>
    </div>
    <p class="errorMessage"></p>
     <div id="buttons">
        <button id="buttonPublish"> Upload now</button>
        <button id="buttonLayout">Add more pages</button>
    </div>

    `;

    const title = document.querySelector("input[name='title']");
    const description = document.querySelector("#description");
    const frontPage = document.querySelector("#frontPage")
    const errorM = document.querySelector(".errorMessage")


    const filterButtonDOM = document.querySelector("#filters");
    const filterDOM = document.querySelector("#filterContainerDOM");

    filterButtonDOM.addEventListener("click", async function () {

        createFilterPage(false, filterDOM)

    })

    //let descriptionInput = document.querySelector("input[name='description']");
    //const wordCounter = document.querySelector("#wordCounter");
    //const maxLength = parseInt(descriptionInput.getAttribute("maxlength"));
    //
    //descriptionInput.addEventListener('input', function() {
    //  const charactersUsed = descriptionInput.value.length;
    //  const charactersLeft = maxLength - charactersUsed;
    //  wordCounter.textContent = `Characters left: ${charactersLeft}`
    //});

    let comicFrontPage = await dragAndDropFirst(frontPage);
        dataToPublish["img1"] = comicFrontPage;

        document.querySelector("#buttonPublish").addEventListener("click", () => {

            if (dataToPublish["img1"].length === 0) {
                errorM.textContent = "Add a image to continue";
                setTimeout(() => {
                errorM.textContent = "";
            }, 2000);

            } else if (title.value === "") {
                errorM.textContent = "Add a title";
                setTimeout(() => {
                errorM.textContent = ""; 
            }, 2000);

            } else {
                dataToPublish["user"] = localStorager.get_item("user");
                dataToPublish["title"] = title.value;
                dataToPublish["filters"] = localStorager.get_item("newComicFilters");
                localStorager.remove_item("newComicFilters");
                if (description.value !== "") {
                    dataToPublish["description"] = description.value;
                }
                 
                renderPublishComic(dataToPublish)
            }
    })


    document.querySelector("#buttonLayout").addEventListener("click", () => {

        console.log(dataToPublish["img1"]);

        if (dataToPublish["img1"].length === 0) {
            errorM.textContent = "Add a image to continue";
            setTimeout(() => {
            errorM.textContent = "";
        }, 2000);

        } else if (title.value === "") {
            errorM.textContent = "Add a title";
            setTimeout(() => {
            errorM.textContent = ""; 
        }, 2000);

        } else {
            dataToPublish["user"] = localStorager.get_item("user");
            dataToPublish["title"] = title.value;
            dataToPublish["filters"] = localStorager.get_item("newComicFilters");
            localStorager.remove_item("newComicFilters");
            if (description.value !== "") {
                dataToPublish["description"] = description.value;
            }
            renderLayoutPage(dataToPublish);
        }
    })
}

async function renderLayoutPage(dataToPublish) {
     console.log(dataToPublish);

    swapStyleSheet("css/uploadComicsLayout.css");
    document.querySelector("body").style.backgroundImage = "url(/images/bkg/bkg/upload.svg)";

    document.querySelector("#wrapper").innerHTML = `
     <h1> UPLOAD </h1>
    <div id="topOfPage"> 
          <div id="infoIcon">Info</div> 
          <button id="toggleButton">Grid +</button>
        </div>

    <div id="gridContainer">
        <div class="pageLayout pageOne">
            <div id="placeholderUpload">
                <p> Drag and drop to upload</p>   
            </div>  
        </div>
        <div class="pageLayout pageTwo">
            <div id="placeholderUpload">
                <p> Drag and drop to upload</p>   
            </div>  
        </div>
          <div class="pageLayout hidden">
            <div id="placeholderUpload">
                <p> Drag and drop to upload</p>   
            </div>  
        </div>
         <div class="pageLayout hidden">
            <div id="placeholderUpload">
                <p> Drag and drop to upload</p>   
             </div>  
        </div>
        <div class="pageLayout hidden">
            <div id="placeholderUpload">
                 <p> Drag and drop to upload</p>   
             </div>  
        </div>
         <div class="pageLayout hidden">
            <div id="placeholderUpload">
                <p> Drag and drop to upload</p>   
            </div>  
        </div>
        <div class="pageLayout hidden">
            <div id="placeholderUpload">
                <p> Drag and drop to upload</p>   
            </div>  
        </div>
         <div class="pageLayout hidden">
            <div id="placeholderUpload">
                <p> Drag and drop to upload</p>   
             </div>  
        </div>
        
    </div>
      <div id="bottomOfPage"> 
          <button id="publish"> Upload</button>
           <button id="uploadMore"> Add more</button>
       </div>`;

    let hiddenElements = document.querySelectorAll(".pageLayout.hidden");
    let staticElement1 = document.querySelector(".pageOne");
    let staticElement2 = document.querySelector(".pageTwo");
    const fileContainers = document.querySelectorAll(".pageLayout");
    let comicContent = await dragAndDrop(fileContainers);

    document.querySelector("#toggleButton").addEventListener("click", () => {

        setTimeout(() => {
            hiddenElements.forEach(element => {
                element.classList.toggle("hidden");
            });
            staticElement1.classList.toggle("pageOne");
            staticElement2.classList.toggle("pageTwo");
        }, 700);
    });


    document.querySelector("#infoIcon").addEventListener("click", () => {
        let popUp = document.querySelector("dialog");
        popUp.classList.add("modulPopUp")
        popUp.classList.remove("hidden");
        popUp.showModal();

        popUp.innerHTML = `
        <div id="topHeader">
            <h2> FONT PAGE </h2>
            <img class="end" src="../images/cross.svg">
        </div>
            <div id="popUpcontent">
                <div id="leftSide">
                    <img class="headerIMG" src="../api/${dataToPublish.img1}">
                </div>
                <div id="rightSide">
                    <h2>${dataToPublish.title}</h2>
                    <div id="displayFilters"></div>
                    <div id="description">
                    <h3>Description</h3>
                    <div class="descriptionContainer">
                    <p>${dataToPublish.description}</p></div>
                    </div>
                </div>
            </div>`;

           let filterContainer = document.querySelector("#displayFilters");
                if(dataToPublish.filter){
                    dataToPublish.filters.forEach(filter => {
                    let filterDiv = document.createElement("div");
                    let capitalLetter = filter.toUpperCase();
                    filterDiv.textContent = capitalLetter;
                    filterDiv.classList.add("selectedDOM");
                    filterContainer.append(filterDiv);  
                    })
                }

        document.querySelector(".end").addEventListener("click", () => {
            popUp.classList.add("hidden");
        })
    })


    document.querySelector("#uploadMore").addEventListener("click", () => {
        dataToPublish["content"] = comicContent;
        renderLayoutPage(dataToPublish);
    })
    document.querySelector("#publish").addEventListener("click", () => {
        // console.log(comicContent);
        dataToPublish["content"] = comicContent;
        renderPublishComic(dataToPublish);
    })
}

async function renderPublishComic(dataToPublish) {
    try {
        const request = new Request("api/uploadComic.php",
            {
                method: "POST",
                body: JSON.stringify(dataToPublish),
            })

        let response = await fetch(request);
        const data = await response.json();

        if (data.error) {
            console.error(data.error);
        } else {
            let popUp = document.querySelector("dialog");
            popUp.showModal();
            popUp.innerHTML = `<h2>A new comic has been uploaded!</h2>`;

            setTimeout(() => {
                popUp.close(); 
                RenderProfile();
            }, 2000);

        }

    } catch (error) {
        let popUp = document.querySelector("dialog");
        popUp.showModal();
        popUp.classList.add("messagePop");
        popUp.innerHTML = `<h2>${error}</h2>`;
        setTimeout(() => {
            popUp.close(); 
            RenderProfile();
        }, 2000);
    }
}

