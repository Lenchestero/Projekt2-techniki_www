/* Do pokazu slajdów, podmienia zdjecie */

const zdjecia = ["stegazourin.png", "velociraptorin.png", "kompsognatin.png", "allosaurin.png", "tyranozaurin.png"];
let i = 0;

function podmienianie_kolejne() {
    var zdjecie = document.getElementById("zdjecie_specyfikacje");
    if ((i + 1) == zdjecia.length) {
        i = 0;
    } else {
        i++;
    }
    zdjecie.src = `zdjecia/${zdjecia[i]}`;
    console.log(zdjecia[i]);
}

function podmienianie_poprzednie() {
    var zdjecie = document.getElementById("zdjecie_specyfikacje");
    if ((i) == 0) {
        i = zdjecia.length - 1;
    } else {
        i--;
    }
    zdjecie.src = `zdjecia/${zdjecia[i]}`;
    console.log(zdjecia[i]);
}