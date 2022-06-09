enum ProductCategoryQueries {
  TABLE_NAME = "refdata_product_categories",
  FIND_ALL = "SELECT * from refdata_product_categories",
  FIND_BY_ID = "SELECT * FROM refdata_product_categories WHERE id = $1",
  CREATE = 'INSERT INTO refdata_product_categories ("name") VALUES($1) RETURNING id',
  UPDATE = 'UPDATE refdata_product_categories SET "name" = $1 WHERE id = $2 RETURNING id',
}

export default ProductCategoryQueries;
