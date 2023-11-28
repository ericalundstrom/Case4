async function renderUploadComic() {

    swapStyleSheet("css/uploadComic.css");

    document.querySelector("#wrapper").innerHTML = `
        <input name="title "placeholder="title">
        <input name="description" placeholder="description">
        <div id="filters"> </div>
        <form id="upload" action="api/upload.php" method="POST" enctype="multipart/form-data">
                <input type="file" name="comic">
                <button type="submit">Upload</button>
        </form>
        <div id="frontPage"></div>
    `
    const response = await fetch("api/data/filters.json");
    let filterData = await response.json();
    const container = document.querySelector("#filters");

    for (const key in filterData) {
        const dropDownDOM = document.createElement("div");
        contentButtonDom = document.createElement("button");
        contentButtonDom.textContent = key;
        contentButtonDom.addEventListener("click", () => {
            renderOptions(filterData[key], dropDownDOM);
        });
        dropDownDOM.classList.add("dropDown");
        container.append(dropDownDOM);
        dropDownDOM.append(contentButtonDom);

        function renderOptions(key, container) {
            key.forEach(value => {
                const tagDOM = document.createElement("a");
                tagDOM.textContent = value;
                container.append(tagDOM);
            });
            if (Array.isArray(key)) {
                key.forEach(value => {
                    const underTagDOM = document.createElement("a");
                    underTagDOM.textContent = value;
                    tagDOM.append(underTagDOM);
                });
            }
        }
    }

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
            console.log(data);
            // console.log(data.comic);

            if (data.error) {
                console.error(data.error);
            } else {
                const img = document.createElement("img");
                img.src = `../api/${data}`;
                frontPage.append(img);
            }
        } catch (error) {
            console.error("Error uploading image:", error);
        }
    });




}

