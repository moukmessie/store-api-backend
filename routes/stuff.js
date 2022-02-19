const express = require('express');
const router =express.Router();

const controllerStuff=require('../controllers/stuff');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config')

router.get('/', auth, controllerStuff.getAllThings);
router.post('/', auth, multer, controllerStuff.createThing);
router.put('/:id', auth, multer, controllerStuff.modifyThing);
router.delete('/:id', auth, controllerStuff.deleteThings);
router.get('/:id', auth,  controllerStuff.getOneThing);

module.exports = router;
