"use strict"

const inputField = document.querySelector(".searchTerm")
const btn = document.querySelector(".searchButton")
const pageContainer = document.querySelector(".pageIndicator")
const pageMinus = document.querySelector("#btnLeft")
const pagePlus = document.querySelector("#btnRight")
const pageNo = document.querySelector(".pageNo")
let page = 1;
let paginatorExists = false;
let x = 0;
let pageDisplay = false;
const bookList = document.querySelector("#api")
//popup
let infoTrigger = Array();
let item = {};
//ISBN enumeration
let itemISBN_enumeration = 0;
let isbn =[];



function fetchData(userinput,whatPage = 1){
fetch(`https://api.itbook.store/1.0/search/${userinput}/${whatPage}`)
    .then((response) => {
        /* console.log(response); */
        if(!response.ok) {
            throw Error("Error");
        }
        return response.json();
    })
    .then((data) => {
        //console.log(data);
        const html = data.books.map((data) => {

            isbn[itemISBN_enumeration] = data.isbn13;
            itemISBN_enumeration++;

            return  `
            <div class ="item">
                <p>
                    <img src = "${data.image}" alt="${data.title}">
                </p>
                <div class="title">
                    <p>
                        Ime knjige: ${data.title}
                    </p>
                <br>
                    <p>
                        Podnaslov: ${data.subtitle}
                    </p>
                <br>
                    <p class="ISBN">
                        ISBN:${data.isbn13}
                    </p>
                <br>
                    <p>
                        Cijena:${data.price}
                    </p>
                <br>
                <button class="infoTrigger" onclick="moreInfo()">
                    More Info
                </button>
                </div>
            </div>`;
        })
        .join("");
        document.querySelector("#api").innerHTML = html;
        checkPage();
    }).then(() => {
        item = document.querySelectorAll(".item");
        infoTrigger = document.querySelectorAll(".infoTrigger");
        addtoev(infoTrigger,isbn);
    })
    .catch((error) => {
        console.log(error);
    });
}


function hidePagination(){
    pageContainer.classList.add("hidden");
}

function showPagination(){
pageContainer.classList.remove("hidden");
}

function checkPage(){
    x = bookList.children;

    if(x.length == 10){
    pageDisplay = true;
    }
    else if (x.length == 0 || x.length <10){
    pageDisplay = false;
    }

    if (pageDisplay){
        showPagination();
    }else{
        hidePagination();
    }
}

function makeSidebar(iteration,isbn){
    console.log(iteration,isbn);
    fetch(`https://api.itbook.store/1.0/books/${isbn[iteration]}`)
    .then((response) => {
        /* console.log(response); */
        if(!response.ok) {
            throw Error("Error");
        }
        return response.json();
    })
    .then((data) => {
        console.log(data);
        //IT IS AN OBJECT YOU CANNOT ITERATE THORUGH AN OBJECT WITH .map
        const html = 
        data.map((data) => {
            console.log(data);
            return  `
                <div class="item">
                    <p> ${data.author}
                </div>`;
        })
        .join("");
        document.querySelector("#api").innerHTML = html;
        checkPage();
    })
    .catch((error) => {
        console.log(error);
    });
}

/* function createPagination(){

   paginatorExists = true;

    const referenceNode = document.querySelector(".break");

    const pInd = document.createElement("div")
    pInd.classList.add("pageIndicator");

    referenceNode.parentNode.insertBefore(pInd, referenceNode.nextSibling);
    const newNode=document.querySelector(".pageIndicator")

    const lessSymbol = document.createElement("i")
    lessSymbol.classList.add("fa-solid", "fa-angle-left");
    lessSymbol.setAttribute('id','btnLeft');
    newNode.appendChild(lessSymbol);

    const pageText = document.createElement("p")
    pageText.classList.add("pageNo")
    pageText.innerHTML = ("Page:1")
    newNode.appendChild(pageText);

    const moreSymbol = document.createElement("i")
    moreSymbol.classList.add("fa-solid", "fa-angle-right")
    moreSymbol.setAttribute('id', 'btnRight');
    newNode.appendChild(moreSymbol);



/*     function addElement(elementTag, classes, atrribute, text = null) {
        const elem = document.createElement(elementTag)
        // elem.classList.add("fa-solid", "fa-angle-left");
        classes.forEach(cl => {
            elem.classList.add(cl);
        })
        elem.setAttribute(atrribute[0][0], atrribute[0][1]);
        elem.innerHTML = text;
        // elem.setAttribute('id','btnLeft');
        newNode.appendChild(elem);
    }

    addElement("i", ["fa-solid", "fa-angle-left"], Object.entries({id: 'btnLeft'}))
    addElement("p", ["pageNo"], Object.entries({id: 'btnRight'}),"Page:")
    addElement("i", ["fa-solid", "fa-angle-right"], Object.entries({id: 'btnRight'})) */
//} */


//ˇVIEW CHANGE ---------------------------
btn.onclick = () => 
{
    fetchData(inputField.value);
}

inputField.addEventListener("keyup",function(e) {
    if(e.keyCode === 13)
        {
            //console.log("enter");
            fetchData(inputField.value);
        }
    });

function moreInfo(){
    
}
//^VIEW CHANGE ---------------------------
pagePlus.onclick = () => {
    page++;
    pageNo.innerHTML = `Page: ${page}`
    fetchData(inputField.value,page);
}

pageMinus.onclick = () => {
    page--;
    pageNo.innerHTML = `Page: ${page}`
    fetchData(inputField.value,page);
}

function addtoev(bns,isbn)
{
    for (let i = 0; i < bns.length; i++) {
        bns[i].addEventListener("click", makeSidebar(i,isbn));
         }
    }
