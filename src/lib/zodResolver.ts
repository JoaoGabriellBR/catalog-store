import { FieldErrors, Resolver } from "react-hook-form";
import { z } from "zod";

export const zodResolver =
  <T extends z.ZodTypeAny>(schema: T): Resolver<z.infer<T>> =>
  async (values) => {
    const result = schema.safeParse(values);
    if (result.success) {
      return { values: result.data, errors: {} };
    }
    const formErrors: FieldErrors<z.infer<T>> = {};
    result.error.errors.forEach((err) => {
      const path = err.path[0] as keyof z.infer<T>;
      formErrors[path] = {
        type: err.code,
        message: err.message,
      } as any;
    });
    return { values: {}, errors: formErrors };
  };

export default zodResolver;
