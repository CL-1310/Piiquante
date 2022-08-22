const Sauce = require('../models/Sauce');

exports.createSauce = (req, res, next) => {
  console.log(req.body);
  const sauceObject = JSON.parse(req.body.sauce)
  //console.log(sauceObject);
  console.log("Création Sauce");
  //console.log(req.body.sauce.userId);
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
// Même chose qu'au-dessus mais pour le usersDisliked
        }else if(req.body.like === 0){
// utiliser la fonction .includes pour voir si dans le tableau il y a l'ID user (if)
// récupérer l'index du tableau avec .indexOf() à mettre dans une variable puis faire un .splice()
// faire la même chose pour chaque tableau
        }
      }
    ).catch(
      (error) => {
        res.status(404).json({ error: error });
      }
    );
  }