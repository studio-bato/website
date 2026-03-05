"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { z } from "zod";
import { AutoForm, type FieldOverrides } from "@/components/auto-form";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ExternalLink, Trash } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

type AdminEntityConfig<T extends { id: string }> = {
  title: string;
  entityName: string;
  schema: z.ZodObject<z.ZodRawShape>;
  saveAction: (items: T[]) => Promise<{ success: boolean; error?: unknown }>;
  getLabel: (item: T) => string;
  getSublabel?: (item: T) => string;
  getOpenLink?: (id: string) => string;
  fieldOverrides?: FieldOverrides;
};

type AdminEntityContentProps<T extends { id: string }> = {
  initialItems: T[];
  config: AdminEntityConfig<T>;
};

export function AdminEntityContent<T extends { id: string }>({
  initialItems,
  config,
}: AdminEntityContentProps<T>) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [items, setItems] = useState<T[]>(initialItems);
  const [selectedId, setSelectedId] = useState<string | null>(
    searchParams.get("id"),
  );
  const [isNew, setIsNew] = useState(false);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  function selectId(id: string | null) {
    setSelectedId(id);
    const params = new URLSearchParams(searchParams.toString());
    if (id) {
      params.set("id", id);
    } else {
      params.delete("id");
    }
    router.replace(`?${params.toString()}`);
  }

  const selectedItem = isNew
    ? undefined
    : items.find((i) => i.id === selectedId);

  async function handleSave(data: T) {
    let updated: T[];
    if (isNew) {
      updated = [...items, data];
    } else {
      updated = items.map((i) => (i.id === selectedId ? data : i));
    }

    setSaving(true);
    setMessage(null);
    const result = await config.saveAction(updated);
    setSaving(false);

    if (result.success) {
      setItems(updated);
      selectId(data.id);
      setIsNew(false);
      setMessage("Saved successfully.");
    } else {
      setMessage("Error saving.");
    }
  }

  function handleDelete(id: string) {
    const updated = items.filter((i) => i.id !== id);
    setSaving(true);
    setMessage(null);
    config.saveAction(updated).then((result) => {
      setSaving(false);
      if (result.success) {
        setItems(updated);
        selectId(null);
        setMessage("Deleted successfully.");
      } else {
        setMessage("Error deleting.");
      }
    });
  }

  const addButton = (className: string) => (
    <Button
      variant="outline"
      className={`w-full ${className}`}
      onClick={() => {
        selectId(null);
        setIsNew(true);
        setMessage(null);
      }}
    >
      + Add {config.entityName}
    </Button>
  );

  return (
    <div className="container mx-auto py-4 px-4">
      <h1 className="text-3xl font-bold mb-8">{config.title}</h1>

      <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] gap-8">
        {/* Sidebar: item list */}
        <div className="space-y-2">
          {addButton("mb-4")}

          {items.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                selectId(item.id);
                setIsNew(false);
                setMessage(null);
              }}
              className={`w-full text-left px-4 py-3 border transition-colors ${
                selectedId === item.id && !isNew
                  ? "bg-primary text-primary-foreground"
                  : "hover:bg-muted"
              }`}
            >
              <div className="font-medium">{config.getLabel(item)}</div>
              {config.getSublabel && (
                <div className="text-xs opacity-60">
                  {config.getSublabel(item)}
                </div>
              )}
            </button>
          ))}

          {addButton("mt-4")}
        </div>

        {/* Main: edit form */}
        <div>
          {message && (
            <p className="text-sm mb-4 text-muted-foreground">{message}</p>
          )}

          {(selectedItem || isNew) && (
            <div className="space-y-4">
              <div className="flex items-center justify-between gap-4">
                <h2 className="text-xl font-semibold flex-1">
                  {isNew
                    ? `New ${config.entityName}`
                    : `Edit: ${selectedItem ? config.getLabel(selectedItem) : ""}`}
                </h2>
                {!isNew && selectedId && (
                  <>
                    {config.getOpenLink && (
                      <Link href={config.getOpenLink(selectedId)}>
                        <Button variant="outline" size="sm">
                          <ExternalLink />
                          Open
                        </Button>
                      </Link>
                    )}
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button
                          variant="destructive"
                          size="sm"
                          disabled={saving}
                        >
                          <Trash />
                          Delete
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Delete {config.entityName}?</AlertDialogTitle>
                          <AlertDialogDescription>
                            This action cannot be undone.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction onClick={() => handleDelete(selectedId)}>
                            Delete
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </>
                )}
              </div>

              <AutoForm
                key={isNew ? "__new__" : selectedId}
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                schema={config.schema as any}
                defaultValues={selectedItem}
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                onSubmit={handleSave as any}
                submitLabel={saving ? "Saving..." : "Save"}
                fieldOverrides={config.fieldOverrides}
              />
            </div>
          )}

          {!selectedItem && !isNew && (
            <p className="text-muted-foreground">
              Select {config.entityName.toLowerCase() === "artist" ? "an" : "a"}{" "}
              {config.entityName.toLowerCase()} to edit, or add a new one.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
