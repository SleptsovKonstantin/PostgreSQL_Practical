// const { Walls } = require("../models");
const { rows } = require("pg/lib/defaults");
const db = require("../models");

const Wall = db.tutorials;

exports.create = (req, res) => {
  const { text, age, description, owner, country } = req.body;
  if (text && age && description && owner && country) {
    const newText = { text, age, description, owner, country };
    Wall.create(newText).then((data) => {
      res.send(data);
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
  const body = req.body;
  const key = Object.keys(body);
  const value = body[key];
  if (key && value) {
    Wall.findAll({ where: { [key]: value } })
      .then((data) => {
        if (data.length !== 0) {
          res.send(data);
        } else {
          res.send({ message: `Error. invalid  value` });
        }
      })
      .catch((err) => {
        res.status(400).send({ message: `invalid key ` });
      });
  } else {
    res.send({ message: `Error. not key or value` });
  }
};

exports.filter = (req, res) => {
  const body = req.body;
  const newArr = Object.keys(body).length;
  const { text, age } = body;
  if (text && age && newArr > 1) {
    Wall.findAll({ where: { text, age } })
      .then((data) => {
        if (data.length !== 0) {
          res.send(data);
        } else {
          res.send({ message: `Error. invalid  value` });
        }
      })
      .catch((err) => {
        res.status(400).send({ message: `invalid key ` });
      });
  } else {
    res.send({ message: `Error. not key or value111` });
  }
};

exports.sort = (req, res) => {
  const body = req.body;
  const field = Object.keys(body);
  if (body[field] !== "") {
    field.push(body[field]);
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
  } else {
    Wall.findAll({
      order: [field],
    })
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        res.status(400).send({ message: `Error => ${err}` });
      });
  }
};

exports.pagination = (req, res) => {
  const { limit, page } = req.body;
  const offset = 0 + (page - 1) * limit;
  if (limit && page) {
    Wall.findAndCountAll({
      offset,
      limit,
    })
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        res.status(400).send({ message: `Error => ${err}` });
      });
  } else {
    res.status(400).send({ message: `Error. invalid request body` });
  }
};

exports.paginationSort = (req, res) => {
  const { age, limit, page } = req.body;
  const offset = 0 + (page - 1) * limit;
  if (age && limit && page) {
    Wall.findAndCountAll({
      offset,
      limit,
      order: [["age", age]],
    }).then((data) => {
      if (data.rows.length > 0) {
        res.send(data);
      } else {
        res.send({ message: `Error. Not page` });
      }
    });
  } else {
    res.status(400).send({ message: `Error. not val` });
  }
};

exports.value = (req, res) => {
  const val = req.body;
  if (val) {
    Wall.findAll({
      attributes: val,
    })
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        res.status(400).send({ message: `Error. Check val => ${err}` });
      });
  } else {
    res.status(400).send({ message: `Error. not val` });
  }
};
