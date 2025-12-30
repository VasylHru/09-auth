import { api } from "./api";
import type { Note, NoteTag } from "@/types/note";
import type { User } from "@/types/user";

export interface CreateNoteParams {
  title: string;
  content: string;
  tag: NoteTag;
}

export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

export interface DeleteNoteResponse {
  message: string;
  note: Note;
}

export interface RegisterParams {
  email: string;
  password: string;
}

export interface LoginParams {
  email: string;
  password: string;
}

export interface UpdateMeParams {
  username?: string;
  name?: string;
  email?: string;
  password?: string;
}

export async function fetchNotes(
  page: number,
  search?: string,
  tag?: string
): Promise<FetchNotesResponse> {
  const params: Record<string, string | number> = {
    page,
    perPage: 12,
  };

  if (search) {
    params.search = search;
  }

  if (tag && tag !== "all") {
    params.tag = tag;
  }

  const response = await api.get<FetchNotesResponse>("/notes", { params });
  return response.data;
}

export async function fetchNoteById(id: string): Promise<Note> {
  const response = await api.get<Note>(`/notes/${id}`);
  return response.data;
}

export async function createNote(data: CreateNoteParams): Promise<Note> {
  const response = await api.post<Note>("/notes", data);
  return response.data;
}

export async function deleteNote(id: string): Promise<DeleteNoteResponse> {
  const response = await api.delete<DeleteNoteResponse>(`/notes/${id}`);
  return response.data;
}

export async function register(data: RegisterParams): Promise<User> {
  const response = await api.post<User>("/auth/register", data);
  return response.data;
}

export async function login(payload: LoginParams): Promise<User> {
  const { data } = await api.post<User>("/auth/login", payload);
  return data;
}

export async function logout(): Promise<void> {
  await api.post("/auth/logout");
}

export async function checkServerSession(): Promise<{ isAuth: boolean }> {
  const { data } = await api.get<{ isAuth: boolean }>("/auth/session");
  return data;
}

export async function getMe(): Promise<User> {
  const { data } = await api.get<User>("/users/me");
  return data;
}


export async function updateMe(payload: UpdateMeParams): Promise<User> {
  const { data } = await api.patch<User>("/users/me", payload);
  return data;
}
