function findBookIndex(bookId) {
    for (index in bookInfoArray) {
        if (bookInfoArray[index].id === bookId) {
            return index
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
