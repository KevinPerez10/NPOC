const express = require('express');
const app = express();
const mysql = require("mysql")
const cors = require('cors')

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host:"localhost",
    user:"root",
    password: "password",
    database: "npoc_db"
});

app.post('/create', (req, res) => {
    const f = req.body.f;
    const l = req.body.l;
    const a = req.body.a;
    const p = req.body.p;
    const ad = req.body.ad;
    const em = req.body.em;
    const pa = req.body.pa;
    
    db.query("INSERT INTO patient_info (firstname, lastname, age, phone, address, email, password) VALUES (?,?,?,?,?,?,?);",
    [f, l, a, p, ad, em, pa], (err, result) => {
    if(err){
        console.log(err);
    } else {
        res.send("values inserted");
    }
    })
})

app.listen(5174, () => {
    console.log("Server running on port 3001");
});