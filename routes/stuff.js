const express = require('express');
const router =express.Router();
const controllerStuff=require('../controllers/stuff');

router.get('/',controllerStuff.getAllThings);
router.post('/',controllerStuff.createThing);
router.put('/:id',controllerStuff.modifyThing);
router.delete('/:id',controllerStuff.deleteThings);
router.get('/:id', controllerStuff.getOneThing);


module.exports = router;