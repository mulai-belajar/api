const Class = require('../../models/class')
const Donation = require('../../models/donation')

module.exports = {
    get : (req, res) => {
      Donation.find({})
      .populate({
        path: 'class',
        select: 'name'
      })
      .exec((err, donation) => {
        if (err) {
          // Status : Internal server error
          return res.status(500).json({
            message: 'Error when getting donation',
            error: err
          })
        }
        return res.json({
          // Status : OK
          message: 'Get donation',
          data: donation
        })
       })
    },
    getById : (req, res) => {
      const id = req.params.id;
      Donation.findOne({
        id: id
      })
      .populate({
        path: 'class',
        select: 'name'
      })
      .exec((err, donation) => {
        if (err) {
          // Status : Internal server error
          return res.status(500).json({
            message: 'Error when getting donation',
            error: err
          })
        }
        if (!donation) {
          // Status : Not Found
          return res.status(404).json({
            message: 'No such donation'
          })
        }
        return res.json({
          // Status : OK
          message: 'Get a donation',
          data: donation
        })
       })
    },
    post : (req, res) => {
      let newDonation = new Donation({
        donatur : req.body.donatur,
        class : req.body.class,
        amount : req.body.amount
      });

      newDonation.save((err, donation) => {
        Class.findOneAndUpdate({
          _id: newDonation.class
        },
        {
          $inc: {
            now_donation: newDonation.amount
          }
        },(err, classes) => {
          if (err) {
            // Status : Internal server error
            return res.status(500).json({
              message: 'Error when creating donation',
              error: err
            })
          }
          return res.status(201).json({
            // Status : Created
            message: 'Created a new donation',
            data: newDonation
          })
        }
        )
      })
    },
    // put : (req, res) => {
    //   let id = req.params.id;
    //   Class.findOne({
    //     id: id
    //   }, (err, classes) => {
    //     if (err) {
    //       // Status : Internal server error
    //       return res.status(500).json({
    //         message: 'Error when getting class',
    //         error: err
    //       });
    //     }
    //     if (!classes) {
    //       // Status : Not Found
    //       return res.status(404).json({
    //         message: 'No such class'
    //       })
    //     }
    //
    //     classes.name = req.body.name ? req.body.name : classes.name
    //     classes.category = req.body.category ? req.body.category : classes.category
    //     classes.address = req.body.address ? req.body.address : classes.address
    //     classes.description = req.body.description ? req.body.description : classes.description
    //     classes.total_donation = req.body.total_donation ? req.body.total_donation : classes.total_donation
    //     classes.status = req.body.status ? req.body.status : classes.status,
    //     classes.created_by = req.body.created_by ? req.body.created_by : classes.created_by
    //
    //
    //     classes.save((err, classes) => {
    //       if (err) {
    //         // Status : Internal server error
    //         return res.status(500).json({
    //           message: 'Error when updating class',
    //           error: err
    //         })
    //       }
    //       return res.json({
    //         // Status : OK
    //         message: 'Updated a class',
    //         data: classes
    //       })
    //     })
    //   })
    // },
    // delete : (req, res) => {
    //   let id = req.params.id;
    //   Class.findByIdAndRemove(id, (err, classes) => {
    //     if (err) {
    //       // Status : Internal server error
    //       return res.status(500).json({
    //         message: 'Error when deleting class',
    //         error: err
    //       })
    //     }
    //     // Status : No Content
    //     return res.status(204).json();
    //   })
    // }
}
