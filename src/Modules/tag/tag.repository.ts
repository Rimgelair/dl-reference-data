import { executeQuery, executeQueryWithValues } from "../../db";
import TagQueries from "./tag.queries";

class TagRepository {
  async findAll() {
    return executeQuery(TagQueries.findAll);
  }

  async findById(id: bigint) {
    return executeQueryWithValues(TagQueries.findById, [id]);
  }
}

export default new TagRepository();