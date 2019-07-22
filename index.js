var express = require("express");
var bodyParser = require("body-parser");
var csvWriter = require('csv-write-stream')
const csv = require('csv-parser');
const fs = require('fs');
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

const urlencodedParser = bodyParser.urlencoded({extended: false});

var task = [];
fs.readFile(__dirname + '/tasks.csv' , 'utf8', (err,data) => {
    if(err) {

    }
    if(data){
        task = data.split('\n');
        console.log(complete)
    }
})
// var task2=[];

app.set("view engine", "ejs");

var complete = [];
fs.readFile(__dirname + '/completed.csv' , 'utf8', (err,data) => {
    if(err) {

    }
    if(data){
        complete = data.split('\n');
        console.log(complete)
    }
})


app.post("/addtask", urlencodedParser, function(req, res) {
    var taskNew = req.body.newtask;
    
    
    // res.render('display',taskNew);
    task.push(taskNew);

    fs.appendFile('tasks.csv',`\n${taskNew}`,(err)=>console.error(err));
    // fs.readFile('tasks.csv','utf-8',(err,data)=>{
    //     if(err) throw err;
    //     if(data){
    //         console.log('reading');
    //         console.log(data);
    //         task.push(data);
    //     }
    // })
    res.redirect("/");
});

app.post("/removetask", function(req, res) {
    var completeTask = req.body.check;
    if (typeof completeTask === "string") {
        complete.push(completeTask);
        fs.appendFile('completed.csv',`${completeTask}\r`,(err)=>console.error(err));
        task.splice(task.indexOf(completeTask), 1);
    } 
    // else if (typeof completeTask === "object") {
    //     for (var i = 0; i < completeTask.length; i++) {
    //         complete.push(completeTask[i]);
    //         task.splice(task.indexOf(completeTask[i]), 1);
    //     }
    // }
    res.redirect("/");
});

app.get("/", function(req, res) {
    res.render("index", { task: task, complete: complete });
});

app.listen(2000, function() {
    console.log("server is running on port 2000");
});

app.use(express.static("public"));