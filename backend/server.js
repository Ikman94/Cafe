const express = require('express');
const mongoose = require('mongoose');
const handlebars = require('express-handlebars')
const dotenv = require('dotenv')
const port = process.env.PORT || 5001;
const URL = "mongodb://localhost/TAP";
const Routes = require('./api/index.js');
// const AdminRoutes = require('./api/index2.js');

dotenv.config();

const app = express();

app.engine('hbs', handlebars({
    extname: "hbs",
    layoutsDir: "views",
    defaultLayout: "layouts/main",
    // partialsPath: 'views/modal'
}))

app.set('view engine', 'hbs')
app.set("views", "views")
app.use(express.static("public"));

mongoose.connect(process.env.MONGODB_URL || URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
});
const db = mongoose.connection;

db.once('open', () => { console.log('Connected to MongoDB') });
db.on('error', err => { console.log(err) });
app.use(express.json());
app.use(express.urlencoded({extended:true}))

app.use('/api/', Routes);
// app.use('/', AdminRoutes);

app.get('/api/config/paypal', (req, res) => {
    res.send(process.env.PAYPAL_CLIENT_ID  || 'sb')
})
// app.use((err, req, res, next) => {
//     res.status(500).send({ message: err.message })
// });
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`)
});