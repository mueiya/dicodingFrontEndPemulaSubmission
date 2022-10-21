var isEditing = false;
var editIndex;

function findBookIndex(bookId) {
    for (index in bookInfoArray) {
        if (bookInfoArray[index].id === bookId) {
            return index;
        }
    }
    return null;
}
function removeBook(bookId) {
    const target = findBookIndex(bookId);
    if (target === null) return;
    bookInfoArray.splice(target, 1);

    document.dispatchEvent(new Event(RENDER_EVENT));
}

function moveToDone(bookId) {
    const target = findBookIndex(bookId);
    if (target === null) return;
    bookInfoArray[target].readState = 'doneRead';

    document.dispatchEvent(new Event(RENDER_EVENT));
}
function moveToOnRead(bookId) {
    const target = findBookIndex(bookId);
    if (target === null) return;
    bookInfoArray[target].readState = 'onRead';

    document.dispatchEvent(new Event(RENDER_EVENT));
}
function moveToNotRead(bookId) {
    const target = findBookIndex(bookId);
    if (target === null) return;
    bookInfoArray[target].readState = 'notRead';

    document.dispatchEvent(new Event(RENDER_EVENT));
}

function editBook(bookId) {
    const target = findBookIndex(bookId);
    if (target === null) return;

    const { id, title, author, year, readState, targetTime } = bookInfoArray[target];

    thisId = id;
    titleBook = document.getElementById('inputTitle').value = title;
    authorBook = document.getElementById('inputAuthor').value = author;
    yearBook = document.getElementById('inputYear').value = year;
    timeTarget = document.getElementById('inputFinishTarget').value = targetTime;

    if (readState == 'doneRead') {
        document.getElementById('finishedReadingCheck').checked = true;
        document.getElementById('readingCheck').checked = false;
        document.getElementById('unreadCheck').checked = false;
        document.getElementById('finishedTargetInput').style.display = 'none';
    } else if (readState == 'onRead') {
        document.getElementById('finishedReadingCheck').checked = false;
        document.getElementById('readingCheck').checked = true;
        document.getElementById('unreadCheck').checked = false;
        document.getElementById('finishedTargetInput').style.display = 'block';
    } else if (readState == 'notRead') {
        document.getElementById('finishedReadingCheck').checked = false;
        document.getElementById('readingCheck').checked = false;
        document.getElementById('unreadCheck').checked = true;
        document.getElementById('finishedTargetInput').style.display = 'none';
    }

    stateBook = bookState();
    timeTarget = document.getElementById('inputFinishTarget').value;

    isEditing = true;
    editIndex = target;

    overlayOn();

    document.dispatchEvent(new Event(RENDER_EVENT));
}
function applyEdit() {
    const titleBook = document.getElementById('inputTitle').value;
    const authorBook = document.getElementById('inputAuthor').value;
    const yearBook = document.getElementById('inputYear').value;
    const stateBook = bookState();
    timeTarget = document.getElementById('inputFinishTarget').value;

    const generatedID = generateId();
    const bookObject = generateBookInfo(generatedID, titleBook, authorBook, yearBook, stateBook, timeTarget);
    bookInfoArray.splice(editIndex, 1, bookObject);

    document.dispatchEvent(new Event(RENDER_EVENT));

    saveData();
}
