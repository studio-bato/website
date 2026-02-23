import { z } from "zod";

export type FieldKind = "string" | "object" | "array";

export type FieldMeta = {
  name: string;
  label: string;
  required: boolean;
  kind: FieldKind;
  description?: string;
  innerSchema?: z.ZodTypeAny;
  objectSchema?: z.ZodObject<z.ZodRawShape>;
};

function unwrapOptional(schema: z.ZodTypeAny): {
  inner: z.ZodTypeAny;
  optional: boolean;
} {
  if (schema instanceof z.ZodOptional) {
    return { inner: schema.unwrap(), optional: true };
  }
  if (schema instanceof z.ZodDefault) {
    return { inner: schema.removeDefault(), optional: true };
  }
  return { inner: schema, optional: false };
}

function camelToLabel(s: string): string {
  return s
    .replace(/([A-Z])/g, " $1")
    .replace(/^./, (c) => c.toUpperCase())
    .trim();
}

export function extractFields(schema: z.ZodObject<z.ZodRawShape>): FieldMeta[] {
  const shape = schema.shape;

  return Object.entries(shape).map(([name, rawSchema]) => {
    const { inner, optional } = unwrapOptional(rawSchema as z.ZodTypeAny);
    const required = !optional;
    const description =
      (rawSchema as z.ZodTypeAny).description ?? inner.description;

    if (inner instanceof z.ZodArray) {
      const element = inner.element;
      return {
        name,
        label: camelToLabel(name),
        required,
        kind: "array" as const,
        description,
        innerSchema: element,
        objectSchema: element instanceof z.ZodObject ? element : undefined,
      };
    }

    if (inner instanceof z.ZodObject) {
      return {
        name,
        label: camelToLabel(name),
        required,
        kind: "object" as const,
        description,
        objectSchema: inner,
      };
    }

    return {
      name,
      label: camelToLabel(name),
      required,
      kind: "string" as const,
      description,
    };
  });
}
