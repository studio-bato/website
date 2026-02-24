"use client";

import { useFieldArray, UseFormReturn } from "react-hook-form";
import { z } from "zod";
import { FieldMeta, extractFields } from "@/lib/schema-introspect";
import { FieldRenderer } from "./FieldRenderer";
import type { FieldOverrides } from "./AutoForm";
import {
  FormField,
  FormItem,
  FormControl,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

function matchOverride(fullName: string, fieldOverrides?: FieldOverrides) {
  if (!fieldOverrides) return undefined;
  if (fieldOverrides[fullName]) return fieldOverrides[fullName];
  const pattern = fullName.replace(/\.\d+\./g, ".*.");
  if (fieldOverrides[pattern]) return fieldOverrides[pattern];
  return undefined;
}

export function ArrayFieldRenderer({
  meta,
  form,
  fullName,
  fieldOverrides,
}: {
  meta: FieldMeta;
  form: UseFormReturn<any>;
  fullName: string;
  fieldOverrides?: FieldOverrides;
}) {
  const override = matchOverride(fullName, fieldOverrides);

  // Multi-select via checkboxes for array-of-string fields with a select override
  if (
    override?.type === "select" &&
    !(meta.innerSchema instanceof z.ZodObject)
  ) {
    return (
      <FormField
        control={form.control}
        name={fullName}
        render={({ field }) => {
          const selected: string[] = field.value ?? [];

          function toggle(value: string) {
            if (selected.includes(value)) {
              field.onChange(selected.filter((v: string) => v !== value));
            } else {
              field.onChange([...selected, value]);
            }
          }

          return (
            <FormItem>
              <FormLabel>
                {meta.label}
                {meta.required && <span className="text-destructive"> *</span>}
              </FormLabel>
              <div className="grid grid-cols-2 gap-2">
                {override.options.map((opt) => (
                  <label
                    key={opt.value}
                    className="flex items-center gap-2 cursor-pointer text-sm"
                  >
                    <Checkbox
                      checked={selected.includes(opt.value)}
                      onCheckedChange={() => toggle(opt.value)}
                    />
                    {opt.label}
                  </label>
                ))}
              </div>
              <FormMessage />
            </FormItem>
          );
        }}
      />
    );
  }

  // Default: dynamic add/remove list
  return (
    <DefaultArrayField
      meta={meta}
      form={form}
      fullName={fullName}
      fieldOverrides={fieldOverrides}
    />
  );
}

function DefaultArrayField({
  meta,
  form,
  fullName,
  fieldOverrides,
}: {
  meta: FieldMeta;
  form: UseFormReturn<any>;
  fullName: string;
  fieldOverrides?: FieldOverrides;
}) {
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: fullName,
  });

  const isObjectArray = meta.innerSchema instanceof z.ZodObject;
  const singularLabel = meta.label.replace(/s$/, "");

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium">
          {meta.label}
          {meta.required && <span className="text-destructive"> *</span>}
        </span>
      </div>

      {fields.map((item, index) => (
        <div key={item.id} className="flex gap-2 items-start">
          {isObjectArray && meta.objectSchema ? (
            <fieldset className="flex-1 border p-3 space-y-3">
              {extractFields(meta.objectSchema).map((sub) => (
                <FieldRenderer
                  key={sub.name}
                  meta={sub}
                  form={form}
                  prefix={`${fullName}.${index}`}
                  fieldOverrides={fieldOverrides}
                />
              ))}
            </fieldset>
          ) : (
            <FormField
              control={form.control}
              name={`${fullName}.${index}`}
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormControl>
                    <Input {...field} value={field.value ?? ""} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => remove(index)}
          >
            Remove
          </Button>
        </div>
      ))}

      {fields.length === 0 && (
        <p className="text-sm text-muted-foreground">
          No {meta.label.toLowerCase()} yet.
        </p>
      )}

      <div className="flex items-center justify-between">
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => append(isObjectArray ? {} : "")}
        >
          + Add {singularLabel}
        </Button>
      </div>
    </div>
  );
}
