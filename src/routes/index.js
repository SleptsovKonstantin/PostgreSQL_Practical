module.exports = (app) => {
  const tutorialControllers = require("../controller/tutorial.controller");
  const router = require("express").Router();

  router.post("/", tutorialControllers.create);
  router.get("/findAll", tutorialControllers.findAll);
  router.get("/findTitle/:age", tutorialControllers.findTitle);
  router.get("/filter", tutorialControllers.filter);
  router.get("/sort", tutorialControllers.sort);
  router.get("/pagination", tutorialControllers.pagination);
  router.get("/paginationSort", tutorialControllers.paginationSort);
  router.get("/value", tutorialControllers.value);

  app.use("/api/wall", router);
};
