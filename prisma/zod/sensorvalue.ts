import * as z from "zod";
import { CompleteSensor, RelatedSensorModel } from "./index";

export const SensorValueModel = z.object({
  id: z.string().nullish(),
  value: z.string(),
  timeStamp: z.date(),
  sensorId: z.string(),
});

export interface CompleteSensorValue extends z.infer<typeof SensorValueModel> {
  Sensor: CompleteSensor;
}

/**
 * RelatedSensorValueModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedSensorValueModel: z.ZodSchema<CompleteSensorValue> = z.lazy(
  () =>
    SensorValueModel.extend({
      Sensor: RelatedSensorModel,
    })
);
