async function dragAndDrop(fileContainers) {
    let comicURL = [];
    if (fileContainers.length > 1) {

        fileContainers.forEach(fileContainer => startFunction(fileContainer));
    } else {
        startFunction(fileContainers);
    }

    function startFunction(fileContainer) {
        fileContainer.addEventListener("dragover", function (e) {
            e.preventDefault();
        });

        fileContainer.addEventListener("drop", async function (e) {
            e.preventDefault();

            const files = e.dataTransfer.files;

            if (files.length > 0) {
                for (const file of files) {
                    comic = await initiateFileUpload(file, e.target)
                    if (comic) {
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
        console.log(file);
        console.log(container);
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

//Alla nycklarna är tomma. Använd denna funktion för att inte använda drag and drop.
// async function initiateFileUpload(file, container) {
//     console.log(file);
//     try {
//         const formData = new FormData();
//         const comicFile = file.get("comic");
//         formData.append("comic", comicFile);

//         console.log(comicFile);
//         // console.log(comicFile);
//         console.log(formData);
//         const request = new Request("api/upload.php", {
//             method: "POST",
//             body: formData,
//         });
//         let response = await fetch(request);
//         const data = await response.json();
//         if (data.error) {
//             console.error(data.error);
//         } else {
//             const img = document.createElement("img");
//             img.src = `../api/${data}`;
//             container.append(img);
//             return data;
//         }
//     } catch (error) {
//         console.error("Error uploading image:", error);
//     }
// }