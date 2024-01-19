var express=require("express")
var app=express()
var db=require("./baza.js")
var PORT=8000;
app.listen(PORT, ()=>{
    console.log("Serwer na porcie "+PORT)
});

app.get("/api/dinozaury",(req,res,next)=>{
    var sql = "select * from dinozaury"
    var params = []
    db.all(sql, params, (err, rows) => {
        if (err) {
          res.status(400).json({"error":err.message});
          return;
        }
        res.json({
            "message":"success",
            "data":rows
        })
      });
});


app.use(function(req, res){
    res.status(404);
});