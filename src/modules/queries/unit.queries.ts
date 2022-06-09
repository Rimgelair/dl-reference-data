enum UnitQueries {
  TABLE_NAME = "refdata_units",
  FIND_ALL = "SELECT * from refdata_units",
  FIND_BY_ID = "SELECT * FROM refdata_units WHERE id = $1",
  FIND_BY_UNIT_TYPE = "SELECT * FROM refdata_units WHERE unit_type_id = $1",
  CREATE = "INSERT INTO refdata_units (long_name, short_name, unit_type_id) VALUES($1, $2, $3) RETURNING id",
  UPDATE = "UPDATE refdata_units SET long_name = $1, short_name = $2, unit_type_id = $3 WHERE id = $4 RETURNING id",
}

export default UnitQueries;
