var ind = [];

function updateSearch() {
    ind = [];
    const searchContainer = document.getElementById('searchResContainer');

    searchContainer.innerHTML = '';

    const searchvalue = document.getElementById('searchBox').value;
    const lowercaseValue = searchvalue.toLowerCase();
    searchContainer.style.display = 'flex';

    if (lowercaseValue != '') {
        bookSearch(lowercaseValue);
    } else {
        searchContainer.innerHTML = '<span class="searchNotFound">Waiting for Input..</span>';
    }



    if (ind.length !== 0) {
        createInit();
    } else if (lowercaseValue != '') {
        searchContainer.innerHTML = '<span class="searchNotFound">Book not Found!</span>';
    } else {
        searchContainer.innerHTML = '<span class="searchNotFound">Waiting for Input..</span>';
    }
}

function bookSearch(val) {
    const value = val;
    bookInfoArray.forEach(element => {
        const title = element.title;
        const titleLow = title.toLowerCase();
        const checkLowerCase = titleLow.search(value);
        if (checkLowerCase !== -1) {
            ind.push(element);
        }
    });
    return null;
}

function createInit() {
    const searchContainer = document.getElementById('searchResContainer');

    for (element of ind) {
        const bookElement = createResult(element);
        searchContainer.append(bookElement);

    }
}


function createResult(element) {

    const { id, title, author, year, readState, targetTime } = element;

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


    const delButton = document.createElement('span');
    delButton.classList.add("material-symbols-outlined");
    delButton.classList.add('del');
    delButton.innerText = 'delete';
    delButton.addEventListener('click', function () {
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
        moveToNotRead(id);

    })

    const editButton = document.createElement('span');
    editButton.classList.add("material-symbols-outlined");
    editButton.classList.add('edit');
    editButton.innerText = 'edit';
    editButton.addEventListener('click', function () {
        editBook(id);
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
