enum PaymentMethodQueries {
  TABLE_NAME = "refdata_payment_methods",
  FIND_ALL = "SELECT * from refdata_payment_methods",
  FIND_BY_ID = "SELECT * FROM refdata_payment_methods WHERE id = $1",
  CREATE = "INSERT INTO refdata_payment_methods (long_name, short_name) VALUES($1, $2) RETURNING id",
  UPDATE = "UPDATE public.refdata_payment_methods SET long_name = $1, short_name = $2 WHERE id = $3 RETURNING id",
}

export default PaymentMethodQueries;
