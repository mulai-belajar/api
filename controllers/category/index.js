const Category = require('../../models/category')

module.exports = {
    get : (req, res) => {
      Category.find({})
      .populate({
        path: 'class'
      })
      .exec((err, categories) => {
        if (err) {
          // Status : Internal server error
          return res.status(500).json({
            message: 'Error when getting categories',
            error: err
          })
        }
        return res.json({
          // Status : OK
          message: 'Get categories',
          data: categories
        })
       })
    },
    getById : (req, res) => {
      const id = req.params.id;
      Category.findOne({
        id: id
      }, (err, category) => {
        if (err) {
          // Status : Internal server error
          return res.status(500).json({
            message: 'Error when getting category',
            error: err
          })
        }
        if (!category) {
          // Status : Not Found
          return res.status(404).json({
            message: 'No such category'
          })
        }
        return res.json({
          // Status : OK
          message: 'Get a category',
          data: category
        })
      })
    },
    post : (req, res) => {
      let newCategory = new Category({
        name : req.body.name
      });

      newCategory.save((err, category) => {
        if (err) {
          // Status : Internal server error
          return res.status(500).json({
            message: 'Error when creating category',
            error: err
          })
        }
        return res.status(201).json({
          // Status : Created
          message: 'Created a new category',
          data: newCategory
        })
      })
    },
    put : (req, res) => {
      let id = req.params.id;
      Category.findOne({
        id: id
      }, (err, category) => {
        if (err) {
          // Status : Internal server error
          return res.status(500).json({
            message: 'Error when getting category',
            error: err
          });
        }
        if (!category) {
          // Status : Not Found
          return res.status(404).json({
            message: 'No such category'
          })
        }

        category.name = req.body.name ? req.body.name : category.name

        category.save((err, category) => {
          if (err) {
            // Status : Internal server error
            return res.status(500).json({
              message: 'Error when updating category',
              error: err
            })
          }
          return res.json({
            // Status : OK
            message: 'Updated a category',
            data: category
          })
        })
      })
    },
    delete : (req, res) => {
      let id = req.params.id;
      Category.findByIdAndRemove(id, (err, category) => {
        if (err) {
          // Status : Internal server error
          return res.status(500).json({
            message: 'Error when deleting category',
            error: err
          })
        }
        // Status : No Content
        return res.status(204).json();
      })
    }
}
