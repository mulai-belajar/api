const Class = require('../../models/class')
const Category = require('../../models/category')

module.exports = {
    get : (req, res) => {
      Class.find({})
      .populate({
        path: 'category',
        select: 'name'
      })
      .populate({
        path: 'donatur',
        select: 'donatur',
      })
      .exec((err, classes) => {
        if (err) {
          // Status : Internal server error
          return res.status(500).json({
            message: 'Error when getting classes',
            error: err
          })
        }
        return res.json({
          // Status : OK
          message: 'Get classes',
          data: classes
        })
       })
    },
    getById : (req, res) => {
      const id = req.params.id;
      Class.findOne({
        id: id
      })
      .populate({
        path: 'category',
        select: 'name'
      })
      .populate({
        path: 'donatur',
        select: 'donatur',
      })
      .exec((err, classes) => {
        if (err) {
          // Status : Internal server error
          return res.status(500).json({
            message: 'Error when getting class',
            error: err
          })
        }
        if (!classes) {
          // Status : Not Found
          return res.status(404).json({
            message: 'No such class'
          })
        }
        return res.json({
          // Status : OK
          message: 'Get a class',
          data: classes
        })
       })
    },
    getByUserId : (req, res) => {
      const userId = req.params.userId;
      Class.find({
        created_by : userId
      })
      .populate({
        path: 'category',
        select: 'name'
      })
      .populate({
        path: 'donatur',
        select: 'donatur',
      })
      .exec((err, classes) => {
        if (err) {
          // Status : Internal server error
          return res.status(500).json({
            message: 'Error when getting class',
            error: err
          })
        }
        if (!classes) {
          // Status : Not Found
          return res.status(404).json({
            message: 'No such class'
          })
        }
        return res.json({
          // Status : OK
          message: 'Get class by user id',
          data: classes
        })
       })
    },
    post : (req, res) => {
      let newClass = new Class({
        name : req.body.name,
        category : req.body.category,
        address : req.body.address,
        description : req.body.description,
        total_donation : req.body.total_donation,
        status : req.body.status,
        created_by : req.body.created_by
      });

      newClass.save((err, classes) => {
        Category.findOneAndUpdate({
          _id: newClass.category
        },
        {
          $push: {
            class: newClass._id
          }
        },(err, categories) => {
          if (err) {
            // Status : Internal server error
            return res.status(500).json({
              message: 'Error when creating class',
              error: err
            })
          }
          return res.status(201).json({
            // Status : Created
            message: 'Created a new class',
            data: newClass
          })
        }
        )
      })
    },
    put : (req, res) => {
      let id = req.params.id;
      Class.findOne({
        id: id
      }, (err, classes) => {
        if (err) {
          // Status : Internal server error
          return res.status(500).json({
            message: 'Error when getting class',
            error: err
          });
        }
        if (!classes) {
          // Status : Not Found
          return res.status(404).json({
            message: 'No such class'
          })
        }

        classes.name = req.body.name ? req.body.name : classes.name
        classes.category = req.body.category ? req.body.category : classes.category
        classes.address = req.body.address ? req.body.address : classes.address
        classes.description = req.body.description ? req.body.description : classes.description
        classes.total_donation = req.body.total_donation ? req.body.total_donation : classes.total_donation
        classes.status = req.body.status ? req.body.status : classes.status,
        classes.created_by = req.body.created_by ? req.body.created_by : classes.created_by


        classes.save((err, classes) => {
          if (err) {
            // Status : Internal server error
            return res.status(500).json({
              message: 'Error when updating class',
              error: err
            })
          }
          return res.json({
            // Status : OK
            message: 'Updated a class',
            data: classes
          })
        })
      })
    },
    delete : (req, res) => {
      let id = req.params.id;
      Class.findByIdAndRemove(id, (err, classes) => {
        if (err) {
          // Status : Internal server error
          return res.status(500).json({
            message: 'Error when deleting class',
            error: err
          })
        }
        // Status : No Content
        return res.status(204).json();
      })
    }
}
