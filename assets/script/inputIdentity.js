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
//bug Is Here. It can't defined objecy
function createBook(bookElement) {
    const { id, title, author, year, readState, targetTime } = bookElement;
    const thisId = id.toString();

    const bookTitle = document.createElement("p");
    bookTitle.classList.add("titleClass");
    bookTitle.innerHTML = "<span>Title</span>";
    const titleBook = document.createElement("p");
    titleBook.innerText = title;
    bookTitle.append(titleBook);

    const bookAuthor = document.createElement("p");
    bookAuthor.classList.add("authorClass");
    bookAuthor.innerHTML = "<span>Author</span>";
    const authorBook = document.createElement("p");
    authorBook.innerText = author;
    bookAuthor.append(authorBook);

    const bookYear = document.createElement("p");
    bookYear.classList.add("yearClass");
    bookYear.innerHTML = "<span>Year</span>";
    const yearBook = document.createElement("p");
    yearBook.innerText = year;
    bookYear.append(yearBook);

    const containerBook = document.createElement("div");
    containerBook.classList.add("containerBookClass");
    if (readState == 'onRead' && targetTime != '') {
        const target = document.createElement("p");
        target.classList.add("targetClass");
        target.innerHTML = "<span>Due Target</span>";
        const targetBook = document.createElement("p");
        targetBook.innerText = targetTime;
        target.append(targetBook);
        containerBook.append(bookTitle, bookAuthor, bookYear, target);
    } else if (readState == 'onRead' && targetTime == '') {
        const targetWarn = document.createElement("p");
        targetWarn.classList.add("targerWarn");
        targetWarn.innerHTML = '<span class="material-symbols-outlined">exclamation</span><span> Edit to Add Target Due</span>';
        containerBook.append(bookTitle, bookAuthor, bookYear, targetWarn);
    } else {
        containerBook.append(bookTitle, bookAuthor, bookYear);
    }

    console.log(readState);

    const delButton = document.createElement('span');
    delButton.classList.add("material-symbols-outlined");
    delButton.classList.add('del');
    delButton.innerText = 'delete';
    delButton.addEventListener('click', function () {
        console.log("book " + id + " removed")
        removeBook(id);
    })

    const moveDoneReadButton = document.createElement('span');
    moveDoneReadButton.classList.add("material-symbols-outlined");
    moveDoneReadButton.classList.add('moveDone');
    moveDoneReadButton.innerText = 'done_all';
    moveDoneReadButton.addEventListener('click', function () {
        moveToDone(id);
    })

    const moveReadButton = document.createElement('span');
    moveReadButton.classList.add("material-symbols-outlined");
    moveReadButton.classList.add('MoveOn');
    moveReadButton.innerText = 'book';
    moveReadButton.addEventListener('click', function () {
        moveToOnRead(id);
    })

    const moveNotReadButton = document.createElement('span');
    moveNotReadButton.classList.add("material-symbols-outlined");
    moveNotReadButton.classList.add('moveNot');
    moveNotReadButton.innerText = 'remove_done';
    moveNotReadButton.addEventListener('click', function () {
        console.log('its should be moving right now');
        moveToNotRead(id);

    })

    const editButton = document.createElement('span');
    editButton.classList.add("material-symbols-outlined");
    editButton.classList.add('edit');
    editButton.innerText = 'edit';
    editButton.addEventListener('click', function () {
        editBook(id);
        console.log('editBook Instance');
    })

    const containerButton = document.createElement("div");
    containerButton.classList.add("containerButtonClass");

    if (readState == 'onRead') {
        containerButton.append(moveDoneReadButton, moveNotReadButton, editButton, delButton);
    } else if (readState == 'doneRead') {
        containerButton.append(moveReadButton, moveNotReadButton, editButton, delButton);
    } else if (readState == 'notRead') {
        containerButton.append(moveDoneReadButton, moveReadButton, editButton, delButton);
    } else {
        console.error("Can't define state!");
    }

    const container = document.createElement("div");
    container.classList.add("containerClass");
    container.append(containerBook, containerButton);
    container.setAttribute('id', thisId);

    return container;
}

function addBook() {
    const titleBook = document.getElementById('inputTitle').value;
    const authorBook = document.getElementById('inputAuthor').value;
    const yearBook = document.getElementById('inputYear').value;
    const stateBook = bookState();
    timeTarget = document.getElementById('inputFinishTarget').value;

    const generatedID = generateId();
    const bookObject = generateBookInfo(generatedID, titleBook, authorBook, yearBook, stateBook, timeTarget);
    bookInfoArray.push(bookObject);

    console.log('addBook function on');
    console.log(bookObject);

    document.dispatchEvent(new Event(RENDER_EVENT));

    saveData();

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
        if (isEditing == true) {
            applyEdit();
            isEditing = false;
            editIndex = null;
        } else if (isEditing == false){
           addBook(); 
        }
        submitForm.reset()
    });

    if (isStorageExist()) {
        loadDataFromStorage();
    }
});

document.addEventListener(RENDER_EVENT, function () {
    const bookDoneRead = document.getElementById('readContent');
    const bookRead = document.getElementById('readingContent');
    const bookUnRead = document.getElementById('unreadContent');
    // clearing list item
    bookDoneRead.innerHTML = '';
    bookRead.innerHTML = '';
    bookUnRead.innerHTML = '';

    for (bookItem of bookInfoArray) {
        const bookElement = createBook(bookItem);
        console.log('this is bookItem');
        console.log(bookItem);
        if (bookItem.readState == 'onRead') {
            bookRead.append(bookElement);
        } else if (bookItem.readState == 'doneRead') {
            bookDoneRead.append(bookElement);
        } else if (bookItem.readState == 'notRead') {
            bookUnRead.append(bookElement);
        }

    }
    saveData();
    setTimeout(() => { nothoverCheck(); }, 500);


});