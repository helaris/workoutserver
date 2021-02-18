const express = require('express');
const cors = require('cors');

const exerciseRoute = require('./routes/exercises-route');

const app = express();

app.use(cors());

app.use('/api/exercises', exerciseRoute);

app.listen(3000, () => console.log('server running on PORT: 3000'));