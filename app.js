const express = require('express');
const app = express();
const PORT = 5000;
const path = require('path');
const mongoose = require('mongoose');
const criptoRouter = require('./routes/criptoRoute');

mongoose.connect('mongodb://localhost/cripto');

let db = mongoose.connection;
db.on('error', ()=>{console.log('Houve um erro!')});
db.once('open', ()=>{console.log('Banco carregado!')});


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use('/', criptoRouter);
app.use(express.static(path.join(__dirname, 'public')));

app.listen(PORT, ()=>{
    console.log('Server running...');
});