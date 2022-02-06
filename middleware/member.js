const controller = require("../hierarchy/hierarchy.controller");
const _ = require("lodash");
module.exports = async function (req, res, next) {
  try {
    const currentUser = res.locals.account;
    const requestedMemberHierarchy = await controller.getHierarchyForIdAsArray(
      req.params.id
    );
    if (!requestedMemberHierarchy.some((h) => currentUser.id === h.memberId)) {
      throw { message: "user not authorized", status: 403 };
    }
    next();
  } catch (err) {
    const errMessage = _.get(err, "message", "error occurred");
    const errCode = _.get(err, "status", 500);

    res.status(errCode).json({
      message: "error occurred during member request validation",
      error: errMessage,
    });
  }
};
