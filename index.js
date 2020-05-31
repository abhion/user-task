const express = require('express');
const app = express();
const port = 3035;
const setupDB = require('./config/database');
const router = require('./config/routes');
const cors = require('cors');

app.use(cors());
app.use(express.json());
app.use('/', router);

setupDB();

app.listen(port, () => console.log("running on port " + port));