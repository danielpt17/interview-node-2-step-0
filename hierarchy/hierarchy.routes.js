const express = require("express");
const router = express.Router();
const controller = require("./hierarchy.controller");
const _ = require('lodash');

router.get("/:id", getHierarchyForId);

async function getHierarchyForId(req, res, next) {
  try {
    console.log(`[hierarchy] getHierarchyForId, id: ${req.params.id}`);
    const hierarchy = await controller.getHierarchyForId(req.params.id);
    res.status(200).send(hierarchy);
  } catch (err) {
    const errMessage = _.get(err, "message", "error occurred");
    const errCode = _.get(err, "status", 500);
    res.status(errCode).json({ message: "error occurred", error: errMessage });
  }
}

module.exports = router;
