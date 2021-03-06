const express = require('express');
const app = express();
var cors = require('cors');
app.use(cors());
let path = require("path");

const userRoutes = require('./src/routes');
const Connection = require("./connection/dbConnection");

//@info all routes
app.use(express.json());
app.use('/api/users', userRoutes);
//port at which server running
app.use(express.static('./build'));

app.use('*',  (req, res)=> {
    res.sendFile(path.join(__dirname, './build', 'index.html'));
   });
var PORT = process.env.PORT || 5000;

var server = app.listen(PORT, () => {
    Connection()
    console.log("Server is listening on port::", PORT);
})
//@info server will be closed in case of any unhandledRejection
process.on('unhandledRejection', error => {
    console.log(error.message);
    server.close(() => process.exit(1));
});
