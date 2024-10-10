import Ajv, { ValidateFunction } from "ajv";
import { AnySchema, JTDDataType } from "ajv/dist/core";

export class SchemaValidatorAdapter {
  private ajv!: Ajv;
  private schema!: ValidateFunction<JTDDataType<any>>;
  private validSchema!: boolean;
  constructor() {
    this.ajv = new Ajv({ allErrors: true, strict: false });
  }

  public compileSchema<T>(model: T) {
    try {
      this.schema = this.ajv.compile(model as AnySchema);
      return this.schema;
    } catch (error) {
      const _error = error as Error;
      throw new Error(_error.message);
    }
  }

  public verifySchema<T>(data: T) {
    this.validSchema = this.schema(data);
    this.verifyErrors();
    return this.validSchema;
  }
  private verifyErrors() {
    if (!this.validSchema) {
      const arrErrors = this.schema.errors;
      if (arrErrors) {
        for (let i = 0; i < arrErrors.length; i++) {
          const { instancePath, message, schemaPath, params } = arrErrors[i];
          throw new Error(
            `instancePath: ${instancePath}, message: ${message}, schemaPath: ${schemaPath}, params: ${JSON.stringify(
              params
            )}`
          );
        }
      }
    }
  }
}
