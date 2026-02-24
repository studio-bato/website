"use client";

import { useState } from "react";
import { releases as initialReleases } from "@/data/local-data";
import { ReleaseSchema } from "@/data/schemas";
import type { Release } from "@/data/types";
import { AutoForm, type FieldOverrides } from "@/components/auto-form";
import { Button } from "@/components/ui/button";
import { saveReleases } from "@/app/admin/actions";

export default function AdminReleasesPage() {
  const [releases, setReleases] = useState<Release[]>(initialReleases);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  // const artistOptions = artists.map((a) => ({ value: a.id, label: a.name }));
  // const releaseOverrides: FieldOverrides = {
  //   artistIds: { type: "select", options: artistOptions },
  //   "tracks.*.artistIds": { type: "select", options: artistOptions },
  // };

  const selectedRelease = isNew
    ? undefined
    : releases.find((r) => r.id === selectedId);

  async function handleSave(data: Release) {
    let updated: Release[];
    if (isNew) {
      updated = [...releases, data];
    } else {
      updated = releases.map((r) => (r.id === selectedId ? data : r));
    }

    setSaving(true);
    setMessage(null);
    const result = await saveReleases(updated);
    setSaving(false);

    if (result.success) {
      setReleases(updated);
      setSelectedId(data.id);
      setIsNew(false);
      setMessage("Saved successfully.");
    } else {
      setMessage("Error saving.");
    }
  }

  function handleDelete(id: string) {
    const updated = releases.filter((r) => r.id !== id);
    setSaving(true);
    setMessage(null);
    saveReleases(updated).then((result) => {
      setSaving(false);
      if (result.success) {
        setReleases(updated);
        setSelectedId(null);
        setMessage("Deleted successfully.");
      } else {
        setMessage("Error deleting.");
      }
    });
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-8">Releases</h1>

      <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] gap-8">
        {/* Sidebar: release list */}
        <div className="space-y-2">
          {releases.map((release) => (
            <button
              key={release.id}
              onClick={() => {
                setSelectedId(release.id);
                setIsNew(false);
                setMessage(null);
              }}
              className={`w-full text-left px-4 py-3 border transition-colors ${
                selectedId === release.id && !isNew
                  ? "bg-primary text-primary-foreground"
                  : "hover:bg-muted"
              }`}
            >
              <div className="font-medium">{release.title}</div>
              <div className="text-xs opacity-60">
                {release.type} — {release.date}
              </div>
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
            + Add Release
          </Button>
        </div>

        {/* Main: edit form */}
        <div>
          {message && (
            <p className="text-sm mb-4 text-muted-foreground">{message}</p>
          )}

          {(selectedRelease || isNew) && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">
                  {isNew ? "New Release" : `Edit: ${selectedRelease?.title}`}
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
                schema={ReleaseSchema}
                defaultValues={selectedRelease}
                onSubmit={handleSave}
                submitLabel={saving ? "Saving..." : "Save"}
                // fieldOverrides={releaseOverrides}
              />
            </div>
          )}

          {!selectedRelease && !isNew && (
            <p className="text-muted-foreground">
              Select a release to edit, or add a new one.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
