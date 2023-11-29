async function dragAndDrop (fileContainers){
    let comicURL = [];
    if(fileContainers.length > 1){
        
        fileContainers.forEach(fileContainer => startFunction(fileContainer));
    }else {
        startFunction(fileContainers);
    }

    function startFunction(fileContainer){
                    fileContainer.addEventListener("dragover", function (e) {
                e.preventDefault();             
            });

            fileContainer.addEventListener("drop", async function (e) {
                e.preventDefault();

                const files = e.dataTransfer.files;

                if (files.length > 0) {
                for (const file of files) {
                comic = await initiateFileUpload(file, e.target)
                if(comic){
                    comicURL.push(comic)
                        }
                    }        
                }
            });

    }


    return comicURL;
}


async function initiateFileUpload(file, container) {
    try {
        const formData = new FormData();
        formData.append("comic", file);
        const request = new Request("api/upload.php", {
            method: "POST",
            body: formData,
        });
        let response = await fetch(request);
        const data = await response.json();
        if (data.error) {
            console.error(data.error);
        } else {
            const img = document.createElement("img");
            img.src = `../api/${data}`;
            container.append(img);
            return data;
        }
    } catch (error) {
        console.error("Error uploading image:", error);
    }
}
