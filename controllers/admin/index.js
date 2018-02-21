

module.exports = {
/* Get All Data */
  list: (req, res) => {
    adminSchema.find((err, admin)
      if (err) {
        return res.status(500).json({
          message: `Error when getting admin`,
          error: err
        });
      }
      return res.json({
        message: `Here's admin`,
        data: admin
      });
    });
  },

  //Get /admin/:id
  //  list: (req,res) => {
  //    res.send({
  //      message : 'Yuk Mulai Belajar!'
  //    })
  //  }
}
