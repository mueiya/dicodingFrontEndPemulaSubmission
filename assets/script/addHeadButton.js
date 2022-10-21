
function popUp(val) {
    const addButton = document.getElementById(val);
    addButton.style.display = 'block';
    isHover = true;
}
function popUpHide(val) {
    const addButton = document.getElementById(val);
    const searchCont = document.getElementById('searchResContainer');
    addButton.style.display = 'none';
    searchCont.style.display = 'none';
}
