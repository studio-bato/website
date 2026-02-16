"use client";

import { UseFormReturn } from "react-hook-form";
import { FieldMeta, extractFields } from "@/lib/schema-introspect";
import { ArrayFieldRenderer } from "./ArrayFieldRenderer";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export function FieldRenderer({
  meta,
  form,
  prefix,
}: {
  meta: FieldMeta;
  form: UseFormReturn<any>;
  prefix: string;
}) {
  const fullName = prefix ? `${prefix}.${meta.name}` : meta.name;

  if (meta.kind === "string") {
    const isTextarea = meta.description === "textarea";

    return (
      <FormField
        control={form.control}
        name={fullName}
        render={({ field }) => (
          <FormItem>
            <FormLabel>
              {meta.label}
              {meta.required && (
                <span className="text-destructive"> *</span>
              )}
            </FormLabel>
            <FormControl>
              {isTextarea ? (
                <Textarea {...field} value={field.value ?? ""} />
              ) : (
                <Input {...field} value={field.value ?? ""} />
              )}
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    );
  }

  if (meta.kind === "object" && meta.objectSchema) {
    const subFields = extractFields(meta.objectSchema);
    return (
      <fieldset className="border p-4 space-y-4">
        <legend className="text-sm font-medium px-2">
          {meta.label}
          {!meta.required && " (optional)"}
        </legend>
        {subFields.map((sub) => (
          <FieldRenderer
            key={sub.name}
            meta={sub}
            form={form}
            prefix={fullName}
          />
        ))}
      </fieldset>
    );
  }

  if (meta.kind === "array") {
    return <ArrayFieldRenderer meta={meta} form={form} fullName={fullName} />;
  }

  return null;
}
