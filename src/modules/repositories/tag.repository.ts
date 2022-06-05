import {
  executeDependentQueriesWithValues,
  executeQuery,
  executeQueryWithValues,
} from "dlpos-core";
import Tag from "../models/tag.dto";
import TagQueries from "../queries/tag.queries";
import ReferenceDataUpdateHistoryQueries from "../queries/update-history.queries";
import { Instruction } from "../../types";

class TagRepository {
  async findAll() {
    return executeQuery(TagQueries.FIND_ALL);
  }

  async findById(id: number) {
    return executeQueryWithValues(TagQueries.FIND_BY_ID, [id]);
  }

  async create(newTag: Tag, userId: number) {
    return executeDependentQueriesWithValues(
      TagQueries.CREATE,
      [newTag.name],
      ReferenceDataUpdateHistoryQueries.CREATE_UPDATE_HISTORY_ENTRY,
      [Instruction.CREATE, TagQueries.TABLE_NAME, userId, new Date(), newTag]
    );
  }

  async update(updatedTag: Tag, userId: number) {
    return executeDependentQueriesWithValues(
      TagQueries.UPDATE,
      [updatedTag.name, updatedTag.id],
      ReferenceDataUpdateHistoryQueries.CREATE_UPDATE_HISTORY_ENTRY,
      [
        Instruction.UPDATE,
        TagQueries.TABLE_NAME,
        userId,
        new Date(),
        updatedTag,
      ]
    );
  }
}

export default new TagRepository();
