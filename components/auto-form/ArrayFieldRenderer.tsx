"use client";

import { useFieldArray, UseFormReturn } from "react-hook-form";
import { z } from "zod";
import { FieldMeta, extractFields } from "@/lib/schema-introspect";
import { FieldRenderer } from "./FieldRenderer";
import {
  FormField,
  FormItem,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function ArrayFieldRenderer({
  meta,
  form,
  fullName,
}: {
  meta: FieldMeta;
  form: UseFormReturn<any>;
  fullName: string;
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
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => append(isObjectArray ? {} : "")}
        >
          + Add {singularLabel}
        </Button>
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
    </div>
  );
}
