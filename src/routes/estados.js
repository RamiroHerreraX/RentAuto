const router = require('express').Router();
const mongojs = require('mongojs');
const db = mongojs('127.0.0.1/int', ['estados']);

router.get('/estados', (req, res, next) => {
    db.estados.find((err, estados) => {
        if (err) return next(err);
        res.json(estados);
    });
});

router.get('/estados/:id', (req, res, next) => {
    db.estados.findOne({ _id: mongojs.ObjectId(req.params.id) }, (err, estado) => {
        if (err) return next(err);
        res.json(estado);
    });
});

router.post('/estados', (req, res, next) => {
    const estado = req.body;
    if (!estado.nombreEstado || !estado.nombrePais) {
        res.status(400).json({
            error: 'Bad Data'
        });
    } else {
        db.estados.save(estado, (err, savedEstado) => {
            if (err) return next(err);
            res.json(savedEstado);
        });
    }
});

router.delete('/estados/:id', (req, res, next) => {
    db.estados.remove({_id:  mongojs.ObjectId(req.params.id)}, (err, result) => {
        if (err) return next(err);
        res.json(result);
    });
});

router.put('/estados/:id', (req, res, next) => {
    const estado = req.body;
    const updateEstado = {};

    if (estado.nombrePais) {
        updateEstado.nombrePais = estado.nombrePais;
    }

    if (estado.nombreEstado) {
        updateEstado.nombreEstado = estado.nombreEstado;
    }

    if (!updateEstado.nombrePais && !updateEstado.nombreEstado) {
        res.status(400).json({
            error: 'Bad Request'
        });
    } else {
        db.estados.update(
            { _id: mongojs.ObjectId(req.params.id) }, // Convertir req.params.id a ObjectID
            { $set: updateEstado },
            (err, result) => {
                if (err) return next(err);
                res.json(result);
            }
        );
    }
});


module.exports = router;
