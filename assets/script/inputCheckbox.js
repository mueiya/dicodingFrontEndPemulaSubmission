var read = document.getElementById('finishedReadingCheck');
var reading = document.getElementById('readingCheck');
var unread = document.getElementById('unreadCheck');
var target = document.getElementById('finishedTargetInput')
var targetDate = document.getElementById('inputFinishTarget');
var submitShelf = document.getElementById('submitTo');

reading.addEventListener('change', function () {

    if (reading.checked) {
        target.style.display = 'block';
        targetDate.required = true;
        read.checked = false;
        unread.checked = false;
        read.required = false;
        unread.required = false;
        submitShelf.innerHTML = '"Reading"';
    } else if (!reading.checked) {
        target.style.display = 'none';
        targetDate.required = false;
        submitShelf.innerHTML = '';
    }
});

read.addEventListener('change', function () {
    if (read.checked) {
        reading.checked = false;
        unread.checked = false;
        reading.required = false;
        unread.required = false;
        targetDate.required = false;
        target.style.display = 'none';
        submitShelf.innerHTML = '"Read"';
    } else if (!read.checked) {
        submitShelf.innerHTML = '';
        return;
    }
});
unread.addEventListener('change', function () {
    if (unread.checked) {
        reading.checked = false;
        read.checked = false;
        reading.required = false;
        read.required = false;
        targetDate.required = false;
        target.style.display = 'none';
        submitShelf.innerHTML = '"Unread"';
    } else if (!unread.checked) {
        submitShelf.innerHTML = '';
        return;
    }
});

