import * as z from "zod";
import { Role } from "@prisma/client";
import { CompleteField, RelatedFieldModel } from "./index";

export const UserModel = z.object({
  id: z.string().nullish(),
  username: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  email: z.string(),
  password: z.string(),
  role: z.nativeEnum(Role),
});

export interface CompleteUser extends z.infer<typeof UserModel> {
  fields: CompleteField[];
}

/**
 * RelatedUserModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedUserModel: z.ZodSchema<CompleteUser> = z.lazy(() =>
  UserModel.extend({
    fields: RelatedFieldModel.array(),
  })
);
