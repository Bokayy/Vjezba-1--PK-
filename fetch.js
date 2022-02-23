function fetchData(userinput,whatPage = 1,isbnArray=[]){
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
            const html = data.books.map((book) => {
                debugger
                isbnArray.push(book.isbn13);
                return  `
                <div class ="item">
                    <p>
                        <img src = "${book.image}" alt="${book.title}">
                    </p>
                    <div class="title">
                        <p class="imageIsbnTrigger">
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
            })/* .then((data) => {
                console.log(data);
                return data.books
            }) */
            /* .then((books) => {
                let iterator;
                books.foreach((book) => createExtraInfo(book,iterator),iterator++) //funkcija za kreiranje buttona, ulazni parametar book.isbn
            }) */
            .join("");
            console.log(data);
            document.querySelector("#api").innerHTML = html;
            //show or don't show pagination
            checkPage();
        })

        .catch((error) => {
            console.log(error);
        });
    }

/* function createExtraInfo(book,iterator) {
    debugger
        console.log(book)
        let triggerID=document.querySelectorAll(".imageIsbnTrigger")
        id=book.isbn13;
        triggerID[iterator].addEventListener('click', () 
        => fetch (`https://api.itbook.store/1.0/books/${book.isbn13}`)
        .then((book) => {
            console.log(book);
        }));
    }  
 */
