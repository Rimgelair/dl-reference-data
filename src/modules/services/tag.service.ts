import { ServiceResponse } from "dlpos-core";
import { QueryResult } from "pg";
import tagRepository from "../repositories/tag.repository";
import RefDataException from "../../exceptions/RefDataException";
import Tag from "../models/tag.dto";
import CommonValidator from "../validators/common-validator";

class TagService {
  async findAll() {
    let queryResult: QueryResult = await tagRepository.findAll();
    let serviceResponse: ServiceResponse = {
      status: 200,
      itemCount: queryResult.rowCount,
      data: queryResult.rows.map((tag) => {
        return Tag.fromJson(tag);
      }),
    };
    return serviceResponse;
  }

  async findById(id: string) {
    let validationResult = CommonValidator.isInt(id);
    if (!validationResult.isValid) {
      throw new RefDataException(400, `[id] ${validationResult.error}`);
    }
    let queryResult: QueryResult = await tagRepository.findById(
      validationResult.validValue
    );
    if (queryResult.rowCount < 1) {
      throw new RefDataException(404, `No tag found with id: ${id}`);
    } else {
      let serviceResponse: ServiceResponse = {
        status: 200,
        data: [Tag.fromJson(queryResult.rows[0])],
      };
      return serviceResponse;
    }
  }
}

export default new TagService();
