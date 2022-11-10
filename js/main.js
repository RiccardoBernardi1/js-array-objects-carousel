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

// FUNCTIONS

function changeSlide(direction){
    document.querySelector(".item.show").classList.remove("show");
    actualThumb=document.querySelector(".border")
    actualThumb.classList.remove("border");
    if(direction==="next"){
        if (active==items.length-1){
            active=0;
        }else{
            active= active+1;
        }
    }else{
        if (active==0){
            active=items.length-1;
        }else{
            active= active-1;
        }
    }
    appendThumbAndBtns();
}
function appendThumbAndBtns(){
    items[active].append(thumbnail);
    thumbnail.append(btnUp);
    thumbnail.append(btnDown);
    imgThumb.forEach((img,index)=>{
        if(index===active){
            img.classList.add("border")
        }
    });
    items[active].classList.add("show");
}
// CONF

let active =0;
let items
let thumbnail
let thumb
let appended=false;
let actualThumb
let actualThumbId
let autoplay
let autoplayReverse
let running=false;
let runningReverse=false;
const container=document.querySelector(".container");
const btnUp= document.createElement("button");
const btnDown= document.createElement("button");

// MAIN

btnUp.classList.add("btn","btn-up");
btnDown.classList.add("btn","btn-down");
btnDown.innerHTML = '<i class="fa-solid fa-chevron-down"></i>';
btnUp.innerHTML = '<i class="fa-solid fa-chevron-up"></i>';

images.forEach((item) => {
    const template = document.getElementById("carousel-template").content.cloneNode(true);
    template.querySelector(".image").src = item.image;
    template.querySelector(".text h2").innerHTML= item.title;
    template.querySelector(".text p").innerHTML= item.text;
    const btnStart=template.querySelector(".btn.start");
    const btnStop=template.querySelector(".btn.stop");
    const btnReverse=template.querySelector(".btn.reverse");
    btnStart.addEventListener("click",function(){
        if(running===false&&runningReverse===false){
            autoplay=setInterval(function(){
                changeSlide("next")
            },3000);
            running=true;
        }else if(runningReverse===true){
            clearInterval(autoplayReverse);
            autoplay=setInterval(function(){
                changeSlide("next")
            },3000);
            running=true;
            runningReverse=false;
        }
    });
    btnReverse.addEventListener("click",function(){
        if(running===false&&runningReverse===false){
            autoplayReverse=setInterval(function(){
                changeSlide("prev");
            },3000);
            runningReverse=true;
        }else if(running===true){
            clearInterval(autoplay);
            autoplayReverse=setInterval(function(){
                changeSlide("prev");
            },3000);
            runningReverse=true;
            running=false;
        }
    });
    btnStop.addEventListener("click",function(){
        clearInterval(autoplay);
        clearInterval(autoplayReverse);
        running=false;
        runningReverse=false;
    });
    container.append(template);
    items=document.querySelectorAll(".item");
    items[active].classList.add("show");
});
images.forEach((item,index) => {
    const template = document.getElementById("thumbnail-template").content.cloneNode(true);
    if(appended==false){
        items[active].append(template)
        appended=true;
    }
    thumbnail=document.querySelector(".thumbnails");
    thumb=document.createElement("img");
    thumb.src=item.image;
    thumb.id=index;
    if(active==thumb.id){
        thumb.classList.add("border");
    }
    thumbnail.append(btnUp);
    thumbnail.append(btnDown);
    thumbnail.append(thumb);
});
thumbnail=document.querySelector(".thumbnails");
let imgThumb=document.querySelectorAll(".thumbnails img")
btnUp.addEventListener("click",function() {
    changeSlide("prev");
});
btnDown.addEventListener("click",function() {
    changeSlide("next");
});
imgThumb.forEach((img,index)=>{
    img.addEventListener("click",function(){
        actualThumb=document.querySelector(".border");
        actualThumb.classList.remove("border");
        items[active].classList.remove("show");
        active=index;
        appendThumbAndBtns();
    });
});