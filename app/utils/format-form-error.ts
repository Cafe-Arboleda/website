import type { ZodError } from "zod";

interface MappedErrors {
  [x: string]: string;
}

interface MapErrorsOptions {
  extraErrors?: { [x: string]: string };
  zodError?: ZodError;
}

export const mapErrors = ({ zodError }: MapErrorsOptions): MappedErrors => {
  const formattedZodError = Object.entries(zodError?.format() || {});

  console.log(formattedZodError);

  return { some: "error" };
};
