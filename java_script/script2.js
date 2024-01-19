/*Trias*/


let dinozaury = [];
dinozaury = [new Dinozaur("zdjecia/kompsognatin.png", "Kompsognat", "Łagodna szczęka", "teropod", "40cm", "1m", "2-3kg", "Niemcy", "Padlinożerca, owadożerca")];
for (let i = 0; i < dinozaury.length; i++) {
    document.write(`<div class="dinozaury">`);
    document.write(`<div class="dinozaury_specyfikacje ruch"><img src="${dinozaury[i].zdjecie}"></div>`);
    document.write(`<div class="dinozaury_specyfikacje "><b>Nazwa</b>: ${dinozaury[i].nazwa}<br><b>Znaczenie imienia</b>: ${dinozaury[i].znaczenie}<br><b> Typ:</b> ${dinozaury[i].typ}<br><b>Wzrost:</b> ${dinozaury[i].wzrost}<br><b>Długość:</b> ${dinozaury[i].dlugosc}<br><b>Waga</b>: ${dinozaury[i].waga}<br><b>Kraj występowania:</b> ${dinozaury[i].miejsce}<br><b>Typ pożywienia:</b> ${dinozaury[i].jedzenie}<br></div>`);
    document.write(`</div>`);
}

console.log("dahsh");