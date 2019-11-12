const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');
const mongoose = require('mongoose');
const flash = require('connect-flash');

const app = express();

//load routes
const users =require('./routes/users');
//Map global promise - get rid of warning
mongoose.Promise = global.Promise;
//mongoosse connection
mongoose.connect('mongodb://localhost:27017/login-reg',{
    useMongoClient: true
})
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log(err));
//handlebar middleware
app.engine('handlebars', exphbs({
    defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');

//body-parser middleware
app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());

//static folder
app.use(express.static(path.join(__dirname,'public')));
//use routes
app.use('/users',users);


const port = 3009;

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});