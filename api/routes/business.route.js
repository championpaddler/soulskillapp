const express = require('../../node_modules/express');
const businessRoutes = express.Router();
var multer = require('../../node_modules/multer');

var storage = multer.diskStorage({
	destination: function(req, file, callback) {
		callback(null, __dirname+'/../public/uploads')
	},
	filename: function(req, file, callback) {
		callback(null, Date.now() + file.originalname)
	}
})

var upload = multer({storage:storage}).single('photo')
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
     return res.send(req.file.filename); 
});     
})


businessRoutes.route('/add').post(function (req, res) {
  let business = new Business(req.body);
  business.save()
    .then(business => {
      res.status(200).json({'Status': 'Success Data Saved'});
    })
    .catch(err => {
    res.status(400).json({'Status': 'Error Processing Data'});
    });
});

businessRoutes.route('/').get(function (req, res) {
    Business.find(function (err, userdata){
    if(err){
      console.log(err);
    }
    else {
      res.json(userdata);
    }
  });
});

// Getting Single User Data
businessRoutes.route('/edit/:id').get(function (req, res) {
  let id = req.params.id;
  Business.findById(id, function (err, userdata){
      res.json(userdata);
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
        business.Resume = req.body.Resume;
        business.save().then(business => {
          res.json('Update Complete');
      })
      .catch(err => {
            res.status(400).send("Unable to Update the database");
      });
    }
  });
});

// Defined delete | remove | destroy route
businessRoutes.route('/delete/:id').get(function (req, res) {
    Business.findByIdAndRemove({_id: req.params.id}, function(err, business){
        if(err) res.json(err);
        else res.json('Successfully removed User');
    });
});

module.exports = businessRoutes;