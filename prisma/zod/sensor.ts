import * as z from "zod";
import { SensorType } from "@prisma/client";
import {
  CompleteField,
  RelatedFieldModel,
  CompleteSensorValue,
  RelatedSensorValueModel,
} from "./index";

export const SensorModel = z.object({
  id: z.string(),
  type: z.nativeEnum(SensorType),
  fieldId: z.string(),
});

export interface CompleteSensor extends z.infer<typeof SensorModel> {
  Field: CompleteField;
  sensorValues: CompleteSensorValue[];
}

/**
 * RelatedSensorModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedSensorModel: z.ZodSchema<CompleteSensor> = z.lazy(() =>
  SensorModel.extend({
    Field: RelatedFieldModel,
    sensorValues: RelatedSensorValueModel.array(),
  })
);
