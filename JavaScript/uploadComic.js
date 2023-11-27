async function renderUploadComic(){

        swapStyleSheet("css/uploadComic.css");

    const response = await fetch("api/data/filters.json");
    let filterData = await response.json();

  
    const {Materials, Styles, Themes} = filterData;

    console.log(Materials);

    document.querySelector("#wrapper").innerHTML = `
    <div id="contanter">
        <input placeholder="title">
        <input placeholder="description">
        <div id="filters"> </div>
        <div id="frontPage"></div>
     </div>
    `
}

