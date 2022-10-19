const container = document.getElementsByClassName('inputBook');
var overlay = document.getElementById('addBookOverlay');
var form = document.getElementById('bookIdentity');
var isHover = false;

function overlayOn() {
    overlay.style.display = 'flex';
}
function overlayOff () {
    if (!isHover) {
        overlay.style.display = 'none';
    }
    else {
        return;
    }
}
function overlayHover() {
    isHover = true;
}
function overlayLeave() {
    isHover = false;
}

form.addEventListener('submit', function () {
    overlay.style.display = 'none';
});