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
    put : (req, res) => {
      let id = req.params.id;
      Donation.findOne({
        id: id
      }, (err, donation) => {
        if (err) {
          // Status : Internal server error
          return res.status(500).json({
            message: 'Error when getting donation',
            error: err
          });
        }
        if (!donation) {
          // Status : Not Found
          return res.status(404).json({
            message: 'No such donation'
          })
        }

        donation.donatur = req.body.donatur ? req.body.donatur : classes.donatur
        donation.class = req.body.class ? req.body.class : classes.class
        donation.amount = req.body.amount ? req.body.amount : classes.amount


        donation.save((err, donation) => {
          if (err) {
            // Status : Internal server error
            return res.status(500).json({
              message: 'Error when updating class',
              error: err
            })
          }
          return res.json({
            // Status : OK
            message: 'Updated a donation',
            data: donation
          })
        })
      })
    },
    delete : (req, res) => {
      let id = req.params.id;
      Donation.findByIdAndRemove(id, (err, donation) => {
        if (err) {
          // Status : Internal server error
          return res.status(500).json({
            message: 'Error when deleting donation',
            error: err
          })
        }
        // Status : No Content
        return res.status(204).json();
      })
    }
}
