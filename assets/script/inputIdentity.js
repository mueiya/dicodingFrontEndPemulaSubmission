function createBook (title,author,year,readState,targetTime) {

    const bookTitle = document.createElement("p");
    bookTitle.classList.add("titleClass");
    bookTitle.innerText = title;

    const bookAuthor = document.createElement("p");
    bookAuthor.classList.add("authorClass");
    bookAuthor.innerText = author;

    const bookYear = document.createElement("p");
    bookYear.classList.add("yearClass");
    bookYear.innerText = year;

    const target = document.createElement("p");
    target.classList.add("targetClass");
    target.innerText = targetTime;

    const containerBook = document.createElement("div");
    containerBook.classList.add("containerBookClass");
    containerBook.append(bookTitle, bookAuthor, bookYear, target);

    const containerButton = document.createElement("div");
    containerButton.classList.add("containerButtonClass");
    containerButton
}
class buttonEdit {
    
}
function addButton() {
    
}