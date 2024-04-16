const router = require('express').Router();
const mongojs = require('mongojs');
const db = mongojs('127.0.0.1/int', ['autos']);

router.get('/autos', (req, res, next) => {
    db.autos.find((err, autos) => {
        if (err) return next(err);
        res.json(autos);
    });
});

router.get('/autos/:id', (req, res, next) => {
    db.autos.findOne({_id: mongojs.ObjectId(req.params.id)},(err, auto) => {
        if (err) return next(err);
        res.json(auto);
    });
});

router.post('/autos', (req, res, next) => {
    const auto = req.body;
    if(!auto.tipoAuto || !auto.imagen || !auto.nSerie || !auto.marca || !auto.mod  || !Array.isArray(auto.sucursalUbicacion) || !auto.nAsientos || !auto.tamMaletero
        || !auto.complementos || !auto.canDisponible || !auto.estatus ) {
        res.status(400).json({
            error: 'Bad Data'
        })
    } else {
        db.autos.save(auto, (err, savedAuto) => {
            if (err) return next(err);
            res.json(savedAuto);
        })
    }
});

router.delete('/autos/:id', (req, res, next) => {
    db.autos.remove({_id: mongojs.ObjectId(req.params.id)}, (err, result) =>{
        if (err) return next(err);
        res.json(result);
    })
});

router.put('/autos/:id', (req, res, next) => {
    const autos = req.body;
    const updateAuto = {};

    if(autos.tipoAuto) {
        updateAuto.tipoAuto = autos.tipoAuto;
    }
    if(autos.nSerie) {
        updateAuto.nSerie = autos.nSerie;
    }
    if(autos.marca) {
        updateAuto.marca = autos.marca;
    }
    if(autos.mod) {
        updateAuto.mod = autos.mod;
    }
    if(autos.sucursalUbicacion) {
        updateAuto.sucursalUbicacion = autos.sucursalUbicacion;
    }
    if(autos.nAsientos) {
        updateAuto.nAsientos = autos.nAsientos;
    }
    if(autos.tamMaletero) {
        updateAuto.tamMaletero = autos.tamMaletero;
    }
    if(autos.complementos) {
        updateAuto.complementos = autos.complementos;
    }
    if(autos.costoDia) {
        updateAuto.costoDia = autos.costoDia;
    }
    if(autos.canDisponible) {
        updateAuto.canDisponible = autos.canDisponible;
    }
    if(autos.estatus) {
        updateAuto.estatus = autos.estatus;
    }
    if(autos.imagen) {
        updateAuto.imagen = autos.imagen;
    }

    if(!updateAuto.imagen && !updateAuto.tipoAuto && !updateAuto.nSerie && !updateAuto.marca &&  !updateAuto.mod &&  !updateAuto.sucursalUbicacion
        &&  !updateAuto.nAsientos &&  !updateAuto.tamMaletero &&  !updateAuto.complementos &&  !updateAuto.costoDia &&  !updateAuto.canDisponible
        &&  !updateAuto.estatus) {
        res.status(400).json({
            error: 'Bad Request'
        });
    } else {
        db.autos.update(
            {_id: mongojs.ObjectId(req.params.id)},
            {$set: updateAuto},
            (err, result) => {
                if (err) return next(err);
                res.json(result);
            }
        )
    }
});

module.exports = router;