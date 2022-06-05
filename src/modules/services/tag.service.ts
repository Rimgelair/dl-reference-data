import { ServiceResponse } from "dlpos-core";
import { QueryResult } from "pg";
import tagRepository from "../repositories/tag.repository";
import RefDataException from "../../exceptions/RefDataException";
import Tag from "../models/tag.dto";
import CommonValidator from "../validators/common-validator";
import { newTagRequest, updateTagRequest } from "../validators/tag.validator";
import { RequiredNumberSchema } from "yup/lib/number";
import { AssertsShape, Assign, ObjectShape } from "yup/lib/object";
import { RequiredStringSchema } from "yup/lib/string";
import { AnyObject } from "yup/lib/types";

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

  async create(createRequestBody: any) {
    let serviceResponse: ServiceResponse = {
      status: 200,
    };
    let validationResult: AssertsShape<
      Assign<
        ObjectShape,
        {
          name: RequiredStringSchema<string, AnyObject>;
          userId: RequiredNumberSchema<number, AnyObject>;
        }
      >
    >;

    try {
      validationResult = await newTagRequest.validate(createRequestBody, {
        abortEarly: false,
      });
    } catch (validationError) {
      let exception: RefDataException = new RefDataException(
        400,
        "Invalid request."
      );
      exception.addErrors(validationError.errors);
      throw exception;
    }

    let newTag: Tag = Tag.fromJson(createRequestBody);
    await tagRepository.create(newTag, validationResult.userId);

    return serviceResponse;
  }

  async update(updateRequestBody: any) {
    let serviceResponse: ServiceResponse = {
      status: 200,
    };
    let validationResult: AssertsShape<
      Assign<
        ObjectShape,
        {
          name: RequiredStringSchema<string, AnyObject>;
          userId: RequiredNumberSchema<number, AnyObject>;
        }
      >
    >;

    try {
      validationResult = await updateTagRequest.validate(updateRequestBody, {
        abortEarly: false,
      });
    } catch (validationError) {
      let exception: RefDataException = new RefDataException(
        400,
        "Invalid request."
      );
      exception.addErrors(validationError.errors);
      throw exception;
    }

    let newTag: Tag = Tag.fromJson(updateRequestBody);
    await tagRepository.update(newTag, validationResult.userId);

    return serviceResponse;
  }
}

export default new TagService();
