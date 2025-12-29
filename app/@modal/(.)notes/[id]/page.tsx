import {
  QueryClient,
  dehydrate,
  HydrationBoundary,
} from "@tanstack/react-query";
import Modal from "@/components/Modal/Modal";
import NotePreview from "./NotePreview.client";
import { fetchNoteById } from "@/lib/api/serverApi";

type ModalPageProps = {
  params: Promise<{ id: string }>;
};

async function ModalNote({ params }: ModalPageProps) {
  const { id } = await params;
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["notes", id],
    queryFn: () => fetchNoteById(id),
  });

  return (
    <Modal>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <NotePreview id={id} />
      </HydrationBoundary>
    </Modal>
  );
}

export default ModalNote;
