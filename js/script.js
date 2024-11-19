// DATI
const rowElem = document.querySelector(".row");
let dataArray = [];

// FUNZIONI
const printPost = () => {
    dataArray.forEach((curItem) => {
        rowElem.innerHTML += `
            <div class="col">
                <div class="photo-polaroid">
                    <div class="photo">
                        <img src="${curItem.thumbnailUrl}">
                    </div>
                    <div class="caption">${curItem.title}</div>
                </div>
            </div>`
    })
}

// ESECUZIONE LOGICA
axios.get("https://jsonplaceholder.typicode.com/photos?_limit=6", {timeout: 5000}).then((resp) => {
    dataArray = resp.data;
    console.log(dataArray);
    printPost()
})