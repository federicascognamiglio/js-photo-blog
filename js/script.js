// DATI
const rowElem = document.querySelector(".row");
const overlayElem = document.querySelector(".overlay");
const closeBtn = document.querySelector(".close-btn");
const overlayImg = document.querySelector(".overlay-img");

// FUNZIONI
//Print Card
/**
 * Funzione che stampa Post
 * @param {array} array //array di oggetti da cui prendere i valori da inserire nella card
 */
const printPost = (array) => {
    array.forEach((curItem) => {
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

//Overlay
/**
 * Funzione che mostra Overlay
 * @param {node} clickElem // elemeto da cui ottenere Id
 * @param {array} array // array di elementi con cui confrontare Id
 * @param {node} overlay // elemento da mostrare
 */
const showOverlay = (clickElem, array, overlay) => {
    const clickedPostId = clickElem.dataset.postId;
    const imgToShowElem = array.find((curItem) => curItem.id == clickedPostId);
    overlayImg.innerHTML = `<img src="${imgToShowElem.url}">`
    overlay.classList.remove("d-none");
    overlay.classList.add("d-flex");
};

/**
 * Funzione che nasconde Overlay
 * @param {node} overlay // elemento da nascondere
 */
const hideOverlay = (overlay) => {
    overlay.classList.remove("d-flex");
    overlay.classList.add("d-none");
};

//Event Listener
/**
 * Funzione che crea Event Listener su post
 * @param {array} photos // array di eleemnti a cui aggiungere evento
 */
const addEvent = (photos) => {
    const posts = document.querySelectorAll(".photo-polaroid");
    posts.forEach((curPost) => {
        curPost.addEventListener("click", () => showOverlay(curPost, photos, overlayElem));
    });
};


// ESECUZIONE LOGICA
// Prendo dati tramite chiamata axios, uso i dati ottenuti per stampare le card e aggiungere un evento su ognuna
axios.get("https://jsonplaceholder.typicode.com/photos?_limit=6", { timeout: 3000 }).then((resp) => {
    const photos = resp.data;
    printPost(photos)
    addEvent(photos)
});

// Aggiungo evento di chiusura overlay al bottone
closeBtn.addEventListener("click", () => hideOverlay(overlayElem));