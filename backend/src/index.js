const express = require('express');
const routes = require('./routes');
const cors = require('cors');
require('./database');

const app = express();

/* configurando cors para liberar acesso a api */
app.use(cors());
const corsOptions = {
    origin: 'http://localhost:8080',
    optionsSuccessStatus: 200
}
app.use(cors(corsOptions));

app.use(express.json());
app.use(routes);


app.listen(3333);