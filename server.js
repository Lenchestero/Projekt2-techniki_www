import express from "express"
import handlebars from "express-handlebars"
import exphbs from "express-handlebars";
import  bodyParser from 'body-parser'
//var passport = require('passport');
var app=express()
app.use(bodyParser.urlencoded({ extended: true })); //add this
app.use(express.json());
import bcrypt from "bcrypt"//do haszowania haseł
app.use(express.static('public'))
import  sqlite3 from 'sqlite3';
import notifier from 'node-notifier';
import path from 'path';
//var mongoose=require('mongoose');
import {open} from "sqlite"

//mongoose.connect("mongodb+srv://Len:test@dinosaurs.txtc0iq.mongodb.net/?retryWrites=true&w=majority");

app.engine("handlebars", exphbs.engine());
app.set("view engine", "handlebars");

let id=0;

const db=new sqlite3.Database("./db.sqlite",(err)=>{
    if(err) return console.error(err.message);
});
let sql='INSERT INTO logowanie(login,hasło) VALUES (?,?)';
/*
const iPassport=require('./identyfikacja')
iPassport(passport)
*/

app.post("/rejestracja",async (req,res)=>{
    
    try{
        
        const haszowane=await bcrypt.hash(req.body.password,10)
        db.run(sql,[req.body.login,haszowane],(err)=>{
            if(err) return console.error(err.message);
        })
        console.log(req.body.login);
        console.log(req.body.password);
        res.redirect("/")
        //console.log(req.body.login,haszowane);
    }catch(e){
        console.log(e)
        res.redirect("/rejestracja")
    }
})


app.post('/', async(req,res)=> {
    try{
        console.log("przed");
        console.log(`SELECT * FROM logowanie WHERE login="${req.body.login}"`);
        const user = await db.get(`SELECT * FROM logowanie WHERE login="${req.body.login}";`, (err, row)=>{            
            if(err) {
                console.log("err")
            return console.error(err.message);
            } else {
                if(typeof row == 'undefined') {
                    console.log("Nie ma takiego użytkownika")
                    notifier.notify({title:'Niepowodzenie',
                            message: 'Login niepoprawny',
                            sound:true,
                            wait: true});
                    res.redirect("/");
                } else {
                    console.log(`row ${row.ID}`)
                    id=row.ID;
                    console.log("login prawidłowy")
                    bcrypt.compare(req.body.password, row.hasło, function(err, result) {
                        if (result) {
                            res.redirect("/strona_g");
                            console.log("login prawidłowy")
                        } else {
                            res.redirect("/");
                            notifier.notify({title:'Niepowodzenie',
                            message: 'Hasło niepoprawne',
                            sound:true,
                            wait: true});
                            console.log("hasło nieprawidłowy")
                            
                        }
                    });
                    
                }
            }
        });

        console.log("po");
    }
    catch(e){
        console.log(e)
        res.redirect("/")
    }
  });

  const dbPromise = open({
    filename: "db.sqlite",
    driver: sqlite3.Database,
  });

  app.post("/wyszukiwarka",async (req,res)=>{
    
    try{
        
        const wyszukanie=req.body.text;
        console.log(wyszukanie);
        const db=await dbPromise;
        const dinozaury= await db.all(`SELECT * from dinozaury WHERE nazwa LIKE '%${wyszukanie}%' OR okres LIKE '%${wyszukanie}%' OR miejsce LIKE '%${wyszukanie}%' OR jedzenie LIKE '%${wyszukanie}%' OR typ LIKE '%${wyszukanie}%' `);
        console.log(dinozaury)
        res.render("layouts/main.handlebars",{dinozaury})
        }catch(e){
            console.log(e)
            res.redirect("/wyszukiwarka")
        }
})

app.use(express.urlencoded({extended: false}))
app.get('/strona_g',(req,res)=>{
    res.render("index1.ejs")
})

app.get('/',(req,res)=>{
    res.render("logowanie.ejs")
})

app.get('/edycja',async (req,res)=>{
    await console.log(req.body.dinozaur);
    res.render("edycja.ejs")
})

app.get('/rejestracja',(req,res)=>{
    res.render("rejestracja.ejs")
})

app.get('/wyszukiwarka',async (req,res)=>{
    const db=await dbPromise;
    const dinozaury= await db.all("SELECT * from dinozaury")
    //res.send(dinozaury);
    res.render("layouts/main.handlebars",{dinozaury})
})

app.get('/usuwanie', (req,res)=>{
    res.render("usuwanie.ejs")
})

