const Mongodb = require("mongodb");

let db;
// : Mongodb.Db;

const mongoClient = new Mongodb.MongoClient(
  "enter mongodb url here",
  {
    useUnifiedTopology: true,
  }
);

exports.connect = () => {
  return mongoClient.connect().then((client) => {
    db = client.db("random");
  });
};

exports.getDB = () => {
  if (!db) {
    throw "something wrong with getting database";
  }
  return db;
};
