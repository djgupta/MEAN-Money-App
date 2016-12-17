var express  = require('express');
var app      = express();      
var path = require('path')                 
var mongoose = require('mongoose');           
var bodyParser = require('body-parser');   
var methodOverride = require('method-override');

mongoose.connect('127.0.0.1:27017/users');  

app.use("/app", express.static('app'));                            
app.use(bodyParser.urlencoded({'extended':'true'}));           
app.use(bodyParser.json());                                
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); 
app.use(methodOverride());

var Schema = mongoose.Schema; 

var userSchema = new Schema({
    Name     : String,
    Email    : String,
    Password : String,
    Groups: [{
        GroupName: String,
        GroupMembers: [{
            MemberName: String,
            MemberExpense: [{
                ExpenseAmount: Number,
                ExpenseType: String
            }]
        }]
    }]
}, { minimize: false });

var Users = mongoose.model('users', userSchema);

app.post('/api/addUser', function(req, res) {

    Users.findOne({Email:req.body.Email}, function(err, user){
            if(user!=null){
                return res.sendStatus(401);
            }
            Users.create(req.body, function(err, user) {
            if (err){
                res.send(err);
            }
            res.json(user);
        });
    });
    

});

app.get('/api/signInUser/:email/and/:password', function(req, res) {
    Users.findOne({Email: req.params.email, Password: req.params.password}, function(err, user) {
        if (err){
            throw err;
        }
        if(user == null){
            return res.sendStatus(401);
        }
        res.json(user);
    });
});

app.get('/api/getUser/:email', function(req, res) {
    Users.findOne({Email: req.params.email}, function(err, user) {
        if (err){
            throw err;
        }
        if(user == null){
            return res.sendStatus(401);
        }
        res.json(user);
    });
});

app.put('/api/updateUser/:_id', function(req, res){
    var updateDoc = req.body;
    delete updateDoc._id;
    Users.findByIdAndUpdate(req.params._id, updateDoc, function(err, user) {
        if (err){
            throw err;
        }
        res.json(user);
    });
});

app.delete('/api/deleteUser/:_id', function(req, res) {
    Users.remove(req._id, function(err, user) {
        if (err){
            res.send(err);
        }
        Users.find(function(err, users) {
            if (err){
                res.send(err)
            }
            res.json(users);
        });
    });
});

app.get('*', function(req, res) {
    res.sendFile(__dirname + '/index.html');
});

app.listen(8080);
console.log("App listening on port 8080");