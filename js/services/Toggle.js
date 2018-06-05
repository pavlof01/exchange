function sibling(cur) {
    while ((cur = cur.nextSibling) && cur.nodeType !== 1) {
    }
    return cur;
}

export function toggleElements() {
    let elements = document.getElementById('root').getElementsByClassName('js-toggle');

    Array.from(elements).forEach(function (elem) {
        elem.onclick = function (e) {
            e.target.classList.toggle('toggle_opened');
            sibling(e.target).classList.toggle('toggle-drop_animate');
            return false;
        }
    });
}

export function toggleTableElements() {
    let elements = document.getElementById('root').getElementsByClassName('table__toggle');

    Array.from(elements).forEach(function (elem) {
        elem.onclick = function (e) {
            e.target.classList.toggle('table__toggle_opened');
            let trElem = sibling(e.target.closest('tr'));
            trElem.style.display = trElem.style.display === 'none' ? 'table-row' : 'none';
            return false;
        }
    });
}