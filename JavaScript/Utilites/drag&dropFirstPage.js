"use strict";

async function dragAndDropFirst(fileContainers) {

    let comicURL = [];
    if (fileContainers.length > 1) {
        fileContainers.forEach(fileContainer => {
            let placeholder = fileContainer.querySelector("#placeholderUpload")
            console.log(placeholder);
            startFunction(fileContainer, placeholder)
    })
    ;
    } else {
        let placeholder = fileContainers.querySelector("#placeholderUpload")
        startFunction(fileContainers, placeholder);
    }

    function startFunction(fileContainer, placeholder) {
        fileContainer.addEventListener("dragover", function (e) {
            e.preventDefault();
        });

        fileContainer.addEventListener("drop", async function (e) {
            e.preventDefault();

            const files = e.dataTransfer.files;

            if (files.length > 0) {
                for (const file of files) {
                   let comic = await initiateFileUploadDragAndDrop(file, e.target, placeholder)
                    if (comic) {
                        comicURL.push(comic)
                    }
                }
            }
        });

    }


    return comicURL;
}


async function initiateFileUploadDragAndDrop(file, container, placeholder) {
    placeholder.setAttribute("id", "hidden");
    try {
        const formData = new FormData();
        formData.append("comic", file);
        const request = new Request("api/upload.php", {
            method: "POST",
            body: formData,
        });
        // console.log(file);
        // console.log(container);
        let response = await fetch(request);
        const data = await response.json();
        if (data.error) {
            console.error(data.error);
        } else {
            const img = document.createElement("img");
            img.src = `../api/${data}`;
            console.log(container);
            container.appendChild(img);
            return data;
        }
    } catch (error) {
        console.error("Error uploading image:", error);
    }
}