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
            return index;
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

function createBook(id, title, author, year, readState, targetTime) {

    const bookTitle = document.createElement("p");
    bookTitle.classList.add("titleClass");
    bookTitle.innerText = title;

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

    const containerButton = document.createElement("div");
    containerButton.classList.add("containerButtonClass");
    containerButton.append(addButton(id, readState));

    const container = document.createElement("div");
    container.classList.add("containerClass");
    container.append(containerBook, containerButton);
    container.setAttribute('id', 'book-${id}');

    return container;
}

function addButton(id, readState) {
    var delButton = document.createElement('button').classList.add('actionButton');
    var moveDoneReadButton = document.createElement('button').classList.add('actionButton');
    var moveReadButton = document.createElement('button').classList.add('actionButton');
    var moveNotReadButton = document.createElement('button').classList.add('actionButton');
    var editButton = document.createElement('button').classList.add('actionButton');
    delButton.addEventListener('click', function () {
        removeBook(id);
    })
    moveDoneReadButton.addEventListener('click', function () {
        moveToDone(id);
    })
    moveNotReadButton.addEventListener('click', function () {
        moveToNotRead(id);
    })
    moveReadButton.addEventListener('click', function () {
        moveToOnRead(id);
    })
    if (readState == 'onRead') {
        return delButton.classList.add('del'),
            moveNotReadButton.classList.add('moveNot'),
            moveDoneReadButton.classList.add('moveDone'),
            editButton.classList.add('edit');
    } else if (readState == 'doneRead') {
        return delButton.classList.add('del'),
            moveNotReadButton.classList.add('moveNot'),
            moveReadButton.classList.add('MoveOn'),
            editButton.classList.add('edit');
    } else if (readState == 'notRead') {
        return delButton.classList.add('del'),
            moveDoneReadButton.classList.add('moveDone'),
            moveReadButton.classList.add('MoveOn'),
            editButton.classList.add('edit');
    }
}

function addBook() {
    const titleBook = document.getElementById('inputTitle').value;
    const authorBook = document.getElementById('inputAuthor').value;
    const yearBook = document.getElementById('inputYear').value;
    const stateBook = bookState();
    var timeTarget;
    if (stateBook === 'onRead') {
        timeTarget = document.getElementById('inputFinishTarget').value;
    } else {
        return null;
    }

    const generatedID = generateId();
    const bookObject = generateBookInfo(generatedID, titleBook, authorBook, yearBook, stateBook, timeTarget);
    bookInfoArray.push(bookObject);

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
        addBook();
    });
});

document.addEventListener(RENDER_EVENT, function () {
    const bookDoneRead = document.getElementById('read');
    const bookRead = document.getElementById('reading');
    const bookUnRead = document.getElementById('unread');

    // clearing list item
    bookDoneRead.innerHTML = '';
    bookRead.innerHTML = '';
    bookUnRead.innerHTML = '';
    console.log('naise')

    for (bookItem of bookInfoArray) {
        const bookElement = createBook(todoItem);
        if (readState == 'onRead') {
            bookRead.append(bookElement);
        } else if (readState == 'doneRead') {
            bookDoneRead.append(bookElement);
        } else if (readState == 'notRead') {
            bookUnRead.append(bookElement);
        }

    }
});