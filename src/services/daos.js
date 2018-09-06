const MongoClient = require('mongodb').MongoClient;
const {ObjectID} = require('mongodb')

const daos = {

  get: async (req, res) => {
    const collection = req.db.collection("daos").find({_id: ObjectID(req.params.id)})
    .toArray((err, docs) => {
      let result = docs.length ? docs[0] : {}
      res.status(200).send({
          ...result
      });
    })
       
  },
  getAll: async (req, res) => {
     const collection = req.db.collection("daos").find({})
      .toArray((err, docs) => {
        res.status(200).send({
            daos: docs
        });
      })
  },
  create: async (req, res) => {
    req.db.collection('daos').insertOne(req.body, (err, r) => {
      if (err) {
          // If it failed, return error
          res.send("There was a problem adding the information to the database.");
      }
      else {
          res.status(200).send(req.body);
      }
    })
  },
  update: async (req, res) => {
    let obj = {...req.body}
    delete obj._id
    req.db.collection('daos').updateOne({_id: ObjectID(req.params.id)}, {$set: obj}, (err, r) => {
      if (err) {
        // If it failed, return error
        res.send("There was a problem updating the information in the database.");
      }
      else {
        res.status(200).send(req.body);
      }
    });
  },
  delete: async (req, res) => {

  }
}

module.exports = daos
