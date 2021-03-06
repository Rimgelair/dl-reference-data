import request from "supertest";
import ReferenceDataService from "../src/app";
import { createConnectionPool } from "dlpos-core";

beforeAll(() => {
  createConnectionPool("dev_user", "localhost", "dl_staging", "password", 5432);
});

describe("Given activeIngredients table is populated and valid ids: ", () => {
  test("/xibalba/v1/refdata/activeIngredients should respond with all activeIngredients on GET method", async () => {
    const response = await request(ReferenceDataService).get(
      "/xibalba/v1/refdata/activeIngredients"
    );
    expect(response.statusCode).toBe(200);
    expect(response.body.data.length).toBeGreaterThanOrEqual(1);
  });

  test("/xibalba/v1/refdata/activeIngredients/:id should respond with activeIngredient data for id on GET method", async () => {
    const response = await request(ReferenceDataService).get(
      "/xibalba/v1/refdata/activeIngredients/1"
    );
    expect(response.statusCode).toBe(200);
    expect(response.body.data[0].id).toBe(1);
  });
});

describe("Given activeIngredients table is populated and non existed ids or invalid ids: ", () => {
  test("/xibalba/v1/refdata/activeIngredients/[non existent id] should respond 404 on GET method", async () => {
    const response = await request(ReferenceDataService).get(
      "/xibalba/v1/refdata/activeIngredients/78"
    );
    expect(response.statusCode).toBe(404);
  });
  test("/xibalba/v1/refdata/activeIngredients/[non valid id] should respond with 400 on GET method", async () => {
    const response = await request(ReferenceDataService).get(
      "/xibalba/v1/refdata/activeIngredients/&*"
    );
    expect(response.statusCode).toBe(400);
  });
});
