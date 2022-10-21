var ishover = false;
var onAnimation = false;
var isExpand = false;

function showShelfMed(shelf) {
    console.log('showsh active');
    const theShelf = document.getElementById(shelf);


    if (ishover == false)
        if (theShelf.style.bottom != '0%') {
            // theShelf.style.bottom = '0%';
            animateShelfShow(theShelf);
            changeIcon(theShelf);
            isExpand = true;
        } else {
            animateShelfHide(theShelf);
            //theShelf.style.bottom = '-72%';
            changeIcon(theShelf);
            isExpand = false;
        }
    console.log(isExpand);
    console.log(ishover);
}
function ishoverCheck() {
    ishover = true;
}
function nothoverCheck() {
    ishover = false;
}
function peek(shelf) {
    const thisElement = document.getElementById(shelf);
    if (thisElement.style.bottom != '0%' && onAnimation == false) {
        thisElement.style.bottom = '-70%';
    }
}
function peekNot(shelf) {
    const thisElement = document.getElementById(shelf);
    if (thisElement.style.bottom != '0%' && onAnimation == false) {
        thisElement.style.bottom = '-72%';
    }
}

function changeIcon(shelf) {
    const thisShelf = shelf;
    const thisIcon = thisShelf.querySelector("#expandLogo");

    if (thisIcon.innerText == 'expand_less') {
        thisIcon.innerText = 'expand_more';
    } else {
        thisIcon.innerText = 'expand_less'
    }

}

function animateShelfShow(shelf) {
    let id = null;
    const element = shelf;
    let pos = -72;
    id = setInterval(frame, 2);
    function frame() {
        if (pos == 0) {
            clearInterval(id);
            onAnimation = false;
        } else {
            onAnimation = true;
            pos++;
            element.style.bottom = pos.toString() + '%';
        }
    }
}
function animateShelfHide(shelf) {
    let id = null;
    const element = shelf;
    let pos = 0;
    id = setInterval(frame, 2);
    function frame() {
        if (pos == -72) {
            clearInterval(id);
            onAnimation = false;
        } else {
            onAnimation = true;
            pos--;
            element.style.bottom = pos.toString() + '%';
        }
    }
}