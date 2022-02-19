const fs = require('fs');
const Thing = require('../models/Thing');

exports.createThing = (req,res, next)=>{
    const thingObject = JSON.parse(req.body.thing);
    delete thingObject._id;
    const thing = new Thing({
        ...thingObject,
        imageUrl: `${req.protocol}://${req.get('host')}/image/${req.file.filename}`
    });
    thing.save()
        .then(()=>res.status(201).json({message: 'Object Saved !'}))
        .catch(error => res.status(400).json({error}));
}
exports.modifyThing = (req, res,next)=>{
    const thingObject = req.file ?
        {
            ...JSON.parse(req.body.thing),
            imageUrl: `${req.protocol}://${req.get('host')}/image/${req.file.filename}`
        } : { ...req.body};
    Thing.updateOne({_id: req.params.id}, {...thingObject,_id: req.params.id})
        .then(()=>res.status(200).json({message:'Thing modify !'}))
        .catch(error=>res.status(400).json({error}));
}
exports.deleteThings = (req,res,next)=>{
    Thing.findOne({_id : req.params.id})
        .then(thing => {
            const filename = thing.imageUrl.split('/image/')[1];
            fs.unlink(`image/${filename}`, ()=> {
                Thing.findOne({_id: req.params.id})
                    .then((thing)=>{
                        if (!thing){
                            res.status(404).json({error : new Error('No such Thing')
                            });
                        }
                        if (thing.userId !== req.auth.userId){
                            res.status(401).json({ error: new Error('Unauthorized request !')
                            });
                        }
                        Thing.deleteOne({_id: req.params.id})
                            .then(()=> {
                                res.status(200).json({message: 'Thing deleted'});
                            })
                            .catch(error=>res.status(400).json({error}));
                    });
            });
        })
        .catch(error =>res.status(500).json({error}));

}
exports.getAllThings = (req,res,next)=>{
    Thing.find()
        .then(things=>res.status(200).json(things))
        .catch(error=>res.status(400).json({error}));
}
exports.getOneThing = (req,res, next)=>{
    Thing.findOne({_id: req.params.id})
        .then(thing=>res.status(200).json(thing))
        .catch(error=>res.status(404).json('Thing not found!'))
}
