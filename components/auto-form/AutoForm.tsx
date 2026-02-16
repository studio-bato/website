"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { extractFields } from "@/lib/schema-introspect";
import { FieldRenderer } from "./FieldRenderer";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";

type AutoFormProps<T extends z.ZodObject<z.ZodRawShape>> = {
  schema: T;
  defaultValues?: Partial<z.infer<T>>;
  onSubmit: (data: z.infer<T>) => void;
  submitLabel?: string;
};

export function AutoForm<T extends z.ZodObject<z.ZodRawShape>>({
  schema,
  defaultValues,
  onSubmit,
  submitLabel = "Save",
}: AutoFormProps<T>) {
  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: defaultValues as any,
  });

  const fields = extractFields(schema);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {fields.map((meta) => (
          <FieldRenderer key={meta.name} meta={meta} form={form} prefix="" />
        ))}
        <Button type="submit">{submitLabel}</Button>
      </form>
    </Form>
  );
}
