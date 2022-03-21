async function getBooks(userinput, whatPage){
    let url = `https://api.itbook.store/1.0/search/${userinput}/${whatPage}`
    try{
        let response = await fetch(url);
        return await response.json()/*.then((data) =>console.log(data)); */
    }catch (error){
        console.log(error,'color: orange; font-weight: bold;');
    }
}

async function getExtra(id){
    let url = `https://api.itbook.store/1.0/books/${id}`
    try{
        let response = await fetch(url);
        return await response.json()/*.then((data) =>console.log(data)); */
    }catch (error){
        console.log(error,'color: orange; font-weight: bold;');
    }
}

async function renderBooks(userinput, whatPage=1)
{
    let response = await getBooks(userinput, whatPage);
    let books = await response.books; //it's an array (of books)
    let html = '';
    
    await books.forEach(book => 
        {
            let htmlSegment = structure(book);
            html += htmlSegment;
        });
    document.querySelector("#api").innerHTML = html;
    checkPage();
    assignEventToImage();
    showExtra();
    }

async function renderExtra(id){
    let response = await getExtra(id);
    let author = response.authors;
    let description = response.desc;
    let publisher = response.publisher;

    let html = `
    <p>
    author:${response['authors']}
    </p>
    <p>
    publisher:${response['publisher']}
    </p>
    <p id="description">
    description:${response['desc']}
    </p>
    `
    document.getElementById(`${id}`).children[2].innerHTML = html;

}

function structure(book) {
    return(
     `<div class ="item" id="${book.isbn13}">
        <p>
            <img src="${book.image}" alt="${book.title}" class="imageIsbnTrigger"/>
        </p>
    <div class="title">
        <h1>
            Ime knjige: ${book.title}
        </h1>

        <p>
            Podnaslov: ${book.subtitle}
        </p>

        <p class="ISBN">
            ISBN:${book.isbn13}
        </p>

        <p>
            Cijena:${book.price}
        </p>

    </div>
    <div class="extra hidden"></div>
</div>`);
}

function assignEventToImage(){
    items = document.querySelectorAll(".item");
    items.forEach((item) =>{
    item.children[0].children[0].addEventListener("click",function(e) {
        renderExtra((e.path[2].id));
    });
    })
    //items = document.querySelectorAll(".item");
    /* trigger = items.children[0].children[0] */
    //items.forEach(function(item){
    //    item.children[0].children[0].addEventListener("click",fetchISBN(e));
    //})
   /* let item = document.querySelector(`#${book.isbn13}`);
   item.addEventListener('click',fetchISBN(e)) */
}

/* function fetchISBN(id){
    fetch(`https://api.itbook.store/1.0/books/${id}`)
   .then((response) => {
    console.log(response);
   if(!response.ok) {
       throw Error("Error");
   }
   return response.json();
}).then((response) => {
    debugger
    const html = `
        author:${response['authors']}
        <br>
        description:${response['desc']}
        <br>
        publisher:${response['publisher']}`
})
document.getElementById(`${id}`).children[2].innerHTML = html;

} */

function showExtra(){
    items = document.querySelectorAll(".item");
    iterator = 0;
    items.forEach((item) =>{
    item.children[0].children[0].addEventListener("mouseenter",function(e) {
            item.children[2].classList.remove("hidden");
        })
        item.children[0].children[0].addEventListener("mouseout",function(e) {
            item.children[2].classList.add("hidden");
        })
    });
}

    /*     const response = await fetch(`https://api.itbook.store/1.0/search/delphi`);
    console.log(response);
    const books = await response.json();
    console.log(books);
    console.log(books.books); */
    
/*     books.books.foreach(function(book){
        console.log(`books from for each:${book} \n`);
    }) 
}*/




/* 
function fetchData(userinput,whatPage = 1){
    fetch(`https://api.itbook.store/1.0/search/${userinput}/${whatPage}`)
            .then((response) => {
             console.log(response);
            if(!response.ok) {
                throw Error("Error");
            }
            return response.json();
        })
        .then((data) => {
            //console.log(data);
            const html = data.books.map((book) => {
                return  `
                <div class ="item">
                    <p class="imageIsbnTrigger">
                        <img src = "${book.image}" alt="${book.title}">
                    </p>
                    <div class="title">
                        <p">
                            Ime knjige: ${book.title}
                        </p>
                    <br>
                        <p>
                            Podnaslov: ${book.subtitle}
                        </p>
                    <br>
                        <p class="ISBN">
                            ISBN:${book.isbn13}
                        </p>
                    <br>
                        <p>
                            Cijena:${book.price}
                        </p>
                    <br>
                    </div>
                    <div class="extra hidden"></div>
                </div>`;
            })
            .join("")
            document.querySelector("#api").innerHTML = html;
            //show or hide pagination
            checkPage();
        })
        .catch((error) => {
            console.log(error);
        });
    }
*/

