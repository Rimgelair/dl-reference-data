import { executeQuery, executeQueryWithValues } from "dlpos-core";
import ActiveIngredientQueries from "./active-ingredient.queries";

class ActiveIngredientRepository {
  async findAll() {
    return executeQuery(ActiveIngredientQueries.findAll);
  }

  async findById(id: number) {
    return executeQueryWithValues(ActiveIngredientQueries.findById, [id]);
  }
}

export default new ActiveIngredientRepository();
