const STORAGE_KEY = 'BOOK_INFO';
const SAVED_EVENT = 'saving';

function isStorageExist() {
  if (typeof (Storage) === undefined) {
    alert('Not Support Local Storage');
    return false;
  }
  return true;
}

function saveData() {
  if (isStorageExist()) {
    const parsed = JSON.stringify(bookInfoArray);
    localStorage.setItem(STORAGE_KEY, parsed);
    
    document.dispatchEvent(new Event(SAVED_EVENT));
  }
}
function loadDataFromStorage() {
  const serializedData = localStorage.getItem(STORAGE_KEY);
  let data = JSON.parse(serializedData);

  if (data !== null) {
    for (const item of data) {
      bookInfoArray.push(item);
    }
  }

  document.dispatchEvent(new Event(RENDER_EVENT));
}