const express = require("express");
const cors = require("cors");
const { body } = require("express-validator");

const database = require("./database");
const controllers = require("./controllers");

const app = express();

app.use(cors());
app.use(express.json());

app.post(
  "/api/intothedatabase",
  [
    body("email")
      .isEmail()
      .withMessage("invalid email entered")
      .custom(controllers.customValidator)
      .normalizeEmail(),
    body("name")
      .isAlpha()
      .withMessage("name should be alpha charecters only")
      .trim(),
    body("dob").isISO8601().withMessage("dob should be a date"),
    body("mobile")
      .isNumeric()
      .isLength({ min: 10, max: 10 })
      .withMessage("enter valid mobile number"),
  ],
  controllers.dataEnterController
);

app.post(
  "/api/outofthedatabase",
  [
    body("search")
      .isAlpha()
      .withMessage("should be alpha charecters only")
      .trim(),
  ],
  controllers.dataFindController
);

database
  .connect()
  .then(() =>
    app.listen(3000, () => console.log("server started and database connected"))
  )
  .catch((err) => {
    console.log(err);
  });
