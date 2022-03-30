enum DosageFormQueries {
  findAll = "SELECT * FROM refdata_dosage_forms",
  findById = "SELECT * FROM refdata_dosage_forms WHERE id = $1",
  findByDosageFormTypeId = "SELECT * FROM refdata_dosage_forms WHERE dosage_form_type_id = $1",
  findAllPretty = "select  * from refdata_dosage_forms_pretty_view",
  findByIdPretty = "select  * from refdata_dosage_forms_pretty_view where id  = $1",
}

export default DosageFormQueries;
