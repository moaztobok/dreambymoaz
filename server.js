
const express = require('express');
const path = require('path');
const app = express();
var cors = require('cors')
require('dotenv').config();
const mongoose = require('mongoose');
const morgan = require('morgan');
const uri =process.env.MONGODB_URI
const projectRoutes = require('./api/routes/project')
const blogRoutes = require('./api/routes/blog')
const bodyParser = require('body-parser');

app.use(cors())

app.use(bodyParser.urlencoded({ extended:false}));
app.use(bodyParser.json());
connected = mongoose.connect(uri);
connected.then(() => {
    console.log('Connected to MongoDB');
}).catch(err => {
    console.error('Error connecting to MongoDB:', err);
});

app.use(express.static(path.join(__dirname, 'build')));

app.use('/uploads',express.static('uploads'));

app.get('/',function(req, res){
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});
app.use('/api/blog',blogRoutes);
app.use('/api/project',projectRoutes)
app.use((req, res, next) =>{
    const error = new Error('Not Found');

    error.status = 404;
    next(error);

})
app.use((error, req,res, next) =>{
    res.status(error.status || 500); 
    res.json({
        error: {
            message: error.message
        }
    })
})
process.env.VITE_REACT_HOSTNAME = process.env.PORT
console.log(process.env.VITE_REACT_HOSTNAME)
app.listen(process.env.PORT||'3000', function(){
    console.log('listening on port ',process.env.PORT||'3000');
});