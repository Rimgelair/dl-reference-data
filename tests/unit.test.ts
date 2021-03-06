import request from "supertest";
import ReferenceDataService from "../src/app";
describe("Given Units table is populated and valid ids: ", () => {
  test("/xibalba/v1/refdata/units should respond with all units on GET method", async () => {
    const response = await request(ReferenceDataService).get(
      "/xibalba/v1/refdata/units"
    );
    expect(response.statusCode).toBe(200);
    expect(response.body.data.length).toBeGreaterThanOrEqual(1);
  });

  test("/xibalba/v1/refdata/units/:id should respond with unit data for id on GET method", async () => {
    const response = await request(ReferenceDataService).get(
      "/xibalba/v1/refdata/units/1"
    );
    expect(response.statusCode).toBe(200);
    expect(response.body.data.id).toBe(1);
  });

  test("/xibalba/v1/refdata/units/types/:unitTypeId should respond with units for unit type id on GET method", async () => {
    const response = await request(ReferenceDataService).get(
      "/xibalba/v1/refdata/units/types/1"
    );
    expect(response.statusCode).toBe(200);
    expect(response.body.data.length).toBeGreaterThanOrEqual(1);
  });
});

describe("Given Units table is populated and non existent id or invalid id", () => {
  test("/xibalba/v1/refdata/units/[non existent id] should respond 404 on GET method", async () => {
    const response = await request(ReferenceDataService).get(
      "/xibalba/v1/refdata/units/78"
    );
    expect(response.statusCode).toBe(404);
  });
  test("/xibalba/v1/refdata/units/types/[non existent id] should respond with 404 on GET method", async () => {
    const response = await request(ReferenceDataService).get(
      "/xibalba/v1/refdata/units/types/78"
    );
    expect(response.statusCode).toBe(404);
  });

  test("/xibalba/v1/refdata/units/[malformed id] should respond with 400 on GET method", async () => {
    const response = await request(ReferenceDataService).get(
      "/xibalba/v1/refdata/units/^"
    );
    expect(response.statusCode).toBe(400);
  });
  test("/xibalba/v1/refdata/units/types/[malformed id] should respond with 400 on GET method", async () => {
    const response = await request(ReferenceDataService).get(
      "/xibalba/v1/refdata/units/types/^"
    );
    expect(response.statusCode).toBe(400);
  });
});
