enum ManufacturerQueries {
  TABLE_NAME = "refdata_manufacturers",
  FIND_ALL = "SELECT * from refdata_manufacturers",
  FIND_BY_ID = "SELECT * FROM refdata_manufacturers WHERE id = $1",
  CREATE = "INSERT INTO refdata_manufacturers (long_name, short_name) VALUES($1, $2) RETURNING id",
  UPDATE = "UPDATE refdata_manufacturers SET long_name = $1, short_name = $2 WHERE id = $3 RETURNING id",
}

export default ManufacturerQueries;