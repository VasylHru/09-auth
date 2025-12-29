"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchNoteById } from "@/lib/api/clientApi";
import { useRouter } from "next/navigation";
import css from "@/components/NotePreview/NotePreview.module.css";

export default function NotePreview({ id }: { id: string }) {
  const router = useRouter();

  const { data, isError } = useQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
    staleTime: 1000 * 60 * 5,
  });

  if (!data && !isError) return <p className={css.loading}>Loading...</p>;

  if (isError) return <p className={css.error}>Error loading note</p>;

  return (
    <div className={css.modalContent}>
      <button className={css.closeButton} onClick={() => router.back()}>
        ✕
      </button>

      <h2 className={css.title}>{data.title}</h2>

      <p className={css.text}>{data.content}</p>

      <p className={css.meta}>
        Tag: <span className={css.tag}>{data.tag}</span>
      </p>

      <p className={css.meta}>
        Created: {new Date(data.createdAt).toLocaleDateString()}
      </p>
    </div>
  );
}
