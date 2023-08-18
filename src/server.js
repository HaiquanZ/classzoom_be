const express = require('express');
require('dotenv').config();
const cors = require('cors');
import initRoutes from './api/routes';
import connectDatabase from './api/config/connectDatabase';

const app = express();

app.use(function(req, res, next) {
    console.log(req.path, req.method);
    next();
})
app.use(express.json());

connectDatabase();
initRoutes(app);

const port = process.env.PORT || 4000;

app.listen(port, () => {
    console.log(`Listening on port ${port}!`);
});