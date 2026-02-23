"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { extractFields } from "@/lib/schema-introspect";
import { FieldRenderer } from "./FieldRenderer";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";

export type SelectOption = { value: string; label: string };

export type FieldOverride = {
  type: "select";
  options: SelectOption[];
};

export type FieldOverrides = Record<string, FieldOverride>;

type AutoFormProps<T extends z.ZodObject<z.ZodRawShape>> = {
  schema: T;
  defaultValues?: Partial<z.infer<T>>;
  onSubmit: (data: z.infer<T>) => void;
  submitLabel?: string;
  fieldOverrides?: FieldOverrides;
};

function stripEmpty(obj: Record<string, any>): Record<string, any> {
  const result: Record<string, any> = {};
  for (const [key, value] of Object.entries(obj)) {
    if (value === undefined || value === null) continue;
    if (Array.isArray(value)) {
      if (value.length === 0) continue;
      result[key] = value.map((item) =>
        item && typeof item === "object" && !Array.isArray(item)
          ? stripEmpty(item)
          : item,
      );
    } else if (typeof value === "object") {
      const cleaned = stripEmpty(value);
      if (Object.keys(cleaned).length === 0) continue;
      result[key] = cleaned;
    } else if (value === "") {
      continue;
    } else {
      result[key] = value;
    }
  }
  return result;
}

export function AutoForm<T extends z.ZodObject<z.ZodRawShape>>({
  schema,
  defaultValues,
  onSubmit,
  submitLabel = "Save",
  fieldOverrides,
}: AutoFormProps<T>) {
  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: defaultValues as any,
  });

  const fields = extractFields(schema);

  function handleSubmit(data: z.infer<T>) {
    onSubmit(stripEmpty(data) as z.infer<T>);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        {fields.map((meta) => (
          <FieldRenderer
            key={meta.name}
            meta={meta}
            form={form}
            prefix=""
            fieldOverrides={fieldOverrides}
          />
        ))}
        <Button type="submit">{submitLabel}</Button>
      </form>
    </Form>
  );
}
