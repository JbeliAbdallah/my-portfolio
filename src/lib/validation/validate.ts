import { ZodSchema } from "zod";

export type ValidationResult<T> =
  | {
      success: true;
      data: T;
    }
  | {
      success: false;
      error: string;
    };

export function validate<T>(
  schema: ZodSchema<T>,
  values: unknown,
): ValidationResult<T> {
  const result = schema.safeParse(values);

  if (!result.success) {
    return {
      success: false,
      error: result.error.issues[0]?.message ?? "Invalid input.",
    };
  }

  return {
    success: true,
    data: result.data,
  };
}
