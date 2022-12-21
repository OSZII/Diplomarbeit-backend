import * as z from "zod";
import { Decimal } from "decimal.js";
import { AreaUnit } from "@prisma/client";
import {
  CompleteSensor,
  RelatedSensorModel,
  CompleteUser,
  RelatedUserModel,
} from "./index";

// Helper schema for Decimal fields
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
  id: z.string().nullish(),
  name: z.string(),
  area: z.number().int(),
  unit: z.nativeEnum(AreaUnit),
  latitude: z.number().nullish(),
  longitude: z.number().nullish(),
  description: z.string().nullish(),
  userId: z.string().nullish(),
});

export interface CompleteField extends z.infer<typeof FieldModel> {
  sensors: CompleteSensor[];
  User?: CompleteUser | null;
}

/**
 * RelatedFieldModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedFieldModel: z.ZodSchema<CompleteField> = z.lazy(() =>
  FieldModel.extend({
    sensors: RelatedSensorModel.array(),
    User: RelatedUserModel.nullish(),
  })
);
