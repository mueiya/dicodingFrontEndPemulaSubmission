const container = document.getElementsByClassName('inputBook');
var overlay = document.getElementById('addBookOverlay');
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