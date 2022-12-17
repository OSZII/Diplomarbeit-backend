import * as z from "zod";
import { Decimal } from "decimal.js";
import { AreaUnit } from "@prisma/client";
import { CompleteSensor, RelatedSensorModel } from "./index";

z.instanceof(Decimal)
  .or(z.string())
  .or(z.number())
  .refine((value) => {
    try {
      return new Decimal(value);
    } catch (error) {
      return false;
    }
  })
  .transform((value) => new Decimal(value));

export const FieldModel = z.object({
  id: z.string().optional(),
  name: z.string(),
  area: z.number().int(),
  unit: z.nativeEnum(AreaUnit),
  latitude: z.number().nullish(),
  longitude: z.number().nullish(),
  description: z.string().nullish(),
});

export interface CompleteField extends z.infer<typeof FieldModel> {
  sensors: CompleteSensor[];
}
export const RelatedFieldModel: z.ZodSchema<CompleteField> = z.lazy(() =>
  FieldModel.extend({
    sensors: RelatedSensorModel.array(),
  })
);
