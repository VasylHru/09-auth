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

export async function login(data: LoginParams): Promise<User> {
  const response = await api.post<User>("/auth/login", data);
  return response.data;
}

export async function logout(): Promise<void> {
  await api.post("/auth/logout");
}

export async function checkSession(): Promise<boolean> {
  try {
    await api.get("/auth/check-session");
    return true;
  } catch {
    return false;
  }
}

export async function getMe(): Promise<User> {
  const response = await api.get<User>("/users/me");
  return response.data;
}

export async function updateMe(data: UpdateMeParams): Promise<User> {
  const response = await api.patch<User>("/users/me", data);
  return response.data;
}
// export const fetchNotes = async () => {
//   const { data } = await api.get<Note[]>("/notes");
//   return data;
// };

// export const fetchNoteById = async (id: string) => {
//   const { data } = await api.get<Note>(`/notes/${id}`);
//   return data;
// };

// export const createNote = async (payload: Partial<Note>) => {
//   const { data } = await api.post<Note>("/notes", payload);
//   return data;
// };

// export const deleteNote = async (id: string) => {
//   await api.delete(`/notes/${id}`);
// };

// export const register = async (credentials: {
//   email: string;
//   password: string;
// }) => {
//   const { data } = await api.post<User>("/auth/register", credentials);
//   return data;
// };

// export const login = async (payload: {
//   email: string;
//   password: string;
// }) => {
//   const { data } = await api.post<User>("/auth/login", payload);
//   return data;
// };

// export const logout = async () => {
//   await api.post("/auth/logout");
// };

// export const checkSession = async () => {
//   const { data } = await api.get<{ isAuth: boolean }>("/auth/session");
//   return data;
// };

// export const getMe = async () => {
//   const { data } = await api.get<User>("/users/me");
//   return data;
// };

// export const updateMe = async (payload: Partial<User>) => {
//   const { data } = await api.patch<User>("/users/me", payload);
//   return data;
// };
