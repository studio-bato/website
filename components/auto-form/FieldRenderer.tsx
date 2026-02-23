"use client";

import { UseFormReturn } from "react-hook-form";
import { FieldMeta, extractFields } from "@/lib/schema-introspect";
import { ArrayFieldRenderer } from "./ArrayFieldRenderer";
import type { FieldOverrides } from "./AutoForm";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

function matchOverride(fullName: string, fieldOverrides?: FieldOverrides) {
  if (!fieldOverrides) return undefined;
  // Direct match first
  if (fieldOverrides[fullName]) return fieldOverrides[fullName];
  // Wildcard match: replace numeric indices with *
  const pattern = fullName.replace(/\.\d+\./g, ".*.");
  if (fieldOverrides[pattern]) return fieldOverrides[pattern];
  return undefined;
}

export function FieldRenderer({
  meta,
  form,
  prefix,
  fieldOverrides,
}: {
  meta: FieldMeta;
  form: UseFormReturn<any>;
  prefix: string;
  fieldOverrides?: FieldOverrides;
}) {
  const fullName = prefix ? `${prefix}.${meta.name}` : meta.name;
  const override = matchOverride(fullName, fieldOverrides);

  // Single-value select override for string fields
  if (meta.kind === "string" && override?.type === "select") {
    return (
      <FormField
        control={form.control}
        name={fullName}
        render={({ field }) => (
          <FormItem>
            <FormLabel>
              {meta.label}
              {meta.required && <span className="text-destructive"> *</span>}
            </FormLabel>
            <Select onValueChange={field.onChange} value={field.value ?? ""}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue
                    placeholder={`Select ${meta.label.toLowerCase()}`}
                  />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {override.options.map((opt) => (
                  <SelectItem key={opt.value} value={opt.value}>
                    {opt.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />
    );
  }

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
              {meta.required && <span className="text-destructive"> *</span>}
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
            fieldOverrides={fieldOverrides}
          />
        ))}
      </fieldset>
    );
  }

  if (meta.kind === "array") {
    return (
      <ArrayFieldRenderer
        meta={meta}
        form={form}
        fullName={fullName}
        fieldOverrides={fieldOverrides}
      />
    );
  }

  return null;
}
