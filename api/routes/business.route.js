const express = require('express');
const app = express();
const businessRoutes = express.Router();
var multer = require('multer');
var DIR = 'public/uploads';

var upload = multer({dest: DIR}).single('photo');

// Require Business model in our routes module
let Business = require('../models/Business');

// Defined store route
businessRoutes.post('/upload', function (req, res, next) {
  var path = '';
  upload(req, res, function (err) {
     if (err) {
       // An error occurred when uploading
       console.log(err);
       return res.status(422).send("an Error occured")
     }  
    // No error occured.
     path = req.file.path;
     return res.send("Upload Completed for "+path); 
});     
})


businessRoutes.route('/add').post(function (req, res) {
  let business = new Business(req.body);
  business.save()
    .then(business => {
      res.status(200).json({'business': 'business in added successfully'});
    })
    .catch(err => {
    res.status(400).send("unable to save to database");
    });
});

// Defined get data(index or listing) route
businessRoutes.route('/').get(function (req, res) {
    Business.find(function (err, businesses){
    if(err){
      console.log(err);
    }
    else {
      res.json(businesses);
    }
  });
});

// Defined edit route
businessRoutes.route('/edit/:id').get(function (req, res) {
  let id = req.params.id;
  Business.findById(id, function (err, business){
      res.json(business);
  });
});

//  Defined update route
businessRoutes.route('/update/:id').post(function (req, res) {
    Business.findById(req.params.id, function(err, business) {
    if (!business)
      return next(new Error('Could not load Document'));
    else {
        business.Name = req.body.Name;
        business.Phone = req.body.Phone;
        business.Email = req.body.Email;
        business.Job = req.body.Job;
        business.save().then(business => {
          res.json('Update complete');
      })
      .catch(err => {
            res.status(400).send("unable to update the database");
      });
    }
  });
});

// Defined delete | remove | destroy route
businessRoutes.route('/delete/:id').get(function (req, res) {
    Business.findByIdAndRemove({_id: req.params.id}, function(err, business){
        if(err) res.json(err);
        else res.json('Successfully removed');
    });
});

module.exports = businessRoutes;