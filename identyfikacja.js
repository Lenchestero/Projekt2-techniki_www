var express = require('express');
var passport = require('passport');
const local_strategy=require("passport-local").Strategy
const bcrypt=require("bcrypt")
var bodyParser = require('body-parser')
const sqlite3=require('sqlite3');


const db=new sqlite3.Database("./db.sqlite",(err)=>{
    if(err) return console.error(err.message);
});



function inicjalizacja(passport){
    const sprawdzenie=(login, password,done)=>{
    const user= db.get('SELECT hasło FROM logowanie WHERE login=?',[login]);


    }
    passport.use(new local_strategy({username: 'login'}),sprawdzenie)
    passport.serialize((login,done)=>{})
    passport.deserialize((login,done)=>{})
}