app.get('/nowy',(req,res)=>{
    if(id==7)
    {
        res.render("nowydinozaur.ejs")
    }
    else{
        notifier.notify({title:'Brak dostępu',
        message: 'Do tej części mogą wejść wybrani użytkownicy',
        sound:true,
        wait: true}); 
    }
})

app.post("/nowy",async (req,res)=>{
    
    try{
        if(req.body.nazwa.length==0 || req.body.znaczenie.length==0 || req.body.typ.length==0 || req.body.wzrost.length==0 || req.body.dlugosc.length==0 || req.body.waga.length==0 || req.body.miejsce.length==0 || req.body.jedzenie.length==0 || req.body.okres.length==0)
        {
            notifier.notify({title:'Błąd',
            message: 'Wygląda na to, że nie wpisałeś wszystkich danych',
            sound:true,
            wait: true}); 
        }
        else{
            db.run('INSERT INTO dinozaury(zdjecie,nazwa,znaczenie,typ,wzrost,dlugosc,waga,miejsce, jedzenie,okres) VALUES (?,?,?,?,?,?,?,?,?,?)',["allosaurin.png",req.body.nazwa,req.body.znaczenie,req.body.typ,req.body.wzrost,req.body.dlugosc,req.body.waga,req.body.miejsce,req.body.jedzenie, req.body.okres],(err)=>{
                if(err) return console.error(err.message);
            })
            console.log(req.body.nazwa);
            console.log(req.body.okres);
            res.redirect("/wyszukiwarka")
            //console.log(req.body.login,haszowane);
        }
        
    }catch(e){
        console.log(e)
        res.redirect("/nowy")
    }
})

var obecny;

app.post("/usuwanie",async (req,res)=>{
    
    try{
        if(req.body.dinozaur.length==0){
            notifier.notify({title:'Błąd',
            message: 'Wygląda na to, że nie wpisałeś wszystkich danych',
            sound:true,
            wait: true}); 
        }
        else{
            db.run('DELETE FROM dinozaury WHERE nazwa=(?)',[req.body.dinozaur],(err)=>{
                if(err) return console.error(err.message);
            })
            console.log(req.body.dinozaur);
            res.redirect("/wyszukiwarka")
            //console.log(req.body.login,haszowane);
        }
        
    }catch(e){
        console.log(e)
        res.redirect("/usuwanie")
    }
})

app.post("/edycja",async (req,res)=>{
    
    try{
        if(req.body.nazwa.length==0){
            notifier.notify({title:'Błąd',
            message: 'Wygląda na to, że nie wybrałeś dinozaura',
            sound:true,
            wait: true}); 
        }
        else{
            const dino=await db.get('SELECT* FROM dinozaury WHERE nazwa=(?)',[req.body.nazwa],(err,row)=>{
                if(err) return console.error(err.message);
           
            console.log(req.body.nazwa);
            var znaczenie=row.znaczenie;
            console.log(row);
            let typ=row.typ;
            let wzrost=row.wzrost;
            let dlugosc=row.dlugosc;
            let waga=row.waga;
            let miejsce=row.miejsce;
            let jedzenie=row.jedzenie;
            let okres=row.okres;
            if(req.body.znaczenie.length!=0){
                znaczenie=req.body.znaczenie;
            }
            if(req.body.typ.length!=0){
                typ=req.body.typ;
            }
            if(req.body.wzrost.length!=0){
                wzrost=req.body.wzrost;
            }
            if(req.body.dlugosc.length!=0){
                dlugosc=req.body.dlugosc;
            }
            if(req.body.waga.length!=0){
                waga=req.body.waga;
            }
            if(req.body.miejsce.length!=0){
                miejsce=req.body.miejsce;
            }
            if(req.body.jedzenie.length!=0){
                jedzenie=req.body.jedzenie;
            }
            if(req.body.okres.length!=0){
                okres=req.body.okres;
            }
        
            db.run('DELETE FROM dinozaury WHERE nazwa=(?)',[req.body.nazwa],(err)=>{
                if(err) return console.error(err.message);
            })
            db.run('INSERT INTO dinozaury(zdjecie,nazwa,znaczenie,typ,wzrost,dlugosc,waga,miejsce, jedzenie,okres) VALUES (?,?,?,?,?,?,?,?,?,?)',["allosaurin.png",req.body.nazwa,znaczenie,typ,wzrost,dlugosc,waga,miejsce, jedzenie,okres],(err)=>{
                if(err) return console.error(err.message);
            })
            console.log(req.body.nazwa);
            res.redirect("/wyszukiwarka")
            //console.log(req.body.login,haszowane);
        })
        }
        
    }catch(e){
        console.log(e)
        res.redirect("/usuwanie")
    }
})

app.listen(3000)