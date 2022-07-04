import { ServiceResponse } from "dlpos-core";
import { QueryResult } from "pg";
import ActiveIngredient from "../models/active-ingredient.dto";
import activeIngredientRepository from "../repositories/active-ingredient.repository";
import RefDataException from "../../exceptions/RefDataException";
import QueryString from "qs";
import {
  newActiveIngredientRequest,
  updateActiveIngredientRequest,
} from "../validators/active-ingredient.validator";
import { RequiredNumberSchema } from "yup/lib/number";
import { AssertsShape, Assign, ObjectShape } from "yup/lib/object";
import { RequiredStringSchema } from "yup/lib/string";
import { AnyObject } from "yup/lib/types";

class ActiveIngredientService {
  async findAll() {
    let queryResult: QueryResult = await activeIngredientRepository.findAll();
    let serviceResponse: ServiceResponse = {
      status: 200,
      itemCount: queryResult.rowCount,
      data: queryResult.rows.map((activeIngredient) => {
        return ActiveIngredient.fromJson(activeIngredient);
      }),
    };
    return serviceResponse;
  }

  async findById(id: string) {
    let numId: number = Number(id);
    if (Number.isNaN(numId)) {
      throw new RefDataException(400, "id provided is not a valid number");
    }
    let queryResult: QueryResult = await activeIngredientRepository.findById(
      numId
    );
    if (queryResult.rowCount < 1) {
      throw new RefDataException(
        404,
        `No active ingredient found for id: ${id}`
      );
    } else {
      let serviceResponse: ServiceResponse = {
        status: 200,
        data: [ActiveIngredient.fromJson(queryResult.rows[0])],
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
      validationResult = await newActiveIngredientRequest.validate(
        createRequestBody,
        {
          abortEarly: false,
        }
      );
    } catch (validationError) {
      let exception: RefDataException = new RefDataException(
        400,
        "Invalid request."
      );
      exception.addErrors(validationError.errors);
      throw exception;
    }

    let newActiveIngredient: ActiveIngredient =
      ActiveIngredient.fromJson(createRequestBody);

    await activeIngredientRepository.create(
      newActiveIngredient,
      validationResult.userId
    );

    serviceResponse.message = "Active ingredient successfully created!";

    return serviceResponse;
  }

  async update(updateRequestBody: any) {
    let serviceResponse: ServiceResponse = {
      status: 200,
    };

    let validationResult;

    try {
      validationResult = await newActiveIngredientRequest.validate(
        updateRequestBody,
        {
          abortEarly: false,
        }
      );
    } catch (validationError) {
      let exception: RefDataException = new RefDataException(
        400,
        "Invalid request."
      );
      exception.addErrors(validationError.errors);
      throw exception;
    }

    let updatedActiveIngredient: ActiveIngredient =
      ActiveIngredient.fromJson(updateRequestBody);

    await activeIngredientRepository.update(
      updatedActiveIngredient,
      validationResult.userId
    );

    serviceResponse.message = "Active ingredient successfully updated!";

    return serviceResponse;
  }
}

export default new ActiveIngredientService();
