import { FieldModel } from "./prisma/zod";
// import { Field } from "./Objects/Field";
import * as z from "zod"

class Field {
    id: string
    name: string
    area: number
    unit: AreaUnit
    latitude: number | undefined | null
    longitude: number | undefined | null
    description: string | undefined | null

    constructor(fields: z.infer<typeof FieldModel>) {
        const validatedFields = FieldModel.parse(fields)
        this.id = validatedFields.id
        this.name = validatedFields.name
        this.area = validatedFields.area
        this.unit = validatedFields.unit
        this.latitude = validatedFields.latitude
        this.longitude = validatedFields.longitude
        this.description = validatedFields.description
    }
}