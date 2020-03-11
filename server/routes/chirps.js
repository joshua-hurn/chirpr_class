const express = require('express'),
    router = express.Router(),
    chirpStore = require('../chirpstore');

router.get('/:id?', (req, res) => {
    if (req.params.id) {
        let chirp = chirpStore.GetChirp(req.params.id);
        res.send(chirp);
    } else {
        let chirps = chirpStore.GetChirps();
        res.send(chirps);
    }
});

router.post('/', (req, res) => {
    chirpStore.CreateChirp(req.body);
    res.sendStatus(200);
});

router.put('/:id', (req, res) => {
    chirpStore.UpdateChirp(req.params.id, req.body);
    res.sendStatus(200);
});

router.delete('/:id', (req, res) => {
    chirpStore.DeleteChirp(req.params.id);
    res.sendStatus(200);
});

module.exports = router;
