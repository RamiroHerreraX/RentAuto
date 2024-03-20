const router = require('express').Router();
const mongojs = require('mongojs');
const db = mongojs('127.0.0.1/int', ['users']);

router.get('/login', (req, res, next) => {
    db.users.find((err, users) => {
        if (err) return next(err);
        res.json(users);
    });
});

router.get('/login/:id', (req, res, next) => {
    db.users.findOne({_id: mongojs.ObjectId(req.params.id)},(err, users) => {
        if (err) return next(err);
        res.json(users);
    });
});

router.post('/login', (req, res, next) => {
    const user = req.body;
    if(user.tittle || !(user.isDone + '')){
        res.status(400).json({
            error: 'Bad Date'
        })
    }else{
        db.users.save(user, (err, user) => {
            if (err) return next(err);
            res.json(user);
        })
    }
})

router.delete('/login/:id', (req, res, next) => {
    db.users.remove({_id: mongojs.ObjectId(req.params.id)}, (err, result) =>{
        if (err) return next(err);
        res.json(result);
    })
})

router.put('/login/:id', (req, res, next) => {
    const user = req.body;
    const updateUser = {};
    if(user.isDone) {
        updateUser.isDone = user.isDone;
    }
    if(user.tittle) {
        updateUser.tittle = user.tittle;
    }
    if(!updateUser) {
        res.status(400).json({
            error: 'Bad Request'
        });
    } else {
        db.users.update({_id: mongojs.ObjectId(req.params.id)}, (err, result) =>{
            if (err) return next(err);
            res.json(user);
        })
    }
})

module.exports = router;