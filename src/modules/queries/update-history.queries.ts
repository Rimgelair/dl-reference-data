enum UpdateHistoryQueries {
  GET_UPDATE_HISTORY = "SELECT * FROM refData_update_history WHERE table_name=$1 AND refdata_id=$2",
  CREATE_UPDATE_HISTORY_ENTRY = "INSERT INTO refdata_update_history(instruction, table_name, user_id, update_timestamp, data, refdata_id)VALUES($1, $2, $3, $4, $5, $6)",
}

export default UpdateHistoryQueries;
