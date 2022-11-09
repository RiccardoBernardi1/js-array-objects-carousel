"use strict"
// 1. Rimuovere il markup statico 
// 2. Inserire il contenuto dell'array di oggetti nell'html 
// 3. Rendere il carosello dinamico
// 4. Permettere alle immagini ciclare all'infinito nel carosello
// 5. Aggiungere le thumbnails e l'evento click che ne renda visibile l'immagine 
// 6. Aggiungere autoplay ogni 3 secondi
const images = [
    {
        image: 'img/01.webp',
        title: 'Marvel\'s Spiderman Miles Morale',
        text: 'Experience the rise of Miles Morales as the new hero masters incredible, explosive new powers to become his own Spider-Man.',
    }, {
        image: 'img/02.webp',
        title: 'Ratchet & Clank: Rift Apart',
        text: 'Go dimension-hopping with Ratchet and Clank as they take on an evil emperor from another reality.',
    }, {
        image: 'img/03.webp',
        title: 'Fortnite',
        text: "Grab all of your friends and drop into Epic Games Fortnite, a massive 100 - player face - off that combines looting, crafting, shootouts and chaos.",
    }, {
        image: 'img/04.webp',
        title: 'Stray',
        text: 'Lost, injured and alone, a stray cat must untangle an ancient mystery to escape a long-forgotten city',
    }, {
        image: 'img/05.webp',
        title: "Marvel's Avengers",
        text: 'Marvel\'s Avengers is an epic, third-person, action-adventure game that combines an original, cinematic story with single-player and co-operative gameplay.',
    }
];
const container=document.querySelector(".container");
const btnUp= document.createElement("button");
const btnDown= document.createElement("button");
btnUp.classList.add("btn","btn-up");
btnDown.classList.add("btn","btn-down");
btnDown.innerHTML = '<i class="fa-solid fa-chevron-down"></i>';
btnUp.innerHTML = '<i class="fa-solid fa-chevron-up"></i>';
let active =0;
let items
let thumbnail
images.forEach((item) => {
    const template = document.getElementById("carousel-template").content.cloneNode(true);
    template.querySelector(".image").src = item.image;
    template.querySelector(".text h2").innerHTML= item.title;
    template.querySelector(".text p").innerHTML= item.text;
    container.append(template);
    items=document.querySelectorAll(".item");
    items[active].classList.add("show");
});
let appended=false
 images.forEach((item) => {
    const template = document.getElementById("thumbnail-template").content.cloneNode(true);
    if (appended===false){
        items[active].append(template)
        appended=true
        thumbnail=document.querySelector(".thumbnails");
        thumbnail.append(btnUp);
        thumbnail.append(btnDown);
    }
});
const thumb=document.querySelector(".thumbnails");
btnUp.addEventListener("click",function() {
    document.querySelector(".item.show").classList.remove("show");
    if (active==0){
        active=items.length-1
    }else{
        active= active-1;
    }
    items[active].classList.add("show");
    items[active].append(thumb)
    thumb.append(btnUp);
    thumb.append(btnDown);
})
btnDown.addEventListener("click",function() {
    items[active].classList.remove("show");
    if (active==items.length-1){
        active=0;
    }else{
        active= active+1;
    }
    items[active].classList.add("show");
    items[active].append(thumb)
    thumb.append(btnUp);
    thumb.append(btnDown);
})