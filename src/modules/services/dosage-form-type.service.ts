import dosageFormTypeRepository from "../repositories/dosage-form-type.repository";
import RefDataException from "../../exceptions/RefDataException";
import { ServiceResponse } from "dlpos-core";
import { QueryResult } from "pg";
import CommonValidator from "../validators/common-validator";
import DosageFormType from "../models/dosage-form-type.dto";
import { Instruction } from "../../types";
import {
  newDosageFormTypeRequest,
  updateDosageFormTypeRequest,
} from "../validators/dosage-form-type.validator";

class DosageFormTypeService {
  async findAll(): Promise<ServiceResponse> {
    let queryResult: QueryResult = await dosageFormTypeRepository.findAll();
    let serviceResponse: ServiceResponse = {
      status: 200,
      itemCount: queryResult.rowCount,
      data: queryResult.rows.map((activeIngredient) => {
        return DosageFormType.fromJson(activeIngredient);
      }),
    };
    return serviceResponse;
  }

  async findById(id: string) {
    let validationResult = CommonValidator.isInt(id);
    if (!validationResult.isValid) {
      throw new RefDataException(400, `id [${id}] ${validationResult.error}`);
    }
    let queryResult: QueryResult = await dosageFormTypeRepository.findById(
      validationResult.validValue
    );
    if (queryResult.rowCount < 1) {
      throw new RefDataException(
        404,
        `No dosage form type found for id: ${id}`
      );
    } else {
      let serviceResponse: ServiceResponse = {
        status: 200,
        itemCount: queryResult.rowCount,
        data: [DosageFormType.fromJson(queryResult.rows[0])],
      };
      return serviceResponse;
    }
  }

  async create(requestBody: any) {
    let serviceResponse: ServiceResponse = {
      status: 200,
    };
    let validationResult: any;
    try {
      validationResult = await newDosageFormTypeRequest.validate(requestBody, {
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

    let newDosageFormType: DosageFormType =
      DosageFormType.fromJson(requestBody);

    await dosageFormTypeRepository.create(
      newDosageFormType,
      validationResult.id
    );
    serviceResponse.message = "Dosage Form Type Created Successfully!";

    return serviceResponse;
  }

  async update(requestBody: any) {
    let serviceResponse: ServiceResponse = {
      status: 200,
    };

    let validationResult: any;

    try {
      validationResult = updateDosageFormTypeRequest.validate(requestBody);
    } catch (validationError) {
      let exception: RefDataException = new RefDataException(
        400,
        "Invalid request."
      );
      exception.addErrors(validationError.errors);
      throw exception;
    }

    let updatedDosageFormType: DosageFormType =
      DosageFormType.fromJson(requestBody);

    await dosageFormTypeRepository.update(
      updateDosageFormTypeRequest,
      validationResult.id
    );
    serviceResponse.message = "Dosage Form Type Updated Successfully!";

    return serviceResponse;
  }
}

export default new DosageFormTypeService();
