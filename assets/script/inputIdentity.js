const bookInfoArray = [];
const RENDER_EVENT = 'render-book';

function generateId() {
    return +new Date();
}

function generateBookInfo(id, title, author, year, readState, targetTime) {
    return {
        id,
        title,
        author,
        year,
        readState,
        targetTime
    };
}

function findBook(bookId) {
    for (bookItem of bookInfoArray) {
        if (bookItem.id === bookId) {
            return bookItem;
        }
    }
}

function findBookIndex(bookId) {
    for (index in bookInfoArray) {
        if (bookInfoArray[index].id === bookId) {
            return index
        }
    }
    return -1;
}
//bug Is Here. It can't defined objecy
function createBook(bookElement) {
    const { id, title, author, year, readState, targetTime } = bookElement
    console.log(id, title, author, year, readState, targetTime);

    const bookTitle = document.createElement("p");
    bookTitle.classList.add("titleClass");
    bookTitle.innerText = title;
    console.log(title)

    const bookAuthor = document.createElement("p");
    bookAuthor.classList.add("authorClass");
    bookAuthor.innerText = author;

    const bookYear = document.createElement("p");
    bookYear.classList.add("yearClass");
    bookYear.innerText = year;



    const containerBook = document.createElement("div");
    containerBook.classList.add("containerBookClass");
    if (readState == 'onRead' && readState != null) {
        const target = document.createElement("p");
        target.classList.add("targetClass");
        target.innerText = targetTime;
        containerBook.append(bookTitle, bookAuthor, bookYear, target);
    } else {
        containerBook.append(bookTitle, bookAuthor, bookYear);
    }
    //Vuttobn return Undifinne
    console.log(readState);

    const containerButton = document.createElement("div");
    containerButton.classList.add("containerButtonClass");
    containerButton.append(addButton(id, readState));

    const container = document.createElement("div");
    container.classList.add("containerClass");
    container.append(containerBook, containerButton);
    container.setAttribute('id', 'book-${id}');

    return container;
}

// function addButton(id, readState) {
//     const delButton = document.createElement('button');
//     const moveDoneReadButton = document.createElement('button');
//     const moveReadButton = document.createElement('button');
//     const moveNotReadButton = document.createElement('button');
//     const editButton = document.createElement('button');
//     delButton.addEventListener('click', function () {
//         removeBook(id);
//     })
//     moveDoneReadButton.addEventListener('click', function () {
//         moveToDone(id);
//     })
//     moveNotReadButton.addEventListener('click', function () {
//         moveToNotRead(id);
//     })
//     moveReadButton.addEventListener('click', function () {
//         moveToOnRead(id);
//     })
//     if (readState == 'onRead') {
//         delButton.classList.add('del');
//         moveNotReadButton.classList.add('moveNot');
//         moveDoneReadButton.classList.add('moveDone');
//         editButton.classList.add('edit');
//     } else if (readState == 'doneRead') {
//         delButton.classList.add('del');
//         moveNotReadButton.classList.add('moveNot');
//         moveReadButton.classList.add('MoveOn');
//         editButton.classList.add('edit');
//     } else if (readState == 'notRead') {
//         delButton.classList.add('del');
//         moveDoneReadButton.classList.add('moveDone');
//         moveReadButton.classList.add('MoveOn');
//         editButton.classList.add('edit');
//     }
//     console.log('action Button on')
// }

function addBook() {
    const titleBook = document.getElementById('inputTitle').value;
    const authorBook = document.getElementById('inputAuthor').value;
    const yearBook = document.getElementById('inputYear').value;
    const stateBook = bookState();
    var timeTarget = document.getElementById('inputFinishTarget').value;

    const generatedID = generateId();
    const bookObject = generateBookInfo(generatedID, titleBook, authorBook, yearBook, stateBook, timeTarget);
    bookInfoArray.push(bookObject);

    console.log('addBook function on');
    console.log(bookObject);

    document.dispatchEvent(new Event(RENDER_EVENT));

}

function bookState() {
    const doneRead = document.getElementById('finishedReadingCheck');
    const onRead = document.getElementById('readingCheck');
    const notRead = document.getElementById('unreadCheck');
    if (doneRead.checked) {
        return 'doneRead';
    }
    else if (onRead.checked) {
        return 'onRead'
    }
    else if (notRead.checked) {
        return 'notRead'
    }
}

document.addEventListener('DOMContentLoaded', function () {
    const submitForm = document.getElementById('bookIdentity');
    submitForm.addEventListener('submit', function (event) {
        event.preventDefault();
        console.log('adding book');
        addBook();

    });
});

document.addEventListener(RENDER_EVENT, function () {
    const bookDoneRead = document.getElementById('read');
    const bookRead = document.getElementById('reading');
    const bookUnRead = document.getElementById('unread');
    const readState = bookState();

    // clearing list item
    bookDoneRead.innerHTML = '';
    bookRead.innerHTML = '';
    bookUnRead.innerHTML = '';

    for (bookItem of bookInfoArray) {
        const bookElement = createBook(bookItem);
        console.log('this is bookItem');
        console.log(bookItem);
        if (readState == 'onRead') {
            bookRead.append(bookElement);
        } else if (readState == 'doneRead') {
            bookDoneRead.append(bookElement);
        } else if (readState == 'notRead') {
            bookUnRead.append(bookElement);
        }

    }
});