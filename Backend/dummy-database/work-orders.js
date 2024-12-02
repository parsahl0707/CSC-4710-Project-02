export async function getWorkOrders(tables, username, password) {
  return account.getAccount(tables, username, password).then((user) => {
    if (user.admin) {
      return tables.workOrders;
    }

    return tables.workOrders.filter((value) => value.userId === user.id);
  });
}
