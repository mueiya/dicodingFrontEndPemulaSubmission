const localBookKey = 'BOOK_INFO';

function checkStorage() {
    typeof (Storage) !== 'undefined';
}

document.addEventListener('DOMContentLoaded', function () {

    if (isStorageExist()) {
        loadDataFromStorage();
    }
});

window.addEventListener('load', function () {
    if (checkStorage) {
        if (localStorage.getItem(localBookKey) !== null) {
            renderUserList();
        }
    } else {
        alert("Browser not Support Local Storage");
    }
});

function saveData() {
    if (checkStorage()) {
        const parsed = JSON.stringify(bookId);
        localStorage.setItem(STORAGE_KEY, parsed);
        document.dispatchEvent(new Event('onSave'));
    }
}

function loadData() {
    const getBookData = localStorage.getItem(STORAGE_KEY);
    let data = JSON.parse(getBookData);
    if (data !== null)
        list = data;
    document.dispatchEvent(new Event("onLoad"));
}
