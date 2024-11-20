// DATI
const rowElem = document.querySelector(".row");
const overlayElem = document.querySelector(".overlay");
const closeBtn = document.querySelector(".close-btn");
const overlayImg = document.querySelector(".overlay-img");
let dataArray = [];


// FUNZIONI
// Funzione che stampa Post
const printPost = () => {
    dataArray.forEach((curItem) => {
        rowElem.innerHTML += `
            <div class="col">
                <div class="photo-polaroid" data-post-id="${curItem.id}">
                    <div class="photo">
                        <img src="${curItem.url}">
                    </div>
                    <div class="caption">${curItem.title}</div>
                </div>
            </div>`
    })
};

// Funzione che mostra Overlay
const showOverlay = (clickElem) => {
    const clickedPostId = clickElem.dataset.postId;
    console.log(clickedPostId);
    const imgToShowElem = dataArray.find((curItem) => curItem.id === clickedPostId);
    console.log(imgToShowElem);
    // overlayImg.innerHTML = `<img src="${imgToShowElem.url}">`
    overlayElem.classList.remove("d-none");
    overlayElem.classList.add("d-flex");
};

// Funzione che nasconde Overlay
const hideOverlay = () => {
    overlayElem.classList.remove("d-flex");
    overlayElem.classList.add("d-none");
};

// Funzione che crea Event Listener su post
const addEvent = () => {
    const posts = document.querySelectorAll(".photo-polaroid");
    posts.forEach((curPost) => {
        curPost.addEventListener("click", () => showOverlay(curPost));
    });
};

// ESECUZIONE LOGICA
axios.get("https://jsonplaceholder.typicode.com/photos?_limit=6", { timeout: 6000 }).then((resp) => {
    dataArray = resp.data;
    console.log(dataArray);
    printPost()
    addEvent()
})

closeBtn.addEventListener("click", hideOverlay);

