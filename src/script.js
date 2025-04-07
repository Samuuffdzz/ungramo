console.log("This is script.js");

const N = 10; // Provisional
let txt1 = null;
let txt2 = null;
let themes;
let dicts;
let n = 0;

document.getElementById('themes').addEventListener('change', function(e) {
    const archivo = e.target.files[0];
    if (!archivo) return;

    lector = new FileReader();
    lector.onload = function(e) {
        txt1 = e.target.result;
    };
    lector.readAsText(archivo);
});

document.getElementById('dict').addEventListener('change', function(e) {
    const archivo = e.target.files[0];
    if (!archivo) return;

    lector = new FileReader();
    lector.onload = function(e) {
        txt2 = e.target.result;
    }
    lector.readAsText(archivo);
});

function loadData() {
    themes = txt1.split('\n');
    dicts = txt2.split('\n');
    n = themes.length;
}

function randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

function swapChars(str, i, j) {
    if (i == j) return str;

    let arr = str.split('');

    [arr[i], arr[j]] = [arr[j], arr[i]];

    return arr.join('');
}

function initializeTable() {
    let t = randomNumber(0, n);
    let pals = dicts[t].split(' ');
    let m = pals.length;
    document.getElementById('tem').innerText = themes[t];

    for (let i = 0; i < m; ++i) {
        let l = randomNumber(0, m);
        let r = randomNumber(0, m);
        if (l != r) [pals[l], pals[r]] = [pals[r], pals[l]];
    }

    for (let i = 0; i < N; ++i) {
        let len = pals[i].length;
        for (let j = 0; j < len; ++j) {
            let l = randomNumber(0, len);
            let r = randomNumber(0, len);
            pals[i] = swapChars(pals[i], l, r);
        }
        document.getElementById('anag' + i).innerText = pals[i];
    }
}