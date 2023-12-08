let dataToPublish = {};

async function renderUploadComic() {

    swapStyleSheet("css/uploadComic.css");

    document.querySelector("#wrapper").innerHTML = `
    <h1> UploadComic </h1>
    <div id="bigStroke"></div>
    <div id="container">
        <div id="leftSide">
            <div id="frontPage">
                <div id="placeholderUpload">
                    <p> Drag and drop to upload</p>   
                </div>    
            </div> 
        </div>
    <div id="rightSide"> 
    <label for "title"> Titel </label>
    <br>
         <input name="title">
            <div id="filters"> </div>
            <label for "title"> Description </label>
            <textarea name="description" required="required" id="description"></textarea>
            <div id="wordCounter">Characters left: 100</div>   
        </div>
    </div>
     <div id="buttons">
        <button id="buttonPublish"> Upload now</button>
        <p> or </p>
        <button id="buttonLayout">Add more pages</button>
    </div>

    `;

    const title = document.querySelector("input[name='title']");
    const description = document.querySelector("#description");
    const frontPage = document.querySelector("#frontPage")
    const placeholderUpload = document.querySelector("#placeholderUpload")


    const container = document.querySelector("#filters");
    let filters = await createFilterDropdowns(container, false)



    //let descriptionInput = document.querySelector("input[name='description']");
    //const wordCounter = document.querySelector("#wordCounter");
    //const maxLength = parseInt(descriptionInput.getAttribute("maxlength"));
    //
    //descriptionInput.addEventListener('input', function() {
    //  const charactersUsed = descriptionInput.value.length;
    //  const charactersLeft = maxLength - charactersUsed;
    //  wordCounter.textContent = `Characters left: ${charactersLeft}`
    //});

    let comicFrontPage = await dragAndDrop(frontPage, placeholderUpload);

    console.log(comicFrontPage);
    dataToPublish["img1"] = comicFrontPage;

    document.querySelector("#buttonLayout").addEventListener("click", () => {
        console.log(dataToPublish);
        if (dataToPublish["img1"] == undefined) {
            frontPage.innerText = "Add a image to continue";

        } else if (title.value === "") {
            title.innerText = "Add a title";

        } else {
            console.log(filters);
            dataToPublish["user"] = localStorager.get_item("user");
            dataToPublish["title"] = title.value;
            dataToPublish["filters"] = localStorager.get_item("filters");
            console.log(dataToPublish);
            localStorager.remove_item("filters");
            if (description.value !== "") {
                dataToPublish["description"] = description.value;
            }
            renderLayoutPage(dataToPublish);
        }
    })
}

async function renderLayoutPage(dataToPublish) {

    swapStyleSheet("css/uploadComicsLayout.css");

    document.querySelector("#wrapper").innerHTML = `
    <div id="topOfPage"> 
          <div id="infoIcon">Info</div> 
          <button id="toggleButton">Toggle Layout</button>
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
          <button id="publish"> Publish</button>
           <button id="uploadMore"> Upload more</button>
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


    document.querySelector("#uploadMore").addEventListener("click", () => {
        dataToPublish["content"] = comicContent;
        renderLayoutPage(dataToPublish);
    })
    document.querySelector("#publish").addEventListener("click", () => {
        console.log(comicContent);
        dataToPublish["content"] = comicContent;
        renderPublishComic(dataToPublish);
    })
}

async function renderPublishComic(dataToPublish) {
    console.log(dataToPublish);
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

