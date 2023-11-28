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


    const response = await fetch("api/data/filters.json");
    let filterData = await response.json();
    const container = document.querySelector("#filters");


for (const key in filterData) {
    const dropDownDOM = document.createElement("div");
    contentButtonDom = document.createElement("button");
    contentButtonDom.textContent = key;
    contentButtonDom.addEventListener("click", () => {
        renderOptions(filterData[key], dropDownDOM);
    })
    dropDownDOM.classList.add("dropDown");
    container.append(dropDownDOM);
    dropDownDOM.append(contentButtonDom);


function renderOptions(key, container){
    key.forEach( value => {
        const tagDOM = document.createElement("href");
        tagDOM.textContent = value;
        container.append(tagDOM);
    })
    if(Array.isArray(key)){
        key.forEach(value => {
        const underTagDOM = document.createElement("href");
        underTagDOM.textContent = value;
        tagDOM.append(underTagDOM);
            })
        }
    }
 }

 const descriptionInput = document.querySelector('input[name="description"]');
  const wordCounter = document.querySelector("#wordCounter");
  const maxLength = parseInt(descriptionInput.getAttribute("maxlength"));

  descriptionInput.addEventListener('input', function() {
    const charactersUsed = descriptionInput.value.length;
    const charactersLeft = maxLength - charactersUsed;
    wordCounter.textContent = `Characters left: ${charactersLeft}`
  });


    let dataToPublish = {};
    
    let user = localStorage.getItem("user");
    const title = document.querySelector("input[name='title']");
    const description = document.querySelector("input[name='description']");
    const frontPage = document.querySelector("#frontPage")
    const form = document.querySelector("form");


    form.addEventListener("submit", async (event) => {
        event.preventDefault();

        const formData = new FormData(form);
        console.log(formData);

        try {
            const request = new Request("api/upload.php", {
                method: "POST",
                body: formData
            });

            let response = await fetch(request);
            const data = await response.json();
          

            if (data.error) {
                console.error(data.error);
            } else {
                dataToPublish["img1"] = data;

                const img = document.createElement("img");
                img.src = `../api/${data}`;
                frontPage.append(img);
                
            }
        } catch (error) {
            console.error("Error uploading image:", error);
        }
    });


document.querySelector("#buttonLayout").addEventListener("click", () => {
    if(dataToPublish["img1"] == undefined){
        frontPage.innerText = "Add a image to continue";

    } else if (title.value === ""){
        title.innerText = "Add a title";

    } else {
        dataToPublish["user"] = user;
        dataToPublish["title"] = title.value;

        if(description.value !== ""){
            dataToPublish["description"] = description.value;
        }
        renderLayoutPage(dataToPublish);
    }
    
})
}

function renderLayoutPage(dataToPublish){
    console.log(dataToPublish);

    swapStyleSheet("css/uploadComicsLayout.css");

    document.querySelector("#wrapper").innerHTML = `
    <div id="topOfPage"> 
          <div id="infoIcon">Info</div> 
          <button id="toggleButton">Toggle Layout</button>
        </div>

    <div id="firstGrid">
        <div id="pageLayout">
        </div>
        <div id="pageLayout">
        </div>
    </div>

    <div id="secondGrid">
           <div id="pageLayout">
        </div>
        <div id="pageLayout">
        </div>
               <div id="pageLayout">
        </div>
        <div id="pageLayout">
        </div>
               <div id="pageLayout">
        </div>
        <div id="pageLayout">
        </div>
               <div id="pageLayout">
        </div>
        <div id="pageLayout">
        </div>
    </div>
    
        <div id="topOfPage"> 
            <button> Publish</button>
            <button> Upload more</button>
        </div>`;

        document.querySelector("#toggleButton").addEventListener("click", () => {
            const firstGrid= document.querySelector("#firstGrid");
            const secondGrid = document.querySelector("#secondGrid");

            firstGrid.style.display = (gridContainer.style.display === 'none') ? 'grid' : 'none';
            secondGrid.style.display = (alternativeGridLayout.style.display === 'none') ? 'grid' : 'none';
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
            <img src="${dataToPublish.img1}"</div>`;
        })


}



