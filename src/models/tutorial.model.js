module.exports = (sequelize, Sequelize) => {
  const Wall = sequelize.define("wallst", {
    text: {
      type: Sequelize.STRING,
    },
    age: {
      type: Sequelize.STRING,
    },
    description: {
      type: Sequelize.STRING,
    },
    owner: {
      type: Sequelize.STRING,
    },
    country: {
      type: Sequelize.STRING,
    },
  });

  return Wall;
};
