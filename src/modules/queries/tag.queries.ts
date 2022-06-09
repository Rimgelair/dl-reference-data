enum TagQueries {
  TABLE_NAME = "refdata_tags",
  FIND_ALL = "SELECT * FROM refdata_tags",
  FIND_BY_ID = "SELECT * FROM refdata_tags WHERE id = $1",
  CREATE = 'INSERT INTO refdata_tags ("name") VALUES($1) RETURNING id',
  UPDATE = 'UPDATE refdata_tags SET "name" = $1 WHERE id = $2 RETURNING id',
}

export default TagQueries;
