const { deleteUsers } = require("./auth-provider");

async function deleteAuthUsers(userUIDs = []) {
  /**
   * TODO
   *
   * eliminar primero los uids existentes buscandolos
   * por los emails que vienen desde seed.js
   */

  const result = await deleteUsers(userUIDs);

  return {
    successCount: result.successCount,
    deleteCount: result.deleteCount,
  };
}

module.exports = {
  deleteAuthUsers: deleteAuthUsers,
};
