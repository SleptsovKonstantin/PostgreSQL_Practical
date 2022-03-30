// const { Walls } = require("../models");
const db = require("../models");

const Wall = db.tutorials;

exports.create = (req, res) => {
  const { text, age, description, owner, country } = req.body;
  const newText = { text, age, description, owner, country };
  Wall.create(newText)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => console.log("Error", err));
};

exports.findAll = (req, res) => {
  Wall.findAll()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => console.log("Error", err));
};

exports.findTitle = (req, res) => {
  const { age } = req.params;
  Wall.findAll({ where: { age: age } })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => console.log("Error", err));
};

exports.filter = (req, res) => {
  const { text, age } = req.body;
  const textVal = text;
  const ageVal = age;
  Wall.findAll({ where: { text: textVal, age: ageVal } })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => console.log("Error", err));
};

exports.sort = (req, res) => {
  const { age } = req.body;
  const ageVal = age;
  Wall.findAll({
    order: [["age", ageVal]],
  })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => console.log("Error", err));
};

exports.pagination = (req, res) => {
  const { limit, page } = req.body;
  const limitVal = limit;
  const offset = 0 + (page - 1) * limit;
  Wall.findAndCountAll({
    offset: offset,
    limit: limitVal,
  })
    .then((data) => {
      res.send(data).catch((err) => console.log("Error", err));
    })
    .catch((err) => console.log("Error", err));
};

exports.paginationSort = (req, res) => {
  const { age, limit, page } = req.body;
  const ageVal = age;
  const limitVal = limit;
  const offset = 0 + (page - 1) * limit;
  Wall.findAndCountAll({
    offset: offset,
    limit: limitVal,
    order: [["age", ageVal]],
  })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => console.log("Error", err));
};

exports.value = (req, res) => {
  Wall.findAll({
    attributes: ["id", "text", "description"],
  })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => console.log("Error", err));
};
