const dbService = require("../db/db.service");

async function getHierarchyForId(id) {
  let hierarchyStr = "";
  const users = await getHierarchyForIdAsArray(id);
  for (let i = users.length - 1; i >= 0; i--) {
    hierarchyStr += i !== 0 ? ` ${users[i].name} ->` : ` ${users[i].name}`;
  }
  return hierarchyStr;
}

async function getHierarchyForIdAsArray(id) {
  const users = [];

  const user = await dbService.getHierarchyItemById(id);
  let currentUser = user;
  while (currentUser.level !== 1) {
    currentUser = await getParent(currentUser.parentMemberId);
    users.push(currentUser);
  }
  return users;
}

async function getParent(id) {
  return await dbService.getHierarchyItemById(id);
}

module.exports = {
  getHierarchyForId,
  getHierarchyForIdAsArray,
};
