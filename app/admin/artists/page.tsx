"use client";

import { useState } from "react";
import { artists as initialArtists } from "@/data/artists";
import { ArtistSchema } from "@/data/schemas";
import type { Artist } from "@/data/types";
import { AutoForm } from "@/components/auto-form";
import { Button } from "@/components/ui/button";
import { saveArtists } from "@/app/admin/actions";

export default function AdminArtistsPage() {
  const [artists, setArtists] = useState<Artist[]>(initialArtists);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const selectedArtist = isNew
    ? undefined
    : artists.find((a) => a.id === selectedId);

  async function handleSave(data: Artist) {
    let updated: Artist[];
    if (isNew) {
      updated = [...artists, data];
    } else {
      updated = artists.map((a) => (a.id === selectedId ? data : a));
    }

    setSaving(true);
    setMessage(null);
    const result = await saveArtists(updated);
    setSaving(false);

    if (result.success) {
      setArtists(updated);
      setSelectedId(data.id);
      setIsNew(false);
      setMessage("Saved successfully.");
    } else {
      setMessage("Error saving.");
    }
  }

  function handleDelete(id: string) {
    const updated = artists.filter((a) => a.id !== id);
    setSaving(true);
    setMessage(null);
    saveArtists(updated).then((result) => {
      setSaving(false);
      if (result.success) {
        setArtists(updated);
        setSelectedId(null);
        setMessage("Deleted successfully.");
      } else {
        setMessage("Error deleting.");
      }
    });
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-8">Artists</h1>

      <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] gap-8">
        {/* Sidebar: artist list */}
        <div className="space-y-2">
          {artists.map((artist) => (
            <button
              key={artist.id}
              onClick={() => {
                setSelectedId(artist.id);
                setIsNew(false);
                setMessage(null);
              }}
              className={`w-full text-left px-4 py-3 border transition-colors ${
                selectedId === artist.id && !isNew
                  ? "bg-primary text-primary-foreground"
                  : "hover:bg-muted"
              }`}
            >
              <div className="font-medium">{artist.name}</div>
              <div className="text-xs opacity-60">{artist.id}</div>
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
            + Add Artist
          </Button>
        </div>

        {/* Main: edit form */}
        <div>
          {message && (
            <p className="text-sm mb-4 text-muted-foreground">{message}</p>
          )}

          {(selectedArtist || isNew) && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">
                  {isNew ? "New Artist" : `Edit: ${selectedArtist?.name}`}
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
                schema={ArtistSchema}
                defaultValues={selectedArtist}
                onSubmit={handleSave}
                submitLabel={saving ? "Saving..." : "Save"}
              />
            </div>
          )}

          {!selectedArtist && !isNew && (
            <p className="text-muted-foreground">
              Select an artist to edit, or add a new one.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
