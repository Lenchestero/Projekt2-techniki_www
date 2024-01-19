/*Jura*/

let dinozaury2 = [];
dinozaury2 = [new Dinozaur("zdjecia/stegazourin.png", "Stegozaur", "Zadaszony jaszczur", "tyreofor", "4m", "6-9m", "4,5t", "USA, Portugalia", "Roślinożerca"), new Dinozaur("zdjecia/allosaurin.png", "Allozaur", "Inny jaszczur", "teropod", "8,5m", "10m", "1-2t", "USA, Portugalia", "Mięsożerca")];
for (let i = 0; i < dinozaury2.length; i++) {
    document.write(`<div class="dinozaury">`);
    document.write(`<div class="dinozaury_specyfikacje ruch"><img src="${dinozaury2[i].zdjecie}"></div>`);
    document.write(`<div class="dinozaury_specyfikacje "><b>Nazwa</b>: ${dinozaury2[i].nazwa}<br><b>Znaczenie imienia</b>: ${dinozaury2[i].znaczenie}<br><b> Typ:</b> ${dinozaury2[i].typ}<br><b>Wzrost:</b> ${dinozaury2[i].wzrost}<br><b>Długość:</b> ${dinozaury2[i].dlugosc}<br><b>Waga</b>: ${dinozaury2[i].waga}<br><b>Kraj występowania:</b> ${dinozaury2[i].miejsce}<br><b>Typ pożywienia:</b> ${dinozaury2[i].jedzenie}<br></div>`);
    document.write(`</div>`);
}