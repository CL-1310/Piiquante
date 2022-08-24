const Sauce = require('../models/Sauce');

exports.createSauce = (req, res, next) => {
  console.log(req.body);
  const sauceObject = JSON.parse(req.body.sauce)
  console.log("Création Sauce");
  const sauce = new Sauce({
    userId: sauceObject.userId,
    name: sauceObject.name,
    manufacturer: sauceObject.manufacturer,
    description: sauceObject.description,
    mainPepper: sauceObject.mainPepper,
    imageUrl: `${req.protocol}://${req.get("host")}/images/${req.file.filename}`,
    heat: sauceObject.heat,
    likes : 0,
    dislikes : 0,
    usersLiked : [],
    usersDisliked : [],
  });

  sauce.save().then(
    () => {
      res.status(201).json({
        message: 'Sauce sauvegardée avec succès'
      });
    }
  ).catch(
    (error) => {
      res.status(400).json({ error: error });
    }
  );
};

exports.getOneSauce = (req, res, next) => {
    Sauce.findOne({
      _id: req.params.id
    }).then(
      (sauce) => {
        res.status(200).json(sauce);
      }
    ).catch(
      (error) => {
        res.status(404).json({ error: error });
      }
    );
  };
  
  exports.modifySauce = (req, res, next) => {
    const sauceObject = req.file ?
    {
      ...JSON.parse(req.body.sauce),
      imageUrl: `${req.protocol}://${req.get("host")}/images/${req.file.filename}`,
    }: {...req.body}
    Sauce.updateOne({_id: req.params.id}, sauceObject).then(
      () => {
        res.status(201).json({
          message: 'Sauce mise à jour avec succès'
        });
      }
    ).catch(
      (error) => {
        res.status(400).json({ error: error });
      }
    );
  };
  
  exports.deleteSauce = (req, res, next) => {
    Sauce.deleteOne({_id: req.params.id}).then(
      () => {
        res.status(200).json({
          message: 'Sauce supprimée avec succès'
        });
      }
    ).catch(
      (error) => {
        res.status(400).json({ error: error });
      }
    );
  };
  
  exports.getAllSauce = (req, res, next) => {
    Sauce.find().then(
      (sauces) => {
        res.status(200).json(sauces);
      }
    ).catch(
      (error) => {
        res.status(400).json({ error: error });
      }
    );
  };

  exports.likes = (req, res, next) => {
    Sauce.findOne({
      _id: req.params.id
    }).then((sauce) => {
        if(req.body.like === 1){
          sauce.usersLiked.push(req.body.userId)
        }else if(req.body.like === -1){
          sauce.usersDisliked.push(req.body.userId)
        }else if(req.body.like === 0){
          if(sauce.usersLiked.includes(req.body.userId)){
            let likedIndex = sauce.usersLiked.indexOf(req.body.userId)
            sauce.usersLiked.splice(likedIndex)
          }
          if(sauce.usersDisliked.includes(req.body.userId)){
            let dislikedIndex = sauce.usersDisliked.indexOf(req.body.userId)
            sauce.usersDisliked.splice(dislikedIndex)
          }
        }
        sauce.likes = sauce.usersLiked.length

        sauce.dislikes = sauce.usersDisliked.length

        sauce.save()
        .then((sauce) => res.status(200).json({ message: "Mise à jour des likes et des dislikes"}))
        .catch((error) => res.status(400).json(error))
      }
    ).catch(
      (error) => {
        res.status(404).json({ error: error });
      }
    );
  }