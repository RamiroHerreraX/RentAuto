const router = require('express').Router();
const mongojs = require('mongojs');
const db = mongojs('127.0.0.1/int', ['paises']);

router.get('/paises', (req, res, next) => {
    db.paises.find((err, paises) => {
        if (err) return next(err);
        res.json(paises);
    });
});

router.get('/paises/:id', (req, res, next) => {
    db.paises.findOne({_id: mongojs.ObjectId(req.params.id)},(err, pais) => {
        if (err) return next(err);
        res.json(pais);
    });
});

router.post('/paises', (req, res, next) => {
    const pais = req.body;
    if(!pais.nombrePais){
        res.status(400).json({
            error: 'Bad Data'
        })
    } else {
        db.paises.save(pais, (err, savedPais) => {
            if (err) return next(err);
            res.json(savedPais);
        })
    }
});

router.delete('/paises/:id', (req, res, next) => {
    db.paises.remove({_id: mongojs.ObjectId(req.params.id)}, (err, result) =>{
        if (err) return next(err);
        res.json(result);
    })
});

router.put('/paises/:id', (req, res, next) => {
    const pais = req.body;
    const updatePais = {};

    if(pais.nombrePais) {
        updatePais.nombrePais = pais.nombrePais;
    }
    if(!updatePais.nombrePais) {
        res.status(400).json({
            error: 'Bad Request'
        });
    } else {
        db.paises.update(
            {_id: mongojs.ObjectId(req.params.id)},
            {$set: updatePais},
            (err, result) => {
                if (err) return next(err);
                res.json(result);
            }
        )
    }
});

module.exports = router;
