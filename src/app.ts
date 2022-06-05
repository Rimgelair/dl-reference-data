import express from "express";
import bodyParser from "body-parser";
import manufacturerRouter from "./modules/routers/manufacturer.router";
import supplierRouter from "./modules/routers/supplier.router";
import paymentMethodRouter from "./modules/routers/payment-method.router";
import productCategoryRouter from "./modules/routers/product-category.router";
import activeIngredientsRouter from "./modules/routers/active-ingredient.router";
import unitRouter from "./modules/routers/unit.router";
import tagRouter from "./modules/routers/tag.router";
import dosageFormRouter from "./modules/routers/dosage-form.router";
import dosageFormTypeRouter from "./modules/routers/dosage-form-type.router";
import errorMiddleware from "./middleware/error.Middleware";
import unitTypeRouter from "./modules/routers/unit-type.router";
import refDataUpdateHistoryRouter from "./modules/routers/update-history-router";

const ReferenceDataService = express();

ReferenceDataService.use(bodyParser.json());
ReferenceDataService.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
ReferenceDataService.use(manufacturerRouter);
ReferenceDataService.use(supplierRouter);
ReferenceDataService.use(paymentMethodRouter);
ReferenceDataService.use(productCategoryRouter);
ReferenceDataService.use(activeIngredientsRouter);
ReferenceDataService.use(unitRouter);
ReferenceDataService.use(tagRouter);
ReferenceDataService.use(dosageFormRouter);
ReferenceDataService.use(dosageFormTypeRouter);
ReferenceDataService.use(unitTypeRouter);
ReferenceDataService.use(refDataUpdateHistoryRouter);
ReferenceDataService.use(errorMiddleware);

ReferenceDataService.get(
  "/xibalba/v1/refdata/serviceInfo",
  (request, response) => {
    response.json({ serviceName: "Reference Data Service", version: "1.0.0" });
  }
);

export default ReferenceDataService;
