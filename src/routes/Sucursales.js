const router = require('express').Router();
const mongojs = require('mongojs');
const db = mongojs('127.0.0.1/int', ['sucursal']);

router.get('/sucursal', (req, res, next) => {
    db.sucursal.find((err, sucursal) => {
        if (err) return next(err);
        res.json(sucursal);
    });
});

router.get('/sucursal/:id', (req, res, next) => {
    db.sucursal.findOne({_id: mongojs.ObjectId(req.params.id)},(err, sucursal) => {
        if (err) return next(err);
        res.json(sucursal);
    });
});

router.post('/sucursal', (req, res, next) => {
    const sucursal = req.body;
    if(!sucursal.nombrePais){
        res.status(400).json({
            error: 'Bad Data'
        })
    } else {
        db.sucursal.save(sucursal, (err, savedSucursal) => {
            if (err) return next(err);
            res.json(savedSucursal);
        })
    }
});

router.delete('/sucursal/:id', (req, res, next) => {
    db.sucursal.remove({_id: mongojs.ObjectId(req.params.id)}, (err, result) =>{
        if (err) return next(err);
        res.json(result);
    })
});

router.put('/sucursal/:id', (req, res, next) => {
    const sucursal = req.body;
    const updateSucursal = {};

    if(sucursal.nombrePais) {
        updateSucursal.nombreSucursal = sucursal.nombreSucursal;
    }
    if(!updateSucursal.nombreSucursal) {
        res.status(400).json({
            error: 'Bad Request'
        });
    } else {
        db.sucursal.update(
            {_id: mongojs.ObjectId(req.params.id)},
            {$set: updateSucursal},
            (err, result) => {
                if (err) return next(err);
                res.json(result);
            }
        )
    }
});

module.exports = router;