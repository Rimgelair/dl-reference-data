enum UnitTypeQueries {
  TABLE_NAME = "refdata_unit_type",
  FIND_ALL = "SELECT * FROM refdata_unit_type",
  FIND_BY_ID = "SELECT * FROM refdata_unit_type where id = $1",
  CREATE = 'INSERT INTO refdata_unit_type ("name") VALUES($1) RETURNING id',
  UPDATE = 'UPDATE refdata_unit_type SET "name" = $1 WHERE id = $2 RETURNING id',
}

export default UnitTypeQueries;
