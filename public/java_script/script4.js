/*Kreda*/
let dinozaury3 = [];
dinozaury3 = [new Dinozaur("zdjecia/velociraptorin.png", "velociraptor", "szybki złodziej", "teropod", "1m", "2m", "14-20kg", "Chiny, Mongolia", "Mięsożerca, padlinożerca"), new Dinozaur("zdjecia/tyranozaurin.png", "Tyranozaur", "Tyrański król jaszczurów", "teropod", "6m", "12m", "8-12,5t", "USA, Kanada", "Mięsożerca")];
for (let i = 0; i < dinozaury3.length; i++) {
    document.write(`<div class="dinozaury">`);
    document.write(`<div class="dinozaury_specyfikacje ruch"><img src="${dinozaury3[i].zdjecie}"></div>`);
    document.write(`<div class="dinozaury_specyfikacje "><b>Nazwa</b>: ${dinozaury3[i].nazwa}<br><b>Znaczenie imienia</b>: ${dinozaury3[i].znaczenie}<br><b> Typ:</b> ${dinozaury3[i].typ}<br><b>Wzrost:</b> ${dinozaury3[i].wzrost}<br><b>Długość:</b> ${dinozaury3[i].dlugosc}<br><b>Waga</b>: ${dinozaury3[i].waga}<br><b>Kraj występowania:</b> ${dinozaury3[i].miejsce}<br><b>Typ pożywienia:</b> ${dinozaury3[i].jedzenie}<br></div>`);
    document.write(`</div>`);
}