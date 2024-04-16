const router = require('express').Router();
const mongojs = require('mongojs');
const db = mongojs('127.0.0.1/int', ['marcas']);

router.get('/marcas', (req, res, next) => {
    db.marcas.find((err, marcas) => {
        if (err) return next(err);
        res.json(marcas);
    });
});

router.get('/marcas/:id', (req, res, next) => {
    db.marcas.findOne({_id: mongojs.ObjectId(req.params.id)},(err, marca) => {
        if (err) return next(err);
        res.json(marca);
    });
});

router.post('/marcas', (req, res, next) => {
    const marca = req.body;
    if(!marca.marca){
        res.status(400).json({
            error: 'Bad Data'
        })
    } else {
        db.marcas.save(marca, (err, savedMarca) => {
            if (err) return next(err);
            res.json(savedMarca);
        })
    }
});

router.delete('/marcas/:id', (req, res, next) => {
    db.marcas.remove({_id: mongojs.ObjectId(req.params.id)}, (err, result) =>{
        if (err) return next(err);
        res.json(result);
    })
});

router.put('/marcas/:id', (req, res, next) => {
    const marc = req.body;
    const updateMarca = {};

    if(marc.marca) {
        updateMarca.marca = marc.marca;
    }

    if(!updateMarca.marca) {
        res.status(400).json({
            error: 'Bad Request'
        });
    } else {
        db.marcas.update(
            {_id: mongojs.ObjectId(req.params.id)},
            {$set: updateMarca},
            (err, result) => {
                if (err) return next(err);
                res.json(result);
            }
        )
    }
});

module.exports = router;