"use strict";

let dataToPublish = {};

async function renderUploadComic() {

    swapStyleSheet("css/uploadComic.css");

    document.querySelector("#wrapper").innerHTML = `
    <h1> UploadComic </h1>
    <div id="container">
        <div id="leftSide">
            <div id="frontPage"></div>
                <form id="upload" action="api/upload.php" method="POST" enctype="multipart/form-data">
                    <input type="file" name="comic">
                    <button type="submit">Upload</button>
                </form>         
            </div> 
    <div id="rightSide"> 
         <input name="title" placeholder="title">
            <div id="filters"> </div>
            <input name="description" placeholder="description">
            <div id="wordCounter">Characters left: 100</div>   
                <div id="buttons">
                <button id="buttonPublish"> Upload now</button>
                <p> or </p>
                <button id="buttonLayout">Add more pages</button>
            </div>
        </div>
    </div>

    `;

    const title = document.querySelector("input[name='title']");
    const description = document.querySelector("input[name='description']");
    const frontPage = document.querySelector("#frontPage")
    const form = document.querySelector("form");


    const container = document.querySelector("#filters");
    dragAndDrop(frontPage);
    let filters = await createFilterDropdowns(container, false)
    // console.log(filters);



    //let descriptionInput = document.querySelector("input[name='description']");
    //const wordCounter = document.querySelector("#wordCounter");
    //const maxLength = parseInt(descriptionInput.getAttribute("maxlength"));
    //
    //descriptionInput.addEventListener('input', function() {
    //  const charactersUsed = descriptionInput.value.length;
    //  const charactersLeft = maxLength - charactersUsed;
    //  wordCounter.textContent = `Characters left: ${charactersLeft}`
    //});


    let comicFrontPage = await dragAndDrop(frontPage);


    form.addEventListener("submit", async (event) => {
        const formData = new FormData(form);
        event.preventDefault();

        data = await initiateFileUpload(formData, frontPage);
    });
    dataToPublish["img1"] = comicFrontPage;


    document.querySelector("#buttonLayout").addEventListener("click", () => {
        // console.log(dataToPublish);
        if (dataToPublish["img1"] == undefined) {
            frontPage.innerText = "Add a image to continue";

        } else if (title.value === "") {
            title.innerText = "Add a title";

        } else {
            // console.log(filters);
            dataToPublish["user"] = localStorager.get_item("user");
            dataToPublish["title"] = title.value;
            dataToPublish["filters"] = localStorager.get_item("filters");
            // console.log(dataToPublish);
            localStorager.remove_item("filters");

            if (description.value !== "") {
                dataToPublish["description"] = description.value;
            }
            renderLayoutPage(dataToPublish);
        }
    })
}

async function renderLayoutPage(dataToPublish) {
    // console.log(dataToPublish);

    swapStyleSheet("css/uploadComicsLayout.css");

    document.querySelector("#wrapper").innerHTML = `
    <div id="topOfPage"> 
          <div id="infoIcon">Info</div> 
          <button id="toggleButton">Toggle Layout</button>
        </div>

    <div id="gridContainer">
        <div class="pageLayout pageOne">
        </div>
        <div class="pageLayout pageTwo">
        </div>
          <div class="pageLayout hidden">
        </div>
         <div class="pageLayout hidden">
        </div>
        <div class="pageLayout hidden">
        </div>
         <div class="pageLayout hidden">
        </div>
        <div class="pageLayout hidden">
        </div>
         <div class="pageLayout hidden">
        </div>
        
    </div>
      <div id="bottomOfPage"> 
          <button id="publish"> Publish</button>
           <button> Upload more</button>
       </div>`;

    let hiddenElements = document.querySelectorAll(".pageLayout.hidden");
    let staticElement1 = document.querySelector(".pageOne");
    let staticElement2 = document.querySelector(".pageTwo");
    const fileContainers = document.querySelectorAll(".pageLayout");

    let comicContent = await dragAndDrop(fileContainers);

    document.querySelector("#toggleButton").addEventListener("click", () => {

        hiddenElements.forEach(element => {
            element.classList.toggle("hidden");
        })
        staticElement1.classList.toggle("pageOne")
        staticElement2.classList.toggle("pageTwo")
    })


    document.querySelector("#infoIcon").addEventListener("click", () => {
        let popUp = document.querySelector("dialog");
        popUp.showModal();

        popUp.innerHTML = `
            <div id="leftSide">
            <h1>${dataToPublish.title}</h1>
            <div id="description"><p></p></div>
            </div>
            <div id="rightSide">
            <img src="../images/cross.png">
            <img src="${dataToPublish.img1}"
            </div>`;
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
            return data;
        }

    } catch (error) {
        console.error("Error uploading image:", error);
    }
}

