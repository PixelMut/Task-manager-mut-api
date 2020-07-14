// file to handle mongo DB connection and usage
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/TaskManager', { useNewUrlParser : true}).then(() =>{
    console.log('Connected to MongoDB successfully !!');
}).catch((e)=>{
    console.log('Error while connecting to MongoDB');
    console.log(e);
});

// to prevent deprecation warnings
mongoose.set('useCreateIndex' , true);
mongoose.set('useFindAndModify' , true);

module.exports = {
    mongoose
};
