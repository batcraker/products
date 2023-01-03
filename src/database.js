import mongoose, { mongo } from 'mongoose';
import config from "./config";

mongoose.set('strictQuery', false);
mongoose.connect(`mongodb+srv://${config.USER_DB}:${config.PASSW_DB}@mongoapp.wbti8bh.mongodb.net/api-products?retryWrites=true&w=majority`)
    .then(db => console.log('Db connected'))
    .catch(err => console.log(err))

