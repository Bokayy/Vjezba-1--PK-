/* async function fetchData(){
    const response = await fetch(`https://api.itbook.store/1.0/search/delphi`);
    console.log(response);
    const books = await response.json();
    console.log(books);
    console.log(books.books[0]); */
/*     .then(function(response)
    {
        //console.log(response);
        return response;
    }
    ).then(function(response)
    { 
        response => console.log(response.text());  
    }       
    ) 
}*/





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


