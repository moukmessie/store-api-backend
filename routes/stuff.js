const express = require('express');
const router =express.Router();
const controllerStuff=require('../controllers/stuff');

const auth = require('../middleware/auth');

router.get('/', auth, controllerStuff.getAllThings);
router.post('/', auth, controllerStuff.createThing);
router.put('/:id', auth, controllerStuff.modifyThing);
router.delete('/:id', auth, controllerStuff.deleteThings);
router.get('/:id', auth,  controllerStuff.getOneThing);



module.exports = router;
