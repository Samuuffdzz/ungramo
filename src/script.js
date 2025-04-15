console.log("This is script.js");

const N = 10; // Provisional
let txt1 = null;
let txt2 = null;
let select = document.getElementById('opciones');
let themes;
let dicts;
let n = 0;
let cppals;

let rows = [];
let inputs = new Array(N);
for (let i = 0; i < N; ++i) {
    rows[i] = false;
    inputs[i] = document.getElementById('res' + i);
}

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
    for (let i = 0; i < n; ++i) {
        let ele = document.createElement('option');
        ele.value = `option${i}`;
        ele.text = themes[i];
        select.appendChild(ele);
    }
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
    let t = select.selectedIndex;

    if (t == 0) t = randomNumber(0, n);
    else t--;

    let pals = dicts[t].split(',');
    cppals = dicts[t].split(',');
    let m = pals.length;
    document.getElementById('tem').innerText = themes[t];

    for (let i = 0; i < m; ++i) {
        let l = randomNumber(0, m);
        let r = randomNumber(0, m);
        if (l != r) {
            [pals[l], pals[r]] = [pals[r], pals[l]];
            [cppals[l], cppals[r]] = [cppals[r], cppals[l]];
        }
    }

    for (let i = 0; i < N; ++i) {
        let len = pals[i].length;
        for (let j = 0; j < len; ++j) {
            let l = randomNumber(0, len);
            let r = randomNumber(0, len);
            pals[i] = swapChars(pals[i], l, r);
        }
        document.getElementById('anag' + i).innerText = pals[i];
        document.getElementById('row' + i).style = "background-color: rgb(170, 190, 255);";
        inputs[i].value = '';
        rows[i] = false;
    }

    document.getElementById('end').style.visibility = 'hidden';
}

function recipAnagrams(s, t) { // Se asumen caracteres socialistas del alfabeto Latin
    let p = [];
    let q = [];
    for (let i = 0; i < 26; ++i) {
        p[i] = 0;
        q[i] = 0;
    }
    for (let i = 0; i < s.length; ++i) {
        p[s.charAt(i).charCodeAt(0) - 97]++;
    }
    for (let i = 0; i < t.length; ++i) {
        q[t.charAt(i).charCodeAt(0) - 97]++;
    }
    for (let i = 0; i < 26; ++i) if (p[i] != q[i]) return false;
    return true;
}

for (let i = 0; i < N; ++i) {
    inputs[i].addEventListener('keydown', function(e) {
        if (e.key == 'Enter') {
            // console.log('Se presionó Enter. Valor actual: ' + inputs[i].value);
            let str = inputs[i].value;
            let idx = parseInt(inputs[i].id.substring(3));
            if (cppals[idx] == str) {
                document.getElementById('row' + idx).style = "background-color: rgb(51, 255, 0);";
                rows[idx] = true;
                let allTrue = true;
                for (let i = 0; i < N; ++i) {
                    if (rows[i] == false) {
                        allTrue = false;
                        break;
                    }
                }
                if (allTrue) {
                    console.log('Well Done');
                    document.getElementById('end').style.visibility = 'visible';
                }
            }
        }
    });
}