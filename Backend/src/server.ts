import  express from "express";
const app = express();
const PORT = 5000;

app.get("/",(req,res) =>{
    res.send("hello arun");
});

app.listen(PORT)