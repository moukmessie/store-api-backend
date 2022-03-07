const fs = require('fs');
const Product = require('../models/Product');

exports.createProduct = (req, res, next)=>{
    const productObject = JSON.parse(req.body.product);
    delete productObject._id;
    const product = new Product({
        ...productObject,
        imageUrl: `${req.protocol}://${req.get('host')}/image/${req.file.filename}`
    });
    product.save()
        .then(()=>res.status(201).json({message: 'Object Saved !'}))
        .catch(error => res.status(400).json({error}));
}
exports.modifyProduct = (req, res, next)=>{
    //If user changes the Product image, the old one will be deleted from the server
    let productObject;
    if (req.file){
        Product.findOne({_id: req.params.id})
            .then(product => {
                //Get image name in server
                const filename = product.imageUrl.split('/image/')[1];
                //Deleting image form image folder
                fs.unlink(`image/${filename}`, ()=> {
                    console.log(filename + " deleted");
                });
                productObject = {
                    ...JSON.parse(req.body.product),
                    imageUrl: `${req.protocol}://${req.get('host')}/image/${req.file.filename}`,
                };
                Product.updateOne({_id: req.params.id}, {...productObject,_id: req.params.id})
                    .then(()=>res.status(200).json({message:'Product modify !'}))
                    .catch(error=>res.status(400).json({error}));
            })
            .catch(error => res.status(500).json({error}));
    }else {
        productObject = { ...req.body};
        Product.updateOne({_id: req.params.id}, {...productObject,_id: req.params.id})
            .then(()=>res.status(200).json({message:'Product modify !'}))
            .catch(error=>res.status(400).json({error}));
    }
}
exports.deleteProduct = (req, res, next)=>{
    Product.findOne({_id : req.params.id})
        .then(product => {
            const filename = product.imageUrl.split('/image/')[1];
            fs.unlink(`image/${filename}`, ()=> {
                Product.findOne({_id: req.params.id})
                    .then((product)=>{
                        if (!product){
                            res.status(404).json({error : new Error('No such Product')
                            });
                        }
                        if (product.userId !== req.auth.userId){
                            res.status(401).json({ error: new Error('Unauthorized request !')
                            });
                        }
                        Product.deleteOne({_id: req.params.id})
                            .then(()=> {
                                res.status(200).json({message: 'Product deleted'});
                            })
                            .catch(error=>res.status(400).json({error}));
                    });
            });
        })
        .catch(error =>res.status(500).json({error}));
}
exports.getAllProducts = (req, res, next)=>{
    Product.find()
        .then(product=>res.status(200).json(product))
        .catch(error=>res.status(400).json({error}));
}
exports.getOneProduct = (req, res, next)=>{
    Product.findOne({_id: req.params.id})
        .then(product=>res.status(200).json(product))
        .catch(error=>res.status(404).json({error: error, message: 'Product not found!'}))
}
