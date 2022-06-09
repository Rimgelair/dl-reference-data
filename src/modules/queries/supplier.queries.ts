enum SupplierQueries {
  TABLE_NAME = "refdata_suppliers",
  FIND_ALL = "SELECT * from refdata_suppliers",
  FIND_BY_ID = "SELECT * FROM refdata_suppliers WHERE id = $1",
  CREATE = 'INSERT INTO refdata_suppliers ("name") VALUES($1) RETURNING id',
  UPDATE = 'UPDATE refdata_suppliers SET "name"=$1 WHERE id = $2 RETURNING id',
}

export default SupplierQueries;
