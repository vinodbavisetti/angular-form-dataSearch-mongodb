const { validationResult } = require("express-validator");
const { getDB } = require("./database");

exports.customValidator = (value, { req }) => {
  return getDB()
    .collection("angularform")
    .findOne({ $or: [{ email: value }, { name: req.body.name }] })
    .then((res) => {
      if (res && res.name === req.body.name) {
        throw "name already exists";
      }
      if (res && res.email === value) {
        throw "email already exits";
      }
      return null;
    });
};

exports.dataEnterController = (req, res) => {
  let errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.json({ msg: errors.array()[0].msg });
    return;
  }
  let doc = { ...req.body };
  getDB()
    .collection("angularform")
    .insertOne(doc)
    .then(() => {
      console.log("data inserted");
      res.json({ msg: "enrolled in database" });
    })
    .catch((err) => {
      console.log(err);
      res.json({ msg: "something went wrong" });
    });
};

exports.dataFindController = (req, res, next) => {
  let errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.json({ msg: errors.array()[0].msg });
    return;
  }
  let searchTerm = req.body.search;
  getDB()
    .collection("angularform")
    .findOne({ name: { $regex: `${searchTerm}` } })
    .then((data) => {
      if (!(data && data._id)) {
        res.json({ msg: "no results match" });
        return;
      }
      res.json(data);
    })
    .catch((err) => {
      console.log(err);
      res.json({ msg: "can't fetch data" });
    });
};
