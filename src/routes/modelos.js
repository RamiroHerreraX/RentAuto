const router = require('express').Router();
const mongojs = require('mongojs');
const db = mongojs('127.0.0.1/int', ['modelos']);

router.get('/modelos', (req, res, next) => {
    db.modelos.find((err, modelos) => {
        if (err) return next(err);
        res.json(modelos);
    });
});

router.get('/modelos/:id', (req, res, next) => {
    db.modelos.findOne({_id: mongojs.ObjectId(req.params.id)},(err, modelo) => {
        if (err) return next(err);
        res.json(modelo);
    });
});

router.post('/modelos', (req, res, next) => {
    const modelo = req.body;
    if(!modelo.marca || !modelo.modelo){
        res.status(400).json({
            error: 'Bad Data'
        })
    } else {
        db.modelos.save(modelo, (err, savedModelo) => {
            if (err) return next(err);
            res.json(savedModelo);
        })
    }
});

router.delete('/modelos/:id', (req, res, next) => {
    db.modelos.remove({_id: mongojs.ObjectId(req.params.id)}, (err, result) =>{
        if (err) return next(err);
        res.json(result);
    })
});

router.put('/modelos/:id', (req, res, next) => {
    const modelos = req.body;
    const updateModelos = {};

    if(modelos.marca) {
        updateModelos.marca = modelos.marca;
    }

    if(modelos.modelo) {
        updateModelos.modelo = modelos.modelo;
    }

    if(!updateModelos.marca && !updateModelos.modelo) {
        res.status(400).json({
            error: 'Bad Request'
        });
    } else {
        db.modelos.update(
            {_id: mongojs.ObjectId(req.params.id)},
            {$set: updateModelos},
            (err, result) => {
                if (err) return next(err);
                res.json(result);
            }
        )
    }
});

module.exports = router;