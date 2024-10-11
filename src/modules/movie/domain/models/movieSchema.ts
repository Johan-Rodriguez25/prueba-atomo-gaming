import { JSONSchemaType } from "ajv";
import { Movie } from "./mdl-movie";

export const MovieSchema: JSONSchemaType<Movie> = {
  $schema: "http://json-schema.org/draft-07/schema#",
  additionalProperties: false,
  properties: {
    _id: { type: "string" },
    nombre: { type: "string" },
    resumen: { type: "string" },
    rating: { type: "number" },
    categorias: { type: "array", items: { type: "string" } },
    imagen: { type: "string" },
    isDeleted: { type: "boolean" },
    created_time: { type: "string" },
    updated_time: { type: "string" },
  },
  required: [
    "nombre",
    "resumen",
    "rating",
    "categorias",
    "imagen",
    "isDeleted",
    "created_time",
    "updated_time",
  ],
  type: "object",
};
