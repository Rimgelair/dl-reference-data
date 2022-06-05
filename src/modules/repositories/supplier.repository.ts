import { executeQuery, executeQueryWithValues } from "dlpos-core";
import SupplierQueries from "../queries/supplier.queries";

class SupplierRepository {
  async findAll() {
    return executeQuery(SupplierQueries.findAll);
  }

  async findById(id: number) {
    return executeQueryWithValues(SupplierQueries.findById, [id]);
  }
}

export default new SupplierRepository();
