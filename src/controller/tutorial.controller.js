const { rows } = require("pg/lib/defaults");
const db = require("../models");

const Wall = db.tutorials;

exports.create = (req, res) => {
  const { text, age, description, owner, country } = req.body;
  if (text && age && description && owner && country) {
    const newText = { text, age, description, owner, country };
    Wall.create(newText)
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        res.status(400).send({ message: `invalid key ` });
      });
  } else {
    res.send({
      message: `Create new task was failing, because body is empty. Please check the data you send.`,
    });
  }
};

exports.findAll = (req, res) => {
  Wall.findAll({
    order: ["id"],
  })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(400).send({ message: `id is not in the database` });
    });
};

exports.findTitle = (req, res) => {
  const body = req.query;
  if (
    body.hasOwnProperty("id") ||
    body.hasOwnProperty("text") ||
    body.hasOwnProperty("age") ||
    body.hasOwnProperty("description") ||
    body.hasOwnProperty("owner") ||
    body.hasOwnProperty("country") ||
    body.hasOwnProperty("createdAt") ||
    body.hasOwnProperty("updatedAt")
  ) {
    Wall.findAll({ where: body })
      .then((data) => {
        if (data.length !== 0) {
          res.send(data);
        } else {
          res.send({ message: `Error. invalid  value` });
        }
      })
      .catch((err) => {
        res.status(400).send({ message: `Error. check key in body=> ${err} ` });
      });
  } else {
    res.status(400).send({ message: `Error. you didn't send data` });
  }
};

exports.filter = (req, res) => {
  const body = req.query;
  if (
    body.hasOwnProperty("id") ||
    body.hasOwnProperty("text") ||
    body.hasOwnProperty("age") ||
    body.hasOwnProperty("description") ||
    body.hasOwnProperty("owner") ||
    body.hasOwnProperty("country") ||
    body.hasOwnProperty("createdAt") ||
    body.hasOwnProperty("updatedAt")
  ) {
    Wall.findAll({ where: body })
      .then((data) => {
        if (data.length !== 0) {
          res.send(data);
        } else {
          res.send({ message: `Error. invalid  value` });
        }
      })
      .catch((err) => {
        res.status(400).send({ message: `invalid key. Error => ${err}` });
      });
  } else {
    res.status(400).send({ message: `Error. you didn't send data` });
  }
};

exports.sort = (req, res) => {
  const body = req.body;
  const field = Object.keys(body).length != 0 ? Object.keys(body) : ["id"];
  body[field] ? field.push(body[field]) : field.push("ASC");
  Wall.findAll({
    order: [field],
  })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(400).send({
        message: `Error. 
        invalid ASC or DESC specified => ${err}`,
      });
    });
};

exports.pagination = (req, res) => {
  const { limit, offset } = req.query;
  const limitVal = limit ? limit : null;
  const offsetVal = offset ? offset : null;
  Wall.findAndCountAll({
    offset: offsetVal,
    limit: limitVal,
  })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(400).send({ message: `Error => ${err}` });
    });
};

exports.paginationSort = (req, res) => {
  const { limit, offset } = req.query;
  const limitVal = limit ? limit : null;
  const offsetVal = offset ? offset : null;
  Wall.findAndCountAll({
    offset: offsetVal,
    limit: limitVal,
    order: [["age", req.query.age]],
  })
    .then((data) => {
      if (data.rows.length > 0) {
        res.send(data);
      } else {
        res.send({ message: `Error. Not page` });
      }
    })
    .catch((err) => {
      res.status(400).send({ message: `Error => ${err}` });
    });
};

exports.value = (req, res) => {
  const body = req.body;
  if (
    body.includes("id") ||
    body.includes("text") ||
    body.includes("age") ||
    body.includes("description") ||
    body.includes("owner") ||
    body.includes("country") ||
    body.includes("createdAt") ||
    body.includes("updatedAt")
  ) {
    Wall.findAll({
      attributes: body,
    })
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        res.status(400).send({ message: `Error. Check val => ${err}` });
      });
  } else {
    res.status(400).send({ message: `Error. you didn't send data` });
  }
};
