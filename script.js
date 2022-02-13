"use strict"

const inputField = document.querySelector(".searchTerm")
const btn = document.querySelector(".searchButton")
const pageMinus = document.querySelector("#btnLeft")
const pagePlus = document.querySelector("#btnRight")
const pageNo = document.querySelector(".pageNo")
let page = 1;

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
        console.log(data);
        const html = data.books
        .map((data) => {
            return  `
            <a href="${data.url}" target="_blank">
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
                    <p>
                        ISBN:${data.isbn13}
                    </p>
                <br>
                    <p>
                        Cijena:${data.price}
                    </p>

                </div>
            </div>
            </a>`;
        })
        .join("");
        document.querySelector("#api").innerHTML = html; 
    })
    .catch((error) => {
        console.log(error);
    });
}

btn.onclick = () => {

    fetchData(inputField.value);
}

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