import { AxiosResponse } from "axios";
import { cookies } from "next/headers";
import { api } from "./api";
import type { Note } from "@/types/note";
import type { User } from "@/types/user";

export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

export async function fetchNotes(
  page: number,
  search?: string,
  tag?: string
): Promise<FetchNotesResponse> {
  const cookieStore = await cookies();

  const params: Record<string, string | number> = {
    page,
    perPage: 12,
  };

  if (search) params.search = search;
  if (tag && tag !== "all") params.tag = tag;

  const response = await api.get<FetchNotesResponse>("/notes", {
    params,
    headers: {
      Cookie: cookieStore.toString(),
    },
  });

  return response.data;
}

export async function fetchNoteById(id: string): Promise<Note> {
  const cookieStore = await cookies();

  const response = await api.get<Note>(`/notes/${id}`, {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });

  return response.data;
}

export async function getMe(): Promise<User> {
  const cookieStore = await cookies();
  const { data } = await api.get<User>('/users/me', {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return data;
}

export async function checkSession(): Promise<AxiosResponse> {
  const cookieStore = await cookies();

  return api.get("/auth/session", {
    headers: {
      Cookie: cookieStore.toString(),
    },
    withCredentials: true,
  });
}