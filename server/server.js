const express = require('express'),
    apiRouter = require('./routes'),
    cors = require('cors'),
    path = require('path'),
    app = express(),
    PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());
app.use('/', express.static(path.join(__dirname, '../client')));
app.use('/api', apiRouter);

app.listen(PORT, () => console.log(`server running on port ${PORT}`));
