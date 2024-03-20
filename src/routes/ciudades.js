const router = require('express').Router();
const mongojs = require('mongojs');
const db = mongojs('127.0.0.1/int', ['ciudades']);

router.get('/ciudades', (req, res, next) => {
    db.ciudades.find((err, ciudades) => {
        if (err) return next(err);
        res.json(ciudades);
    });
});

router.get('/ciudades/:id', (req, res, next) => {
    db.ciudades.findOne({_id: mongojs.ObjectId(req.params.id)},(err, ciudad) => {
        if (err) return next(err);
        res.json(ciudad);
    });
});

router.post('/ciudades', (req, res, next) => {
    const ciudad = req.body;
    if(!ciudad.nombreEstado || !ciudad.nombreCiudad){
        res.status(400).json({
            error: 'Bad Data'
        })
    } else {
        db.ciudades.save(ciudad, (err, savedCiudad) => {
            if (err) return next(err);
            res.json(savedCiudad);
        })
    }
});

router.delete('/ciudades/:id', (req, res, next) => {
    db.ciudades.remove({_id: mongojs.ObjectId(req.params.id)}, (err, result) =>{
        if (err) return next(err);
        res.json(result);
    })
});

router.put('/ciudades/:id', (req, res, next) => {
    const ciudad = req.body;
    const updateCiudad = {};

    if(ciudad.nombreCiudad) {
        updateCiudad.nombreCiudad = ciudad.nombreCiudad;
    }

    if(ciudad.nombreEstado) {
        updateCiudad.nombreEstado = ciudad.nombreEstado;
    }

    if(!updateCiudad.nombreEstado && !updateCiudad.nombreCiudad) {
        res.status(400).json({
            error: 'Bad Request'
        });
    } else {
        db.ciudades.update(
            {_id: mongojs.ObjectId(req.params.id)},
            {$set: updateCiudad},
            (err, result) => {
                if (err) return next(err);
                res.json(result);
            }
        )
    }
});

module.exports = router;
