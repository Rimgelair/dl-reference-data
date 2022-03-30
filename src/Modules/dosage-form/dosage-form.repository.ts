import { executeQuery, executeQueryWithValues } from "../../db";
import DosageFormQueries from "./dosage-form.queries";

class DosageFormRepository {
  async findAll() {
    return executeQuery(DosageFormQueries.findAll);
  }

  async findAllPretty() {
    return executeQuery(DosageFormQueries.findAllPretty);
  }

  async findById(id: bigint) {
    return executeQueryWithValues(DosageFormQueries.findById, [id]);
  }

  async findByIdPretty(id: bigint) {
    return executeQueryWithValues(DosageFormQueries.findByIdPretty, [id]);
  }

  async findByDosageFormTypeId(dosageFormTypeId: number) {
    return executeQueryWithValues(DosageFormQueries.findByDosageFormTypeId, [
      dosageFormTypeId,
    ]);
  }
}

export default new DosageFormRepository();
