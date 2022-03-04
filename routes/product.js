const express = require('express');
const router =express.Router();

const controllerStuff=require('../controllers/product');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config')

router.get('/', auth, controllerStuff.getAllProducts);
router.post('/', auth, multer, controllerStuff.createProduct);
router.put('/:id', auth, multer, controllerStuff.modifyProduct);
router.delete('/:id', auth, controllerStuff.deleteProduct);
router.get('/:id', auth,  controllerStuff.getOneProduct);

module.exports = router;
