"use strict"

const inputField = document.querySelector(".searchTerm")
const btn = document.querySelector(".searchButton")
const pageContainer = document.querySelector(".pageIndicator")
const pageMinus = document.querySelector("#btnLeft")
const pagePlus = document.querySelector("#btnRight")
const pageNo = document.querySelector(".pageNo")

let page = 1;
let pageDisplay = false;
const bookList = document.querySelector("#api")


function hidePagination(){
    pageContainer.classList.add("hidden");
}

function showPagination(){
pageContainer.classList.remove("hidden");
}

function checkPage(){
    let x = bookList.children;

    if(x.length == 10){
        showPagination();
    }
    else if (x.length == 0 || x.length <10){
        hidePagination();
    }

}


//ˇVIEW CHANGE ---------------------------
btn.onclick = () => 
{
    console.log("click");
    renderBooks(inputField.value);
}

inputField.addEventListener("keyup",function(e) {
    if(e.keyCode === 13)
        {
            console.log("enter");
            renderBooks(inputField.value);
            console.log(e.currentTarget.id);
        }
    });

//ˇPAGINATION ----------------------------
pagePlus.onclick = () => {
    page++;
    pageNo.innerHTML = `Page: ${page}`
    console.log("pageclick+");
    renderBooks(inputField.value,page);
}

pageMinus.onclick = () => {
    page--;
    pageNo.innerHTML = `Page: ${page}`
    console.log("pageclick-");
    renderBooks(inputField.value,page);
}
//^PAGINATION ----------------------------
//^VIEW CHANGE ---------------------------

