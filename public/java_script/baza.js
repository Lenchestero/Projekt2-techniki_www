var sqlite3 = require('sqlite3').verbose()
var md5 = require('md5')
const DBSOURCE = "db.sqlite"
console.log("db");
let db = new sqlite3.Database(DBSOURCE, (err) => {
    console.log("db");
    if (err){
      console.error("Problem")
      throw err
    }else{
        console.log('Połączono z bazą')
        db.run(`CREATE TABLE dinozaury (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            zdjecie text, 
            nazwa text,
            znaczenie text,
            typ text,
            wzrost text,
            dlugosc text, 
            waga text, 
            miejsce text,
            jedzenie text
            )`,
        (err) => {
            if (err) {
            }else{
                console.log("insertu");
                var insert = 'INSERT INTO dinozaury (zdjecie,nazwa,znaczenie,typ,wzrost,dlugosc, waga,miejsce, jedzenie) VALUES (?,?,?,?,?,?,?,?,?)'
                db.run(insert, ["zdjecia/kompsognatin.png", "Kompsognat", "Łagodna szczęka", "teropod", "40cm", "1m", "2-3kg", "Niemcy", "Padlinożerca, owadożerca"])
                db.run(insert, ["zdjecia/stegazourin.png", "Stegozaur", "Zadaszony jaszczur", "tyreofor", "4m", "6-9m", "4,5t", "USA, Portugalia", "Roślinożerca"])
                db.run(insert, ["zdjecia/allosaurin.png", "Allozaur", "Inny jaszczur", "teropod", "8,5m", "10m", "1-2t", "USA, Portugalia", "Mięsożerca"])
            }
        });  
    }
});


module.exports = db