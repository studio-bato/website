"use client";

import { useState } from "react";
import { genres as initialGenres } from "@/data/json";
import { GenreSchema } from "@/data/schemas";
import type { Genre } from "@/data/types";
import { AutoForm } from "@/components/auto-form";
import { Button } from "@/components/ui/button";
import { saveGenres } from "@/app/admin/actions";

export default function AdminGenresPage() {
  const [genres, setGenres] = useState<Genre[]>(initialGenres);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const selectedGenre = isNew
    ? undefined
    : genres.find((g) => g.id === selectedId);

  async function handleSave(data: Genre) {
    let updated: Genre[];
    if (isNew) {
      updated = [...genres, data];
    } else {
      updated = genres.map((g) => (g.id === selectedId ? data : g));
    }

    setSaving(true);
    setMessage(null);
    const result = await saveGenres(updated);
    setSaving(false);

    if (result.success) {
      setGenres(updated);
      setSelectedId(data.id);
      setIsNew(false);
      setMessage("Saved successfully.");
    } else {
      setMessage("Error saving.");
    }
  }

  function handleDelete(id: string) {
    const updated = genres.filter((g) => g.id !== id);
    setSaving(true);
    setMessage(null);
    saveGenres(updated).then((result) => {
      setSaving(false);
      if (result.success) {
        setGenres(updated);
        setSelectedId(null);
        setMessage("Deleted successfully.");
      } else {
        setMessage("Error deleting.");
      }
    });
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-8">Genres</h1>

      <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] gap-8">
        {/* Sidebar: genre list */}
        <div className="space-y-2">
          {genres.map((genre) => (
            <button
              key={genre.id}
              onClick={() => {
                setSelectedId(genre.id);
                setIsNew(false);
                setMessage(null);
              }}
              className={`w-full text-left px-4 py-3 border transition-colors ${
                selectedId === genre.id && !isNew
                  ? "bg-primary text-primary-foreground"
                  : "hover:bg-muted"
              }`}
            >
              <div className="font-medium">{genre.label}</div>
              <div className="text-xs opacity-60">{genre.id}</div>
            </button>
          ))}

          <Button
            variant="outline"
            className="w-full mt-4"
            onClick={() => {
              setSelectedId(null);
              setIsNew(true);
              setMessage(null);
            }}
          >
            + Add Genre
          </Button>
        </div>

        {/* Main: edit form */}
        <div>
          {message && (
            <p className="text-sm mb-4 text-muted-foreground">{message}</p>
          )}

          {(selectedGenre || isNew) && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">
                  {isNew ? "New Genre" : `Edit: ${selectedGenre?.label}`}
                </h2>
                {!isNew && selectedId && (
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleDelete(selectedId)}
                    disabled={saving}
                  >
                    Delete
                  </Button>
                )}
              </div>

              <AutoForm
                key={isNew ? "__new__" : selectedId}
                schema={GenreSchema}
                defaultValues={selectedGenre}
                onSubmit={handleSave}
                submitLabel={saving ? "Saving..." : "Save"}
              />
            </div>
          )}

          {!selectedGenre && !isNew && (
            <p className="text-muted-foreground">
              Select a genre to edit, or add a new one.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
