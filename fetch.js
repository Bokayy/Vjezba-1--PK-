async function getBooks(userinput, whatPage){
    let url = `https://api.itbook.store/1.0/search/${userinput}/${whatPage}`
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
    
    books.forEach(book => 
        {
        let htmlSegment = structure(book);
        html += htmlSegment;
        }
    );
    document.querySelector("#api").innerHTML = html;
    checkPage();
} 

function structure(book) {
    return(
     `<div class ="item">
    <p>
        <img src = "${book.image}" alt="${book.title}" class="imageIsbnTrigger">
    </p>
    <div class="title">
        <h1>
            Ime knjige: ${book.title}
        </h1>
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
</div>`);
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

